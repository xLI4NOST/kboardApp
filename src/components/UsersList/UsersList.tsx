'use client'

import React from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useGetOnlineUsersQuery} from "@/lib/services/api";

interface UserListProps {
    users?:{
        id:string,
        email:string,
    }[]
}

const UsersList = ({users}: UserListProps) => {

    return <Select>
        <SelectTrigger className="w-[210px] !text-green-300">
            <SelectValue className={'text-red'}  placeholder="Пользователи онлайн" />
        </SelectTrigger>
        <SelectContent>
            {users && users.map(user => (
                <SelectItem key={user.id} value={user.email} disabled={true} >
                    <p>{user.email}</p>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M3 8V5H21V19H14M3 15C5.20914 15 7 16.7909 7 19M3 11C7.41828 11 11 14.5817 11 19M3 18.99V19"
                                stroke="#000000" strokeWidth="1.5" strokeLinecap="round"
                                strokeLinejoin="round"></path>
                        </g>
                    </svg>
                </SelectItem>
            ))}
        </SelectContent>

    </Select>
};

export default UsersList;