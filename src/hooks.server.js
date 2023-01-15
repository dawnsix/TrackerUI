import '$lib/supabase.js'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { Handle } from "@sveltejs/kit"

export const handle = async({ event, resolve }) => {

    const {session, supabaseClient } = await getSupabase(event)

    event.locals.sb = supabaseClient
    event.locals.session = session

    console.log("running hook.server handler...")
    //console.log("session: " + JSON.stringify(session))
    return resolve(event)
}
