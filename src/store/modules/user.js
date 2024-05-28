// states related to user management 

import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
    name: "user", 
    // data state 
    initialState: {
        token: ''
    }, 
    // synchronous modification method 
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        }
    }
})

// deconstruct actionCreater 
const { setToken } = userStore.actions

// get reducer function 
const userReducer = userStore.reducer

export { setToken } 
export default userReducer

