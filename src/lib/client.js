import { SECRET_HOST_DOMAIN, SECRET_API_KEY } from '$env/static/private'

export const AWSGetDevices = async () => {
    const res = await fetch(`https://${SECRET_HOST_DOMAIN}/live/getdevices`, {
        headers: {'X-API-KEY': `${SECRET_API_KEY}`}
    })

    const data = await res.json()
    const items = data.body.Items

    var mapped = items.map(device => ({ 
        allocation: device.Allocation,
        allocationid: device.AllocationID,
        dateconfirmed: device.DateConfirmed,
        devicecode: device.DeviceCode,
        deviceid: device.DeviceID,
        inuse: device.InUse,
        model: device.Model,
        os: device.OS,
        osversion: device.OSVersion,
        passcode: device.Passcode,
        project: device.Project,
        screensize: device.ScreenSize,
        transpirecode: device.TranspireCode
    }));
    
    console.log('reloaded data')

    return mapped
}