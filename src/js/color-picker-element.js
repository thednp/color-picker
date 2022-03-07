import querySelector from 'shorter-js/src/selectors/querySelector';
import createElement from 'shorter-js/src/misc/createElement';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';

import Color from './color';
import ColorPicker from './color-picker';

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

  /** Returns the current color value. */
  get value() { return this.input && this.input.value; }

  /** Returns the `Color` instance. */
  get color() { return this.colorPicker && this.colorPicker.color; }

  connectedCallback() {
    if (this.colorPicker) {
      if (this.isDisconnected) {
        this.isDisconnected = false;
      }
      return;
    }
    /** @type {HTMLInputElement?} */
    // @ts-ignore -- <INPUT> is also `HTMLElement`
    this.input = querySelector('input', this);
    /** @type {ColorPicker} */
    if (this.input) {
      this.colorPicker = new ColorPicker(this.input);
    }
    this.isDisconnected = false;

    if (this.shadowRoot) {
      this.shadowRoot.append(createElement('slot'));
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
});

customElements.define('color-picker', ColorPickerElement);

export default ColorPickerElement;
