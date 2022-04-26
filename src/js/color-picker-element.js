import createElement from 'shorter-js/src/misc/createElement';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';
import setAttribute from 'shorter-js/src/attr/setAttribute';
import getAttribute from 'shorter-js/src/attr/getAttribute';

import Color from './color';
import ColorPicker from './color-picker';
import ColorPalette from './color-palette';
import toggleCEAttr from './util/toggleCEAttr';
import Version from './util/version';

let CPID = 0;

/**
 * `ColorPickerElement` Web Component.
 * @example
 * <label for="UNIQUE_ID">Label</label>
 * <color-picker data-id="UNIQUE_ID" data-value="red" data-format="hex">
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
    const self = this;
    if (self.input) return;

    let id = getAttribute(self, 'data-id');
    const value = getAttribute(self, 'data-value') || '#fff';
    const format = getAttribute(self, 'data-format') || 'rgb';
    const placeholder = getAttribute(self, 'data-placeholder') || '';

    if (!id) {
      id = `color-picker-${format}-${CPID}`;
      CPID += 1;
    }

    const input = createElement({
      tagName: 'input',
      type: 'text',
      className: 'color-preview btn-appearance',
    });

    setAttribute(input, 'id', id);
    setAttribute(input, 'name', id);
    setAttribute(input, 'autocomplete', 'off');
    setAttribute(input, 'spellcheck', 'false');
    setAttribute(input, 'value', value);
    setAttribute(input, 'placeholder', placeholder);
    self.append(input);

    /** @type {HTMLInputElement} */
    // @ts-ignore - `HTMLInputElement` is `HTMLElement`
    self.input = input;

    // @ts-ignore - `HTMLInputElement` is `HTMLElement`
    self.colorPicker = new ColorPicker(input);

    // @ts-ignore - `shadowRoot` is defined in the constructor
    self.shadowRoot.append(createElement('slot'));

    // remove Attributes
    toggleCEAttr(self);
  }

  /** @this {ColorPickerElement} */
  disconnectedCallback() {
    const self = this;
    const { input, colorPicker, shadowRoot } = self;

    const callback = () => {
      // remove markup
      input.remove();
      colorPicker.dispose();
      shadowRoot.innerHTML = '';

      ObjectAssign(self, {
        colorPicker: undefined,
        input: undefined,
      });
    };

    // re-add Attributes
    toggleCEAttr(self, callback);
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
