import {createAction, createReducer, createSlice} from "@reduxjs/toolkit";
import {CardProps} from "@/components/Card/Card";


const data: CardProps[] = [
    {
        title: "ToDoList",
        id: '30',
        data: [
            {title: 'firstTask', description: 'create tasks', id: '1', priority: 'critical', order: 0},
            {title: 'secondTask', description: 'add DND', id: '2', priority: 'high', order: 1},
            {title: 'thirdTask', description: 'addRtk', id: '3', priority: 'high', order: 2},
            {title: 'forthTask', description: 'addNewCards', id: '99', priority: 'low', order: 3},
            {title: 'fiveTask', description: 'addAllDndBut', id: '51', priority: 'medium', order: 4},
        ]
    },
    {
        title: "Design",
        id: '25',
        data: [
            {title: 'PAges', description: 'MakePages', id: '98', priority: 'critical', order: 0},
            {title: 'Route', description: 'CreateRoute', id: '56', priority: 'high', order: 1},
            {title: 'Redux', description: 'fixRedux', id: '23', priority: 'high', order: 2},
        ]
    },


]

const toDoSlice = createSlice({
    name: 'toDoSlice',
    initialState: {
        data: data,
        selectedCard: '',
    },
    reducers: {
        addToDo(state, action) {
            // const newArr = [...state.data[state.selectedCard], action.payload];
            const card = state.data[state.selectedCard].data;
            const newItem = action.payload.data;
            newItem.id = card.length;
            newItem.order = card.length;
            const newArr = [...card, newItem];
            state.data[state.selectedCard].data = newArr;
            console.log(newItem)
        },
        changeOrder(state, action) {
            state.data[action.payload.index].data = action.payload.orderedArr;
        },
        deleteTodo(state, action) {
            state.data[action.payload.index].data = state.data[action.payload.index].data.filter(item => item.order !== action.payload.deletedItem)
        },
        setSelectedCard(state, action) {
            state.selectedCard = action.payload.index;
        }
    }
})

export const {addToDo, changeOrder, deleteTodo, setSelectedCard} = toDoSlice.actions;
export default toDoSlice.reducer