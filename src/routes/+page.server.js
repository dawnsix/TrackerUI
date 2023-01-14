
import { VITE_API_KEY, VITE_HOST_DOMAIN } from '$env/static/private'
import { deviceDataStore } from '../stores/deviceStore.js';

export const load = () => {

    const fetchDevices = async () => {

        // once you get auth working between app and API, try move this to onmount and run on client
 
        const res = await fetch(`https://${VITE_HOST_DOMAIN}/live/getdevices`, {
            headers: {'X-API-KEY': `${VITE_API_KEY}`}
        })

        const data = await res.json()    
        return data.body
    }
    
    return {
        devices: fetchDevices()
    }
}