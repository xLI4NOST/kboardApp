import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {sendWebSocketMessage} from "@/app/webSocket/webSocket";
import {MutationLifecycleApi, QueryLifecycleApi} from "@reduxjs/toolkit/src/query/core";

export const api = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/',
        credentials: 'include',
    }),
    tagTypes: ['Dashboards','Tasks', 'Cards'],

    endpoints: (builder) => ({
        getDashboards: builder.query<any[], void>({
            query: ()=> 'dashboard/dashboards',
            providesTags:['Dashboards'],
        }),
        addDashboard: builder.mutation<void>({
            query: (name)=>({
                url: '/dashboard/createDashboard',
                method: 'POST',
                body: name
            }),
            invalidatesTags:['Dashboards'],
        }),
        getCards: builder.query<any[], number>({
            query: (dashboardId) => `card/${dashboardId}/cards`,
            providesTags: ['Cards'],
        }),
        addCard: builder.mutation<any[], void>({
            query: ({name, dashboardId}) => ({
                url: `card/addCard`,
                method: 'POST',
                body: {
                    title: name,
                    dashboardId: dashboardId,
                }
            }),
            invalidatesTags: ['Cards'],
            onQueryStarted: async (params, {queryFulfilled}): Promise<void> | void => {
                try {
                    await queryFulfilled
                    sendWebSocketMessage('addCard')
                } catch (error) {
                    console.log('error', error);
                }
            }
        }),
        deleteCard: builder.mutation<any[], void>({
            query: (id) => ({
                url: `card/deleteCard/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cards'],
            onQueryStarted: async (queryArgument, {queryFulfilled}) => {
                try {
                    await queryFulfilled

                    sendWebSocketMessage('deleteCard')
                } catch (error) {
                    console.log('error', error);
                }
            }
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
                } catch (error) {
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
            onQueryStarted: async (params, {queryFulfilled}) => {
                try {
                    await queryFulfilled

                    sendWebSocketMessage('deleteTask', params.cardId);
                } catch (error) {
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
            onQueryStarted: async (params, {queryFulfilled}) => {
                try {
                    await queryFulfilled

                    sendWebSocketMessage('changeOrder', params.id)
                } catch (error) {
                    console.log('error', error);
                }
            }
        })
    }),
});

export const {
    useAddDashboardMutation,
    useGetDashboardsQuery,
    useGetCardsQuery,
    useGetTaskByCardIdQuery,
    useAddCardMutation,
    useDeleteCardMutation,
    useAddTaskMutation,
    useDeleteTaskMutation,
    useChangeOrderTaskMutation,
} = api;
