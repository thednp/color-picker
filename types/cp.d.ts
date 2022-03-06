declare module "color-picker/src/js/util/colorNames" {
    export default colorNames;
    /**
     * A complete list of web safe colors.
     * @see https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json
     * @type {string[]}
     */
    const colorNames: string[];
}
declare module "color-picker/src/js/color" {
    /**
     * Returns a new `Color` instance.
     * @see https://github.com/bgrins/TinyColor
     * @class
     */
    export default class Color {
        /**
         * @constructor
         * @param {CP.ColorInput} input
         * @param {CP.ColorOptions=} config
         */
        constructor(input: CP.ColorInput, config?: CP.ColorOptions | undefined);
        /** @type {CP.ColorInput} */
        originalInput: CP.ColorInput;
        /** @type {number} */
        r: number;
        /** @type {number} */
        g: number;
        /** @type {number} */
        b: number;
        /** @type {number} */
        a: number;
        /** @type {boolean} */
        ok: boolean;
        /** @type {number} */
        roundA: number;
        /** @type {CP.ColorFormats} */
        format: CP.ColorFormats;
        /**
         * Checks if the current input value is a valid colour.
         * @returns {boolean} the query result
         */
        get isValid(): boolean;
        /**
         * Checks if the current colour requires a light text colour.
         * @returns {boolean} the query result
         */
        get isDark(): boolean;
        /**
         * Returns the perceived luminance of a color.
         * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
         * @returns {number} a number in [0-1] range
         */
        get luminance(): number;
        /**
         * Returns the perceived brightness of the color.
         * @returns {number} a number in [0-255] range
         */
        get brightness(): number;
        /**
         * Returns the color as a RGBA object.
         * @returns {CP.RGBA}
         */
        toRgb(): CP.RGBA;
        /**
         * Returns the RGBA values concatenated into a string.
         * @returns {string} the CSS valid color in RGB/RGBA format
         */
        toRgbString(): string;
        /**
         * Returns the HEX value of the color.
         * @returns {string} the hexadecimal color format
         */
        toHex(): string;
        /**
         * Returns the HEX value of the color.
         * @returns {string} the CSS valid color in hexadecimal format
         */
        toHexString(): string;
        /**
         * Returns the color as a HSVA object.
         * @returns {CP.HSVA} the `{h,s,v,a}` object
         */
        toHsv(): CP.HSVA;
        /**
         * Returns the color as a HSLA object.
         * @returns {CP.HSLA}
         */
        toHsl(): CP.HSLA;
        /**
         * Returns the HSLA values concatenated into a string.
         * @returns {string} the CSS valid color in HSL/HSLA format
         */
        toHslString(): string;
        /**
         * Sets the alpha value on the current color.
         * @param {number} alpha a new alpha value in [0-1] range.
         * @returns {Color} a new `Color` instance
         */
        setAlpha(alpha: number): Color;
        /**
         * Saturate the color with a given amount.
         * @param {number=} amount a value in [0-100] range
         * @returns {Color} a new `Color` instance
         */
        saturate(amount?: number | undefined): Color;
        /**
         * Desaturate the color with a given amount.
         * @param {number=} amount a value in [0-100] range
         * @returns {Color} a new `Color` instance
         */
        desaturate(amount?: number | undefined): Color;
        /**
         * Completely desaturates a color into greyscale.
         * Same as calling `desaturate(100)`
         * @returns {Color} a new `Color` instance
         */
        greyscale(): Color;
        /** Returns a clone of the current `Color` instance. */
        clone(): Color;
        /**
         * Returns the color value in CSS valid string format.
         * @returns {string}
         */
        toString(): string;
    }
}
declare module "color-picker/src/js/util/vHidden" {
    export default vHidden;
    const vHidden: "v-hidden";
}
declare module "color-picker/src/js/util/getColorForm" {
    /**
     * Returns the color form.
     * @param {CP.ColorPicker} self the `ColorPicker` instance
     * @returns {HTMLElement | Element}
     */
    export default function getColorForm(self: CP.ColorPicker): HTMLElement | Element;
}
declare module "color-picker/src/js/util/getColorControl" {
    /**
     * Returns a new color control `HTMLElement`.
     * @param {number} iteration
     * @param {number} id
     * @param {number} width
     * @param {number} height
     * @param {string=} labelledby
     * @returns {HTMLElement | Element}
     */
    export default function getColorControl(iteration: number, id: number, width: number, height: number, labelledby?: string | undefined): HTMLElement | Element;
}
declare module "color-picker/src/js/color-picker" {
    /**
     * Color Picker
     * @see http://thednp.github.io/color-picker
     */
    export default class ColorPicker {
        /**
         * Returns a new ColorPicker instance.
         * @param {HTMLInputElement | string} target the target `<input>` element
         */
        constructor(target: HTMLInputElement | string);
        /** @type {HTMLInputElement} */
        input: HTMLInputElement;
        /** @type {HTMLElement} */
        parent: HTMLElement;
        /** @type {number} */
        id: number;
        /** @type {HTMLCanvasElement?} */
        dragElement: HTMLCanvasElement | null;
        /** @type {boolean} */
        isOpen: boolean;
        /** @type {Record<string, number>} */
        controlPositions: Record<string, number>;
        /** @type {Record<string, string>} */
        colorLabels: Record<string, string>;
        /** @type {Array<string> | false} */
        keywords: Array<string> | false;
        /** @type {Color} */
        color: Color;
        /** @type {Record<string, string>} */
        componentLabels: Record<string, string>;
        /** Shows the `ColorPicker` dropdown. */
        showPicker(): void;
        /**
         * Toggle the `ColorPicker` dropdown visibility.
         * @param {Event} e
         * @this {ColorPicker}
         */
        togglePicker(this: ColorPicker, e: Event): void;
        /** Toggles the visibility of the `ColorPicker` presets menu. */
        toggleMenu(): void;
        /**
         * Handles all `ColorPicker` click listeners.
         * @param {Partial<Event>} e
         * @this {ColorPicker}
         */
        menuClickHandler(this: ColorPicker, e: Partial<Event>): void;
        /**
         * Handles all `ColorPicker` click listeners.
         * @param {KeyboardEvent} e
         * @this {ColorPicker}
         */
        menuKeyHandler(this: ColorPicker, e: KeyboardEvent): void;
        /**
         * Handles the `ColorPicker` touchstart / mousedown events listeners.
         * @param {TouchEvent} e
         * @this {ColorPicker}
         */
        pointerDown(this: ColorPicker, e: TouchEvent): void;
        /**
         * Handles the `ColorPicker` touchmove / mousemove events listeners.
         * @param {TouchEvent} e
         */
        pointerMove(e: TouchEvent): void;
        /**
         * Handles the `ColorPicker` touchend / mouseup events listeners.
         * @param {TouchEvent} e
         * @this {ColorPicker}
         */
        pointerUp(this: ColorPicker, { target }: TouchEvent): void;
        /**
         * Handles the `ColorPicker` scroll listener when open.
         * @param {Event} e
         * @this {ColorPicker}
         */
        handleScroll(this: ColorPicker, e: Event): void;
        /**
         * Handles the `focusout` listener of the `ColorPicker`.
         * @param {FocusEvent} e
         * @this {ColorPicker}
         */
        handleFocusOut(this: ColorPicker, { relatedTarget }: FocusEvent): void;
        /** Handles the event listeners of the color form. */
        changeHandler(): void;
        /**
         * Handles the `focusout` listener of the `ColorPicker`.
         * @param {KeyboardEvent} e
         * @this {ColorPicker}
         */
        handleDismiss(this: ColorPicker, { code }: KeyboardEvent): void;
        /**
         * Handles the `Space` and `Enter` keys inputs.
         * @param {KeyboardEvent} e
         * @this {ColorPicker}
         */
        keyHandler(this: ColorPicker, e: KeyboardEvent): void;
        /**
         * Handles the `ColorPicker` events listeners associated with the color knobs.
         * @param {KeyboardEvent} e
         */
        handleKnobs(e: KeyboardEvent): void;
        /** @type {HTMLElement} */
        pickerToggle: HTMLElement;
        /** @type {HTMLElement} */
        menuToggle: HTMLElement;
        /** @type {HTMLElement} */
        colorMenu: HTMLElement;
        /** @type {HTMLElement} */
        colorPicker: HTMLElement;
        /** @type {HTMLElement} */
        controls: HTMLElement;
        /** @type {HTMLInputElement[]} */
        inputs: HTMLInputElement[];
        /** @type {(HTMLElement)[]} */
        controlKnobs: (HTMLElement)[];
        /** @type {HTMLCanvasElement[]} */
        visuals: HTMLCanvasElement[];
        /** @type {HTMLLabelElement[]} */
        knobLabels: HTMLLabelElement[];
        /** @type {HTMLLabelElement} */
        appearance: HTMLLabelElement;
        /** @type {number} */
        width1: number;
        /** @type {number} */
        height1: number;
        /** @type {number} */
        width2: number;
        /** @type {number} */
        height2: number;
        /** @type {*} */
        ctx1: any;
        /** @type {*} */
        ctx2: any;
        /** @type {number} */
        width3: number;
        /** @type {number} */
        height3: number;
        /** @type {*} */
        ctx3: any;
        /**
         * Sets a new color value.
         * @param {string} v new color value
         */
        set value(arg: string);
        /** Returns the current color value */
        get value(): string;
        /** Check if the input is required to have a valid value. */
        get required(): boolean;
        /**
         * Returns the colour format.
         * @returns {CP.ColorFormats | string}
         */
        get format(): string;
        /** Returns the input name. */
        get name(): string | null;
        /**
         * Returns the label associated to the input.
         * @returns {HTMLLabelElement?}
         */
        get label(): HTMLLabelElement | null;
        /** Check if the color presets include any non-color. */
        get includeNonColor(): boolean;
        /** Returns hexadecimal value of the current color. */
        get hex(): string;
        /** Returns the current color value in {h,s,v,a} object format. */
        get hsv(): CP.HSVA;
        /** Returns the current color value in {h,s,l,a} object format. */
        get hsl(): CP.HSLA;
        /** Returns the current color value in {r,g,b,a} object format. */
        get rgb(): CP.RGBA;
        /** Returns the current color brightness. */
        get brightness(): number;
        /** Returns the current color luminance. */
        get luminance(): number;
        /** Checks if the current colour requires a light text color. */
        get isDark(): boolean;
        /** Checks if the current input value is a valid color. */
        get isValid(): boolean;
        /** Updates `ColorPicker` visuals. */
        updateVisuals(): void;
        /**
         * Updates `ColorPicker` first control:
         * * `lightness` and `saturation` for HEX/RGB;
         * * `lightness` and `hue` for HSL.
         *
         * @param {Record<string, number>} offsets
         */
        changeControl1(offsets: Record<string, number>): void;
        /**
         * Updates `ColorPicker` second control:
         * * `hue` for HEX/RGB;
         * * `saturation` for HSL.
         *
         * @param {Record<string, number>} offset
         */
        changeControl2(offset: Record<string, number>): void;
        /**
         * Updates `ColorPicker` last control,
         * the `alpha` channel for RGB/HSL.
         *
         * @param {Record<string, number>} offset
         */
        changeAlpha(offset: Record<string, number>): void;
        /** Update opened dropdown position on scroll. */
        updateDropdownPosition(): void;
        /** Update control knobs' positions. */
        setControlPositions(): void;
        /** Update the visual appearance label. */
        setColorAppearence(): void;
        /** Updates the control knobs positions. */
        updateControls(): void;
        /**
         * Update all color form inputs.
         * @param {boolean=} isPrevented when `true`, the component original event is prevented
         */
        updateInputs(isPrevented?: boolean | undefined): void;
        /** Show the dropdown. */
        show(): void;
        /**
         * Hides the currently opened dropdown.
         * @param {boolean=} focusPrevented
         */
        hide(focusPrevented?: boolean | undefined): void;
        dispose(): void;
    }
    import Color from "color-picker/src/js/color";
}
declare module "color-picker/src/js/color-picker-element" {
    export default ColorPickerElement;
    /**
     * @see https://codepen.io/dgrammatiko/pen/zLvXwR
     * @see https://codepen.io/thednp/pen/yLVzZzW
     * @see https://www.eyecon.ro/colorpicker/
     * @see http://www.dematte.at/colorPicker/
     *
     * @example
     * <color-picker>
     *   <input type="text">
     * </color-picker>
     */
    class ColorPickerElement extends HTMLElement {
        /** @type {ColorPicker?} */
        colorPicker: ColorPicker | null;
        /** @type {HTMLInputElement} */
        input: HTMLInputElement;
        /** @type {boolean} */
        isDisconnected: boolean;
        get value(): string;
        get color(): Color | null;
        connectedCallback(): void;
        disconnectedCallback(): void;
    }
    import ColorPicker from "color-picker/src/js/color-picker";
    import Color from "color-picker/src/js/color";
}
declare module "color-picker/types/source/source" {
    export { default as Color } from "color-picker/src/js/color";
    export { default as ColorPicker } from "color-picker/src/js/color-picker";
    export { default as ColorPickerElement } from "color-picker/src/js/color-picker-element";
}
