'use client'

import {Input} from "@/components/ui/input";
import {Priority} from "@/components/Priority/Priority";
import {Textarea} from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {addToDo} from "@/lib/reducers/ToDoSlice";
import {register} from "node:module";
import {useAddCardMutation, useAddTaskMutation} from "@/lib/services/api";
import {toast} from "react-toastify";

interface IFormInput {
    text: string;
    taskDescription: string;
    Priority: Priority;
}

interface iForm {
    setIsOpen: () => void
    content: 'addTask' | 'addCard' | 'addDashBoard'
}


export const Form = ({setIsOpen, content}: iForm) => {
    const dispatch = useDispatch()
    const selectedCard = useSelector(state => state.toDoSlice.selectedCard)
    const [addTask] = useAddTaskMutation()
    const [addCard] = useAddCardMutation()
    const defaultValues = {
        title: "",
        description: "",
        priority: {},
        cardId: selectedCard
    }
    const {control, handleSubmit, register, formState: {errors}} = useForm({
        defaultValues: defaultValues,
    })

    const handleAddTask = async (data) => {
        try {
            const response = await addTask(data).unwrap()
            toast.success(response.message)
        } catch (err) {
            toast.error(err.message)
        }
        setIsOpen((prevState) => !prevState)
    }

    const handleAddCard = async (data) => {
        try {
            const response = await addCard(data).unwrap()
            toast.success(response.message)

        }catch (e) {
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