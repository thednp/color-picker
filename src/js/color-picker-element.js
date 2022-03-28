import getElementsByTagName from 'shorter-js/src/selectors/getElementsByTagName';
import createElement from 'shorter-js/src/misc/createElement';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';
import setAttribute from 'shorter-js/src/attr/setAttribute';
import getAttribute from 'shorter-js/src/attr/getAttribute';

import Color from './color';
import ColorPicker, { getColorPickerInstance } from './color-picker';
import ColorPalette from './color-palette';
import Version from './version';

let CPID = 0;

/**
 * `ColorPickerElement` Web Component.
 * @example
 * <label for="UNIQUE_ID">Label</label>
 * <color-picker data-format="hex" data-value="#075">
 *   <input id="UNIQUE_ID" type="text" class="color-preview btn-appearance">
 * </color-picker>
 */
class ColorPickerElement extends HTMLElement {
  constructor() {
    super();
    /** @type {boolean} */
    this.isDisconnected = true;
    this.attachShadow({ mode: 'open' });
  }

  /**
   * Returns the current color value.
   * @returns {string?}
   */
  get value() { return this.input ? this.input.value : null; }

  connectedCallback() {
    if (this.colorPicker) {
      if (this.isDisconnected) {
        this.isDisconnected = false;
      }
      return;
    }

    const inputs = getElementsByTagName('input', this);

    if (!inputs.length) {
      const label = getAttribute(this, 'data-label');
      const value = getAttribute(this, 'data-value') || '#069';
      const format = getAttribute(this, 'data-format') || 'rgb';
      const newInput = createElement({
        tagName: 'input',
        type: 'text',
        className: 'color-preview btn-appearance',
      });
      let id = getAttribute(this, 'data-id');
      if (!id) {
        id = `color-picker-${format}-${CPID}`;
        CPID += 1;
      }

      const labelElement = createElement({ tagName: 'label', innerText: label || 'Color Picker' });
      this.before(labelElement);
      setAttribute(labelElement, 'for', id);
      setAttribute(newInput, 'id', id);
      setAttribute(newInput, 'name', id);
      setAttribute(newInput, 'autocomplete', 'off');
      setAttribute(newInput, 'spellcheck', 'false');
      setAttribute(newInput, 'value', value);
      this.append(newInput);
    }

    const [input] = inputs;

    if (input) {
      /** @type {HTMLInputElement} */
      // @ts-ignore - `HTMLInputElement` is `HTMLElement`
      this.input = input;

      // @ts-ignore - `HTMLInputElement` is `HTMLElement`
      this.colorPicker = new ColorPicker(input);
      this.color = this.colorPicker.color;

      if (this.shadowRoot) {
        this.shadowRoot.append(createElement('slot'));
      }

      this.isDisconnected = false;
    }
  }

  disconnectedCallback() {
    if (this.colorPicker) this.colorPicker.dispose();
    this.isDisconnected = true;
  }
}

ObjectAssign(ColorPickerElement, {
  Color,
  ColorPicker,
  ColorPalette,
  getInstance: getColorPickerInstance,
  Version,
});

customElements.define('color-picker', ColorPickerElement);

export default ColorPickerElement;
