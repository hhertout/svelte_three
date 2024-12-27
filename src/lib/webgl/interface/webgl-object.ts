import type { Mesh } from 'three';

export interface WebGLObjectInterface {
	build(...args: any): Mesh;
}
