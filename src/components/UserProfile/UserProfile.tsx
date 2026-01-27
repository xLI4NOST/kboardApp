'use client'

import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "@/app/api/authApi";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {authenticate} from "@/lib/reducers/UserSlice";


export default function UserProfile() {
    const userState = useSelector(state => state.userSlice)
    const router = useRouter()
    const dispatch = useDispatch()

    const userLogOut = async ()=>{
        try {
            await logoutUser()
            toast.success("User logged out successfully")
            dispatch(authenticate({}))
            router.push('/login')
        } catch (error) {
            toast.error(error.message)
        }
    }

    return userState.isAuthenticated && <div className="absolute z-1 right-30 top-10 flex flex-row gap-[15px] text-white">
        <p className='cursor-pointer'>{userState.email}</p>
        <button onClick={userLogOut} className='cursor-pointer'>Выйти</button>
    </div>
}