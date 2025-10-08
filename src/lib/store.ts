import {configureStore} from "@reduxjs/toolkit";
import {reducer} from "@dnd-kit/core/dist/store";
import ToDoReducer from "@/lib/reducers/ToDoSlice";
import toDoReducer from "@/lib/reducers/ToDoSlice";
import ToDoSlice from "@/lib/reducers/ToDoSlice";

export const store = configureStore({reducer: {
    toDoSlice: ToDoSlice
    }})