import { setAttribute, getAttribute, createElement, setElementStyle } from '@thednp/shorty';

import Color from '@thednp/color';
import ColorPalette from '../colorPalette';
import ColorPicker from '../index';

/**
 * Returns a color-defaults with given values and class.
 */
const getColorMenu = (self: ColorPicker, colorsSource: ColorPalette | string[], menuClass: string): HTMLElement => {
  const { input, format, componentLabels } = self;
  const { defaultsLabel, presetsLabel } = componentLabels;
  const isOptionsMenu = menuClass === 'color-options';
  const isPalette = colorsSource instanceof ColorPalette;
  const menuLabel = isOptionsMenu ? presetsLabel : defaultsLabel;
  const colorsArray = isPalette ? colorsSource.colors : colorsSource;
  const colorsCount = colorsArray.length;
  const { lightSteps } = isPalette ? colorsSource : { lightSteps: null };
  const fit = lightSteps || [9, 10].find(x => colorsCount >= x * 2 && !(colorsCount % x)) || 5;
  const isMultiLine = isOptionsMenu && colorsCount > fit;
  let rowCountHover = 2;
  rowCountHover = isMultiLine && colorsCount > fit * 2 ? 3 : rowCountHover;
  rowCountHover = isMultiLine && colorsCount > fit * 3 ? 4 : rowCountHover;
  rowCountHover = isMultiLine && colorsCount > fit * 4 ? 5 : rowCountHover;
  const rowCount = rowCountHover - (colorsCount <= fit * 3 ? 1 : 2);
  const isScrollable = isMultiLine && colorsCount > rowCount * fit;
  let finalClass = menuClass;
  finalClass += isScrollable ? ' scrollable' : '';
  finalClass += isMultiLine ? ' multiline' : '';
  const gap = isMultiLine ? '1px' : '0.25rem';
  let optionSize = isMultiLine ? 1.75 : 2;
  optionSize = fit > 5 && isMultiLine ? 1.5 : optionSize;
  const menuHeight = `${rowCount * optionSize}rem`;
  const menuHeightHover = `calc(${rowCountHover} * ${optionSize}rem + ${rowCountHover - 1} * ${gap})`;

  // <UL> is an `HTMLElement`
  const menu = createElement({
    tagName: 'ul',
    className: finalClass,
    role: 'listbox',
    ariaLabel: menuLabel,
  }) as HTMLElement;

  if (isScrollable) {
    setElementStyle(menu, {
      '--grid-item-size': `${optionSize}rem`,
      '--grid-fit': `${fit}`,
      '--grid-gap': gap,
      '--grid-height': menuHeight,
      '--grid-hover-height': menuHeightHover,
    });
  }

  colorsArray.forEach(x => {
    let [value, label] = typeof x === 'string' ? x.trim().split(':') : [];
    if (x instanceof Color) {
      value = x.toHexString();
      label = value;
    }
    const color = new Color(x instanceof Color ? x : value, format);
    const isActive = color.toString() === getAttribute(input, 'value');
    const active = isActive ? ' active' : '';

    const option = createElement({
      tagName: 'li',
      className: `color-option${active}`,
      innerText: `${label || value}`,
      tabIndex: 0,
      role: 'option',
      ariaSelected: isActive ? 'true' : 'false',
    }) as HTMLElement;
    setAttribute(option, 'data-value', `${value}`);

    if (isOptionsMenu) {
      setElementStyle(option, { backgroundColor: value });
    }

    menu.append(option);
  });
  return menu;
};

export default getColorMenu;
