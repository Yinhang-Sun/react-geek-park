// user related api requests 

import { request } from "@/utils"

// 1. login request 
export function loginAPI (formData) {
    return request({
        url: '/authorizations', 
        method: 'POST', 
        data: formData
    })
}

// 2. get user profile
export function getProfileAPI (formData) {
    return request({
        url: '/user/profile', 
        method: 'GET'
    })
}