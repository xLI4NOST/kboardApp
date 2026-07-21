'use client'

import {Task, TaskI} from "@/components/Task/Task";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors, closestCorners, useDroppable, DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove, rectSortingStrategy,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {useDispatch, useSelector} from "react-redux";
import {setSelectedCard} from "@/lib/reducers/ToDoSlice";
import {TaskAddIcon} from "@/components/Card/icons/TaskAddIcon";
import {
    api,
    useChangeOrderTaskMutation, useDeleteCardMutation,
    useDeleteTaskMutation,
    useGetTaskByCardIdQuery
} from "@/lib/services/api";
import {toast} from "react-toastify";
import {sendWebSocketMessage} from "@/app/webSocket/webSocket";
import {useTaskSync} from "@/hooks/useTaskSync";
import {useEffect, useState} from "react";
import {TrashIcon} from "@/components/Task/icons/TrashIcon";

export interface CardProps {
    name: string;
    id: number;
    index?: number;
    handleOpenModal: () => void;
    dashboardId: string;
}

export const Card = ({name, id, index, handleOpenModal, dashboardId}: CardProps) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
    );

    const {data: tasks} = useGetTaskByCardIdQuery(id)
    const [deleteTask, res] = useDeleteTaskMutation()
    const [changeOrderTask] = useChangeOrderTaskMutation()
    const [deleteCard] = useDeleteCardMutation()

    const dispatch = useDispatch();

    const onDragEnd = async (data: DragEndEvent) => {

        const activeData = data.active.data.current
        const overData = data.over?.data.current
        if (!activeData || !overData) return

        const activeIndex = activeData.sortable.index
        const overIndex = overData.sortable.index

        if (activeIndex === overIndex) return


        const orderedArr = async () => {
            if (!tasks) return

            const newArr = arrayMove(tasks, activeIndex, overIndex)

            newArr.map((task, index) => ({
                ...task,
                order: index + 1,
            }))

            return newArr
        }

        const newArr = await orderedArr()

        if (!newArr) return

        try {
            // @ts-ignore

            const response = await changeOrderTask({newArr, id}).unwrap()
            toast.success(response.message)
        } catch (error: any) {
            toast.error(error.status)
        }

    }
    const handleSelectCard = () => {
        dispatch(setSelectedCard({index: id}))
        handleOpenModal()

    }
    const handleDeleteTask = async (id: number, cardId: number) => {

        try {
            const response = await deleteTask({id, cardId}).unwrap()

            toast.success(response.message)
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const handleDeleteCard = async (cardId: number) => {
        try {
            const response = await deleteCard(cardId).unwrap()

            toast.success(response.message)
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const {setNodeRef} = useDroppable({id})

    return tasks ? <div
        className="
        relative
        bg-[#F3F5F6]
        pl-[25px]
        pr-[25px]
        pt-[25px]
        pb-[30px]
        min-h-[400px]
        min-w-[200px]
        w-[400px]
        rounded-sm
        max-[1100px]:w-[100%]
        ">
        <button className='absolute right-[20px] cursor-pointer' onClick={() => handleDeleteCard(id)}>
            <TrashIcon/>
        </button>

        <p className='text-[#313131] max-w-[290px] '>{name}</p>
        <DndContext
            sensors={sensors}
            onDragEnd={onDragEnd}
            collisionDetection={closestCorners}
        >
            <SortableContext items={tasks} strategy={verticalListSortingStrategy} id={id + ''}>

                <div ref={setNodeRef} className='flex flex-col items-center gap-[30px] mt-[20px]'>
                    {tasks.map((item) => (
                        <Task
                            id={item.id}
                            title={item.title}
                            subtitle={item.subtitle}
                            priority={item.priority}
                            order={item.order}
                            key={item.id}
                            deleteTask={() => handleDeleteTask(item.id, id)}
                        />
                    ))}
                    <button onClick={handleSelectCard} className='cursor-pointer'>
                        <TaskAddIcon/>
                    </button>

                </div>
            </SortableContext>
        </DndContext>

    </div> : <div className="
        relative
        bg-[#F3F5F6]
        pl-[25px]
        pr-[25px]
        pt-[25px]
        pb-[30px]
        min-h-[400px]
        min-w-[200px]
        w-[400px]
        rounded-sm
        max-[1100px]:w-[100%]
        flex
        ">
        <button className='absolute right-[20px] cursor-pointer' onClick={() => handleDeleteCard(id)}>
            <TrashIcon/>
        </button>

        <p className='text-[#313131] max-w-[290px] '>{name}</p>

        <button onClick={handleSelectCard} className='cursor-pointer self-center'>
            <TaskAddIcon/>
        </button>
    </div>


}