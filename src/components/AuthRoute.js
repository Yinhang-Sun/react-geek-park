// Encapsulate high-level components

import { getToken } from "@/utils"
import { Navigate } from "react-router-dom"

// Core logic: If there is a token, jump normally; if there is no token, log in
export function AuthRoute({ children }) {
    const token = getToken()
    if(token) {
        return <>{ children }</>
    } else {
        return <Navigate to={'/login'} replace />
    }
}