<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { goto } from '$app/navigation';

	let isOpen: boolean = $state(false);

	const navOptions = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' },
		{ label: 'Portfolio', href: '/portfolio' }
	] as const;

	const selectedOption = $derived(
		navOptions.find((o) => o.href === page.url.pathname)?.label ?? 'Home'
	);

	$effect(() => {
		afterNavigate(() => {
			isOpen = false;
		});
	});

	let menuId = 'navbar-menu';
	let buttonId = 'navbar-menu-button';

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function handleMenuKeydown(event: KeyboardEvent) {
		const items = menuEl?.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]');
		if (!items || items.length === 0) return;

		const currentIndex = Array.from(items).indexOf(document.activeElement as HTMLAnchorElement);

		switch (event.key) {
			case 'ArrowDown': {
				event.preventDefault();
				const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
				items[nextIndex].focus();
				break;
			}
			case 'ArrowUp': {
				event.preventDefault();
				const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
				items[prevIndex].focus();
				break;
			}
			case 'Escape': {
				event.preventDefault();
				isOpen = false;
				buttonEl?.focus();
				break;
			}
			case 'Home': {
				event.preventDefault();
				items[0].focus();
				break;
			}
			case 'End': {
				event.preventDefault();
				items[items.length - 1].focus();
				break;
			}
		}
	}

	function handleButtonKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			event.preventDefault();
			isOpen = true;
		}
	}

	let buttonEl: HTMLButtonElement | undefined = $state(undefined);
	let menuEl: HTMLDivElement | undefined = $state(undefined);

	$effect(() => {
		if (!isOpen) return;

		const firstItem = menuEl?.querySelector<HTMLAnchorElement>('[role="menuitem"]');
		// Small delay to allow DOM to update
		requestAnimationFrame(() => {
			firstItem?.focus();
		});
	});

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as Node;
		const nav = document.getElementById('navbar-container');
		if (isOpen && nav && !nav.contains(target)) {
			isOpen = false;
		}
	}
</script>

<svelte:window onclick={handleClickOutside} />

<nav
	id="navbar-container"
	aria-label="Main navigation"
	class="sticky top-0 z-50 border-b-4 border-black bg-gray-400 shadow-sm"
>
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-1 sm:px-6 lg:px-8">
		<div class="flex items-center gap-2">
			<svg
				aria-hidden="true"
				class="h-6 w-6 text-gray-700"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				viewBox="0 0 24 24"
			>
				<path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
			<a href="/" class="font-mono text-lg font-bold tracking-tight text-gray-900">toms.zip</a>
		</div>

		<div class="flex items-center gap-3 sm:gap-4">
			<span class="font-mono text-sm font-semibold text-gray-900 sm:text-base"
				>{selectedOption}</span
			>

			<div class="relative">
				<button
					id={buttonId}
					bind:this={buttonEl}
					aria-controls={menuId}
					aria-expanded={isOpen}
					aria-haspopup="menu"
					onclick={toggleMenu}
					onkeydown={handleButtonKeydown}
					class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-3 py-2 font-mono text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
				>
					<span class="sr-only sm:not-sr-only sm:mr-1">Menu</span>
					<svg
						aria-hidden="true"
						class="h-5 w-5 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
					>
						<path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</button>

				{#if isOpen}
					<div
						id={menuId}
						bind:this={menuEl}
						role="menu"
						tabindex="-1"
						aria-labelledby={buttonId}
						onkeydown={handleMenuKeydown}
						class="animate-in fade-in slide-in-from-top-1 absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md border border-gray-200 bg-white py-1 shadow-lg transition-all duration-200"
					>
						<ul class="m-0 list-none p-0">
							{#each navOptions as option (option)}
								<li>
									<a
										href={option.href}
										role="menuitem"
										tabindex="-1"
										onclick={() => {
											isOpen = false;
										}}
										onkeydown={(e) => {
											if (e.key === 'Enter' || e.key === ' ') {
												e.preventDefault();
												goto(option.href);
												isOpen = false;
											}
										}}
										class="block min-h-[44px] px-4 py-2 font-mono text-sm text-gray-700 transition-colors hover:bg-gray-100 focus-visible:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none focus-visible:ring-inset {selectedOption ===
										option.label
											? 'font-semibold text-gray-900'
											: ''}"
									>
										{option.label}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
		</div>
	</div>
</nav>
