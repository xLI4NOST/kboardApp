import {JSX} from "react";
        import {RegisterOptions, UseFormRegister} from "react-hook-form";

export interface InputProps {
    type: 'email' | 'password' | 'confirmPassword';
    id: string;
    register?: UseFormRegister<any>
    error? : string | null
    validation? : RegisterOptions
}

export default function Input ({type, id, register, error, validation}: InputProps): JSX.Element {

    return<label htmlFor={id} className="relative">
        <p className={"font-lora"}>{id}</p>
        <input className={'bg-[#F8F1FF] w-full h-[40px] rounded-md'} id={id} type={type} {...(register && register(id, validation))}/>
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </label>
}