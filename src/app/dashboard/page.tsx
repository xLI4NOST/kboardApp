'use client'

import React, {useEffect, useRef, useState} from 'react';
import {Card, CardProps} from "@/components/Card/Card";
import {closestCorners, DndContext, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {useSelector} from "react-redux";
import {Modal} from "@/components/Modal/Modal";
import {useGetCardsQuery} from "@/lib/services/api";
import {toast} from "react-toastify";
import {json} from "node:stream/consumers";
import {initSocket, sendWebSocketMessage} from "@/app/webSocket/webSocket";
import {TaskAddIcon} from "@/components/Card/icons/TaskAddIcon";
import {useTaskSync} from "@/hooks/useTaskSync";

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalContent, setIsModalContent] = useState('');
    useTaskSync()

    const {data: cards} = useGetCardsQuery()


    const handleOpenModal = (type) => {
        setIsOpen(prev => !prev);
        setIsModalContent(type);
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
    );

    const handleDragStart = (event) => {
        const {active} = event;
    }

    const handleDragOver = (event) => {
        const {active, over} = event
        if (!over) return
    }



    return cards && <div
        className='
        relative
        bg-[#136CF1]
        flex
        flex-col
        space-between
        w-full
        h-full
        pt-[52px]
        pb-[52px]
        pl-[100px]
        pr-[100px]
        gap-[60px]
        '>
        <div>
            <h1 className='text-white'>Project Name</h1>
            <p className='text-white'>Goal of the board...</p>
        </div>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} content={isModalContent}/>
        <div className='flex flex-row gap-[10px] max-[1440px]:flex-wrap justify-center'>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
            >
                {cards.map((item, index) => (
                    <Card key={item.id} id={item.id} index={index} name={item.name} handleOpenModal={()=>{handleOpenModal('addTask')}}/>
                ))}
                <button className='cursor-pointer' onClick={()=>handleOpenModal('addCard')}>
                    <TaskAddIcon/>
                </button>
            </DndContext>
        </div>
    </div>


}

