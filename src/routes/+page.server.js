import { redirect, fail } from '@sveltejs/kit'

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
            console.log(err)
            return fail(401, { 
                error: true,
                message: 'Invalid credentials',
            })
        }
        
        throw redirect(303, '/devicemanager')
    }
  }