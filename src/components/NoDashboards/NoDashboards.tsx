import React from 'react';
import {Button} from "@/components/ui/button";

interface NoDashboardsProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NoDashboards = ({setIsOpen}:NoDashboardsProps) => {
    return (
        <div className="w-full h-full flex flex-col items-center gap-[30px]">
            <h2 className='text-white'>Дашбордов пока нет</h2>
            <Button
                className={'cursor-pointer'}
                variant={'default'}
                onClick={()=>setIsOpen(prevState => !prevState)}
            >
                Добавить
            </Button>
        </div>
    );
};

export default NoDashboards;