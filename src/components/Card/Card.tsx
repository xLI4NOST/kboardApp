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
} from '@dnd-kit/sortable';

export interface CardProps {
    title: string;
    id: string;
    data: TaskI[]
}

export const Card = ({title, id, data}: CardProps) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    return <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
    >
        <div className="bg-[#F3F5F6] pl-[25px] pr-[25px] pt-[25px] pb-[30px]">
            <p className='text-[#313131]'>{title}</p>
            <SortableContext items={data} strategy={verticalListSortingStrategy}>
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