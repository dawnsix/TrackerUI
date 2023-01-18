
import { SECRET_API_KEY, SECRET_HOST_DOMAIN } from '$env/static/private'
import { redirect } from '@sveltejs/kit';
import { AWSGetDevices } from '$lib/client'
import { deviceDataStore } from '../../stores/deviceStore.js';

export const load = ({ locals }) => {
    
    if(!locals.session)
        throw redirect(303, '/')

    return {
        devices: locals.session ? AWSGetDevices() : JSON.stringify({})
    }
    
}