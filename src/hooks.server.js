
import { Handle } from "@sveltejs/kit"
import { ssauth } from "./lib/auth.js"

export const handle = async({ event, resolve }) => {

    event.locals.user = ssauth(event)

    console.log("hooks " + event.locals.user.id)
    const response = await resolve(event)
    
    return response
}