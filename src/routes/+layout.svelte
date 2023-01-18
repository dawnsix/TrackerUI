<script>
    import { invalidateAll } from '$app/navigation'
    import { supabaseClient } from '$lib/supabase.js'
    import { onMount } from 'svelte'
    import { Toaster } from 'svelte-french-toast'

    onMount(() => {

        const {data: { subscription }} = supabaseClient.auth.onAuthStateChange(() => {
            invalidateAll()
        })

        return () => {
            subscription.unsubscribe()
        }
    })

</script>

<h1>qa device manager</h1>

<Toaster />
<slot></slot>