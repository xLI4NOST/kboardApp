export interface TaskI {
    id: string;
    title: string;
    description: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
    order: number
}

export const Task =({id, description, priority, title} : TaskI)=>{
    return <div className='rounded-xl bg-white shadow-[0_10px_0_0_rgba(0,0,0,0.15)] flex flex-col items-start gap-[10px] p-[20px] w-[350px]'>
        <h2 className='text-black'>{title}</h2>
        <p className='text-[#363636]'>{description}</p>
        <span>{priority}</span>
    </div>
}