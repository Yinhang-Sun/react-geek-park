// article related API functions 

import { request } from "@/utils"

// 1. get channel list 
export function getChannelAPI() {
    return request({
        url: '/channels',
        method: 'GET'
    })
}

// 2. submit article form list 
export function createArticleAPI(data) {
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data
    })
}

// 3. get article list 
export function getArticleListAPI(params) {
    return request({
        url: '/mp/articles',
        method: 'GET',
        params
    })
}

// 4. delete article 
export function delArticleAPI(id) {
    return request({
        url: `/mp/articles/${id}`, 
        method: 'DELETE'
    })
}