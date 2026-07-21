import {createAction, createReducer, createSlice} from "@reduxjs/toolkit";
import {CardProps} from "@/components/Card/Card";
import {store} from "@/lib/store";


// const data: CardProps[] = [
//     {
//         title: "ToDoList",
//         id: '30',
//         data: [
//             {title: 'firstTask', description: 'create tasks', id: '1', priority: 'critical', order: 0},
//             {title: 'secondTask', description: 'add DND', id: '2', priority: 'high', order: 1},
//             {title: 'thirdTask', description: 'addRtk', id: '3', priority: 'high', order: 2},
//             {title: 'forthTask', description: 'addNewCards', id: '99', priority: 'low', order: 3},
//             {title: 'fiveTask', description: 'addAllDndBut', id: '51', priority: 'medium', order: 4},
//         ]
//     },
//     {
//         title: "Design",
//         id: '25',
//         data: [
//             {title: 'PAges', description: 'MakePages', id: '98', priority: 'critical', order: 0},
//             {title: 'Route', description: 'CreateRoute', id: '56', priority: 'high', order: 1},
//             {title: 'Redux', description: 'fixRedux', id: '23', priority: 'high', order: 2},
//         ]
//     },
//
//
// ]

const toDoSlice = createSlice({
    name: 'toDoSlice',
    initialState: {
        data: [],
        selectedCard: '',
    },
    reducers: {
        setSelectedCard(state, action) {
            state.selectedCard = action.payload.index;
        }
    }
})

export const {setSelectedCard} = toDoSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export default toDoSlice.reducer