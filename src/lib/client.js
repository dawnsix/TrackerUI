import { VITE_API_KEY } from '$env/static/private'
import { VITE_HOST_DOMAIN } from '$env/static/private'

export const AWSGetDevices = async () => {
 
    const res = await fetch(`https://${VITE_HOST_DOMAIN}/live/getdevices`, {
        headers: {'X-API-KEY': `${VITE_API_KEY}`}
    })

    const data = await res.json()          
    return data.body
}