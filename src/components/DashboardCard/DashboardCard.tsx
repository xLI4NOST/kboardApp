import React from 'react';
import Link from "next/link";

export interface DashboardCardProps {
    name: string;
    backGround?: 'string';
    id: number;
    slug: string

}

const DashboardCard = ({name, backGround, id, slug}: DashboardCardProps) => {
    return (
        <Link href={{
            pathname: `/dashboard/${slug}`,
            query:{
                name
            }
        }}>
            <div className="w-[300px] h-[200px] bg-white rounded-sm flex items-center justify-center cursor-pointer"
                 key={name}>
                <h2>{name}</h2>
            </div>
        </Link>
    );
};

export default DashboardCard;