import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {sendWebSocketMessage} from "@/app/webSocket/webSocket";
import {MutationLifecycleApi} from "@reduxjs/toolkit/src/query/core";

export const api = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/',
        credentials: 'include',
    }),
    tagTypes: ['Tasks'],

    endpoints: (builder) => ({
        getCards: builder.query<any[], void>({
            query: () => 'card/cards',
        }),
        getTaskByCardId: builder.query<any[], void>({
            query: (cardId: number) => `task/${cardId}/tasks`,
            providesTags: (result, error, cardId) => [{type: 'Tasks', id: cardId}],
        }),
        addTask: builder.mutation<void>({
            query: (newTask) => ({
                url: 'task/add',
                method: 'POST',
                body: newTask,
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Tasks', id: arg.cardId}
            ],
            onQueryStarted: async (params, {queryFulfilled}) => {
                try {
                    await queryFulfilled

                    sendWebSocketMessage('addTask', params.cardId);
                }catch(error) {
                    console.log('error', error);
                }
            }
        }),
        deleteTask: builder.mutation<void>({
            query: (params) => ({
                url: `task/deleteTask/${params.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Tasks', id: arg.cardId}],
            onQueryStarted: async (params,{queryFulfilled}) => {
                try {
                    await queryFulfilled

                    sendWebSocketMessage('deleteTask', params.cardId);
                }catch (error){
                    console.log('error', error);
                }
            },
        }),
        changeOrderTask: builder.mutation<void>({
            query: ({newArr, cardId}) => ({
                url: `task/changeOrderTasks/`,
                method: 'PATCH',
                body: newArr
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Tasks', id: arg.cardId}],
          onQueryStarted: async (params,{queryFulfilled}) => {
                try {
                    await queryFulfilled
                    console.log(params)
                    sendWebSocketMessage('changeOrder', params.id)
                }catch (error){
                    console.log('error', error);
                }
          }
        })
    }),
});

export const {
    useGetCardsQuery,
    useGetTaskByCardIdQuery,
    useAddTaskMutation,
    useDeleteTaskMutation,
    useChangeOrderTaskMutation,
} = api;
