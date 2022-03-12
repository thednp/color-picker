import querySelector from 'shorter-js/src/selectors/querySelector';
import createElement from 'shorter-js/src/misc/createElement';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';

import Color from './color';
import ColorPicker from './color-picker';
import Version from './version';

/**
 * `ColorPickerElement` Web Component.
 * @example
 * <color-picker>
 *   <input type="text">
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

  /**
   * Returns the `Color` instance.
   * @returns {Color?}
   */
  get color() { return this.colorPicker ? this.colorPicker.color : null; }

  connectedCallback() {
    if (this.colorPicker) {
      if (this.isDisconnected) {
        this.isDisconnected = false;
      }
      return;
    }

    let input = querySelector('input', this);
    if (!input) {
      input = createElement({
        tagName: 'input',
        type: 'text',
        value: '#069',
        className: 'color-preview button-appearance',
      });
      this.append(input);
    }

    /** @type {HTMLInputElement} */
    // @ts-ignore -- <INPUT> is also `HTMLElement`
    this.input = input;

    if (this.input) {
      /** @type {ColorPicker} */
      this.colorPicker = new ColorPicker(this.input);

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
  Version,
});

customElements.define('color-picker', ColorPickerElement);

export default ColorPickerElement;
