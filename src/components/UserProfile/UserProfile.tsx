'use client'

import {useSelector} from "react-redux";

export default function UserProfile() {
    const userState = useSelector(state => state.userSlice)

    return userState.isAuthenticated && <div className="absolute z-1 right-30 top-10 flex flex-row gap-[15px] text-white">
        <p className='cursor-pointer'>{userState.email}</p>
        <button className='cursor-pointer'>Выйти</button>
    </div>
}