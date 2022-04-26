import setAttribute from 'shorter-js/src/attr/setAttribute';
import removeAttribute from 'shorter-js/src/attr/removeAttribute';
import ObjectKeys from 'shorter-js/src/misc/ObjectKeys';

import ColorPalette from '../color-palette';
import colorNames from './colorNames';
import colorPickerLabels from './colorPickerLabels';

/**
 * A small utility to toggle `ColorPickerElement` attributes
 * when `connectedCallback` or `disconnectedCallback` methods
 * are called and helps the instance keep its value and settings instact.
 *
 * @param {CP.ColorPickerElement} self ColorPickerElement instance
 * @param {Function=} callback when `true`, attributes are added
 *
 * @example
 * const attributes = [
 *   // essentials
 *   'value', 'format',
 *   // presets menus
 *   'color-presets', 'color-keywords',
 *   // labels
 *   'color-labels', 'component-labels',
 * ];
 */
export default function toggleCEAttr(self, callback) {
  if (callback) {
    const { input, colorPicker } = self;

    const {
      value, format, colorPresets, colorKeywords, componentLabels, colorLabels,
    } = colorPicker;

    const { id, placeholder } = input;

    setAttribute(self, 'data-id', id);
    setAttribute(self, 'data-value', value);
    setAttribute(self, 'data-format', format);
    setAttribute(self, 'data-placeholder', placeholder);

    if (ObjectKeys(colorPickerLabels).some((l) => colorPickerLabels[l] !== componentLabels[l])) {
      setAttribute(self, 'data-component-labels', JSON.stringify(componentLabels));
    }
    if (!colorNames.every((c) => c === colorLabels[c])) {
      setAttribute(self, 'data-color-labels', colorNames.map((n) => colorLabels[n]).join(','));
    }
    if (colorPresets instanceof ColorPalette) {
      const { hue, hueSteps, lightSteps } = colorPresets;
      setAttribute(self, 'data-color-presets', JSON.stringify({ hue, hueSteps, lightSteps }));
    }
    if (Array.isArray(colorPresets) && colorPresets.length) {
      setAttribute(self, 'data-color-presets', colorPresets.join(','));
    }
    if (colorKeywords) {
      setAttribute(self, 'data-color-keywords', colorKeywords.join(','));
    }
    setTimeout(callback, 0);
  } else {
    // keep id
    // removeAttribute(self, 'data-id');
    removeAttribute(self, 'data-value');
    removeAttribute(self, 'data-format');
    removeAttribute(self, 'data-placeholder');
    removeAttribute(self, 'data-component-labels');
    removeAttribute(self, 'data-color-labels');
    removeAttribute(self, 'data-color-presets');
    removeAttribute(self, 'data-color-keywords');
  }
}
