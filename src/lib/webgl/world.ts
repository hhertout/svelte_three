import type { Scene } from 'three';
import Cube from './world/demo-cube/cube';

/**
 * Class representing a WebGL world.
 */
export default class WebGLWorld {
	/**
	 * The cube instance.
	 */
	cube?: Cube;

	/**
	 * Creates an instance of WebGLWorld.
	 * @param {Scene} scene - The scene to which objects will be added.
	 */
	constructor(private scene: Scene) {
		this.scene = scene;
	}

	/**
	 * Initializes the WebGL world by adding a cube.
	 */
	public init(): void {
		this.addCube();
	}

	private addCube(): void {
		this.cube = new Cube();
		const cubeMesh = this.cube.build();
		this.scene.add(cubeMesh);
	}
}
