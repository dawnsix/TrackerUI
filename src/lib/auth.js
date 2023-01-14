import { RequestEvent } from "@sveltejs/kit"

export const ssauth = (event) => {
    const { cookies } = event
    const userToken = cookies.get("auth")

    return {id: 'admin'}
}