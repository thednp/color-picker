declare module "color-picker/src/js/util/nonColors" {
    export default nonColors;
    /**
     * A list of explicit default non-color values.
     */
    const nonColors: string[];
}
declare module "color-picker/src/js/util/roundPart" {
    /**
     * Round colour components, for all formats except HEX.
     * @param {number} v one of the colour components
     * @returns {number} the rounded number
     */
    export default function roundPart(v: number): number;
}
declare module "color-picker/src/js/color" {
    /**
     * @class
     * Returns a new `Color` instance.
     * @see https://github.com/bgrins/TinyColor
     */
    export default class Color {
        /**
         * @constructor
         * @param {CP.ColorInput} input the given colour value
         * @param {CP.ColorFormats=} config the given format
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
         * @returns {number} a number in the [0, 1] range
         */
        get luminance(): number;
        /**
         * Returns the perceived brightness of the colour.
         * @returns {number} a number in the [0, 255] range
         */
        get brightness(): number;
        /**
         * Returns the colour as an RGBA object.
         * @returns {CP.RGBA} an {r,g,b,a} object with [0, 255] ranged values
         */
        toRgb(): CP.RGBA;
        /**
         * Returns the RGBA values concatenated into a CSS3 Module string format.
         * * rgb(255,255,255)
         * * rgba(255,255,255,0.5)
         * @returns {string} the CSS valid colour in RGB/RGBA format
         */
        toRgbString(): string;
        /**
         * Returns the RGBA values concatenated into a CSS4 Module string format.
         * * rgb(255 255 255)
         * * rgb(255 255 255 / 50%)
         * @returns {string} the CSS valid colour in CSS4 RGB format
         */
        toRgbCSS4String(): string;
        /**
         * Returns the hexadecimal value of the colour. When the parameter is *true*
         * it will find a 3 characters shorthand of the decimal value.
         *
         * @param {boolean=} allow3Char when `true` returns shorthand HEX
         * @returns {string} the hexadecimal colour format
         */
        toHex(allow3Char?: boolean | undefined): string;
        /**
         * Returns the CSS valid hexadecimal vaue of the colour. When the parameter is *true*
         * it will find a 3 characters shorthand of the value.
         *
         * @param {boolean=} allow3Char when `true` returns shorthand HEX
         * @returns {string} the CSS valid colour in hexadecimal format
         */
        toHexString(allow3Char?: boolean | undefined): string;
        /**
         * Returns the HEX8 value of the colour.
         * @param {boolean=} allow4Char when `true` returns shorthand HEX
         * @returns {string} the CSS valid colour in hexadecimal format
         */
        toHex8(allow4Char?: boolean | undefined): string;
        /**
         * Returns the HEX8 value of the colour.
         * @param {boolean=} allow4Char  when `true` returns shorthand HEX
         * @returns {string} the CSS valid colour in hexadecimal format
         */
        toHex8String(allow4Char?: boolean | undefined): string;
        /**
         * Returns the colour as a HSVA object.
         * @returns {CP.HSVA} the `{h,s,v,a}` object with [0, 1] ranged values
         */
        toHsv(): CP.HSVA;
        /**
         * Returns the colour as an HSLA object.
         * @returns {CP.HSLA} the `{h,s,l,a}` object with [0, 1] ranged values
         */
        toHsl(): CP.HSLA;
        /**
         * Returns the HSLA values concatenated into a CSS3 Module format string.
         * * `hsl(150, 100%, 50%)`
         * * `hsla(150, 100%, 50%, 0.5)`
         * @returns {string} the CSS valid colour in HSL/HSLA format
         */
        toHslString(): string;
        /**
         * Returns the HSLA values concatenated into a CSS4 Module format string.
         * * `hsl(150deg 100% 50%)`
         * * `hsl(150deg 100% 50% / 50%)`
         * @returns {string} the CSS valid colour in CSS4 HSL format
         */
        toHslCSS4String(): string;
        /**
         * Returns the colour as an HWBA object.
         * @returns {CP.HWBA} the `{h,w,b,a}` object with [0, 1] ranged values
         */
        toHwb(): CP.HWBA;
        /**
         * Returns the HWBA values concatenated into a string.
         * @returns {string} the CSS valid colour in HWB format
         */
        toHwbString(): string;
        /**
         * Sets the alpha value of the current colour.
         * @param {number} alpha a new alpha value in the [0, 1] range.
         * @returns {Color} the `Color` instance
         */
        setAlpha(alpha: number): Color;
        /**
         * Saturate the colour with a given amount.
         * @param {number=} amount a value in the [0, 100] range
         * @returns {Color} the `Color` instance
         */
        saturate(amount?: number | undefined): Color;
        /**
         * Desaturate the colour with a given amount.
         * @param {number=} amount a value in the [0, 100] range
         * @returns {Color} the `Color` instance
         */
        desaturate(amount?: number | undefined): Color;
        /**
         * Completely desaturates a colour into greyscale.
         * Same as calling `desaturate(100)`
         * @returns {Color} the `Color` instance
         */
        greyscale(): Color;
        /**
         * Increase the colour lightness with a given amount.
         * @param {number=} amount a value in the [0, 100] range
         * @returns {Color} the `Color` instance
         */
        lighten(amount?: number | undefined): Color;
        /**
         * Decrease the colour lightness with a given amount.
         * @param {number=} amount a value in the [0, 100] range
         * @returns {Color} the `Color` instance
         */
        darken(amount?: number | undefined): Color;
        /**
         * Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
         * Values outside of this range will be wrapped into this range.
         *
         * @param {number=} amount a value in the [0, 100] range
         * @returns {Color} the `Color` instance
         */
        spin(amount?: number | undefined): Color;
        /** Returns a clone of the current `Color` instance. */
        clone(): Color;
        /**
         * Returns the colour value in CSS valid string format.
         * @param {boolean=} allowShort when *true*, HEX values can be shorthand
         * @returns {string} the CSS valid colour in the configured format
         */
        toString(allowShort?: boolean | undefined): string;
    }
}
declare module "color-picker/src/js/color-palette" {
    /**
     * @class
     * Returns a color palette with a given set of parameters.
     * @example
     * new ColorPalette(0, 12, 10);
     * // => { hue: 0, hueSteps: 12, lightSteps: 10, colors: Array<Color> }
     */
    export default class ColorPalette {
        /**
         * The `hue` parameter is optional, which would be set to 0.
         * @param {number[]} args represeinting hue, hueSteps, lightSteps
         * * `args.hue` the starting Hue [0, 360]
         * * `args.hueSteps` Hue Steps Count [5, 24]
         * * `args.lightSteps` Lightness Steps Count [5, 12]
         */
        constructor(...args: number[]);
        hue: number;
        hueSteps: number;
        lightSteps: number;
        colors: any;
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
declare module "color-picker/src/js/util/tabindex" {
    export default tabIndex;
    const tabIndex: "tabindex";
}
declare module "color-picker/src/js/util/isValidJSON" {
    /**
     * Check if a string is valid JSON string.
     * @param {string} str the string input
     * @returns {boolean} the query result
     */
    export default function isValidJSON(str: string): boolean;
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
declare module "color-picker/src/js/util/setCSSProperties" {
    /**
     * Helps setting CSS variables to the color-menu.
     * @param {HTMLElement} element
     * @param {Record<string,any>} props
     */
    export default function setCSSProperties(element: HTMLElement, props: Record<string, any>): void;
}
declare module "color-picker/src/js/util/getColorMenu" {
    /**
     * Returns a color-defaults with given values and class.
     * @param {CP.ColorPicker} self
     * @param {CP.ColorPalette | string[]} colorsSource
     * @param {string} menuClass
     * @returns {HTMLElement | Element}
     */
    export default function getColorMenu(self: CP.ColorPicker, colorsSource: CP.ColorPalette | string[], menuClass: string): HTMLElement | Element;
}
declare module "color-picker/src/js/util/setMarkup" {
    /**
    * Generate HTML markup and update instance properties.
    * @param {CP.ColorPicker} self
    */
    export default function setMarkup(self: CP.ColorPicker): void;
}
declare module "color-picker/src/js/util/version" {
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
         * @param {CP.ColorPickerOptions=} config instance options
         */
        constructor(target: HTMLInputElement | string, config?: CP.ColorPickerOptions | undefined);
        input: HTMLInputElement;
        /** @type {HTMLElement} */
        parent: HTMLElement;
        /** @type {number} */
        id: number;
        /** @type {HTMLElement?} */
        dragElement: HTMLElement | null;
        /** @type {boolean} */
        isOpen: boolean;
        /** @type {Record<string, number>} */
        controlPositions: Record<string, number>;
        /** @type {Record<string, string>} */
        colorLabels: Record<string, string>;
        /** @type {string[]=} */
        colorKeywords: string[] | undefined;
        /** @type {(ColorPalette | string[])=} */
        colorPresets: (ColorPalette | string[]) | undefined;
        /** @type {Record<string, string>} */
        componentLabels: Record<string, string>;
        /** @type {Color} */
        color: Color;
        /** @type {CP.ColorFormats} */
        format: CP.ColorFormats;
        /** Shows the `ColorPicker` dropdown. */
        showPicker(): void;
        /**
         * The `Space` & `Enter` keys specific event listener.
         * Toggle visibility of the `ColorPicker` / the presets menu, showing one will hide the other.
         * @param {KeyboardEvent} e
         * @this {ColorPicker}
         */
        /**
         * Toggle the `ColorPicker` dropdown visibility.
         * @param {Event=} e
         * @this {ColorPicker}
         */
        togglePicker(this: ColorPicker, e?: Event | undefined): void;
        /**
         * Toggles the visibility of the `ColorPicker` presets menu.
         * @param {Event=} e
         * @this {ColorPicker}
         */
        toggleMenu(this: ColorPicker, e?: Event | undefined): void;
        /**
         * The `ColorPicker` click event listener for the colour menu presets / defaults.
         * @param {Partial<Event>} e
         * @this {ColorPicker}
         */
        menuClickHandler(this: ColorPicker, e: Partial<Event>): void;
        /**
         * The `ColorPicker` keyboard event listener for menu navigation.
         * @param {KeyboardEvent} e
         * @this {ColorPicker}
         */
        menuKeyHandler(this: ColorPicker, e: KeyboardEvent): void;
        /**
         * The `ColorPicker` *touchstart* / *mousedown* events listener for control knobs.
         * @param {TouchEvent} e
         * @this {ColorPicker}
         */
        pointerDown(this: ColorPicker, e: TouchEvent): void;
        /**
         * The `ColorPicker` *touchmove* / *mousemove* events listener for control knobs.
         * @param {TouchEvent} e
         */
        pointerMove(e: TouchEvent): void;
        /**
         * The `ColorPicker` *touchend* / *mouseup* events listener for control knobs.
         * @param {TouchEvent} e
         * @this {ColorPicker}
         */
        pointerUp(this: ColorPicker, { target }: TouchEvent): void;
        /**
         * Updates `ColorPicker` control positions on:
         * * initialization
         * * window resize
         */
        update(): void;
        /**
         * The `ColorPicker` *scroll* event listener when open.
         * @param {Event} e
         * @this {ColorPicker}
         */
        handleScroll(this: ColorPicker, e: Event): void;
        /**
         * The `ColorPicker` *focusout* event listener when open.
         * @param {FocusEvent} e
         * @this {ColorPicker}
         */
        handleFocusOut(this: ColorPicker, { relatedTarget }: FocusEvent): void;
        /** The event listener of the colour form inputs. */
        changeHandler(): void;
        /**
         * The `ColorPicker` *keyup* event listener when open.
         * @param {KeyboardEvent} e
         * @this {ColorPicker}
         */
        handleDismiss(this: ColorPicker, { code }: KeyboardEvent): void;
        /**
         * The `ColorPicker` *keydown* event listener for control knobs.
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
        /** @type {HTMLInputElement[]} */
        inputs: HTMLInputElement[];
        controls: Element | HTMLElement;
        /** @type {(HTMLElement | Element)[]} */
        controlKnobs: (HTMLElement | Element)[];
        /** @type {(HTMLElement)[]} */
        visuals: (HTMLElement)[];
        /**
         * Sets a new colour value.
         * @param {string} v new colour value
         */
        set value(arg: string);
        /** Returns the current colour value */
        get value(): string;
        /** Check if the colour presets include any non-colour. */
        get hasNonColor(): boolean;
        /** Check if the parent of the target is a `ColorPickerElement` instance. */
        get isCE(): boolean;
        /** Returns hexadecimal value of the current colour. */
        get hex(): string;
        /** Returns the current colour value in {h,s,v,a} object format. */
        get hsv(): CP.HSVA;
        /** Returns the current colour value in {h,s,l,a} object format. */
        get hsl(): CP.HSLA;
        /** Returns the current colour value in {h,w,b,a} object format. */
        get hwb(): CP.HWBA;
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
        /** Returns the colour appearance, usually the closest colour name for the current value. */
        get appearance(): string | undefined;
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
         * * `hue` for HEX/RGB/HWB;
         * * `saturation` for HSL.
         *
         * @param {number} Y the Y offset
         */
        changeControl2(Y: number): void;
        /**
         * Updates `ColorPicker` last control,
         * the `alpha` channel.
         *
         * @param {number} Y
         */
        changeAlpha(Y: number): void;
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
         * @param {boolean=} isPrevented when `true`, the component original event is prevented
         */
        updateInputs(isPrevented?: boolean | undefined): void;
        /**
         * Hides the currently open `ColorPicker` dropdown.
         * @param {boolean=} focusPrevented
         */
        hide(focusPrevented?: boolean | undefined): void;
        /** Removes `ColorPicker` from target `<input>`. */
        dispose(): void;
    }
    import ColorPalette from "color-picker/src/js/color-palette";
    import Color from "color-picker/src/js/color";
}
declare module "color-picker/src/js/color-picker-element" {
    export default ColorPickerElement;
    /**
     * `ColorPickerElement` Web Component.
     * @example
     * <label for="UNIQUE_ID">Label</label>
     * <color-picker>
     *   <input id="UNIQUE_ID" value="red" format="hex" class="color-preview btn-appearance">
     * </color-picker>
     * // or
     * <label for="UNIQUE_ID">Label</label>
     * <color-picker data-id="UNIQUE_ID" data-value="red" data-format="hex"></color-picker>
     */
    class ColorPickerElement extends HTMLElement {
        /**
         * Returns the current color value.
         * @returns {string | undefined}
         */
        get value(): string | undefined;
        connectedCallback(): void;
        /** @type {HTMLInputElement} */
        input: HTMLInputElement | undefined;
        colorPicker: ColorPicker | undefined;
        /** @this {ColorPickerElement} */
        disconnectedCallback(this: ColorPickerElement): void;
    }
    import ColorPicker from "color-picker/src/js/color-picker";
}
declare module "color-picker/types/source/source" {
    export { default as Color } from "color-picker/src/js/color";
    export { default as ColorPalette } from "color-picker/src/js/color-palette";
    export { default as ColorPicker } from "color-picker/src/js/color-picker";
    export { default as ColorPickerElement } from "color-picker/src/js/color-picker-element";
}
