'use client'

import {Task, TaskI} from "@/components/Task/Task";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors, closestCorners, useDroppable,
} from '@dnd-kit/core';
import {
    arrayMove, rectSortingStrategy,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {useDispatch, useSelector} from "react-redux";
import {setSelectedCard, changeOrder, deleteTodo} from "@/lib/reducers/ToDoSlice";
import {TaskAddIcon} from "@/components/Card/icons/TaskAddIcon";
import {
    api,
    useChangeOrderTaskMutation,
    useDeleteTaskMutation,
    useGetTaskByCardIdQuery
} from "@/lib/services/api";
import {toast} from "react-toastify";
import {sendWebSocketMessage} from "@/app/webSocket/webSocket";
import {useTaskSync} from "@/hooks/useTaskSync";
import {useEffect, useState} from "react";

export interface CardProps {
    name: string;
    id: string;
    index?: number;
    handleOpenModal: () => void
}

export const Card = ({name, id, index, data, handleOpenModal}: CardProps) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
    );


    const {data: tasks} = useGetTaskByCardIdQuery(id)
    const [deleteTask, res] = useDeleteTaskMutation()
    const [changeOrderTask] = useChangeOrderTaskMutation()

    const dispatch = useDispatch();
    const toDoData = useSelector(state => state.toDoSlice.data);

    useTaskSync()

    const onDragEnd = async (data) => {
        console.log(data)
        const activeIndex = data.active.data.current.sortable.index
        const overIndex = data.over.data.current.sortable.index
        if (activeIndex === overIndex) return


        const orderedArr = async () => {
            const newArr = arrayMove(tasks, activeIndex, overIndex)

            newArr.map((task, index) => ({
                ...task,
                order: index + 1,
            }))

            return newArr
        }

        const newArr = await orderedArr()

        try {
            const response = await changeOrderTask({newArr, id}).unwrap()
            toast.success(response.message)

        } catch (error) {

            toast.error(error.status)
        }

    }
    const handleSelectCard = () => {
        dispatch(setSelectedCard({index: id}))
        handleOpenModal()
    }
    const handleDeleteTask = async (id, cardId) => {

        try {
            const response = await deleteTask({id, cardId}).unwrap()

            // console.log('after:', tasks)
            toast.success(response.message)
        } catch (error) {
            toast.error(error.message)
        }

    }

    const {setNodeRef} = useDroppable({id})

    return tasks && <div
        className="
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

        <p className='text-[#313131]'>{name}</p>
        <DndContext
            sensors={sensors}
            onDragEnd={onDragEnd}
            collisionDetection={closestCorners}
        >
            <SortableContext items={tasks} strategy={verticalListSortingStrategy} id={id}>

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

    </div>


}