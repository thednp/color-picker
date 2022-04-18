import getElementsByTagName from 'shorter-js/src/selectors/getElementsByTagName';
import createElement from 'shorter-js/src/misc/createElement';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';
import setAttribute from 'shorter-js/src/attr/setAttribute';
import getAttribute from 'shorter-js/src/attr/getAttribute';

import Color from './color';
import ColorPicker from './color-picker';
import ColorPalette from './color-palette';
import Version from './util/version';

let CPID = 0;

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
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /**
   * Returns the current color value.
   * @returns {string | undefined}
   */
  get value() { return this.input && this.input.value; }

  connectedCallback() {
    if (this.input) return;

    let [input] = getElementsByTagName('input', this);
    const value = (input && getAttribute(input, 'value')) || getAttribute(this, 'data-value') || '#fff';
    const format = (input && getAttribute(input, 'format')) || getAttribute(this, 'data-format') || 'rgb';
    let id = (input && getAttribute(input, 'id')) || getAttribute(this, 'data-id');

    if (!id) {
      id = `color-picker-${format}-${CPID}`;
      CPID += 1;
    }

    if (!input) {
      input = createElement({
        tagName: 'input',
        type: 'text',
        className: 'color-preview btn-appearance',
      });

      setAttribute(input, 'id', id);
      setAttribute(input, 'name', id);
      setAttribute(input, 'autocomplete', 'off');
      setAttribute(input, 'spellcheck', 'false');
      setAttribute(input, 'value', value);
      this.append(input);
    }
    /** @type {HTMLInputElement} */
    // @ts-ignore - `HTMLInputElement` is `HTMLElement`
    this.input = input;

    // @ts-ignore - `HTMLInputElement` is `HTMLElement`
    this.colorPicker = new ColorPicker(input);

    // @ts-ignore - `shadowRoot` is defined in the constructor
    this.shadowRoot.append(createElement('slot'));
  }

  /** @this {ColorPickerElement} */
  disconnectedCallback() {
    const { input, colorPicker, shadowRoot } = this;
    if (colorPicker) colorPicker.dispose();
    if (input) input.remove();
    if (shadowRoot) shadowRoot.innerHTML = '';

    ObjectAssign(this, {
      colorPicker: undefined,
      input: undefined,
    });
  }
}

ObjectAssign(ColorPickerElement, {
  Color,
  ColorPicker,
  ColorPalette, // @ts-ignore
  getInstance: ColorPicker.getInstance,
  Version,
});

customElements.define('color-picker', ColorPickerElement);

export default ColorPickerElement;
