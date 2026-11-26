<script lang="ts">
	import '@fontsource/archivo/500.css';
	import '@fontsource/archivo/700.css';
	import '@fontsource/archivo/800.css';
	import '@fontsource/source-sans-3/400.css';
	import '@fontsource/source-sans-3/600.css';
	import '@fontsource/jetbrains-mono/400.css';
	import '@fontsource/jetbrains-mono/500.css';
	import '@fontsource/jetbrains-mono/600.css';
	import '../app.css';

	let { children } = $props();
</script>

{@render children()}
