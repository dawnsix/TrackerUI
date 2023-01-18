import { redirect, error } from '@sveltejs/kit'

export const load = ({ locals }) => {
    
    if(locals.session)
        throw redirect(303, '/devicemanager')
    
}

export const actions = {

    default: async ({request, locals}) => {
        const body = Object.fromEntries(await request.formData())
        const { data, error: err } = await locals.sb.auth.signInWithPassword({
            email: body.email,
            password: body.password
        })

        if(err) {
            throw error(403, {
                message: 'Login failure'
            })
        }
        throw redirect(303, '/devicemanager')
    }
  }