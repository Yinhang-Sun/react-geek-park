// article related API functions 

import { request } from "@/utils"

// 1. get channel list 
export function getChannelAPI () {
    return request({
        url: '/channels', 
        method: 'GET'
    })
}