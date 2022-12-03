<script>
	import { enhance, applyAction } from '$app/forms';
	import ContactsTable from '$lib/components/ContactsTable.svelte';
	import Alert from '../../lib/components/Alert.svelte';
	export let data;
	export let form;
    console.log(form);
</script>

<div class="w-full">
	<div class="flex justify-between items-center w-full">
		<h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">Contact Manager</h2>
	</div>
	<form class="w-full flex flex-col" method="POST" action="?/create" use:enhance={({ form, data, action, cancel }) => {
        // `form` is the `<form>` element
        // `data` is its `FormData` object
        // `action` is the URL to which the form is posted
        // `cancel()` will prevent the submission
        // 서버 보내기 전 상태 

        console.log('form:', form);
        console.log('data:', data);
        console.log('action:', action);

        return async ({ result, update }) => {
            // 서버에 보낸 상태
            
            console.log('result:', result);
            console.log('update:', update);

            if(result.type === 'success') {
                form.reset();
            } else if(result.type === 'invalid') {
                await applyAction(result);
            }

            update();

            // console.log('result:', result);
            // console.log('update:', update);

            // if(result.type === 'success') {
            //     form.reset();
            // }

            // if(result.type === 'invalid') {
            //     await applyAction(result);
            // }
            
            // update();

          // `result` is an `ActionResult` object
          // `update` is a function which triggers the logic that would be triggered if this callback wasn't set
        };
      }} >
		<div class="form-control w-full max-w-xs">
			<label for="name" class="label">
				<span class="label-text">Name</span>
			</label>

			<input
				type="text"
				name="name"
				value={form?.name ?? ''}
				class="input input-primary input-bordered w-full max-w-xs"
			/>
		</div>
		<div class="form-control w-full max-w-xs">
			<label for="email" class="label">
				<span class="label-text">Email</span>
			</label>
			<input
                type="text"
				name="email"
				value={form?.email ?? ''}
				class="input input-primary input-bordered w-full max-w-xs"
			/>
		</div>
		<div class="form-control w-full max-w-xs">
			<label for="company" class="label">
				<span class="label-text">Company</span>
			</label>

			<input
				type="text"
				name="company"
				value={form?.company ?? ''}
				class="input input-primary input-bordered w-full max-w-xs"
			/>
		</div>
		<div class="form-control w-full max-w-xs">
			<label for="job" class="label">
				<span class="label-text">Job</span>
			</label>

			<input
				type="text"
				name="job"
				value={form?.job ?? ''}
				class="input input-primary input-bordered w-full max-w-xs"
			/>
		</div>
		<button class="mt-4 btn btn-primary w-full max-w-xs">Add</button>
		{#if form?.error}
			<Alert message={form?.message} />
		{/if}
	</form>

	<ContactsTable contacts={data?.contacts} />
</div>