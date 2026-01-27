import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

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
            invalidatesTags: (result, error, arg) => [{type: 'Tasks', id: arg.cardId}],
        }),
        deleteTask: builder.mutation<void>({
            query: (params) => ({
                url: `task/deleteTask/${params.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Tasks', id: arg.cardId}],
        })
    }),
});

export const {
    useGetCardsQuery,
    useGetTaskByCardIdQuery,
    useAddTaskMutation,
    useDeleteTaskMutation,
} = api;
