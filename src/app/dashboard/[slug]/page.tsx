'use client'

import React, {useEffect, useRef, useState} from 'react';
import {Card, CardProps} from "@/components/Card/Card";
import {
    closestCorners,
    DndContext,
    DragOverEvent,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {Modal} from "@/components/Modal/Modal";
import {useGetCardsQuery, useGetCursorDataQuery, useGetOnlineUsersQuery} from "@/lib/services/api";
import {TaskAddIcon} from "@/components/Card/icons/TaskAddIcon";
import {useTaskSync} from "@/hooks/useTaskSync";
import {useParams, useSearchParams} from "next/navigation";
import UsersList from "@/components/UsersList/UsersList";
import {sendWebSocketMessage} from "@/app/webSocket/webSocket";
import Cursour from "@/components/ui/Cursour";

export type ModalContent = 'addTask' | 'addCard' | 'addDashBoard';

export default function Dashboard() {

    const [isOpen, setIsOpen] = useState(false);
    const [isModalContent, setIsModalContent] = useState <ModalContent> ('addCard');
    const {slug} = useParams<{slug: string}>()
    const searchParams = useSearchParams()
    const name = searchParams.get('name');
    const {data: Users} = useGetOnlineUsersQuery(slug as string, {skip: !slug});
    const {data: Cursorus} = useGetCursorDataQuery(slug as string, {skip: !slug})
    const {data: cards} = useGetCardsQuery(slug as string, {skip: !slug});

    // if (Cursorus && Cursorus.length > 0) {
    //     console.log(Cursorus);
    // }
    console.log(Cursorus)


    useTaskSync(slug as string);


    useEffect(() => {
        const sendMouseEvent = (e: MouseEvent) => {
            sendWebSocketMessage('mouseMove', {
                x: e.clientX,
                y: e.clientY,
                slug: slug,
            })
        }

        window.addEventListener('mousemove', (e) => sendMouseEvent(e))

        return () => window.removeEventListener('mousemove', (e) => sendMouseEvent(e))
    }, []);

    useEffect(() => {
        if (!slug) return
        // console.log('messageSocket')
        sendWebSocketMessage('joinRoom', {slug})

    }, [slug]);

    const handleOpenModal = (type : ModalContent) => {
        setIsOpen(prev => !prev);
        setIsModalContent(type);
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
    );

    const handleDragStart = (event: DragStartEvent) => {
        const {active} = event;
    }

    const handleDragOver = (event: DragOverEvent) => {
        const {active, over} = event
        if (!over) return
    }


    return cards ? <div
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
            <h1 className='text-white'>{name && name}</h1>
            <p className='text-white'>Goal of the board...</p>
            <UsersList users={Users}/>
        </div>

        {Cursorus && Object.values(Cursorus).map((cursor) => (
            <Cursour key={cursor.userId} x={cursor.x} y={cursor.y} email={cursor.email}/>
        ))}

        <Modal isOpen={isOpen} setIsOpen={setIsOpen} content={isModalContent}/>

        <div className='flex flex-row gap-[10px] max-[1440px]:flex-wrap justify-center'>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
            >
                {cards.map((item, index) => (
                    <Card key={item.id} id={item.id} dashboardId={slug} index={index} name={item.name}
                          handleOpenModal={() => {
                              handleOpenModal('addTask')
                          }}/>
                ))}

                <button className='cursor-pointer' onClick={() => handleOpenModal('addCard')}>
                    <TaskAddIcon/>
                </button>
            </DndContext>
        </div>
    </div> : <div className={'w-full h-full'}>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} content={isModalContent}/>
        <button className='cursor-pointer' onClick={() => setIsOpen(prev => !prev)}>
            <TaskAddIcon/>
        </button>
        Нет карточек
    </div>


}

