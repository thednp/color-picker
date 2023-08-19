import Color from '@thednp/color';
import { ColorFormats, HSLA, HSVA, HWBA, RGBA } from '@thednp/color';

declare class ColorPalette {
	static Color: typeof Color;
	hue: number;
	hueSteps: number;
	lightSteps: number;
	saturation: number;
	colors: Color[];
	/**
	 * The `hue` parameter is optional, which would be set to 0.
	 * * `args.hue` the starting Hue [0, 360]
	 * * `args.hueSteps` Hue Steps Count [5, 24]
	 * * `args.lightSteps` Lightness Steps Count [5, 12]
	 * * `args.saturation` Saturation [0, 100]
	 */
	constructor(...args: [
		number?,
		number?,
		number?,
		number?
	]);
}
export interface ColorPickerLabels {
	pickerLabel: string;
	appearanceLabel: string;
	valueLabel: string;
	toggleLabel: string;
	presetsLabel: string;
	defaultsLabel: string;
	formatLabel: string;
	alphaLabel: string;
	hexLabel: string;
	hueLabel: string;
	whitenessLabel: string;
	blacknessLabel: string;
	saturationLabel: string;
	lightnessLabel: string;
	redLabel: string;
	greenLabel: string;
	blueLabel: string;
	[key: string]: string;
}
export interface ColorPickerOptions {
	colorLabels: string | string[];
	componentLabels: ColorPickerLabels;
	format: ColorFormats;
	colorPresets: string | string[] | ColorPalette | false;
	colorKeywords: string | string[] | false;
}
export interface ColorNames {
	white: string;
	black: string;
	grey: string;
	red: string;
	orange: string;
	brown: string;
	gold: string;
	olive: string;
	yellow: string;
	lime: string;
	green: string;
	teal: string;
	cyan: string;
	blue: string;
	violet: string;
	magenta: string;
	pink: string;
	[key: string]: string;
}
/**
 * Color Picker Web Component
 *
 * @see http://thednp.github.io/color-picker
 */
export default class ColorPicker {
	static Color: typeof Color;
	static ColorPalette: typeof ColorPalette;
	static getInstance: (element: HTMLInputElement) => ColorPicker | null;
	static init: (element: HTMLInputElement) => ColorPicker;
	static selector: string;
	static roundPart: (v: number) => number;
	static setElementStyle: (element: HTMLElement, styles: Partial<import("@thednp/shorty").CSS4Declaration>) => void;
	static setAttribute: (element: HTMLElement, att: string, value: string) => void;
	static getBoundingClientRect: (element: HTMLElement, includeScale?: boolean | undefined) => import("@thednp/shorty").BoundingClientRect;
	static version: string;
	static colorNames: string[];
	static colorPickerLabels: ColorPickerLabels;
	id: number;
	input: HTMLInputElement;
	color: Color;
	format: string;
	parent: HTMLElement;
	dragElement: HTMLElement | undefined;
	isOpen: boolean;
	controlPositions: {
		c1x: number;
		c1y: number;
		c2y: number;
		c3y: number;
	};
	colorLabels: ColorNames;
	colorKeywords: string[] | false;
	colorPresets: ColorPalette | string[] | false;
	componentLabels: ColorPickerLabels;
	pickerToggle: HTMLElement;
	menuToggle: HTMLElement;
	colorPicker: HTMLElement;
	colorMenu: HTMLElement;
	controls: HTMLElement;
	inputs: HTMLInputElement[];
	controlKnobs: HTMLElement[];
	visuals: HTMLElement[];
	/**
	 * Returns a new `ColorPicker` instance. The target of this constructor
	 * must be an `HTMLInputElement`.
	 *
	 * @param target the target `<input>` element
	 * @param config instance options
	 */
	constructor(target: (HTMLElement & HTMLInputElement) | string, config?: Partial<ColorPickerOptions>);
	/** Returns the current colour value */
	get value(): string;
	/**
	 * Sets a new colour value.
	 *
	 * @param {string} v new colour value
	 */
	set value(v: string);
	/** Check if the colour presets include any non-colour. */
	get hasNonColor(): boolean;
	/** Returns hexadecimal value of the current colour. */
	get hex(): string;
	/** Returns the current colour value in {h,s,v,a} object format. */
	get hsv(): HSVA;
	/** Returns the current colour value in {h,s,l,a} object format. */
	get hsl(): HSLA;
	/** Returns the current colour value in {h,w,b,a} object format. */
	get hwb(): HWBA;
	/** Returns the current colour value in {r,g,b,a} object format. */
	get rgb(): RGBA;
	/** Returns the current colour brightness. */
	get brightness(): number;
	/** Returns the current colour luminance. */
	get luminance(): number;
	/** Checks if the current colour requires a light text colour. */
	get isDark(): boolean;
	/** Checks if the current input value is a valid colour. */
	get isValid(): boolean;
	/** Returns the colour appearance, usually the closest colour name for the current value. */
	get appearance(): string;
	/** Updates `ColorPicker` visuals. */
	updateVisuals(): void;
	/**
	 * The `ColorPicker` *focusout* event listener when open.
	 *
	 * @param e
	 * @this {ColorPicker}
	 */
	handleFocusOut: ({ relatedTarget }: FocusEvent & {
		relatedTarget: HTMLElement;
	}) => void;
	/**
	 * The `ColorPicker` *keyup* event listener when open.
	 *
	 * @param e
	 * @this {ColorPicker}
	 */
	handleDismiss: ({ code }: KeyboardEvent) => void;
	/**
	 * The `ColorPicker` *scroll* event listener when open.
	 *
	 * @param e
	 */
	handleScroll: (e: Event) => void;
	/**
	 * The `ColorPicker` keyboard event listener for menu navigation.
	 *
	 * @param e
	 */
	menuKeyHandler: (e: KeyboardEvent & {
		target: HTMLElement;
	}) => void;
	/**
	 * The `ColorPicker` click event listener for the colour menu presets / defaults.
	 *
	 * @param e
	 * @this {ColorPicker}
	 */
	menuClickHandler: (e: Event) => void;
	/**
	 * The `ColorPicker` *touchstart* / *mousedown* events listener for control knobs.
	 *
	 * @param e
	 */
	pointerDown: (e: PointerEvent & {
		target: HTMLElement;
	}) => void;
	/**
	 * The `ColorPicker` *touchend* / *mouseup* events listener for control knobs.
	 *
	 * @param e
	 * @this
	 */
	pointerUp: ({ target }: PointerEvent & {
		target: HTMLElement;
	}) => void;
	/**
	 * The `ColorPicker` *touchmove* / *mousemove* events listener for control knobs.
	 *
	 * @param {PointerEvent} e
	 */
	pointerMove: (e: PointerEvent) => void;
	/**
	 * The `ColorPicker` *keydown* event listener for control knobs.
	 *
	 * @param e
	 */
	handleKnobs: (e: Event & {
		code: string;
	}) => void;
	/** The event listener of the colour form inputs. */
	changeHandler: () => void;
	/**
	 * Updates `ColorPicker` first control:
	 * * `lightness` and `saturation` for HEX/RGB;
	 * * `lightness` and `hue` for HSL.
	 *
	 * @param X the X component of the offset
	 * @param Y the Y component of the offset
	 */
	changeControl1(X: number, Y: number): void;
	/**
	 * Updates `ColorPicker` second control:
	 * * `hue` for HEX/RGB/HWB;
	 * * `saturation` for HSL.
	 *
	 * @param Y the Y offset
	 */
	changeControl2(Y: number): void;
	/**
	 * Updates `ColorPicker` last control,
	 * the `alpha` channel.
	 *
	 * @param Y
	 */
	changeAlpha(Y: number): void;
	/**
	 * Updates `ColorPicker` control positions on:
	 * * initialization
	 * * window resize
	 */
	update: () => void;
	/** Updates the open dropdown position on *scroll* event. */
	updateDropdownPosition(): void;
	/** Updates control knobs' positions. */
	setControlPositions(): void;
	/** Update the visual appearance label and control knob labels. */
	updateAppearance(): void;
	/** Updates the control knobs actual positions. */
	updateControls(): void;
	/**
	 * Updates all color form inputs.
	 *
	 * @param isPrevented when `true`, the component original event is prevented
	 */
	updateInputs(isPrevented?: boolean): void;
	/**
	 * Toggle the `ColorPicker` dropdown visibility.
	 *
	 * @param e
	 */
	togglePicker: (e?: Event) => void;
	/** Shows the `ColorPicker` dropdown. */
	showPicker: () => void;
	/**
	 * Toggles the visibility of the `ColorPicker` presets menu.
	 *
	 * @param e
	 * @this {ColorPicker}
	 */
	toggleMenu: (e?: Event) => void;
	/**
	 * Hides the currently open `ColorPicker` dropdown.
	 *
	 * @param {boolean=} focusPrevented
	 */
	hide(focusPrevented?: boolean): void;
	/** Removes `ColorPicker` from target `<input>`. */
	dispose(): void;
}

export as namespace ColorPicker;

export {};
