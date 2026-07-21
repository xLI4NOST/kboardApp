import {useEffect, useState} from "react";
import {subscribeToWebSocket} from "@/app/webSocket/webSocket";
import {api} from "@/lib/services/api";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";

export function useTaskSync(slug: string) {
    const dispatch: any = useDispatch();

    useEffect(() => {
        const unsubscribe = subscribeToWebSocket((message) => {

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
                case "users":
                    console.log(message)
                    toast.success('Пользователь подключился')
                    dispatch(api.util.updateQueryData(
                        'getOnlineUsers',
                        slug,
                        draft => {
                            draft.splice(0, draft.length, ...message.payload);
                        }
                    ))
                    break
                case "userOut":
                    toast.error('Пользователь отключился')
                    dispatch(api.util.updateQueryData(
                        'getOnlineUsers',
                        slug,
                        draft => {
                            draft.splice(0, draft.length, ...message.payload);
                        }
                    ))
                    break
                case "mouseMove":
                    dispatch(api.util.updateQueryData('getCursorData', slug, (draft) => {
                        draft[message.userId] ={
                            userId: message.userId,
                            email: message.email,
                            x: message.payload.x,
                            y: message.payload.y,
                        }
                    }))
                    break
            }
        });

        return unsubscribe;
    }, [dispatch, slug]);
}