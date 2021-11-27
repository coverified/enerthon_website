import { writable } from 'svelte/store';

export const User = function () {
	const { subscribe, set } = writable('');
  return {
    subscribe,
    signout: () => { set(null) },
		signin:  () => { set('admin@admin') }
	}
}()