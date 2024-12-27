import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type Sizes from '../utils/sizes';
import type { WebGLUpdatableInterface } from '../interface/webgl-updatable-obj';
import { PerspectiveCamera, type Scene } from 'three';

/**
 * Class representing a Camera.
 * @implements {WebGLUpdatableInterface}
 */
export default class Camera implements WebGLUpdatableInterface {
	/**
	 * The perspective camera instance.
	 */
	public camera: PerspectiveCamera;

	/**
	 * The size object containing width and height.
	 */
	public sizes: Sizes;

	/**
	 * Optional private property for orbit controls.
	 */
	#controls?: OrbitControls;

	/**
	 * Creates an instance of Camera.
	 * @param {Sizes} size - An object containing the width and height for the camera's aspect ratio.
	 */
	constructor(size: Sizes) {
		this.sizes = size;
		this.camera = new PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100);
		this.camera.position.set(3, 3, 10);
	}

	/**
	 * Adds the camera to the provided scene.
	 * @param {Scene} scene - The scene to which the camera will be added.
	 */
	init(scene: Scene): void {
		scene.add(this.camera);
	}

	/**
	 * Updates the camera's aspect ratio and projection matrix based on the current sizes.
	 */
	public resize(): void {
		this.camera.aspect = this.sizes.width / this.sizes.height;
		this.camera.updateProjectionMatrix();
	}

	/**
	 * Updates the orbit controls if they are enabled.
	 */
	public update(): void {
		this.#controls?.update();
	}

	/**
	 * Activates orbit controls for the camera using the provided canvas element.
	 * @param {HTMLCanvasElement} canvas - The canvas element to attach the orbit controls to.
	 */
	public activeOrbitControls(canvas: HTMLCanvasElement): void {
		this.#controls = new OrbitControls(this.camera, canvas);
		this.#controls.enableDamping = true;
	}

	/**
	 * Disposes of the orbit controls if they are enabled.
	 */
	public disableOrbitControls(): void {
		this.#controls?.dispose();
	}
}
