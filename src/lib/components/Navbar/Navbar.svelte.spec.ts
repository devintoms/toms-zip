import { page } from 'vitest/browser';
import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Navbar from './Navbar.svelte';

describe('Navbar.svelte', () => {
	it.todo('renders the brand name "toms.zip"');
	it.todo('renders the placeholder icon');
	it.todo('displays the default selected option ("Home")');
	it.todo('opens the dropdown menu when the menu button is clicked');
	it.todo('sets aria-expanded to true when the dropdown is opened');
	it.todo('displays all three navigation options in the dropdown');
	it.todo('closes the dropdown when the Escape key is pressed');
	it.todo('returns focus to the menu button when the dropdown is closed via Escape');
	it.todo('closes the dropdown when clicking outside the navbar');
	it.todo('updates the selected option display when a menu item is clicked');
	it.todo('closes the dropdown automatically after selecting an option');
	it.todo('navigates between menu items with ArrowDown and ArrowUp keys');
	it.todo('moves focus to the first menu item when the dropdown opens');
	it.todo('wraps focus from last to first item with ArrowDown');
	it.todo('wraps focus from first to last item with ArrowUp');
	it.todo('selects an option with Enter key');
	it.todo('selects an option with Space key');
	it.todo('highlights the currently selected option in the dropdown');
});
