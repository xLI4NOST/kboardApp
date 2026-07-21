import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {sendWebSocketMessage} from "@/app/webSocket/webSocket";

export const api = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/',
        credentials: 'include',
    }),
    tagTypes: ['Dashboards','Tasks', 'Cards'],

    endpoints: (builder) => ({
        getOnlineUsers: builder.query<any[], string>({
            queryFn:()=>({
                data: []
            })
        }),
        getCursorData: builder.query<any[], string>({
            queryFn:()=>({
                data: {}
            })
        }),
        getDashboards: builder.query<any[], void>({
            query: ()=> 'dashboard/dashboards',
            providesTags:['Dashboards'],
        }),
        addDashboard: builder.mutation<{message: string}, string>({
            query: (name)=>({
                url: '/dashboard/createDashboard',
                method: 'POST',
                body: name
            }),
            invalidatesTags:['Dashboards'],
        }),
        getCards: builder.query<any[], string>({
            query: (dashboardId) => `card/${dashboardId}/cards`,
            providesTags: ['Cards'],
        }),
        addCard: builder.mutation<{message: string}, {name: string, dashboardId: string}>({
            query: ({name, dashboardId}) => ({
                url: `card/addCard`,
                method: 'POST',
                body: {
                    title: name,
                    dashboardId: dashboardId,
                }
            }),
            invalidatesTags: ['Cards'],
            onQueryStarted: async (params, {queryFulfilled}): Promise<void> => {
                try {
                    await queryFulfilled
                    sendWebSocketMessage('addCard')
                } catch (error: any) {
                    console.log('error', error);
                }
            }
        }),
        deleteCard: builder.mutation<{ message: string }, number>({
            query: (id) => ({
                url: `card/deleteCard/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cards'],
            onQueryStarted: async (queryArgument, {queryFulfilled}) => {
                try {
                    await queryFulfilled

                    sendWebSocketMessage('deleteCard')
                } catch (error: any) {
                    console.log('error', error);
                }
            }
        }),
        getTaskByCardId: builder.query<any[], number>({
            query: (cardId: number) => `task/${cardId}/tasks`,
            providesTags: (result, error, cardId) => [{type: 'Tasks', id: cardId}],
        }),
        addTask: builder.mutation<{message: string}, any>({
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
        deleteTask: builder.mutation<{message: string}, {id: number; cardId: number}>({
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
        changeOrderTask: builder.mutation<{message: string}, { newArr: any[]; id: number }>({
            // @ts-ignore
            query: ({newArr, cardId}) => ({
                url: `task/changeOrderTasks/`,
                method: 'PATCH',
                body: newArr
            }),
            // @ts-ignore
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
    useGetOnlineUsersQuery,
    useGetCursorDataQuery,
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
