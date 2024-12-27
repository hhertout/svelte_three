import { BoxGeometry, Mesh, ShaderMaterial } from 'three';
import type { WebGLObjectInterface } from '../../interface/webgl-object';
// @ts-ignore
import vertexShader from './vertex-shaders.glsl';
// @ts-ignore
import fragmentShader from './fragment-shaders.glsl';

export default class Cube implements WebGLObjectInterface {
	public geometry: BoxGeometry;
	public material: ShaderMaterial;

	constructor() {
		this.geometry = new BoxGeometry(5, 5, 5);
		this.material = new ShaderMaterial({
			vertexShader,
			fragmentShader
		});
	}

	build() {
		return new Mesh(this.geometry, this.material);
	}
}
