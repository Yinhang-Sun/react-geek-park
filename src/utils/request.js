// axios encapsulation 
import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router";

// 1. Root domain name configuration
// 2. Timeout period
// 3. Request interceptor / response interceptor

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

//Add request interceptor
//Before sending the request, 
//intercept and insert some custom configuration (parameter processing)
request.interceptors.request.use((config) => {
  // operate config to inject token 
  // 1. get token 
  // 2. Token splicing according to the backend format requirements
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

//Add response interceptor
//Before the response is returned to the client, 
//intercept it and focus on processing the returned data.
request.interceptors.response.use((response) => {
  // Status codes within the 2xx range will trigger this function.
  //Do something with the response data
  return response.data
}, (error) => {
  // Status codes outside the 2xx range will trigger this function.
  // Do something with the response error
  // Monitor 401 token expiration
  console.dir(error)
  if(error.response.status === 401) {
    removeToken()
    router.navigate('/login')
    window.location.reload()
  }
  return Promise.reject(error)
})

export { request }

