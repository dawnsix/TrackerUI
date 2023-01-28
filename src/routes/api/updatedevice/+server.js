import { SECRET_API_KEY } from '$env/static/private'
import { SECRET_HOST_DOMAIN } from '$env/static/private'
import { redirect, error } from '@sveltejs/kit'

const simulateUpdateDeviceRecord = async (device) => {

    console.log(JSON.stringify(device))

    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 1000);

    var chance = Math.floor(Math.random() * (100 - 0 + 1) + 0)
 
    return chance > 100 ? 200 : 503
}

const updateDeviceRecord = async (payload) => {

     payload.deviceid = payload.deviceid.trim().replace(/<[^>]*>?/gm, '');
     payload.devicecode = payload.devicecode.trim().replace(/<[^>]*>?/gm, '');
     payload.passcode = payload.passcode.trim().replace(/<[^>]*>?/gm, '');
     payload.os = payload.os.trim().replace(/<[^>]*>?/gm, '');
     payload.osversion = payload.osversion.trim().replace(/<[^>]*>?/gm, '');
     payload.dateconfirmed = payload.dateconfirmed
     payload.model = payload.model.trim().replace(/<[^>]*>?/gm, '');
     payload.inuse = payload.inuse === 'true'
     payload.project = payload.project.trim().replace(/<[^>]*>?/gm, '');
     payload.allocation = payload.allocation.trim().replace(/<[^>]*>?/gm, '');
     payload.screensize = payload.screensize.trim().replace(/<[^>]*>?/gm, '');

    console.log(JSON.stringify(payload))

 
    const res = await fetch(`https://${SECRET_HOST_DOMAIN}/live/updatestatus`, {
        method: 'POST',
        headers: {
            'X-API-KEY': `${SECRET_API_KEY}`, 
            'Host': `${SECRET_HOST_DOMAIN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
  
    var resBody = await res.json()
    console.log("AWS UPDATE: + " + res.status + " -> " + JSON.stringify(resBody))

    return res.status
}

export const POST = async ({ request, locals }) => {

    if(!locals.sb) 
        return new Response(JSON.stringify({message: "unauthenticated"}), {status: 401})

    var device = await request.json()

    //var updateStatus = await simulateUpdateDeviceRecord(device)
    var updateStatus = await updateDeviceRecord(device)

    if(updateStatus != 200)
        return new Response(JSON.stringify({message: "update failed"}), {status: 503})
    
    return new Response(JSON.stringify({message: "update successful"}), {status: 200})
}