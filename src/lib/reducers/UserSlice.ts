import {createSlice} from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "UserSlice",
    initialState: {
        email: '',
        isAuthenticated: false,
    },
    reducers:{
        authenticate: (state, action) => {
            if(action.payload.email) {
                state.email = action.payload.email;
                state.isAuthenticated = true;
            }else{
                state.email = '';
                state.isAuthenticated = false;
            }
        },
    }

})

export const {authenticate}=UserSlice.actions;
export default UserSlice.reducer;