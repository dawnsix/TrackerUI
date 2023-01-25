import { redirect } from '@sveltejs/kit'

export const load = ({ locals }) => {
    if(!locals.session)
        throw redirect(303, '/')
}

export const actions = {

    default: async ({locals}) => {
        
        const { error } = await locals.sb.auth.signOut()

        if(error) {
            /*
            // TEMP: but in serialization lib, awaiting fix
            if(err.status === 400) {
                return fail(400, {
                    error: 'Invalid Credentials'
                })
            }

            return fail(500, {
                message: 'Server error. Try again later.'
            })
            */

            console.log("logout failed")
            //return redirect(303, '/')
            return { success: false };
        }

        console.log("logout successful")
        throw redirect(303, '/')
    }
}