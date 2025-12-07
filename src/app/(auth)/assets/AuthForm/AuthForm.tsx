'use client'

import Input from "@/app/(auth)/assets/Input/Input";
import {useForm, SubmitHandler} from "react-hook-form"
import {useRouter} from "next/navigation";
import {loginUser, registerUser} from "@/app/api/authApi";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import Link from "next/link";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {authenticate} from "@/lib/reducers/UserSlice";


interface formData {
    email: string;
    password: string;
    confirmPassword: string;
}

interface AuthFormProps {
    type: 'register' | 'login',
}

export default function AuthForm({type}: AuthFormProps) {

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isValid},
    } = useForm<formData>();

    const isRegister = type === 'register' ? 'Регистрация' : 'Вход'
    const router = useRouter()
    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<formData> = async (data) => {
        const {confirmPassword, ...submitData} = data

        try {
            if (type === 'login') {
                const result = await loginUser(submitData)
                toast.success("Вы успешно вошли")
                const email = result.data.email
                dispatch(authenticate({email}))
                router.push('/dashboard')
            } else {
                const result = await registerUser(submitData)
                toast.success("Вы успешно зарегистрировались")
                const email = result.data.email
                dispatch(authenticate({email}))
                router.push('/dashboard')
            }

        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Ошибка входа")
            } else {
                console.log(error)
                toast.error("Неизвестная ошибка")
            }
        }
    }


    return <div className={"rounded-xl bg-white px-[60px] py-[80px] flex flex-col items-center gap-[45px]"}>
        <div className={"flex flex-row gap-[30px] self-start"}>
            <h2>{isRegister}</h2>
        </div>
        <form noValidate onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-10"}>
            <Input
                id={'email'}
                type={'email'}
                register={register}
                error={errors.email ? errors.email.message : null}
                validation={{
                    required: {
                        value: true,
                        message: 'Поле обязательное',
                    },
                    minLength: {
                        value: 4,
                        message: 'Минимальная длинна 4 символа'
                    },
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Введите корректный email"
                    }
                }}
            />
            <Input
                id={'password'}
                type={'password'}
                register={register}
                error={errors.password ? errors.password.message : null}
                validation={{
                    required: {
                        value: true,
                        message: 'Поле обязательное'
                    },
                    minLength: {
                        value: 6,
                        message: 'Минимальная длинна 6 символов'
                    }
                }}
            />
            {type === 'register' && <Input
                id={'confirmPassword'}
                type={'password'}
                register={register}
                error={errors.confirmPassword ? errors.confirmPassword.message : null}
                validation={{
                    required: {
                        value: true,
                        message: 'Подтвердите пароль'
                    },
                    validate: (value: string) =>
                        value === watch('password') || "Пароли не совпадают"
                }}
            />}
            <button
                type="submit"
                className={`rounded-xl ${isValid ? 'cursor-pointer' : ''} bg-[#985ACE] px-[64px] py-[12px] text-white`}
            >
                {isRegister}
            </button>

            {type === "login" ?
                <Link className={"text-blue-600"} href={'/register'}>Нет Аккаунта? Зарегистрируйся</Link> :
                <Link className={"text-blue-600"} href={'/login'}>Уже есть аккаунт? Войди</Link>}
        </form>
    </div>
}