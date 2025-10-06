'use client'

import {Task, TaskI} from "@/components/Task/Task";
import {DndContext} from '@dnd-kit/core';

export interface CardProps {
    title: string;
    data: TaskI[]
}

export const Card = ({title, data}: CardProps) => {

    return <div className="bg-[#F3F5F6] pl-[25px] pr-[25px] pt-[25px] pb-[30px]">
        <p className='text-[#313131]'>{title}</p>
        <div className='flex flex-col items-center gap-[30px] mt-[20px]'>

                {data.map((item) => (
                    <Task id={item.id} title={item.title} description={item.description} priority={item.priority}
                          order={item.order}/>
                ))}

        </div>
    </div>
}