'use client'

import {store} from "@/lib/store";
import {Provider, useDispatch} from "react-redux";
import React, {useEffect} from "react";
import {checkAuth} from "@/app/api/authApi";
import {toast} from "react-toastify";
import {authenticate} from "@/lib/reducers/UserSlice";
import {initSocket} from "@/app/webSocket/webSocket";

const AuthInit = ({children}: { children: React.ReactNode }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initAuth = async () => {
            // console.log("1. checkAuth");
            try {
                const res = await checkAuth()
                const email = res.data.email;

                await initSocket()

                dispatch(authenticate({email}))
            } catch (e) {
                toast.error(e.message)
            }
        }

        initAuth()

    }, [dispatch]);
    // useEffect(() => {
    //     initSocket(dispatch)
    // }, []);

    return <>{children}</>
}

export function Providers({children}: { children: React.ReactNode }) {

    return (
        <Provider store={store}>
            <AuthInit>
                {children}
            </AuthInit>
        </Provider>
    )
}