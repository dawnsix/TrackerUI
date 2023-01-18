<script>
    import toast from 'svelte-french-toast'
	import { enhance } from '$app/forms'

	const submitLogin = ({ form, data, action, cancel }) => {

		return async ({ result, update }) => {
			if(result.status == 403) {
				toast.error("Invalid credentials", {
					duration: 2000,
				})
			}

			if(result.status == 303) {
				toast.success("Login successful", {
					duration: 2000,
				})
			}

			update()
		}
	}

</script>

<div class="auth-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="text-xs-center">Sign In</h1>

				<form method="POST" use:enhance={submitLogin}>
					<fieldset class="form-group">
						<input
							class="form-control form-control-lg"
							name="email"
							type="email"
							required
							placeholder="Email"
							value="admin@devicetracker.qa"
						/>
					</fieldset>
					<fieldset class="form-group">
						<input
							class="form-control form-control-lg"
							name="password"
							type="password"
							required
							placeholder="Password"
						/>
					</fieldset>
					<button class="btn btn-lg btn-primary pull-xs-right" type="submit">Sign in</button>
				</form>
			</div>
		</div>
	</div>
</div>