'use client'

import React from 'react';
import DashboardCard, {DashboardCardProps} from "@/components/DashboardCard/DashboardCard";
import NoDashboards from "@/components/NoDashboards/NoDashboards";
import {Modal} from "@/components/Modal/Modal";

export interface DashboardProps {
    dashBoardCards: DashboardCardProps[]
    backGround?: string
}

const Dashboards = ({dashBoardCards, backGround}:DashboardProps) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    console.log(isModalOpen);
    return<div>
        <Modal content={'addDashBoard'} isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>
        {dashBoardCards ? dashBoardCards.map((card)=>(<DashboardCard title={card.title} backGround={card.backGround}/>)) : <NoDashboards isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>}
        </div>

};

export default Dashboards;