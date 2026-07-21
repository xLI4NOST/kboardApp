'use client'

import {Input} from "@/components/ui/input";
import {Priority} from "@/components/Priority/Priority";
import {Textarea} from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/lib/reducers/ToDoSlice";
import {useAddCardMutation, useAddDashboardMutation, useAddTaskMutation} from "@/lib/services/api";
import {toast} from "react-toastify";
import {useParams} from "next/navigation";
import React from "react";

interface IFormInput {
    title: string;
    description: string;
    priority: string; // или нужный тебе тип
    cardId: string;

}

interface iForm {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    content: 'addTask' | 'addCard' | 'addDashBoard'
}


export const Form = ({setIsOpen, content}: iForm) => {
    const dispatch = useDispatch()
    const selectedCard = useSelector((state: RootState) => state.toDoSlice.selectedCard)
    const [addTask] = useAddTaskMutation()
    const [addCard] = useAddCardMutation()
    const [addDashboard] = useAddDashboardMutation()

    const {slug} = useParams<{slug: string}>()

    const defaultValues = {
        title: "",
        description: "",
        priority: "",
        cardId: selectedCard
    }
    const {control, handleSubmit, register, formState: {errors}} = useForm<IFormInput>({
        defaultValues: defaultValues,
    })

    const handleAddTask = async (data: any) => {
        const newData = {
            ...data,
            slug: slug
        }
        try {
            const response = await addTask(newData).unwrap()
            toast.success(response.message)
        } catch (err: any) {
            toast.error(err.message)
        }
        setIsOpen((prevState) => !prevState)
    }

    const handleAddCard = async (data: any) => {
        try {
            const response = await addCard({name: data.title, dashboardId: slug}).unwrap()
            toast.success(response.message)

        }catch (e: any) {
            toast.error(e.message)
        }
        setIsOpen((prevState) => !prevState)
    }

    const handleAddDashboard = async (data: any) =>{

        try {
            const response = await addDashboard(data).unwrap()
            toast.success(response.message)
        }catch (e: any){
            toast.error(e.message)
        }
        setIsOpen((prevState) => !prevState)
    }
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {

        switch (content) {
            case 'addCard':
                await handleAddCard(data)
                break
            case 'addTask':
                await handleAddTask(data)
                break
            case 'addDashBoard':
                await handleAddDashboard(data)
                break
        }
    }

    return <form className='flex flex-col gap-[10px]' onSubmit={handleSubmit(onSubmit)}>
        <Controller
            render={({field}) => <Input {...register('title', {required: true})} {...field} type='text' name='title'/>}
            name={'title'}
            control={control}
        />
        {errors.title && <span className={'text-red-500'}>Поле обязательное</span>}
        {content === 'addTask' && <Controller
            render={({field}) => <Textarea {...field} name='description'/>}
            name={'description'}
            control={control}
        />}
        {content === 'addTask' &&
            <Controller
                render={({field}) => (<Priority {...register('priority', {required: true})} {...field}/>)}
                name={'priority'}
                control={control}
            />}
        {errors.priority && <span className={'text-red-500'}>Поле обязательное</span>}

        <Button className='cursor-pointer' type='submit' variant="outline">Добавить</Button>
    </form>
}