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
    import ProgressBar from 'svelte-progress-bar'
    import '$lib/assets/nprogress.css';

    let progress

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

    const handleLogougProgress = ({ form, data, action, cancel }) => {

        // POST does nothing anyway
        // Enhanced handler with callback appears to trigger NProgress fsr
        //progress.start()

        return async ({ result, update }) => {
            //progress.complete()  

            update()
        }
    }

</script>

<ProgressBar bind:this={progress} />

<div class="div_hdr">
    <h1 class="header">DEVICE <span class="wavy">TRACKR</span> 2.0</h1>
    <p class="sub_header">aGlkaW5nIGJlaGluZCBicnV0YWxpc3RpYyBkZXNpZ24=</p>
</div>

    {#if $page.url.pathname  ==='/devicemanager'}
        <div class="div_btnctnr">
            <form action="/logout" method="POST" use:enhance={handleLogougProgress}><button class="btn_nav">logout</button></form>
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
<div class="toastWrapper"><SvelteToast options={{ dismissable: false, reversed: true, intro: { y: 192 } }} /></div>
<slot></slot>

<footer>
    <div class="footerDiv">
        <p class="footerText">Copyright 2023, all rights <span class="wavy">riserved</span></p>
    </div>
</footer>

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
        text-align: left;
		font-size: 12px;
		color: rgb(110, 110, 110);
		letter-spacing: 5px;
        margin-top: -45px;
        text-align: center;
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

    footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 200px;
        background: rgb(235,235,235);
        background: linear-gradient(0deg, rgba(235,235,235,1) 0%, rgba(255,255,255,1) 100%, rgba(0,212,255,1) 100%); 
    }

    .footerDiv {
        margin-top: 10px;
        width: 90%;
        height: 2px;
        background-color: black;
        margin: 0 auto;
    }

    .footerText {
        text-align: center;
        padding-top: 5px;
        font-family: Arial !important;
    }

</style>