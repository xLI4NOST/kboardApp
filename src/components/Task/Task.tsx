'use client'

import {useSortable} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import {TrashIcon} from "@/components/Task/icons/TrashIcon";


export interface TaskI {
    id: string;
    title: string;
    subtitle: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
    order: number;
    deleteTask: () => void;
}

export const Task = ({id, subtitle, priority, order, deleteTask, title}: TaskI) => {
    let priorityCor = ''

    switch (priority) {
        case 'critical':
            priorityCor = 'bg-[#FFB9B9]'
            break
        case 'high':
            priorityCor = 'bg-[#FFC48D]'
            break
        case 'medium':
            priorityCor = 'bg-[#FFED8F]'
            break
        case 'low':
            priorityCor = 'bg-[#D6D6D6]'
            break
    }

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: id});
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return <div ref={setNodeRef} style={style} {...listeners}
                className='rounded-xl
                relative z-2 bg-white shadow-[0_10px_0_0_rgba(0,0,0,0.15)]
                flex flex-col items-start gap-[10px] p-[20px] 
                w-[350px] cursor-grab max-[1100px]:w-[100%]'
    >
        <button
            className='absolute z-3 right-[10px] top-[10px] cursor-pointer'
            onMouseDown={(e) => {
                e.stopPropagation();
                deleteTask()
            }}
        >
            <TrashIcon/>
        </button>
        <h2 className='text-black break-all max-w-[290px]'>{title}</h2>
        <p className='text-[#363636]'>{subtitle}</p>

        <span>{
            <span className={`block w-[50px] h-[20px] rounded-sm ${priorityCor}`}></span>
        }</span>
    </div>
}