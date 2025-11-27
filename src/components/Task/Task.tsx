'use client'

import {useDraggable} from "@dnd-kit/core";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import {TrashIcon} from "@/components/Task/icons/TrashIcon";
import {log} from "node:util";

export interface TaskI {
    id: string;
    title: string;
    description: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
    order: number;
    deleteTask?: (order: number) => void;
}

export const Task = ({id, description, priority, order, deleteTask, title}: TaskI) => {
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
                w-[350px] cursor-grab'
    >
        <button
            className='absolute z-3 right-[10px] top-[10px] cursor-pointer'
            onMouseDown={(e) => {
                e.stopPropagation();
                deleteTask(order)
            }}
        >
            <TrashIcon/>
        </button>
        <h2 className='text-black'>{title}</h2>
        <p className='text-[#363636]'>{description}</p>
        <span>{priority}</span>
    </div>
}