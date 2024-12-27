/**
 * Class representing the sizes of the viewport.
 */
export default class Sizes {
	/**
	 * The width of the viewport.
	 */
	public width: number;

	/**
	 * The height of the viewport.
	 */
	public height: number;

	/**
	 * The pixel ratio of the device.
	 */
	public pixelRatio: number;

	/**
	 * Creates an instance of Sizes.
	 * @param {Object} param0 - The dimensions of the viewport.
	 * @param {number} param0.width - The width of the viewport.
	 * @param {number} param0.height - The height of the viewport.
	 */
	constructor({ width, height }: { width: number; height: number }) {
		this.width = width;
		this.height = height;
		this.pixelRatio = Math.min(window.devicePixelRatio, 2);
	}

	/**
	 * Resizes the dimensions of the viewport.
	 * @param {number} width - The new width of the viewport.
	 * @param {number} height - The new height of the viewport.
	 */
	public resize(width: number, height: number): void {
		this.width = width;
		this.height = height;
	}
}
