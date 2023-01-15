
import { SECRET_API_KEY, SECRET_HOST_DOMAIN } from '$env/static/private'
import { deviceDataStore } from '../../stores/deviceStore.js';

export const load = ({ locals }) => {

    const fetchDevices = async () => {

        // once you get auth working between app and API, try move this to onmount and run on client
 
        const res = await fetch(`https://${SECRET_HOST_DOMAIN}/live/getdevices`, {
            headers: {'X-API-KEY': `${SECRET_API_KEY}`}
        })

        const data = await res.json()    
        return data.body
    }
    
    console.log("from /devicemanager server processing: session is..." + locals.session)

    return {
        devices: locals.session ? fetchDevices() : "{}"
    }
}