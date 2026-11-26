<script lang="ts">
	let { iconKey }: { iconKey: string } = $props();
</script>

<svg
	class="h-4 w-4 shrink-0 text-[var(--ink-muted)] transition-colors duration-200 group-hover:text-[var(--teal)]"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.65"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	{#if iconKey === 'python'}
		<path d="M12 3c-2.8 0-4 1.2-4 3.2V9h8v1.5H6.5C4.5 10.5 3 11.8 3 14.5S4.5 18 6.5 18H9v-2.5c0-1.6 1.2-2.8 3-2.8h5c1.5 0 2.5-1 2.5-2.5V6.2C19.5 4.2 17 3 12 3z" />
		<path d="M12 21c2.8 0 4-1.2 4-3.2V15H8v-1.5h9.5c2 0 3.5-1.3 3.5-4S19.5 6 17.5 6H15v2.5c0 1.6-1.2 2.8-3 2.8H7c-1.5 0-2.5 1-2.5 2.5v4c0 2 2.5 3.2 7.5 3.2z" />
	{:else if iconKey === 'database'}
		<ellipse cx="12" cy="5.5" rx="7.5" ry="2.5" />
		<path d="M4.5 5.5v13c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-13" />
		<path d="M4.5 12c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5" />
	{:else if iconKey === 'code'}
		<polyline points="8 7 3 12 8 17" />
		<polyline points="16 7 21 12 16 17" />
		<line x1="14" y1="5" x2="10" y2="19" />
	{:else if iconKey === 'terminal'}
		<rect x="3" y="4" width="18" height="16" rx="2" />
		<polyline points="7 10 10.5 13 7 16" />
		<line x1="12.5" y1="16" x2="17" y2="16" />
	{:else if iconKey === 'server'}
		<rect x="3" y="4" width="18" height="6" rx="1.5" />
		<rect x="3" y="14" width="18" height="6" rx="1.5" />
		<line x1="7" y1="7" x2="7.01" y2="7" />
		<line x1="7" y1="17" x2="7.01" y2="17" />
	{:else if iconKey === 'table'}
		<rect x="3" y="4" width="18" height="16" rx="1.5" />
		<line x1="3" y1="10" x2="21" y2="10" />
		<line x1="9" y1="10" x2="9" y2="20" />
		<line x1="15" y1="10" x2="15" y2="20" />
	{:else if iconKey === 'bolt'}
		<polygon points="13 2 4 14 11 14 10 22 20 10 13 10 13 2" />
	{:else if iconKey === 'matrix'}
		<path d="M6 4H4v16h2" />
		<path d="M18 4h2v16h-2" />
		<circle cx="9" cy="9" r="1.1" />
		<circle cx="15" cy="9" r="1.1" />
		<circle cx="9" cy="15" r="1.1" />
		<circle cx="15" cy="15" r="1.1" />
	{:else if iconKey === 'wave'}
		<path d="M2 12c2-5 4-5 6 0s4 5 6 0 4-5 6 0" />
		<line x1="2" y1="19" x2="22" y2="19" />
	{:else if iconKey === 'scatter'}
		<polyline points="4 4 4 20 20 20" />
		<circle cx="9" cy="14" r="1.3" />
		<circle cx="13" cy="10" r="1.3" />
		<circle cx="17" cy="7" r="1.3" />
		<circle cx="16" cy="14" r="1.3" />
	{:else if iconKey === 'tree'}
		<rect x="9.5" y="3" width="5" height="4" rx="1" />
		<rect x="3" y="16" width="5" height="4" rx="1" />
		<rect x="16" y="16" width="5" height="4" rx="1" />
		<path d="M12 7v4M5.5 16v-5h13v5" />
	{:else if iconKey === 'branch'}
		<circle cx="6" cy="6" r="2.5" />
		<circle cx="18" cy="8" r="2.5" />
		<circle cx="6" cy="18" r="2.5" />
		<path d="M6 8.5v7M8.5 18c5 0 9.5-2.5 9.5-7.5" />
	{:else if iconKey === 'shield'}
		<path d="M12 3l7 3v6c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3z" />
		<polyline points="9 12 11.2 14.2 15.5 10" />
	{:else if iconKey === 'neural'}
		<circle cx="5" cy="7" r="2" />
		<circle cx="5" cy="17" r="2" />
		<circle cx="12" cy="12" r="2" />
		<circle cx="19" cy="7" r="2" />
		<circle cx="19" cy="17" r="2" />
		<path d="M7 8l3.5 3M7 16l3.5-3M13.5 11L17 8M13.5 13l3.5 3" />
	{:else if iconKey === 'chart'}
		<polyline points="3 20 21 20" />
		<rect x="6" y="12" width="3" height="8" rx="0.5" />
		<rect x="11" y="7" width="3" height="13" rx="0.5" />
		<rect x="16" y="4" width="3" height="16" rx="0.5" />
	{:else if iconKey === 'graph'}
		<circle cx="12" cy="5" r="2" />
		<circle cx="5.5" cy="17" r="2" />
		<circle cx="18.5" cy="17" r="2" />
		<path d="M10.8 6.7L6.7 15.2M13.2 6.7l4.1 8.5M7.5 17h9" />
	{:else if iconKey === 'link'}
		<path d="M10 13a4.5 4.5 0 0 1 0-6.4l2-2a4.5 4.5 0 0 1 6.4 6.4l-1.2 1.2" />
		<path d="M14 11a4.5 4.5 0 0 1 0 6.4l-2 2a4.5 4.5 0 0 1-6.4-6.4l1.2-1.2" />
	{:else if iconKey === 'layers'}
		<polygon points="12 3 21 8 12 13 3 8 12 3" />
		<polyline points="3 12.5 12 17.5 21 12.5" />
		<polyline points="3 17 12 22 21 17" />
	{:else if iconKey === 'sliders'}
		<line x1="4" y1="6" x2="20" y2="6" />
		<line x1="4" y1="12" x2="20" y2="12" />
		<line x1="4" y1="18" x2="20" y2="18" />
		<circle cx="9" cy="6" r="2" fill="var(--bg-plate)" />
		<circle cx="15" cy="12" r="2" fill="var(--bg-plate)" />
		<circle cx="10" cy="18" r="2" fill="var(--bg-plate)" />
	{:else if iconKey === 'workflow'}
		<rect x="3" y="4" width="6" height="5" rx="1" />
		<rect x="15" y="4" width="6" height="5" rx="1" />
		<rect x="9" y="15" width="6" height="5" rx="1" />
		<path d="M6 9v3h12V9M12 12v3" />
	{:else if iconKey === 'clock'}
		<circle cx="12" cy="12" r="8.5" />
		<polyline points="12 7 12 12 15.5 14" />
	{:else if iconKey === 'cache'}
		<polygon points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
		<polyline points="12 12 20 7.5" />
		<polyline points="12 12 12 21" />
		<polyline points="12 12 4 7.5" />
	{:else if iconKey === 'vector'}
		<circle cx="12" cy="12" r="2" />
		<path d="M12 4v6M12 14v6M4 12h6M14 12h6M6.3 6.3l4.2 4.2M13.5 13.5l4.2 4.2" />
	{:else if iconKey === 'box'}
		<path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
		<path d="M3.3 8.2L12 13l8.7-4.8M12 13v9" />
	{:else}
		<circle cx="12" cy="12" r="8.5" />
		<polyline points="8.5 12.2 11 14.7 15.8 9.8" />
	{/if}
</svg>
