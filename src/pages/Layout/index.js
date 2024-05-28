// test if token is injected successfully or not 
import { request } from "@/utils"
import { useEffect } from "react"

const Layout = () => {
    useEffect(() => {
        request.get('/user/profile')
    }, [])
    return <div>this is Layout</div>
}

export default Layout