import Camera from './composite/camera';
import Renderer from './composite/renderer';
import Debug from './debug/debug';
import Sizes from './utils/sizes';
import { PUBLIC_NODE_ENV } from '$env/static/public';
import WebGLWorld from './world';
import { Clock, Mesh, Object3D, Scene, Vector2 } from 'three';

export default class WebGLScene {
	private readonly canvas: HTMLCanvasElement;
	private readonly wrapper: HTMLElement;

	private scene: Scene;
	private camera: Camera;
	private renderer: Renderer;
	private world: WebGLWorld;
	#debug?: Debug;

	public sizes: Sizes;
	public clock: Clock;

	constructor(canvas: HTMLCanvasElement, wrapper: HTMLElement) {
		this.wrapper = wrapper;
		this.canvas = canvas;

		this.sizes = new Sizes({ width: this.canvas.clientWidth, height: this.canvas.clientHeight });
		this.scene = new Scene();
		this.clock = new Clock();
		this.camera = new Camera(this.sizes);
		this.world = new WebGLWorld(this.scene);
		this.renderer = new Renderer(this.canvas, this.scene, this.camera, this.sizes);
	}

	public init() {
		this.camera.activeOrbitControls(this.canvas);

		this.camera.init(this.scene);
		this.world.init();

		if (PUBLIC_NODE_ENV === 'development') {
			this.#debug = new Debug(this.wrapper);
		}

		window.addEventListener('resize', this.handleResize.bind(this));
		this.tick();
	}

	private handleResize() {
		// Update sizes based on canvas size, not window size
		this.sizes.resize(this.wrapper.clientWidth, this.wrapper.clientHeight);

		// Update camera and renderer
		this.camera.resize();
		this.renderer.resize();
	}

	private handleCanvasSizeHaveChanged() {
		this.#debug?.update();

		if (
			this.renderer.renderer.getSize(new Vector2()).x !== this.sizes.width ||
			this.renderer.renderer.getSize(new Vector2()).y !== this.sizes.height
		) {
			this.camera.update();
			this.renderer.renderer.setSize(this.sizes.width, this.sizes.height, false);
		}
	}

	private tick() {
		/* eslint @typescript-eslint/no-unused-vars:0  */
		const elapsedTime = this.clock.getElapsedTime();

		// Only resize if dimensions have changed (improves performance)
		this.handleCanvasSizeHaveChanged();

		// Render the scene
		this.renderer.renderer.render(this.scene, this.camera.camera);
		window.requestAnimationFrame(this.tick.bind(this));
	}

	public destroy() {
		window.removeEventListener('resize', this.handleResize.bind(this));

		//traverse the scene
		this.scene.traverse((child: Object3D) => {
			if (child instanceof Mesh) {
				child.geometry.dispose();

				for (const key in child.material) {
					const value = child.material[key];

					if (value && typeof value.dispose === 'function') value.dispose();
				}
			}
		});

		this.camera.disableOrbitControls();
		this.renderer.renderer.dispose();

		if (this.#debug?.ui && this.#debug.active) this.#debug.ui.destroy();
	}
}
