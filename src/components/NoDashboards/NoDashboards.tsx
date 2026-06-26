import React from 'react';
import {Button} from "@/components/ui/button";

const NoDashboards = ({isOpen, setIsOpen}) => {
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