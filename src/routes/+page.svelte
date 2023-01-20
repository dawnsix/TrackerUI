<script>
    import toast from 'svelte-french-toast'
	import { enhance } from '$app/forms'
	import { onMount } from 'svelte'

	let pwRef

	const submitLogin = ({ form, data, action, cancel }) => {

		return async ({ result, update }) => {

			if(result.type === 'failure') {
				toast.error("Invalid credentials", {
					duration: 2000,
				})

				form.reset()
				pwRef.focus(); 
			}

			if(result.status == 303) {
				toast.success("Login successful", {
					duration: 2000,
				})

				update()
			}
		}
	}

</script>


<div class="form_area">
	<form method="POST" use:enhance={submitLogin}>
		<fieldset class="form-group">
			<input 
				type="email" 
				class="form_style" 
				id="email" 
				name="email"
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
				bind:this={pwRef}  
				required />
			</fieldset>
		<div>
			<button class="btn btn-lg btn-primary pull-xs-right" type="submit">SUBMIT</button>
		</div>
	</form>
</div>

<style>
	
	*{
		margin: 0;
		padding: 0;
	}

	body{
		font-family: 'Poppins', sans-serif;
		height: 100vh;
		width: 100vw;
		background: #7b4397;
	}

	.form_area{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: #fff;
		height: auto;
		width: auto;
		border-radius: 20px;
	}

	.title{
		color: #7b4397;
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
		border-radius: 0px;
		font-size: 15px;
	}

	.form_style:focus {
		transform: translateY(4px);
		box-shadow: 1px 2px 0px 0px #000;
		background: #d3c2db;
	}

	.btn:focus{
		transform: translateY(4px);
		box-shadow: 1px 2px 0px 0px #000;
		background: #F37777;
	}

	.btn{
		padding: 15px;
		margin: 30px 0px;
		width: 310px;
		font-size: 15px;
		background: rgb(206, 206, 206);
		border-radius: 0px;
		font-weight: 800;
		box-shadow: 5px 5px 0px 0px #000;
	}

	p{
		margin: 20px 0px;
	}

</style>