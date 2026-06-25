import {useEffect, useState} from "react";
import {subscribeToWebSocket} from "@/app/webSocket/webSocket";
import {api} from "@/lib/services/api";
import {useDispatch} from "react-redux";

export function useTaskSync() {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = subscribeToWebSocket((message) => {
            // console.log('Sync received:', message);
            console.log('message', message)
            switch (message.event) {
                case 'deleteTask':
                    console.log('deleted')
                    dispatch( api.util.invalidateTags([
                        { type: 'Tasks', id: message.payload }
                    ]))
                    break
                case 'addTask':
                    console.log(message)
                    dispatch( api.util.invalidateTags([
                        { type: 'Tasks', id: message.payload }
                    ]))
                    break
                case "changeOrder":
                    dispatch( api.util.invalidateTags([
                        { type: 'Tasks', id: message.payload }
                    ]))
                    break
            }
        });

        return unsubscribe;
    }, []);
}