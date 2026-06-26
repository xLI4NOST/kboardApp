import React from 'react';

export interface DashboardCardProps {
    title: string;
    backGround?: 'string';

}

const DashboardCard = ({title, backGround}: DashboardCardProps) => {
    return (
        <div className="w-[300px] h-[200px]">
            <h2>{title}</h2>
        </div>
    );
};

export default DashboardCard;