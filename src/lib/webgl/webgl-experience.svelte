<script lang="ts">
	import WebGLScene from '$lib/webgl/webgl-scene';
	import { onDestroy, onMount } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let props: { id: string } & HTMLAttributes<HTMLDivElement> = $props();

	let scene: WebGLScene;

	onMount(() => {
		const canvas = document.getElementById(props.id) as HTMLCanvasElement;
		const wrapper = document.getElementById(`${props.id}-wrapper`) as HTMLDivElement;

		scene = new WebGLScene(canvas, wrapper);
		scene.init();
	});

	onDestroy(() => {
		if (scene instanceof WebGLScene) {
			scene.destroy();
		}
	});
</script>

<div {...{ ...props, id: `${props.id}-wrapper` }}>
	<canvas id={props.id} class="canvas-element"></canvas>
</div>

<style>
	.canvas-element {
		width: 100%;
		height: 100%;
	}
</style>
