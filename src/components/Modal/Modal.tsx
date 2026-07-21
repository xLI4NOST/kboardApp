'use client'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Form} from "@/components/Form/Form";
import {CloseIcon} from "@/components/Modal/icons/CloseIcon";
import React from "react";
import {ModalContent} from "@/app/dashboard/[slug]/page";

export interface ModalProps {
    content: ModalContent;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Modal = ({isOpen, setIsOpen, content}: ModalProps) => {

    return isOpen && <Card className="fixed min-w-[300px] left-[50%] top-[35%] z-[3] translate-x-[-50%]">
        <CardHeader>
            <button className='cursor-pointer' onClick={(e)=>{
                e.stopPropagation();
                setIsOpen(false);
            }}>
                <CloseIcon/>
            </button>
            <CardTitle className="text-center">{content === 'addTask' ? 'Добавить задачу' : 'Добавить карточку'}</CardTitle>
        </CardHeader>
        <CardContent>
            <Form setIsOpen={setIsOpen} content={content}/>
        </CardContent>
    </Card>
}