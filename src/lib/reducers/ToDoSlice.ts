import {createAction, createReducer, createSlice} from "@reduxjs/toolkit";
import {CardProps} from "@/components/Card/Card";
import {reducer} from "@dnd-kit/core/dist/store";
import {act} from "react";

const data: CardProps[] = [
    {
        title: "ToDoList",
        id: '30',
        data: [
            {title: 'firstTask', description: 'create tasks', id: '1', priority: 'critical', order: 0},
            {title: 'secondTask', description: 'add DND', id: '2', priority: 'high', order: 1},
            {title: 'thirdTask', description: 'addRtk', id: '3', priority: 'high', order: 2},
            {title: 'forthTask', description: 'addNewCards', id: '4', priority: 'low', order: 3},
            {title: 'fiveTask', description: 'addAllDndBut', id: '5', priority: 'medium', order: 4},
        ]
    },
    {
        title: "Design",
        id: '25',
        data: [
            {title: 'PAges', description: 'MakePages', id: '6', priority: 'critical', order: 0},
            {title: 'Route', description: 'CreateRoute', id: '7', priority: 'high', order: 1},
            {title: 'Redux', description: 'fixRedux', id: '8', priority: 'high', order: 2},
        ]
    },


]

const toDoSlice = createSlice({
    name: 'toDoSlice',
    initialState: {
        data: data
    },
    reducers: {
        addToDo(state, action) {
            console.log(action.payload)
        },
        changeOrder(state, action) {
            state.data[action.payload.index].data = action.payload.orderedArr;
        },
        deleteTodo(state, action) {
            state.data[action.payload.index].data = state.data[action.payload.index].data.filter(item => item.order !== action.payload.deletedItem)
        }
    }
})

export const {addToDo, changeOrder, deleteTodo} = toDoSlice.actions;
export default toDoSlice.reducer