import getAttribute from 'shorter-js/src/attr/getAttribute';
import setAttribute from 'shorter-js/src/attr/setAttribute';
import toUpperCase from 'shorter-js/src/misc/toUpperCase';
// import ariaLabel from 'shorter-js/src/strings/ariaLabel';
import ariaExpanded from 'shorter-js/src/strings/ariaExpanded';
import ariaHasPopup from 'shorter-js/src/strings/ariaHasPopup';
import ariaHidden from 'shorter-js/src/strings/ariaHidden';
import ariaLabelledBy from 'shorter-js/src/strings/ariaLabelledBy';
import createElement from 'shorter-js/src/misc/createElement';
import createElementNS from 'shorter-js/src/misc/createElementNS';

import getColorForm from './getColorForm';
import getColorControls from './getColorControls';
import getColorMenu from './getColorMenu';
import nonColors from './nonColors';
import vHidden from './vHidden';
import tabIndex from './tabindex';

import Color from '../color';
import ColorPalette from '../color-palette';

/**
* Generate HTML markup and update instance properties.
* @param {CP.ColorPicker} self
*/
export default function setMarkup(self) {
  const {
    input, parent, format, id, componentLabels, colorKeywords, colorPresets,
  } = self;
  const colorValue = getAttribute(input, 'value') || '#fff';

  const {
    toggleLabel, pickerLabel, formatLabel, hexLabel,
  } = componentLabels;

  // update color
  const color = nonColors.includes(colorValue) ? '#fff' : colorValue;
  self.color = new Color(color, format);

  // set initial controls dimensions
  const formatString = format === 'hex' ? hexLabel : toUpperCase(format);

  const pickerBtn = createElement({
    id: `picker-btn-${id}`,
    tagName: 'button',
    className: 'picker-toggle btn-appearance',
  });
  setAttribute(pickerBtn, ariaExpanded, 'false');
  setAttribute(pickerBtn, ariaHasPopup, 'true');
  pickerBtn.append(createElement({
    tagName: 'span',
    className: vHidden,
    innerText: `${pickerLabel}. ${formatLabel}: ${formatString}`,
  }));

  const pickerDropdown = createElement({
    tagName: 'div',
    className: 'color-dropdown picker',
  });
  setAttribute(pickerDropdown, ariaLabelledBy, `picker-btn-${id}`);
  setAttribute(pickerDropdown, 'role', 'group');

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
    });

    // color presets
    if ((colorPresets instanceof Array && colorPresets.length)
      || (colorPresets instanceof ColorPalette && colorPresets.colors)) {
      presetsDropdown.append(getColorMenu(self, colorPresets, 'color-options'));
    }

    // explicit defaults [reset, initial, inherit, transparent, currentColor]
    if (colorKeywords && colorKeywords.length) {
      presetsDropdown.append(getColorMenu(self, colorKeywords, 'color-defaults'));
    }

    const presetsBtn = createElement({
      tagName: 'button',
      className: 'menu-toggle btn-appearance',
    });
    setAttribute(presetsBtn, tabIndex, '-1');
    setAttribute(presetsBtn, ariaExpanded, 'false');
    setAttribute(presetsBtn, ariaHasPopup, 'true');

    const xmlns = encodeURI('http://www.w3.org/2000/svg');
    const presetsIcon = createElementNS(xmlns, { tagName: 'svg' });
    setAttribute(presetsIcon, 'xmlns', xmlns);
    setAttribute(presetsIcon, 'viewBox', '0 0 512 512');
    setAttribute(presetsIcon, ariaHidden, 'true');

    const path = createElementNS(xmlns, { tagName: 'path' });
    setAttribute(path, 'd', 'M98,158l157,156L411,158l27,27L255,368L71,185L98,158z');
    setAttribute(path, 'fill', '#fff');
    presetsIcon.append(path);
    presetsBtn.append(createElement({
      tagName: 'span',
      className: vHidden,
      innerText: `${toggleLabel}`,
    }), presetsIcon);

    parent.append(presetsBtn, presetsDropdown);
  }

  // solve non-colors after settings save
  if (colorKeywords && nonColors.includes(colorValue)) {
    self.value = colorValue;
  }
  setAttribute(input, tabIndex, '-1');
}
