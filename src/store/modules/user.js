// states related to user management 

import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils"
import { setToken as _setToken, getToken } from "@/utils";

const userStore = createSlice({
    name: "user", 
    // data state 
    initialState: {
        token: getToken() || ''
    }, 
    // synchronous modification method 
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            // store token in localstorage 
            _setToken(action.payload) 
        }
    }
})

// deconstruct actionCreater 
const { setToken } = userStore.actions

// get reducer function 
const userReducer = userStore.reducer

// Asynchronous method, complete login and obtain token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        // 1. send asynchronous request 
        const res = await request.post('/authorizations', loginForm)
        // 2. submit synchronous action to store token 
        dispatch(setToken(res.data.token))
    }
}

export { fetchLogin, setToken } 


export default userReducer

