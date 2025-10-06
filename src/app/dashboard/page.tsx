'use client'

import React from 'react';
import {Card, CardProps} from "@/components/Card/Card";
import {DndContext} from "@dnd-kit/core";

export default function Dashboard(){

    const data:CardProps[] = [
        {
            title: "ToDoList",
            data: [
                {title: 'firstTask', description: 'create tasks', id: '1', priority:'critical', order: 1},
                {title: 'secondTask', description: 'add DND', id: '2', priority:'high', order: 2},
                {title: 'thirdTask', description: 'addRtk', id: '3', priority:'high', order: 3},
                {title: 'forthTask', description: 'addNewCards', id: '4', priority:'low', order: 4},
                {title: 'fiveTask', description: 'addAllDndBut', id: '5', priority:'medium', order: 5},
            ]
        },
        {
            title: "Design",
            data: [
                {title: 'PAges', description: 'MakePages', id: '6', priority:'critical', order: 1},
                {title: 'Route', description: 'CreateRoute', id: '7', priority:'high', order: 2},
                {title: 'Redux', description: 'fixRedux', id: '8', priority:'high', order: 3},
            ]
        },


    ]

    return <div className='bg-[#136CF1] flex flex-col space-between w-full h-full pt-[52px] pb-[52px] pl-[100px] pr-[100px] gap-[60px]'>
        <div>
            <h1 className='text-white'>Project Name</h1>
            <p className='text-white'>Goal of the board...</p>
        </div>

        <div className='flex flex-row gap-[10px]'>
            {data.map((item) => (
                <Card title={item.title} data={item.data} />
            ))}
        </div>
    </div>



}

