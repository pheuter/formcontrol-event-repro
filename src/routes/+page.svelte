<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	let { data } = $props();

	const form = superForm(data.form, { dataType: 'json' });
	const { form: formData, enhance } = form;
</script>

<div class="mx-auto mt-12 w-full max-w-md">
	<form class="space-y-4" method="post" use:enhance>
		<Form.Field {form} name="firstName">
			<Form.Control let:attrs>
				<Form.Label>First Name (`oninput` broken)</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.firstName}
					oninput={(e) => alert(`onchange: ${e.currentTarget.value}`)}
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="lastName">
			<Form.Control>
				<Form.Label>Last Name (`oninput` working)</Form.Label>
				<Input
					bind:value={$formData.lastName}
					oninput={(e) => alert(`onchange: ${e.currentTarget.value}`)}
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<div class="flex justify-end gap-4">
			<Button variant="outline">Cancel</Button>
			<Form.Button>Save</Form.Button>
		</div>
	</form>
</div>
