<script>
    import { invalidateAll } from '$app/navigation'
    import { supabaseClient } from '$lib/supabase.js'
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte'
    import { Toaster } from 'svelte-french-toast'
    import { SvelteToast } from '@zerodevx/svelte-toast'
    import { page } from '$app/stores'

    onMount(() => {

        const {data: { subscription }} = supabaseClient.auth.onAuthStateChange(() => {
            invalidateAll()
        })

        return () => {
            subscription.unsubscribe()
        }
    })

</script>

<div class="div_hdr">
    <h1 class="header">DEVICE <span class="wavy">TRACKR</span> 2.0</h1>
    <p class="sub_header">aSBzd2VhciwgaXRzIG5vdCBiYWQgd2ViIGRlc2lnbiwgaXRzICJtb25vY2hyb21hdGljIGJydXRhbGlzbSI=</p>
</div>

    {#if $page.url.pathname  ==='/devicemanager'}
        <div class="div_btnctnr">
            <form action="/logout" method="POST"><button class="btn_nav">logout</button></form>
            <form action="/details"><button class="btn_nav">about</button></form>
        </div>
    {/if}

    {#if $page.url.pathname  ==='/details'}
        <div class="div_btnctnr">
            <form action="/logout" method="POST"><button class="btn_nav">logout</button></form>
            <form action="/devicemanager"><button class="btn_nav">devices</button></form>
        </div>
    {/if}

<Toaster />
<SvelteToast options={{ reversed: true, intro: { y: 192 } }} />
<slot></slot>

<style>

    div {
        /*border:1px solid black;*/
    }

    :root {
        --toastContainerTop: auto;
        --toastContainerRight: auto;
        --toastContainerBottom: 8rem;
        --toastContainerLeft: calc(50vw - 8rem);
    }

    .div_hdr {
    }

    .wavy {
		text-decoration-line: underline;
		text-decoration-style: wavy;
		text-decoration-color: red;
	}

    .rtm {
        font-family: Arial !important;
        font-size: 70px;
    }

    .header {
        text-align: center;
        font-family: 'Allerta Stencil';
        font-size: 30px;
        letter-spacing: 40px;
        text-shadow: 5px 5px rgb(241, 241, 241);
    }

    .sub_header {
		vertical-align: top;
        text-align: center;
		font-size: 12px;
		color: rgb(110, 110, 110);
		letter-spacing: 5px;
        margin-top: -45px;
        margin-left: -40px;
        padding-bottom: 40px;
    }

    .div_btnctnr {
        width: 100%;
        height: 20px;            
        position: absolute;
        top: 0;
        right: 0;
    }

    .btn_nav {
        font-family: Arial !important;
        font-size: 12px;
        text-decoration: none;
        text-transform: uppercase;
        color: #000;
        cursor: pointer;
        background-color: white;
        border: 1px solid;
        float: right;
        z-index: 10;
        border: 0px;
        transition: 0.5s;
    }

    .btn_nav:hover {
        color: red;
    }

</style>