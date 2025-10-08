'use client'

import {Task, TaskI} from "@/components/Task/Task";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    rectSortingStrategy
} from '@dnd-kit/sortable';
import {useDispatch, useSelector} from "react-redux";
import {addToDo, changeOrder} from "@/lib/reducers/ToDoSlice";

export interface CardProps {
    title: string;
    id: string;
    data: TaskI[];
    index: number;
}

export const Card = ({title, id, index, data}: CardProps) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    const dispatch = useDispatch();
    const toDoData = useSelector(state => state.toDoSlice.data);
    const selectedCard = toDoData[index].data

    const onDragStart = (active) => {
    }
    const onDragEnd = (item) => {
        const startIndex = item.active.data.current.sortable.index
        const endIndex = item.over.data.current.sortable.index
        const newArr = arrayMove(selectedCard, startIndex, endIndex)
        const orderedArr = newArr.map((item, index) => ({
            ...item,
            order: index,
        }))
        dispatch(changeOrder({orderedArr: orderedArr, index}))
    }

    return <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sensors={sensors}
        collisionDetection={closestCenter}
    >
        <div className="bg-[#F3F5F6] pl-[25px] pr-[25px] pt-[25px] pb-[30px]">
            <p className='text-[#313131]'>{title}</p>
            <SortableContext items={data} strategy={rectSortingStrategy}>
                <div className='flex flex-col items-center gap-[30px] mt-[20px]'>
                    {data.map((item) => (
                        <Task id={item.id} title={item.title} description={item.description} priority={item.priority}
                              order={item.order} key={item.id}/>
                    ))}
                </div>
            </SortableContext>
        </div>
    </DndContext>
}