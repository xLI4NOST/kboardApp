import {Input} from "@/components/ui/input";
import {Priority} from "@/components/Priority/Priority";
import {Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {Controller, SubmitHandler, useForm} from "react-hook-form";

interface IFormInput {
    text: string;
    taskDescription: string;
    Priority: Priority;
}



export const Form = ({handleAddTask: any}) => {
    // const {
    //     register,
    //     handleSubmit,
    //     watch,
    //     formState: { errors },
    // } = useForm<Inputs>()
    const { control, handleSubmit, watch } = useForm({
        defaultValues: {
            text: "",
            taskDescription: "",
            priority: {}
        },
    })
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data)
        handleAddTask(data)
    }



    return <form className='flex flex-col gap-[10px]' onSubmit={handleSubmit(onSubmit)}>
        <Controller
            render={({field})=>  <Input {...field} type='text' name='name'/>}
            name={'text'}
            control={control}
        />
        <Controller
            render={({field})=>  <Textarea {...field} name='taskDescription'/>}
            name={'taskDescription'}
            control={control}
        />

        <Controller
            render={({field})=> (<Priority {...field}/>)}
            name={'priority'}
            control={control}
        />


        {/*{errors.taskDescription && <span>This field is required</span>}*/}
        <Button className='cursor-pointer' type='submit' variant="outline">Добавить</Button>
    </form>
}