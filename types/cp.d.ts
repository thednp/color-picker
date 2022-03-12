declare module "color-picker/src/js/util/webColors" {
    export default webColors;
    /**
     * A complete list of web safe colors.
     * @see https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json
     * @type {string[]}
     */
    const webColors: string[];
}
declare module "color-picker/src/js/util/nonColors" {
    export default nonColors;
    /**
     * A list of non-color values.
     */
    const nonColors: string[];
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
         * @param {CP.ColorFormats=} config
         */
        constructor(input: CP.ColorInput, config?: CP.ColorFormats | undefined);
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
         * Returns the perceived luminance of a colour.
         * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
         * @returns {number} a number in the [0-1] range
         */
        get luminance(): number;
        /**
         * Returns the perceived brightness of the colour.
         * @returns {number} a number in the [0-255] range
         */
        get brightness(): number;
        /**
         * Returns the colour as an RGBA object.
         * @returns {CP.RGBA}
         */
        toRgb(): CP.RGBA;
        /**
         * Returns the RGBA values concatenated into a string.
         * @returns {string} the CSS valid colour in RGB/RGBA format
         */
        toRgbString(): string;
        /**
         * Returns the HEX value of the colour.
         * @returns {string} the hexadecimal colour format
         */
        toHex(): string;
        /**
         * Returns the HEX value of the colour.
         * @returns {string} the CSS valid colour in hexadecimal format
         */
        toHexString(): string;
        /**
         * Returns the colour as a HSVA object.
         * @returns {CP.HSVA} the `{h,s,v,a}` object
         */
        toHsv(): CP.HSVA;
        /**
         * Returns the colour as a HSLA object.
         * @returns {CP.HSLA}
         */
        toHsl(): CP.HSLA;
        /**
         * Returns the HSLA values concatenated into a string.
         * @returns {string} the CSS valid colour in HSL/HSLA format
         */
        toHslString(): string;
        /**
         * Sets the alpha value on the current colour.
         * @param {number} alpha a new alpha value in [0-1] range.
         * @returns {Color} a new `Color` instance
         */
        setAlpha(alpha: number): Color;
        /**
         * Saturate the colour with a given amount.
         * @param {number=} amount a value in [0-100] range
         * @returns {Color} a new `Color` instance
         */
        saturate(amount?: number | undefined): Color;
        /**
         * Desaturate the colour with a given amount.
         * @param {number=} amount a value in [0-100] range
         * @returns {Color} a new `Color` instance
         */
        desaturate(amount?: number | undefined): Color;
        /**
         * Completely desaturates a colour into greyscale.
         * Same as calling `desaturate(100)`
         * @returns {Color} a new `Color` instance
         */
        greyscale(): Color;
        /** Returns a clone of the current `Color` instance. */
        clone(): Color;
        /**
         * Returns the colour value in CSS valid string format.
         * @returns {string}
         */
        toString(): string;
    }
}
declare module "color-picker/src/js/util/colorPickerLabels" {
    export default colorPickerLabels;
    /** @type {Record<string, string>} */
    const colorPickerLabels: Record<string, string>;
}
declare module "color-picker/src/js/util/colorNames" {
    export default colorNames;
    /**
     * A list of 17 color names used for WAI-ARIA compliance.
     * @type {string[]}
     */
    const colorNames: string[];
}
declare module "color-picker/src/js/util/vHidden" {
    export default vHidden;
    const vHidden: "v-hidden";
}
declare module "color-picker/src/js/util/getColorForm" {
    /**
     * Returns the color form for `ColorPicker`.
     *
     * @param {CP.ColorPicker} self the `ColorPicker` instance
     * @returns {HTMLElement | Element} a new `<div>` element with color component `<input>`
     */
    export default function getColorForm(self: CP.ColorPicker): HTMLElement | Element;
}
declare module "color-picker/src/js/util/getColorControls" {
    /**
     * Returns all color controls for `ColorPicker`.
     *
     * @param {CP.ColorPicker} self the `ColorPicker` instance
     * @returns {HTMLElement | Element} color controls
     */
    export default function getColorControls(self: CP.ColorPicker): HTMLElement | Element;
}
declare module "color-picker/src/js/util/isValidJSON" {
    /**
     * Check if a string is valid JSON string.
     * @param {string} str the string input
     * @returns {boolean} the query result
     */
    export default function isValidJSON(str: string): boolean;
}
declare module "color-picker/src/js/version" {
    export default Version;
    const Version: string;
}
declare module "color-picker/src/js/color-picker" {
    /**
     * Color Picker Web Component
     * @see http://thednp.github.io/color-picker
     */
    export default class ColorPicker {
        /**
         * Returns a new `ColorPicker` instance. The target of this constructor
         * must be an `HTMLInputElement`.
         *
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
        colorPicker: HTMLElement;
        /** @type {HTMLElement} */
        colorMenu: HTMLElement;
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
         * Sets a new colour value.
         * @param {string} v new colour value
         */
        set value(arg: string);
        /** Returns the current colour value */
        get value(): string;
        /**
         * Returns the colour format.
         * @returns {CP.ColorFormats}
         */
        get format(): string;
        /** Check if the colour presets include any non-colour. */
        get includeNonColor(): boolean;
        /** Check if the parent of the target is a `ColorPickerElement` instance. */
        get isCE(): boolean;
        /** Returns hexadecimal value of the current colour. */
        get hex(): string;
        /** Returns the current colour value in {h,s,v,a} object format. */
        get hsv(): CP.HSVA;
        /** Returns the current colour value in {h,s,l,a} object format. */
        get hsl(): CP.HSLA;
        /** Returns the current colour value in {r,g,b,a} object format. */
        get rgb(): CP.RGBA;
        /** Returns the current colour brightness. */
        get brightness(): number;
        /** Returns the current colour luminance. */
        get luminance(): number;
        /** Checks if the current colour requires a light text colour. */
        get isDark(): boolean;
        /** Checks if the current input value is a valid colour. */
        get isValid(): boolean;
        /** Updates `ColorPicker` visuals. */
        updateVisuals(): void;
        /**
         * Updates `ColorPicker` first control:
         * * `lightness` and `saturation` for HEX/RGB;
         * * `lightness` and `hue` for HSL.
         *
         * @param {number} X the X component of the offset
         * @param {number} Y the Y component of the offset
         */
        changeControl1(X: number, Y: number): void;
        /**
         * Updates `ColorPicker` second control:
         * * `hue` for HEX/RGB;
         * * `saturation` for HSL.
         *
         * @param {number} Y the Y offset
         */
        changeControl2(Y: number): void;
        /**
         * Updates `ColorPicker` last control,
         * the `alpha` channel for RGB/HSL.
         *
         * @param {number} Y
         */
        changeAlpha(Y: number): void;
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
        /** Removes `ColorPicker` from target `<input>`. */
        dispose(): void;
    }
    import Color from "color-picker/src/js/color";
}
declare module "color-picker/src/js/color-picker-element" {
    export default ColorPickerElement;
    /**
     * `ColorPickerElement` Web Component.
     * @example
     * <color-picker>
     *   <input type="text">
     * </color-picker>
     */
    class ColorPickerElement extends HTMLElement {
        /** @type {boolean} */
        isDisconnected: boolean;
        /**
         * Returns the current color value.
         * @returns {string?}
         */
        get value(): string | null;
        /**
         * Returns the `Color` instance.
         * @returns {Color?}
         */
        get color(): Color | null;
        connectedCallback(): void;
        /** @type {HTMLInputElement} */
        input: HTMLInputElement | undefined;
        /** @type {ColorPicker} */
        colorPicker: ColorPicker | undefined;
        disconnectedCallback(): void;
    }
    import Color from "color-picker/src/js/color";
    import ColorPicker from "color-picker/src/js/color-picker";
}
declare module "color-picker/types/source/source" {
    export { default as Color } from "color-picker/src/js/color";
    export { default as ColorPicker } from "color-picker/src/js/color-picker";
    export { default as ColorPickerElement } from "color-picker/src/js/color-picker-element";
}
