import {useDraggable} from "@dnd-kit/core";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';

export interface TaskI {
    id: string;
    title: string;
    description: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
    order: number
}

export const Task = ({id, description, priority, title}: TaskI) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id:id});
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return <div ref={setNodeRef} style={style} {...attributes} {...listeners}
                className='rounded-xl bg-white shadow-[0_10px_0_0_rgba(0,0,0,0.15)] flex flex-col items-start gap-[10px] p-[20px] w-[350px]'>
        <h2 className='text-black'>{title}</h2>
        <p className='text-[#363636]'>{description}</p>
        <span>{priority}</span>
    </div>
}