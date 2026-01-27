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
import {useDeleteTaskMutation, useGetTaskByCardIdQuery} from "@/lib/services/api";
import {toast} from "react-toastify";

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

    const dispatch = useDispatch();
    const toDoData = useSelector(state => state.toDoSlice.data);
    // const selectedCard = toDoData[index].data

    const onDragEnd = (item, e) => {
        if (item.activatorEvent.srcElement.localName === 'div') {
            const startIndex = item.active.data.current.sortable.index
            const endIndex = item.over.data.current.sortable.index
            const newArr = arrayMove(selectedCard, startIndex, endIndex)
            const orderedArr = newArr.map((item, index) => ({
                ...item,
                order: index,
            }))

            dispatch(changeOrder({orderedArr: orderedArr, index}))
        }
    }
    const handleSelectCard = () => {
        dispatch(setSelectedCard({index: id}))
        handleOpenModal()
    }
    const handleDeleteTask = async (id, cardId) => {
        try {
            const response = await deleteTask({id, cardId}).unwrap()
            toast.success(response.message)
        } catch (error) {
            toast.error(error.message)
        }

    }
    const {setNodeRef} = useDroppable({id})

    return tasks && <div className="bg-[#F3F5F6] pl-[25px] pr-[25px] pt-[25px] pb-[30px] min-h-[400px] min-w-[200px]">
        <p className='text-[#313131]'>{name}</p>
        <SortableContext items={tasks} strategy={verticalListSortingStrategy} id={id}>
            <div ref={setNodeRef} className='flex flex-col items-center gap-[30px] mt-[20px]'>
                {tasks.map((item) => (
                    <Task
                        id={item.id}
                        title={item.title}
                        description={item.description}
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
    </div>

    // <DndContext
    //     onDragEnd={onDragEnd}
    //     sensors={sensors}
    //     collisionDetection={closestCorners}
    // >
    //     <div className="bg-[#F3F5F6] pl-[25px] pr-[25px] pt-[25px] pb-[30px]">
    //         <p className='text-[#313131]'>{title}</p>
    //         <SortableContext items={data} strategy={verticalListSortingStrategy}>
    //             <div ref={setNodeRef} className='flex flex-col items-center gap-[30px] mt-[20px]'>
    //                 {data.map((item) => (
    //                     <Task
    //                         id={item.id}
    //                         title={item.title}
    //                         description={item.description}
    //                         priority={item.priority}
    //                         order={item.order}
    //                         key={item.id}
    //                         deleteTask={handleDeleteTask}
    //                     />
    //                 ))}
    //                 <button onClick={handleSelectCard} className='cursor-pointer'>
    //                     <TaskAddIcon/>
    //                 </button>
    //             </div>
    //         </SortableContext>
    //     </div>
    // </DndContext>

}