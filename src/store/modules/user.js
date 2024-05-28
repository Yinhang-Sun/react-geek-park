// states related to user management 

import { createSlice } from "@reduxjs/toolkit";
import { removeToken, request } from "@/utils"
import { setToken as _setToken, getToken } from "@/utils";

const userStore = createSlice({
    name: "user", 
    // data state 
    initialState: {
        token: getToken() || '', 
        userInfo: {}
    }, 
    // synchronous modification method 
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            // store token in localstorage 
            _setToken(action.payload) 
        }, 
        setUserInfo(state, action) {
            state.userInfo = action.payload
        }, 
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }
})

// deconstruct actionCreater 
const { setToken, setUserInfo, clearUserInfo } = userStore.actions

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

// Asychronous method for getting user info 
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await request.get('/user/profile')
        dispatch(setUserInfo(res.data))
    }
}

export { fetchLogin, fetchUserInfo, setToken, clearUserInfo } 


export default userReducer

