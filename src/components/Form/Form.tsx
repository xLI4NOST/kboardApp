import {Input} from "@/components/ui/input";
import {Priority} from "@/components/Priority/Priority";
import {Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {addToDo} from "@/lib/reducers/ToDoSlice";
import {register} from "node:module";

interface IFormInput {
    text: string;
    taskDescription: string;
    Priority: Priority;
}



export const Form = ({setIsOpen}) => {
    const dispatch = useDispatch()
    const defaultValues ={
        title: "",
        description: "",
        priority: {}
    }

    const { control, handleSubmit, register, formState:{errors} } = useForm({
        defaultValues: defaultValues,
    })

    const handleAddTask = (data) =>{
        console.log(data)
        dispatch(addToDo({data}))
    }
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        handleAddTask(data)
        setIsOpen((prevState) => !prevState)
    }

    return <form className='flex flex-col gap-[10px]' onSubmit={handleSubmit(onSubmit)}>
        <Controller
            render={({field})=>  <Input {...register('title', {required: true})}  {...field} type='text' name='title'/>}
            name={'title'}
            control={control}
        />
        {errors.title && <span className={'text-red-500'}>Поле обязательное</span>}

        <Controller
            render={({field})=>  <Textarea {...field} name='description'/>}
            name={'description'}
            control={control}
        />

        <Controller
            render={({field})=> (<Priority {...register('priority', {required: true})} {...field}/>)}
            name={'priority'}
            control={control}
        />
        {errors.priority && <span className={'text-red-500'}>Поле обязательное</span>}

        <Button className='cursor-pointer' type='submit' variant="outline">Добавить</Button>
    </form>
}