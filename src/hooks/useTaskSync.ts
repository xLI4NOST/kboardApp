import {useEffect, useState} from "react";
import {subscribeToWebSocket} from "@/app/webSocket/webSocket";
import {api} from "@/lib/services/api";
import {useDispatch} from "react-redux";

export function useTaskSync() {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = subscribeToWebSocket((message) => {
            console.log('message')
            switch (message.event) {
                case 'deleteTask':
                    dispatch(api.util.invalidateTags([
                        {type: 'Tasks', id: message.payload}
                    ]))
                    break
                case 'addTask':
                    dispatch(api.util.invalidateTags([
                        {type: 'Tasks', id: message.payload}
                    ]))
                    break
                case "changeOrder":
                    dispatch(api.util.invalidateTags([
                        {type: 'Tasks', id: message.payload}
                    ]))
                    break
                case "addCard":
                case "deleteCard":
                    dispatch(api.util.invalidateTags(['Cards']))
                    break
            }
        });

        return unsubscribe;
    }, []);
}