// Encapsulate logic for getting channel list 
import { useState, useEffect } from "react"
import { getChannelAPI } from '@/apis/article'

function useChannel() {
    // 1. Get all the logic of the channel list
    // GET channel list 
    const [channelList, setChannelList] = useState([])

    useEffect(() => {
        // 1. Encapsulate function, and call api in the function body 
        const getChannelList = async () => {
            const res = await getChannelAPI()
            setChannelList(res.data.channels)
        }
        // 2. call the function 
        getChannelList()
    }, [])

    // 2. Return the data to be used in the component
    return {
        channelList
    }
}

export { useChannel }