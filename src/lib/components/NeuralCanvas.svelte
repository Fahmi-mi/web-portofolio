<script lang="ts">
	import { onMount } from 'svelte';
	import {
		PORTFOLIO_GRAPH_EDGES,
		PORTFOLIO_GRAPH_NODES,
		findNearestProjectedNode,
		projectPoint3D,
		rotatePoint3D,
		type GraphClusterId,
		type GraphNodeDef,
		type ProjectedNode
	} from '$lib/utils/graph3d';

	interface Props {
		activeCluster?: GraphClusterId;
		onHoverNode?: (node: GraphNodeDef | null) => void;
		onSelectNode?: (node: GraphNodeDef) => void;
	}

	let { activeCluster = 'all', onHoverNode, onSelectNode }: Props = $props();

	let canvasEl = $state<HTMLCanvasElement | null>(null);
	let containerEl = $state<HTMLDivElement | null>(null);
	let hoveredNode = $state<GraphNodeDef | null>(null);
	let isDragging = $state(false);
	let renderCurrentFrame: (() => void) | null = null;

	$effect(() => {
		activeCluster;
		renderCurrentFrame?.();
	});

	const CLUSTER_COLORS: Record<GraphNodeDef['cluster'], { stroke: string; fill: string; soft: string }> = {
		'ai-ml': {
			stroke: '#0F766E',
			fill: '#0F766E',
			soft: 'rgba(15, 118, 110, 0.16)'
		},
		platforms: {
			stroke: '#111317',
			fill: '#111317',
			soft: 'rgba(17, 19, 23, 0.12)'
		},
		tooling: {
			stroke: '#B8381E',
			fill: '#B8381E',
			soft: 'rgba(184, 56, 30, 0.16)'
		}
	};

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
		let width = 540;
		let height = 400;

		let yaw = -0.35;
		let pitch = 0.22;
		const BASE_YAW_SPEED = 0.00065;
		let velYaw = BASE_YAW_SPEED;
		let pointer = { x: -999, y: -999, active: false };
		let dragState: { startX: number; startY: number; baseYaw: number; basePitch: number; moved: number } | null = null;
		let lastProjected: ProjectedNode[] = [];

		const resize = () => {
			const nextWidth = Math.max(280, container.clientWidth);
			const nextHeight = Math.max(300, container.clientHeight);
			const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
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

		const setHovered = (node: GraphNodeDef | null) => {
			if (hoveredNode?.id === node?.id) return;
			hoveredNode = node;
			onHoverNode?.(node);
		};

		const drawOrbitRing = (tiltAngle: number, rotYaw: number, rotPitch: number, alpha: number) => {
			ctx.beginPath();
			const segments = 56;
			for (let i = 0; i <= segments; i++) {
				const a = (i / segments) * Math.PI * 2;
				const lx = Math.cos(a) * 0.98;
				const ly = Math.sin(a) * Math.sin(tiltAngle) * 0.98;
				const lz = Math.sin(a) * Math.cos(tiltAngle) * 0.98;
				const r = rotatePoint3D(lx, ly, lz, rotPitch, rotYaw);
				const p = projectPoint3D(r.rx, r.ry, r.rz, width, height);
				if (i === 0) ctx.moveTo(p.sx, p.sy);
				else ctx.lineTo(p.sx, p.sy);
			}
			ctx.strokeStyle = `rgba(17, 19, 23, ${alpha})`;
			ctx.lineWidth = 1;
			ctx.stroke();
		};

		const drawFrame = (timeMs: number) => {
			ctx.clearRect(0, 0, width, height);
			const t = reduced ? 0 : timeMs * 0.001;

			if (!reduced && !dragState) {
				const slowFactor = hoveredNode ? 0.15 : 1;
				velYaw += (BASE_YAW_SPEED - velYaw) * 0.04;
				yaw += velYaw * slowFactor;
			}

			const subtleTiltX = pointer.active && !reduced ? ((pointer.y / height - 0.5) * 0.08) : 0;
			const subtleTiltY = pointer.active && !reduced ? ((pointer.x / width - 0.5) * 0.08) : 0;
			const curPitch = pitch + subtleTiltX;
			const curYaw = yaw + subtleTiltY;

			// Atmospheric tilted spatial rings that anchor the 3D volume cleanly with zero boxes
			drawOrbitRing(0.45, curYaw, curPitch, 0.065);
			drawOrbitRing(-0.78, curYaw + 0.5, curPitch, 0.05);

			const projectedMap = new Map<string, ProjectedNode>();
			const projected: ProjectedNode[] = PORTFOLIO_GRAPH_NODES.map((node) => {
				const rot = rotatePoint3D(node.x, node.y, node.z, curPitch, curYaw);
				const proj = projectPoint3D(rot.rx, rot.ry, rot.rz, width, height);
				const item: ProjectedNode = { ...node, ...rot, ...proj };
				projectedMap.set(node.id, item);
				return item;
			});
			lastProjected = projected;

			if (pointer.active && !dragState) {
				const hit = findNearestProjectedNode(projected, pointer.x, pointer.y, 32);
				setHovered(hit);
			}

			const focusId = hoveredNode?.id ?? null;
			const connectedToFocus = new Set<string>();
			if (focusId) {
				connectedToFocus.add(focusId);
				for (const edge of PORTFOLIO_GRAPH_EDGES) {
					if (edge.from === focusId) connectedToFocus.add(edge.to);
					if (edge.to === focusId) connectedToFocus.add(edge.from);
				}
			}

			// Paint edges softly curved outward slightly in screen space for clean 3D tension
			for (let i = 0; i < PORTFOLIO_GRAPH_EDGES.length; i++) {
				const edge = PORTFOLIO_GRAPH_EDGES[i];
				const a = projectedMap.get(edge.from);
				const b = projectedMap.get(edge.to);
				if (!a || !b) continue;

				const avgDepth = (a.depthAlpha + b.depthAlpha) * 0.5;
				const touchesFocus = focusId !== null && (edge.from === focusId || edge.to === focusId);
				const inCluster =
					activeCluster === 'all' || a.cluster === activeCluster || b.cluster === activeCluster;

				let edgeAlpha = 0.14 * avgDepth;
				if (focusId) {
					edgeAlpha = touchesFocus ? 0.72 : 0.04;
				} else if (activeCluster !== 'all') {
					edgeAlpha = a.cluster === activeCluster && b.cluster === activeCluster ? 0.55 * avgDepth : 0.06;
				} else if (inCluster) {
					edgeAlpha = 0.22 * avgDepth;
				}

				const midX = (a.sx + b.sx) * 0.5;
				const midY = (a.sy + b.sy) * 0.5;
				const ctrlX = midX + (midX - width * 0.5) * 0.14;
				const ctrlY = midY + (midY - height * 0.5) * 0.14;

				const accentHex = touchesFocus && focusId
					? CLUSTER_COLORS[projectedMap.get(focusId)?.cluster ?? a.cluster].fill
					: a.cluster === 'tooling' || b.cluster === 'tooling'
						? '#B8381E'
						: a.cluster === 'ai-ml' || b.cluster === 'ai-ml'
							? '#0F766E'
							: '#111317';

				ctx.beginPath();
				ctx.moveTo(a.sx, a.sy);
				ctx.quadraticCurveTo(ctrlX, ctrlY, b.sx, b.sy);
				ctx.strokeStyle =
					touchesFocus || (activeCluster !== 'all' && a.cluster === activeCluster && b.cluster === activeCluster)
						? accentHex === '#0F766E'
							? `rgba(15, 118, 110, ${edgeAlpha})`
							: accentHex === '#B8381E'
								? `rgba(184, 56, 30, ${edgeAlpha})`
								: `rgba(17, 19, 23, ${edgeAlpha})`
						: `rgba(75, 82, 90, ${edgeAlpha})`;
				ctx.lineWidth = touchesFocus ? 1.9 : 1.05 * ((a.scale + b.scale) * 0.5);
				ctx.stroke();

				// Animated signal pulse traveling along focused or primary cluster edges
				const shouldPulse =
					!reduced &&
					(touchesFocus ||
						(!focusId && activeCluster !== 'all' && a.cluster === activeCluster && b.cluster === activeCluster) ||
						(!focusId && activeCluster === 'all' && i % 4 === 0));
				if (shouldPulse) {
					const u = (t * 0.24 + i * 0.23) % 1;
					const inv = 1 - u;
					const px = inv * inv * a.sx + 2 * inv * u * ctrlX + u * u * b.sx;
					const py = inv * inv * a.sy + 2 * inv * u * ctrlY + u * u * b.sy;
					ctx.beginPath();
					ctx.arc(px, py, touchesFocus ? 2.8 : 2.1, 0, Math.PI * 2);
					ctx.fillStyle = accentHex;
					ctx.fill();
				}
			}

			// Sort back-to-front by rotated z depth (larger z = further away)
			const sortedNodes = [...projected].sort((u, v) => v.rz - u.rz);

			for (const node of sortedNodes) {
				const style = CLUSTER_COLORS[node.cluster];
				const isFocus = focusId === node.id;
				const isNeighbor = focusId !== null && connectedToFocus.has(node.id);
				const isClusterMatch = activeCluster === 'all' || node.cluster === activeCluster;

				let alpha = node.depthAlpha;
				if (focusId) {
					alpha = isFocus ? 1 : isNeighbor ? Math.max(0.7, node.depthAlpha) : 0.18;
				} else if (!isClusterMatch) {
					alpha = 0.22;
				}

				const radius = node.radius * node.scale * (isFocus ? 1.28 : 1);

				ctx.save();
				ctx.globalAlpha = alpha;

				if (isFocus || (node.section === 'about' && isClusterMatch && !focusId)) {
					const breath = reduced ? 0 : Math.sin(t * 2.4 + node.x * 3) * 1.8;
					ctx.beginPath();
					ctx.arc(node.sx, node.sy, radius + 6.5 + breath, 0, Math.PI * 2);
					ctx.fillStyle = style.soft;
					ctx.fill();
				}

				// Clean bone backing halo prevents crossing lines from clipping node edge
				ctx.beginPath();
				ctx.arc(node.sx, node.sy, radius + 2, 0, Math.PI * 2);
				ctx.fillStyle = '#F7F7F4';
				ctx.fill();

				ctx.beginPath();
				ctx.arc(node.sx, node.sy, radius, 0, Math.PI * 2);
				ctx.fillStyle = node.section === 'about' || isFocus || isNeighbor ? style.fill : '#FFFFFF';
				ctx.fill();
				ctx.lineWidth = isFocus ? 2 : 1.5;
				ctx.strokeStyle = style.stroke;
				ctx.stroke();

				// Render crisp non-cluttered typography for front/important/focused nodes
				const showLabel =
					isFocus ||
					isNeighbor ||
					(isClusterMatch && (node.section === 'about' || node.rz < 0.08 || activeCluster !== 'all'));

				if (showLabel) {
					ctx.font = `${isFocus || node.section === 'about' ? '600' : '500'} ${isFocus ? 11 : 10}px "JetBrains Mono", monospace`;
					ctx.textAlign = 'center';
					const labelY = node.sy - radius - 8;

					// Crisp subtle bone halo behind text so overlapping lines never muddy typography
					ctx.lineWidth = 3;
					ctx.strokeStyle = 'rgba(247, 247, 244, 0.92)';
					ctx.strokeText(node.shortLabel, node.sx, labelY);

					ctx.fillStyle = isFocus ? '#111317' : node.section === 'about' ? style.stroke : '#374151';
					ctx.fillText(node.shortLabel, node.sx, labelY);
				}

				ctx.restore();
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
			const nextH = Math.max(300, Math.round(entry.contentRect.height));
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
			{ threshold: 0.05 }
		);
		io.observe(container);

		const handlePointerDown = (e: PointerEvent) => {
			const rect = canvas.getBoundingClientRect();
			const px = e.clientX - rect.left;
			const py = e.clientY - rect.top;
			isDragging = true;
			dragState = { startX: px, startY: py, baseYaw: yaw, basePitch: pitch, moved: 0 };
			canvas.setPointerCapture(e.pointerId);
		};

		const handlePointerMove = (e: PointerEvent) => {
			const rect = canvas.getBoundingClientRect();
			const px = e.clientX - rect.left;
			const py = e.clientY - rect.top;
			pointer = { x: px, y: py, active: true };

			if (dragState) {
				const dx = px - dragState.startX;
				const dy = py - dragState.startY;
				dragState.moved = Math.hypot(dx, dy);
				yaw = dragState.baseYaw + dx * 0.0085;
				pitch = Math.max(-1.05, Math.min(1.05, dragState.basePitch + dy * 0.0065));
				velYaw = Math.max(-0.006, Math.min(0.006, dx * 0.00009 || BASE_YAW_SPEED));
				if (reduced) renderCurrentFrame?.();
			} else if (reduced) {
				const hit = findNearestProjectedNode(lastProjected, px, py, 32);
				setHovered(hit);
				renderCurrentFrame?.();
			}
		};

		const handlePointerUp = (e: PointerEvent) => {
			const rect = canvas.getBoundingClientRect();
			const px = e.clientX - rect.left;
			const py = e.clientY - rect.top;
			const wasClick = dragState && dragState.moved < 6;
			dragState = null;
			isDragging = false;
			if (canvas.hasPointerCapture(e.pointerId)) {
				canvas.releasePointerCapture(e.pointerId);
			}
			if (wasClick) {
				const hit = findNearestProjectedNode(lastProjected, px, py, 34);
				if (hit) {
					setHovered(hit);
					onSelectNode?.(hit);
				}
			}
		};

		const handlePointerLeave = () => {
			pointer = { x: -999, y: -999, active: false };
			if (!dragState) {
				setHovered(null);
				if (reduced) renderCurrentFrame?.();
			}
		};

		canvas.addEventListener('pointerdown', handlePointerDown);
		canvas.addEventListener('pointermove', handlePointerMove);
		canvas.addEventListener('pointerup', handlePointerUp);
		canvas.addEventListener('pointerleave', handlePointerLeave);

		const onMotion = (e: MediaQueryListEvent) => {
			reduced = e.matches;
			startLoop();
		};
		media.addEventListener('change', onMotion);

		return () => {
			renderCurrentFrame = null;
			window.cancelAnimationFrame(rafId);
			canvas.removeEventListener('pointerdown', handlePointerDown);
			canvas.removeEventListener('pointermove', handlePointerMove);
			canvas.removeEventListener('pointerup', handlePointerUp);
			canvas.removeEventListener('pointerleave', handlePointerLeave);
			ro.disconnect();
			io.disconnect();
			media.removeEventListener('change', onMotion);
		};
	});
</script>

<div bind:this={containerEl} class="relative h-[330px] w-full sm:h-[390px] lg:h-[430px]">
	<canvas
		bind:this={canvasEl}
		aria-label="Interactive 3D portfolio knowledge graph connecting projects, systems, and experience"
		class="block h-full w-full touch-pan-y"
		class:cursor-pointer={hoveredNode !== null && !isDragging}
		class:cursor-grab={hoveredNode === null && !isDragging}
		class:cursor-grabbing={isDragging}
	></canvas>
</div>
