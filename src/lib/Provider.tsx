'use client'

import {store} from "@/lib/store";
import {Provider, useDispatch} from "react-redux";
import React, {useEffect} from "react";
import {checkAuth} from "@/app/api/authApi";
import {toast} from "react-toastify";
import {authenticate} from "@/lib/reducers/UserSlice";

const AuthInit = ({children}: { children: React.ReactNode }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initAuth = async () => {
            try {
                const res = await checkAuth()
                const email = res.data.email;

                dispatch(authenticate({email}))
            } catch (e) {
                toast.error(e.message)
            }
        }

        initAuth()

    }, [dispatch]);

    return <>{children}</>
}

export function Providers({children}: { children: React.ReactNode }) {


    // useEffect(() => {
    //     const isLogin = checkAuth()
    //     .then((res) => {
    //         const dispatch = useDispatch();
    //         const email = res.data.email
    //         console.log(res.data.email)
    //         dispatch(authenticate({email}));
    //     })
    //     .catch((err) => toast.error(err));
    //
    // }, []);

    return (
        <Provider store={store}>
            <AuthInit>
                {children}
            </AuthInit>
        </Provider>
    )
}