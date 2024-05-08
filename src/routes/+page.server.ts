import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

const schema = z.object({
	firstName: z.string().min(2, 'First name must be at least 2 characters'),
	lastName: z.string().min(2, 'Last name must be at least 2 characters')
});

export const load = async () => {
	const form = await superValidate(zod(schema));

	return { form };
};

export const actions = {
	async default({ request }) {
		const form = await superValidate(request, zod(schema));
		if (!form.valid) {
			return fail(400, { form });
		}
		return { form };
	}
};
