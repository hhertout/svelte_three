import * as dat from 'lil-gui';
import Stats from 'three/addons/libs/stats.module.js';

/**
 * Class representing a Debug utility.
 */
export default class Debug {
	/**
	 * The HTML element wrapper for the debug UI.
	 */
	private wrapper: HTMLElement;

	/**
	 * Indicates whether the debug mode is active.
	 */
	public active: boolean;

	/**
	 * The GUI instance for debug controls.
	 */
	public ui?: dat.GUI;

	/**
	 * The Stats instance for performance monitoring.
	 */
	public stats?: Stats;

	/**
	 * Creates an instance of Debug.
	 * @param {HTMLElement} wrapper - The HTML element wrapper for the debug UI.
	 */
	constructor(wrapper: HTMLElement) {
		this.wrapper = wrapper;

		this.active = window.location.hash === '#debug';
		if (this.active) {
			this.stats = new Stats();
			this.wrapper.appendChild(this.stats.dom);

			this.ui = new dat.GUI();
			// @ts-ignore
			window.ui = this.ui;
		}
	}

	/**
	 * Updates the debug stats if debug mode is active.
	 */
	public update(): void {
		if (this.active) {
			this.stats?.update();
		}
	}
}
