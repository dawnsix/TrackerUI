import { fail } from "@sveltejs/kit";
import { compute_rest_props } from "svelte/internal";
import { redirect } from '@sveltejs/kit'
import { page } from "$app/stores";

console.log('running login handler @ page.server.js')

export const actions = {

    default: async ({request, locals}) => {
        const body = Object.fromEntries(await request.formData())

        console.log(body.email)
        console.log(body.password)

        console.log(body)
        const { data, error } = await locals.sb.auth.signInWithPassword({
            email: body.email,
            password: body.password
        })

        if(error) {
            /*
            if(err.status === 400) {
                return fail(400, {
                    error: 'Invalid Credentials'
                })
            }

            return fail(500, {
                message: 'Server error. Try again later.'
            })
            */

            console.log("login failed")
            //return redirect(303, '/')
            return { success: false };
        }

        console.log("login successful")
        throw redirect(303, '/devicemanager')
    }
  }