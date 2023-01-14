import { VITE_API_KEY } from '$env/static/private'
import { VITE_HOST_DOMAIN } from '$env/static/private'
import { redirect } from '@sveltejs/kit'

const updateDeviceRecord = async () => {
 
    const res = await fetch(`https://${VITE_HOST_DOMAIN}/live/getdevices`, {
        headers: {'X-API-KEY': `${VITE_API_KEY}`}
    })

    const data = await res.json()    
    return data.body
}

export const POST = async ({ request, locals }) => {
    request.json().then(data => ("POST API: " + console.log(data)))

    return new Response("{message: \"received\"}", {status: 200})
}