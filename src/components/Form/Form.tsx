import {Input} from "@/components/ui/input";
import {Priority} from "@/components/Priority/Priority";
import {Textarea} from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {addToDo} from "@/lib/reducers/ToDoSlice";
import {register} from "node:module";
import {useAddTaskMutation} from "@/lib/services/api";
import {toast} from "react-toastify";

interface IFormInput {
    text: string;
    taskDescription: string;
    Priority: Priority;
}


export const Form = ({setIsOpen}) => {
    const dispatch = useDispatch()
    const selectedCard = useSelector(state => state.toDoSlice.selectedCard)
    const [addTask] = useAddTaskMutation()
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
        console.log(data)
        try {
            const response = await addTask(data).unwrap()
            toast.success(response.message)
        } catch (err) {
            toast.error(err.message)
        }
        setIsOpen((prevState) => !prevState)
    }
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        await handleAddTask(data)
    }

    return <form className='flex flex-col gap-[10px]' onSubmit={handleSubmit(onSubmit)}>
        <Controller
            render={({field}) => <Input {...register('title', {required: true})} {...field} type='text' name='title'/>}
            name={'title'}
            control={control}
        />
        {errors.title && <span className={'text-red-500'}>Поле обязательное</span>}

        <Controller
            render={({field}) => <Textarea {...field} name='description'/>}
            name={'description'}
            control={control}
        />

        <Controller
            render={({field}) => (<Priority {...register('priority', {required: true})} {...field}/>)}
            name={'priority'}
            control={control}
        />
        {errors.priority && <span className={'text-red-500'}>Поле обязательное</span>}

        <Button className='cursor-pointer' type='submit' variant="outline">Добавить</Button>
    </form>
}