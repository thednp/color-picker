import {
  getAttribute,
  setAttribute,
  toUpperCase,
  ariaHidden,
  tabindex,
  createElement,
  createElementNS,
} from '@thednp/shorty';

import Color from '@thednp/color';

import getColorForm from './getColorForm';
import getColorControls from './getColorControls';
import getColorMenu from './getColorMenu';
import vHidden from './vHidden';

import ColorPicker from '../index';

/**
 * Generate HTML markup and update instance properties.
 *
 * @param self
 */
const setMarkup = (self: ColorPicker) => {
  const { input, parent, format, id, componentLabels, colorKeywords, colorPresets } = self;
  const colorValue = getAttribute(input, 'value') || '#fff';
  const { nonColors } = Color;

  const { toggleLabel, pickerLabel, formatLabel, hexLabel } = componentLabels;

  // update color
  const color = nonColors.includes(colorValue) ? '#fff' : colorValue;
  self.color = new Color(color, format);

  // set initial controls dimensions
  const formatString = format === 'hex' ? hexLabel : toUpperCase(format);

  const pickerBtn = createElement<HTMLButtonElement>({
    id: `picker-btn-${id}`,
    tagName: 'button',
    type: 'button',
    className: 'picker-toggle btn-appearance',
    ariaExpanded: 'false',
    ariaHasPopup: 'true',
  }) as HTMLButtonElement;

  pickerBtn.append(
    createElement({
      tagName: 'span',
      className: vHidden,
      innerText: `${pickerLabel}. ${formatLabel}: ${formatString}`,
    }) as HTMLElement,
  );

  const pickerDropdown = createElement({
    tagName: 'div',
    className: 'color-dropdown picker',
    role: 'group',
    ariaLabelledBy: `picker-btn-${id}`,
  } as Partial<HTMLElement> & { ariaLabelledBy: string }) as HTMLElement;

  const colorControls = getColorControls(self);
  const colorForm = getColorForm(self);

  pickerDropdown.append(colorControls, colorForm);
  input.before(pickerBtn);
  parent.append(pickerDropdown);

  // set colour key menu template
  if (colorKeywords || colorPresets) {
    const presetsDropdown = createElement({
      tagName: 'div',
      className: 'color-dropdown scrollable menu',
    }) as HTMLElement;

    // color presets
    if (colorPresets) {
      presetsDropdown.append(getColorMenu(self, colorPresets, 'color-options'));
    }

    // explicit defaults [reset, initial, inherit, transparent, currentColor]
    // also custom defaults [default: #069, complementary: #930]
    if (colorKeywords && colorKeywords.length) {
      presetsDropdown.append(getColorMenu(self, colorKeywords, 'color-defaults'));
    }

    const presetsBtn = createElement<HTMLButtonElement>({
      tagName: 'button',
      type: 'button',
      className: 'menu-toggle btn-appearance',
      tabIndex: -1,
      ariaExpanded: 'false',
      ariaHasPopup: 'true',
    }) as HTMLButtonElement;

    const xmlns = encodeURI('http://www.w3.org/2000/svg');
    const presetsIcon = createElementNS(xmlns, {
      tagName: 'svg',
    }) as HTMLElement;
    setAttribute(presetsIcon, 'xmlns', xmlns);
    setAttribute(presetsIcon, 'viewBox', '0 0 512 512');
    setAttribute(presetsIcon, ariaHidden, 'true');

    const path = createElementNS(xmlns, {
      tagName: 'path',
    }) as HTMLElement;
    setAttribute(path, 'd', 'M98,158l157,156L411,158l27,27L255,368L71,185L98,158z');
    setAttribute(path, 'fill', '#fff');
    presetsIcon.append(path);
    presetsBtn.append(
      createElement({
        tagName: 'span',
        className: vHidden,
        innerText: `${toggleLabel}`,
      }) as HTMLElement,
      presetsIcon,
    );

    parent.append(presetsBtn, presetsDropdown);
  }

  // solve non-colors after settings save
  if (colorKeywords && nonColors.includes(colorValue)) {
    self.value = colorValue;
  }
  setAttribute(input, tabindex, '-1');
};

export default setMarkup;
