'use client'

import React, {useState} from 'react';
import {Card, CardProps} from "@/components/Card/Card";
import {DndContext} from "@dnd-kit/core";
import {useSelector} from "react-redux";
import {Modal} from "@/components/Modal/Modal";
import {addToDo} from "@/lib/reducers/ToDoSlice";

export default function Dashboard() {
    const toDoData = useSelector(state => state.toDoSlice.data);
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenModal = () => {
        setIsOpen(prev => !prev);
    }

    return <div
        className='relative bg-[#136CF1] flex flex-col space-between w-full h-full pt-[52px] pb-[52px] pl-[100px] pr-[100px] gap-[60px]'>
        <div>
            <h1 className='text-white'>Project Name</h1>
            <p className='text-white'>Goal of the board...</p>
        </div>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className='flex flex-row gap-[10px]'>
            {toDoData.map((item, index) => (
                <Card key={item.id} id={item.id} index={index} title={item.title} data={item.data} handleOpenModal={handleOpenModal} />
            ))}
        </div>
    </div>


}

