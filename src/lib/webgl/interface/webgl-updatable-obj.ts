import type { Scene } from 'three';

export interface WebGLUpdatableInterface {
	init(scene: Scene): void;
	update(): void;
}
