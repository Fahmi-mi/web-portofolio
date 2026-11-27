<script lang="ts">
	import { onMount } from 'svelte';
	import type { HeroDomainId } from '$lib/data/portfolio';

	interface Props {
		activeDomain: HeroDomainId;
	}

	let { activeDomain }: Props = $props();

	let canvasEl = $state<HTMLCanvasElement | null>(null);
	let containerEl = $state<HTMLDivElement | null>(null);
	let pointer = { x: -999, y: -999, active: false };
	let renderCurrentFrame: (() => void) | null = null;

	$effect(() => {
		activeDomain;
		renderCurrentFrame?.();
	});

	interface NodeDef {
		layer: number;
		rx: number;
		ry: number;
		label?: string;
		domain?: HeroDomainId;
	}

	interface EdgeDef {
		from: number;
		to: number;
		domain: HeroDomainId;
	}

	const NODES: NodeDef[] = [
		{ layer: 0, rx: 0.12, ry: 0.2, label: 'TOKENS' },
		{ layer: 0, rx: 0.12, ry: 0.4, label: 'RCT 64K' },
		{ layer: 0, rx: 0.12, ry: 0.6, label: 'OHLCV' },
		{ layer: 0, rx: 0.12, ry: 0.8, label: 'CACHE' },
		{ layer: 1, rx: 0.38, ry: 0.25 },
		{ layer: 1, rx: 0.38, ry: 0.5 },
		{ layer: 1, rx: 0.38, ry: 0.75 },
		{ layer: 2, rx: 0.64, ry: 0.3, label: 'CONFORMAL', domain: 'statistical-ml' },
		{ layer: 2, rx: 0.64, ry: 0.52, label: 'DR-LEARNER', domain: 'causal-policy' },
		{ layer: 2, rx: 0.64, ry: 0.74, label: 'LANGGRAPH', domain: 'production-systems' },
		{ layer: 3, rx: 0.88, ry: 0.28, label: 'ROUTER' },
		{ layer: 3, rx: 0.88, ry: 0.52, label: 'POLICY' },
		{ layer: 3, rx: 0.88, ry: 0.76, label: 'STREAM' }
	];

	const EDGES: EdgeDef[] = [
		{ from: 0, to: 4, domain: 'statistical-ml' },
		{ from: 0, to: 5, domain: 'statistical-ml' },
		{ from: 1, to: 5, domain: 'causal-policy' },
		{ from: 1, to: 6, domain: 'causal-policy' },
		{ from: 2, to: 5, domain: 'production-systems' },
		{ from: 2, to: 6, domain: 'production-systems' },
		{ from: 3, to: 4, domain: 'statistical-ml' },
		{ from: 3, to: 6, domain: 'production-systems' },
		{ from: 4, to: 7, domain: 'statistical-ml' },
		{ from: 5, to: 7, domain: 'statistical-ml' },
		{ from: 5, to: 8, domain: 'causal-policy' },
		{ from: 6, to: 8, domain: 'causal-policy' },
		{ from: 5, to: 9, domain: 'production-systems' },
		{ from: 6, to: 9, domain: 'production-systems' },
		{ from: 7, to: 10, domain: 'statistical-ml' },
		{ from: 8, to: 11, domain: 'causal-policy' },
		{ from: 9, to: 12, domain: 'production-systems' }
	];

	onMount(() => {
		const canvas = canvasEl;
		const container = containerEl;
		if (!canvas || !container) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const media = window.matchMedia('(prefers-reduced-motion: reduce)');
		let reduced = media.matches;
		let visible = true;
		let rafId = 0;
		let width = 520;
		let height = 300;

		const resize = () => {
			// Read inner box via clientWidth/clientHeight so canvas never triggers ResizeObserver growth loops.
			const nextWidth = Math.max(280, container.clientWidth);
			const nextHeight = Math.max(240, container.clientHeight);
			const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
			const targetW = Math.round(nextWidth * dpr);
			const targetH = Math.round(nextHeight * dpr);
			width = nextWidth;
			height = nextHeight;
			if (canvas.width !== targetW || canvas.height !== targetH) {
				canvas.width = targetW;
				canvas.height = targetH;
			}
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		const drawFrame = (timeMs: number) => {
			ctx.clearRect(0, 0, width, height);
			const t = reduced ? 0 : timeMs * 0.001;

			const coords = NODES.map((n) => ({
				x: n.rx * width,
				y: n.ry * height,
				...n
			}));

			for (let i = 0; i < EDGES.length; i++) {
				const edge = EDGES[i];
				const a = coords[edge.from];
				const b = coords[edge.to];
				const isDomain = edge.domain === activeDomain;
				const midX = (a.x + b.x) / 2;

				ctx.beginPath();
				ctx.moveTo(a.x, a.y);
				ctx.bezierCurveTo(midX, a.y, midX, b.y, b.x, b.y);
				ctx.strokeStyle = isDomain
					? edge.domain === 'production-systems'
						? 'rgba(184, 56, 30, 0.72)'
						: 'rgba(15, 118, 110, 0.78)'
					: 'rgba(180, 174, 162, 0.45)';
				ctx.lineWidth = isDomain ? 2 : 1;
				ctx.stroke();

				if (!reduced && isDomain) {
					const u = (t * 0.48 + i * 0.19) % 1;
					const inv = 1 - u;
					const px =
						inv * inv * inv * a.x +
						3 * inv * inv * u * midX +
						3 * inv * u * u * midX +
						u * u * u * b.x;
					const py =
						inv * inv * inv * a.y +
						3 * inv * inv * u * a.y +
						3 * inv * u * u * b.y +
						u * u * u * b.y;

					ctx.beginPath();
					ctx.arc(px, py, 3.2, 0, Math.PI * 2);
					ctx.fillStyle = edge.domain === 'production-systems' ? '#B8381E' : '#0F766E';
					ctx.fill();
				}
			}

			for (let i = 0; i < coords.length; i++) {
				const node = coords[i];
				const dist = pointer.active ? Math.hypot(pointer.x - node.x, pointer.y - node.y) : 999;
				const nearPointer = dist < 56;
				const isDomainNode = node.domain === activeDomain;
				const radius = node.layer === 2 ? 7 : 5.5;

				if (nearPointer || isDomainNode) {
					ctx.beginPath();
					ctx.arc(node.x, node.y, radius + 6, 0, Math.PI * 2);
					ctx.fillStyle =
						activeDomain === 'production-systems'
							? 'rgba(184, 56, 30, 0.14)'
							: 'rgba(15, 118, 110, 0.14)';
					ctx.fill();
				}

				ctx.beginPath();
				ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
				ctx.fillStyle = isDomainNode
					? activeDomain === 'production-systems'
						? '#B8381E'
						: '#0F766E'
					: nearPointer
						? '#111317'
						: '#FAF9F5';
				ctx.fill();
				ctx.lineWidth = 1.6;
				ctx.strokeStyle = isDomainNode ? '#111317' : '#4B525A';
				ctx.stroke();

				if (node.label) {
					ctx.font = '600 9.5px "JetBrains Mono", monospace';
					ctx.fillStyle = isDomainNode ? '#111317' : '#4B525A';
					ctx.textAlign = 'center';
					ctx.fillText(node.label, node.x, node.y - 12);
				}
			}
		};

		const loop = (now: number) => {
			if (!visible || document.hidden || reduced) return;
			drawFrame(now);
			rafId = window.requestAnimationFrame(loop);
		};

		const startLoop = () => {
			window.cancelAnimationFrame(rafId);
			if (reduced) {
				drawFrame(0);
			} else if (visible && !document.hidden) {
				rafId = window.requestAnimationFrame(loop);
			}
		};

		resize();
		renderCurrentFrame = () => drawFrame(reduced ? 0 : performance.now());
		startLoop();

		const ro = new ResizeObserver((entries) => {
			const entry = entries[0];
			if (!entry) return;
			const nextW = Math.max(280, Math.round(entry.contentRect.width));
			const nextH = Math.max(240, Math.round(entry.contentRect.height));
			if (nextW === width && nextH === height) return;
			resize();
			renderCurrentFrame?.();
		});
		ro.observe(container);

		const io = new IntersectionObserver(
			(entries) => {
				visible = entries.some((entry) => entry.isIntersecting);
				if (visible) startLoop();
				else window.cancelAnimationFrame(rafId);
			},
			{ threshold: 0.1 }
		);
		io.observe(container);

		const onMotion = (e: MediaQueryListEvent) => {
			reduced = e.matches;
			startLoop();
		};
		media.addEventListener('change', onMotion);

		return () => {
			renderCurrentFrame = null;
			window.cancelAnimationFrame(rafId);
			ro.disconnect();
			io.disconnect();
			media.removeEventListener('change', onMotion);
		};
	});
</script>

<div
	bind:this={containerEl}
	class="relative h-[280px] w-full overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--bg-plate)] sm:h-[310px]"
>
	<canvas
		bind:this={canvasEl}
		aria-label="Animated neural routing and causal calibration network"
		class="absolute inset-0 block h-full w-full"
		onpointermove={(e) => {
			const rect = e.currentTarget.getBoundingClientRect();
			pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
		}}
		onpointerleave={() => {
			pointer = { x: -999, y: -999, active: false };
		}}
	></canvas>
</div>
