<script>
    import { invalidateAll } from '$app/navigation'
    import { supabaseClient } from '$lib/supabase.js'
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte'
    import { Toaster } from 'svelte-french-toast'
    import { SvelteToast } from '@zerodevx/svelte-toast'
    import { enhance } from '$app/forms'
    import { page } from '$app/stores'
    import { navigating } from '$app/stores';
    import NProgress from 'nprogress';
    import '$lib/assets/nprogress.css';

    NProgress.configure({
		minimum: 0.16
	});

    $: {
        if ($navigating) {
            console.log("moving...")
            NProgress.start();
        }
        if (!$navigating) {
            console.log("moving...")
            NProgress.done();
        }
	}

    onMount(() => {

        const {data: { subscription }} = supabaseClient.auth.onAuthStateChange(() => {
            invalidateAll()
        })

        return () => {
            subscription.unsubscribe()
        }
    })

    // using enhance as nprogress ignores logout if not used
    const handleLogougProgress = ({ form, data, action, cancel }) => {

        return async ({ result, update }) => { 
            update() 
        }
    }

</script>

<div class="nav_btn_cntnr">
    {#if $page.url.pathname  ==='/devicemanager'}
        <form action="/logout" method="POST" use:enhance={handleLogougProgress}><button class="btn_nav">logout</button></form>
        <form action="/details"><button class="btn_nav">about</button></form>
    {/if}

    {#if $page.url.pathname  ==='/details'}
        <form action="/logout" method="POST"><button class="btn_nav">logout</button></form>
        <form action="/devicemanager"><button class="btn_nav">devices</button></form>
    {/if}
</div>

<div class="div_hdr">
    <p class="header_title">QA DEVICE <span>TRACKER</span></p>
</div>

<div class="div_hrdbtm">

</div>

<Toaster />
<div class="toastWrapper"><SvelteToast options={{ dismissable: false, reversed: true, intro: { y: 192 } }} /></div>
<slot></slot>

<style>

    :global(.svelte-progress-bar, .svelte-progress-bar-leader) {
	    background-color: #ff0000;
	}

	:global(.svelte-progress-bar-leader) {
		color: #000000;
	}

    :global(.toastWrapper) {
        display: contents;
        font-family: Arial !important;
        font-size: 18px;
        text-align: center;
        --dismissable: false;
        --toastColor: white;
        --toastBackground: black;
        --toastBarHeight: 0;
        --toastWidth: 350px;
        --toastContainerBottom: 2px;
        --toastBorder: 2px solid #ebebeb;
        --toastHeight: 10px;
        --toastBoxShadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
    }

    :root {
        --toastContainerTop: auto;
        --toastContainerRight: auto;
        --toastContainerBottom: 2rem;
        --toastContainerLeft: calc(50vw - 8rem);
    }

    .wavy {
		text-decoration-line: underline;
		text-decoration-style: wavy;
		text-decoration-color: red;
        text-shadow: 2px 2px black;
	}

    .header_title {
        font-size: 35px;
        font-family: 'Arial Black','Helvetica Bold',sans-serif;
        color: rgb(255, 255, 255);
        text-align: center;
        margin-top: 0px;
        letter-spacing: 20px;
        text-shadow: 2px 2px black;
    }

    .div_hdr {
        background-color: white;
        width: 100%;
        height: 50px;
        overflow: hidden;
    }

    .div_hrdbtm {
        height: 10px;
    }

    .btn_nav {
        font-family: Arial !important;
        font-size: 12px;
        text-decoration: none;
        text-transform: uppercase;
        color: #000;
        cursor: pointer;
        background-color: rgb(255, 255, 255);
        float: right;
        border: 0px;
        transition: 0.5s;
    }

    .btn_nav_res {
        font-family: Arial !important;
        font-size: 12px;
        text-decoration: none;
        text-transform: uppercase;
        color: #000;
        cursor: pointer;
        background-color: white;
        transition: 0.5s;
    }

    .btn_nav:hover {
        color: red;
    }

    .btn_nav_res:hover {
        color: red;
    }

    .nav_btn_cntnr {
        margin-top: 0px;
        height: 18px;
    }

    @media (max-width: 700px) {
        .div_hdr {
            position: fixed;
            background-color: white;
            height: 100px;
            overflow: hidden;
        }

        .div_hrdbtm {
            margin-bottom: 100px;
        }
    }
    
</style>