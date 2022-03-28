import ariaLabel from 'shorter-js/src/strings/ariaLabel';
import ariaSelected from 'shorter-js/src/strings/ariaSelected';
import setAttribute from 'shorter-js/src/attr/setAttribute';
import getAttribute from 'shorter-js/src/attr/getAttribute';
import createElement from 'shorter-js/src/misc/createElement';
import setElementStyle from 'shorter-js/src/misc/setElementStyle';

import setCSSProperties from './setCSSProperties';
import tabIndex from './tabindex';
import Color from '../color';
import ColorPalette from '../color-palette';

/**
 * Returns a color-defaults with given values and class.
 * @param {CP.ColorPicker} self
 * @param {CP.ColorPalette | string[]} colorsSource
 * @param {string} menuClass
 * @returns {HTMLElement | Element}
 */
export default function getColorMenu(self, colorsSource, menuClass) {
  const { input, format, componentLabels } = self;
  const { defaultsLabel, presetsLabel } = componentLabels;
  const isOptionsMenu = menuClass === 'color-options';
  const isPalette = colorsSource instanceof ColorPalette;
  const menuLabel = isOptionsMenu ? presetsLabel : defaultsLabel;
  let colorsArray = isPalette ? colorsSource.colors : colorsSource;
  colorsArray = colorsArray instanceof Array ? colorsArray : [];
  const colorsCount = colorsArray.length;
  const { lightSteps } = isPalette ? colorsSource : { lightSteps: null };
  const fit = lightSteps || [9, 10].find((x) => colorsCount > x * 2 && !(colorsCount % x)) || 5;
  const isMultiLine = isOptionsMenu && colorsCount > fit;
  let rowCountHover = 2;
  rowCountHover = isMultiLine && colorsCount >= fit * 2 ? 3 : rowCountHover;
  rowCountHover = colorsCount >= fit * 3 ? 4 : rowCountHover;
  rowCountHover = colorsCount >= fit * 4 ? 5 : rowCountHover;
  const rowCount = rowCountHover - (colorsCount < fit * 3 ? 1 : 2);
  const isScrollable = isMultiLine && colorsCount > rowCount * fit;
  let finalClass = menuClass;
  finalClass += isScrollable ? ' scrollable' : '';
  finalClass += isMultiLine ? ' multiline' : '';
  const gap = isMultiLine ? '1px' : '0.25rem';
  let optionSize = isMultiLine ? 1.75 : 2;
  optionSize = fit > 5 && isMultiLine ? 1.5 : optionSize;
  const menuHeight = `${(rowCount || 1) * optionSize}rem`;
  const menuHeightHover = `calc(${rowCountHover} * ${optionSize}rem + ${rowCountHover - 1} * ${gap})`;

  const menu = createElement({
    tagName: 'ul',
    className: finalClass,
  });
  setAttribute(menu, 'role', 'listbox');
  setAttribute(menu, ariaLabel, menuLabel);

  if (isScrollable) { // @ts-ignore
    setCSSProperties(menu, {
      '--grid-item-size': `${optionSize}rem`,
      '--grid-fit': fit,
      '--grid-gap': gap,
      '--grid-height': menuHeight,
      '--grid-hover-height': menuHeightHover,
    });
  }

  colorsArray.forEach((x) => {
    const [value, label] = x.trim().split(':');
    const xRealColor = new Color(value, format).toString();
    const isActive = xRealColor === getAttribute(input, 'value');
    const active = isActive ? ' active' : '';

    const option = createElement({
      tagName: 'li',
      className: `color-option${active}`,
      innerText: `${label || x}`,
    });

    setAttribute(option, tabIndex, '0');
    setAttribute(option, 'data-value', `${value}`);
    setAttribute(option, 'role', 'option');
    setAttribute(option, ariaSelected, isActive ? 'true' : 'false');

    if (isOptionsMenu) {
      setElementStyle(option, { backgroundColor: x });
    }

    menu.append(option);
  });
  return menu;
}
