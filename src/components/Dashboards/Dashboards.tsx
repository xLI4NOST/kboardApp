'use client'

import React from 'react';
import DashboardCard, {DashboardCardProps} from "@/components/DashboardCard/DashboardCard";
import NoDashboards from "@/components/NoDashboards/NoDashboards";
import {Modal} from "@/components/Modal/Modal";
import {useGetDashboardsQuery} from "@/lib/services/api";
import {TaskAddIcon} from "@/components/Card/icons/TaskAddIcon";


export interface DashboardProps {
    dashBoardCards: DashboardCardProps[]
    backGround?: string
}

const Dashboards = ({dashBoardCards, backGround}:DashboardProps) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const {data: dashboards} = useGetDashboardsQuery()

    return<div className={'flex justify-start gap-[20px]'}>
            <Modal content={'addDashBoard'} isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>
            {dashboards ? dashboards.map((dashBoard)=>(<DashboardCard key={dashBoard.id} name={dashBoard.name} backGround={dashBoard.backGround} slug={dashBoard.slug} id={dashBoard.id}/>)) : <NoDashboards isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>}
            <button className='cursor-pointer' onClick={setIsModalOpen}>
                <TaskAddIcon/>
            </button>
        </div>

};

export default Dashboards;