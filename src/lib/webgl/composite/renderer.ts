import type Camera from './camera';
import type Sizes from '../utils/sizes';
import type { WebGLUpdatableInterface } from '../interface/webgl-updatable-obj';
import { CineonToneMapping, PCFSoftShadowMap, Scene, WebGLRenderer } from 'three';

/**
 * Class representing a Renderer.
 * @implements {WebGLUpdatableInterface}
 */
export default class Renderer implements WebGLUpdatableInterface {
	/**
	 * The WebGL renderer instance.
	 */
	renderer: WebGLRenderer;

	/**
	 * Creates an instance of Renderer.
	 * @param {HTMLCanvasElement} canvas - The canvas element to render on.
	 * @param {Scene} scene - The scene to render.
	 * @param {Camera} camera - The camera to use for rendering.
	 * @param {Sizes} sizes - The size object containing width and height.
	 */
	constructor(
		private canvas: HTMLCanvasElement,
		private scene: Scene,
		private camera: Camera,
		private sizes: Sizes
	) {
		this.canvas = canvas;
		this.sizes = sizes;

		this.renderer = new WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
			alpha: true
		});

		// this.renderer.setClearColor('#211d20');
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
	}

	/**
	 * Initializes the renderer with specific settings.
	 * @param {Scene} _ - The scene to initialize (unused).
	 */
	init(_: Scene): void {
		this.renderer.toneMapping = CineonToneMapping;
		this.renderer.toneMappingExposure = 1.75;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = PCFSoftShadowMap;
	}

	/**
	 * Updates the renderer's size and pixel ratio based on the current sizes.
	 */
	public resize(): void {
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
	}

	/**
	 * Renders the scene using the camera.
	 */
	public update(): void {
		this.renderer.render(this.scene, this.camera.camera);
	}
}
