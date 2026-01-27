import {configureStore} from "@reduxjs/toolkit";
import ToDoSlice from "@/lib/reducers/ToDoSlice";
import userSlice from "@/lib/reducers/UserSlice";
import {api} from "./services/api"

export const store = configureStore({
    reducer: {
        toDoSlice: ToDoSlice,
        userSlice: userSlice,
        [api.reducerPath]: api.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})