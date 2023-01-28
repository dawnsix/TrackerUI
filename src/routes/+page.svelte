<script>
    //import toast from 'svelte-french-toast'
	import { toast } from '@zerodevx/svelte-toast'
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms'
	import { onMount } from 'svelte'

	let focusRef

	const submitLogin = ({ form, data, action, cancel }) => {

		toast.push(`Authenticating...`, { duration: 1000 })

		return async ({ result, update }) => {

			if(result.type === 'failure') {

				toast.pop()
				toast.push(`<p style="font">Invalid credentials</p>`, { duration: 3000 })

				form.reset()
				focusRef.focus(); 
			}

			if(result.status == 303) {

				toast.pop()
				toast.push(`<p>&#9989; Login success, redirecting...</p>`, { duration: 500 })
				update()
			}
			
		}
	}

</script>

<div class="parent_container">
	<div class="wrapper">
		<div class="form_area">
			<form class="form_items" method="POST" use:enhance={submitLogin}>
				<fieldset class="form-group">
					<input 
						type="email" 
						class="form_style" 
						id="email" 
						name="email"
						bind:this={focusRef}  
						placeholder="Enter your email" 
						required />
				</fieldset>
				<br />
				<fieldset class="form-group">
					<input 
						type="password" 
						class="form_style" 
						id="password" 
						name="password"
						placeholder="Enter your password"
						required />
					</fieldset>
				<div>
					<button class="btn btn-lg btn-primary pull-xs-right" type="submit">submit</button>
				</div>
			</form>
		</div>
		<div class="logo_grp">

		</div>

		<div class="logo_holder">
			<p class="login_txt_grp_a">LOGIN</p>
			
			<section class="custom-kontakt">
				<div class="barcode-box">
					<div class="barcode-stripes">
						<span class="stripe-1"></span>
						<span class="stripe-2"></span>
						<span class="stripe-1"></span>
						<span class="stripe-1"></span>
						<span class="stripe-3"></span>
						<span class="stripe-2"></span>
						<span class="stripe-1"></span>
						<span class="stripe-1"></span>
						<span class="stripe-1"></span> 
						<span class="stripe-2"></span>
						<span class="stripe-1"></span>
						<span class="stripe-2"></span>
						<span class="stripe-1"></span>
						<span class="stripe-2"></span>
						<span class="stripe-3"></span>
						<span class="stripe-2"></span>
						<span class="stripe-1"></span>
						<span class="stripe-1"></span> 
						<span class="stripe-3"></span>
						<span class="stripe-2"></span>
						<span class="stripe-1"></span>
						<span class="stripe-1"></span>
						<span class="stripe-1"></span>
						<span class="stripe-2"></span>
						<span class="stripe-1"></span>
						<span class="stripe-1"></span>
						<span class="stripe-3"></span> 
						<span class="stripe-2"></span>
						<span class="stripe-1"></span>
						<span class="stripe-1"></span>
						<span class="stripe-1"></span>
						<span class="sig1">A</span>
						<span class="sig2">U</span>
						<span class="sig3">T</span>
						<span class="sig4">H</span>
						<span class="sig5">N</span> 
						<span class="sig6">T</span> 
						<span class="sig7">I</span>
						<span class="sig8">C</span>
						<span class="sig9">8</span>
					</div>
				</div>
			</section>
		</div>

		<div class="sso_bar"></div>

	</div>
	
</div>

<style>

	:global(body) {
		font-family: Arial !important;
	}

	input::placeholder {
		font-family: Arial !important;
		opacity: 0.5;
		color: rgb(65, 65, 65)(197, 197, 197);
	}
	
	*{
		margin: 0;
		padding: 0;
	}

	:global(.svelte-progress-bar, .svelte-progress-bar-leader) {
		background-color: #ff0000;
	}

	:global(.svelte-progress-bar-leader) {
		color: #000000;
	}

	.parent_container {
		padding-top: 20px;
		padding-bottom: 25px;
	}

	.sso_bar {
		height: 5px;
		background-color: black;
		margin-top: 170px;
		margin-left: 10px;
		margin-right: 10px;
	}

	.login_txt_grp_a {
		text-align: center;
		vertical-align: top;
		font-size: 70px;
		color: rgb(255, 255, 255);
		margin-top: 20px;
		letter-spacing: 10px;
		text-shadow: 5px 5px rgb(0, 0, 0);
	}

	.logo_grp {
		font-size: 20px;
		padding-top: 10px;
		background-color: #ebebeb;
	}

	.wrapper {
		padding-top: 100px;
		width: 720px;
		border: 3px solid black;
		overflow: hidden;
		padding-bottom: 100px;
		margin: auto;
		box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px rgb(0, 0, 0);
	}
	.form_area{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: #fff;
		height: auto;
		width: auto;
		float:left;
		width: 400px;
	}

	.title{
		font-weight: 900;
		font-size: 1.5em;
		margin-top: 20px;
	}

	.sub_title{
		font-weight: 600;
		margin: 5px 0;
	}

	.form_group{
		display: flex;
		flex-direction: column;
		align-items: baseline;
		margin: 20px;
	}

	.form_style{
		outline: none;
		border: 2px solid #000;
		box-shadow: 3px 4px 0px 1px #000;
		width: 290px;
		padding: 12px 10px;
		font-size: 15px;
	}

	.form_style:focus {
		transform: translateY(4px);
		box-shadow: 1px 2px 0px 0px #000;
		background: #ebebeb;
	}

	.btn:focus{
		transform: translateY(4px);
		box-shadow: 1px 2px 0px 0px #000;
		background: #ebebeb;
		outline: none !important;
    	border:1px solid black;
	}

	.btn{
		padding: 15px;
		margin: 30px 0px;
		width: 310px;
		font-size: 20px;
		background: rgb(206, 206, 206);
		font-weight: 800;
		box-shadow: 5px 5px 0px 0px #000;
		font-family: 'Allerta Stencil';
		color: rgb(0, 0, 0);
		text-shadow: 2px 2px #fff;
	}

	p{
		margin: 20px 0px;
	}

	@media (max-height: 850px) {
		
		.sso_bar {
			display: none;
		}

		.wrapper {
			height: 180px;
		}
	}

	@media (max-width: 850px) {
		
		.logo_holder, .sso_bar, .logo_grp {
			display: none;
		}

		.form_area {
			margin-top: -60px;
		}

		.wrapper {
			width: 400px;
			display: flex;
			justify-content: center;
		}
	}

	/* barcode */	
	@import url('https://fonts.googleapis.com/css?family=Quicksand');
	.custom-kontakt .barcode-box { 
		margin-top: -110px;
		border: 1px solid rgb(255, 255, 255);
		width: 300px; 
		height: 150px; 
		padding-right: 10px;
		float: right;
	}
	.custom-kontakt .barcode-box .barcode-stripes .stripe-1 { 
	display: block; 
	height: 120px; 
	width: 3px; 
	float: left; 
	border-right: thin solid #000;
		border-left: thin solid #000; 
		border-top-color: #fff; 
		border-bottom-color: #fff; 
	}
	.custom-kontakt .barcode-box .barcode-stripes .stripe-2 { 
		display: block; 
		height: 110px; 
		width: 5px; 
		float: left; 
		margin-left: 1px; 
		margin-right: 1px; 
		border-right: thick solid #000;
		border-left: thick solid #000; 
		border-top-color: #fff; 
		border-bottom-color: #fff; 
	}
	.custom-kontakt .barcode-box .barcode-stripes .stripe-3 { 
		display: block; 
		height: 120px; 
		width: 5px; 
		float: left; 
		margin-left: 1px; 
		margin-right: 1px; 
		border-right: thick solid #000;
		border-left: thin solid #000; 
	}
	.custom-kontakt .barcode-box .barcode-stripes span.sig1, .custom-kontakt .barcode-box .barcode-stripes span.sig2, .custom-kontakt .barcode-box .barcode-stripes span.sig3, .custom-kontakt .barcode-box .barcode-stripes span.sig4, .custom-kontakt .barcode-box .barcode-stripes span.sig5, .custom-kontakt .barcode-box .barcode-stripes span.sig6, .custom-kontakt .barcode-box .barcode-stripes span.sig7, .custom-kontakt .barcode-box .barcode-stripes span.sig8, .custom-kontakt .barcode-box .barcode-stripes span.sig9 { 
		color: #000; 
		font-size: 12px;
		font-family:'Quicksand', sans-serif;
		float: left; 
		margin-top: -10px;
	}
	.custom-kontakt .barcode-box .barcode-stripes span.sig1 { 
		margin-right: 20px; 
		margin-left: 7px; 
	}
	.custom-kontakt .barcode-box .barcode-stripes span.sig2 { 
		margin-right: 20px; 
		margin-left: 7px; 
	}
	.custom-kontakt .barcode-box .barcode-stripes span.sig3 { 
		margin-right: 13px; 
		margin-left: 5px; 
	}
	.custom-kontakt .barcode-box .barcode-stripes span.sig4 { 
		margin-right: 5px; 
	}
	.custom-kontakt .barcode-box .barcode-stripes span.sig5 { 
		margin-right: 15px; 
		margin-left: 5px; 
	}
	.custom-kontakt .barcode-box .barcode-stripes span.sig6 { 
		margin-right: 15px; 
		margin-left: 2px; 
	}
	.custom-kontakt .barcode-box .barcode-stripes span.sig7 { 
		margin-right: 15px; 
		margin-left: 10px; 
	}
	.custom-kontakt .barcode-box .barcode-stripes span.sig8 { 
		margin-right: 15px; 
		margin-left: 5px; 
	}
	.custom-kontakt .barcode-box .barcode-stripes span.sig9 { 
		margin-left: 12px; 
	}

</style>