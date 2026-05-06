<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Navbar } from '$lib/components/Navbar';
	import { Dithering } from '@devmischief/shaders-svelte';
	import { innerWidth, innerHeight } from 'svelte/reactivity/window';

	let { children } = $props();

	let contentScrollHeight = $state(0);
	let ditherHeight = $derived(Math.max(innerHeight.current ?? 0, contentScrollHeight));

	function trackScrollHeight(node: HTMLElement) {
		$effect(() => {
			function update() {
				contentScrollHeight = node.scrollHeight;
			}

			update();
			window.addEventListener('resize', update);
			return () => window.removeEventListener('resize', update);
		});
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<!-- background -->
<Dithering
	width={innerWidth.current}
	height={ditherHeight}
	colorBack="#000000"
	colorFront="#aa7ca9"
	shape="warp"
	type="8x8"
	size={1.5}
	speed={1}
	scale={1.25}
	rotation={0}
	offsetX={0}
	offsetY={0}
	fit="cover"
	class="fixed inset-0 -z-50 pointer-events-none"
/>

<!-- page content -->
<Navbar />
<main {@attach trackScrollHeight}>{@render children()}</main>
