'use client'

import React, {useState} from 'react';
import {Card, CardProps} from "@/components/Card/Card";
import {closestCorners, DndContext, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {useSelector} from "react-redux";
import {Modal} from "@/components/Modal/Modal";

export default function Dashboard() {
    const toDoData = useSelector(state => state.toDoSlice.data);
    const userState = useSelector(state => state.userSlice)
    const [isOpen, setIsOpen] = useState(false);
    const [activeId, setActiveId] = useState<string | null>(null);

    const handleOpenModal = () => {
        setIsOpen(prev => !prev);
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
    );

    const handleDragStart = (event) => {
        const {active} = event;
        setActiveId(active.id)
    }

    const handleDragOver = (event) => {
        const {active, over} = event

        if (!over) return
    }

    return <div
        className='relative bg-[#136CF1] flex flex-col space-between w-full h-full pt-[52px] pb-[52px] pl-[100px] pr-[100px] gap-[60px]'>
        <div>
            <h1 className='text-white'>Project Name</h1>
            <p className='text-white'>Goal of the board...</p>
        </div>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}/>
        <div className='flex flex-row gap-[10px]'>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
            >
                {toDoData.map((item, index) => (
                    <Card key={item.id} id={item.id} index={index} title={item.title} data={item.data}
                          handleOpenModal={handleOpenModal}/>
                ))}
            </DndContext>
        </div>
    </div>


}

