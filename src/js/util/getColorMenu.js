import ariaLabel from 'shorter-js/src/strings/ariaLabel';
import ariaSelected from 'shorter-js/src/strings/ariaSelected';
import setAttribute from 'shorter-js/src/attr/setAttribute';
import getAttribute from 'shorter-js/src/attr/getAttribute';
import createElement from 'shorter-js/src/misc/createElement';
import setElementStyle from 'shorter-js/src/misc/setElementStyle';

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
  let fit = lightSteps
    || Math.max(...[5, 6, 7, 8, 9, 10].filter((x) => colorsCount > (x * 2) && !(colorsCount % x)));
  fit = Number.isFinite(fit) ? fit : 5;
  const isMultiLine = isOptionsMenu && colorsCount > fit;
  let rowCountHover = 1;
  rowCountHover = isMultiLine && colorsCount < 27 ? 2 : rowCountHover;
  rowCountHover = colorsCount >= 27 ? 3 : rowCountHover;
  rowCountHover = colorsCount >= 36 ? 4 : rowCountHover;
  rowCountHover = colorsCount >= 45 ? 5 : rowCountHover;
  const rowCount = rowCountHover - (colorsCount < 27 ? 1 : 2);
  const isScrollable = isMultiLine && colorsCount > rowCountHover * fit;
  let finalClass = menuClass;
  finalClass += isScrollable ? ' scrollable' : '';
  finalClass += isMultiLine ? ' multiline' : '';
  const gap = isMultiLine ? '1px' : '0.25rem';
  let optionSize = isMultiLine ? 1.75 : 2;
  optionSize = !(colorsCount % 10) && isMultiLine ? 1.5 : optionSize;
  const menuHeight = `${(rowCount || 1) * optionSize}rem`;
  const menuHeightHover = `calc(${rowCountHover} * ${optionSize}rem + ${rowCountHover - 1} * ${gap})`;
  const gridTemplateColumns = `repeat(${fit}, ${optionSize}rem)`;
  const gridTemplateRows = `repeat(auto-fill, ${optionSize}rem)`;

  const menu = createElement({
    tagName: 'ul',
    className: finalClass,
  });
  setAttribute(menu, 'role', 'listbox');
  setAttribute(menu, ariaLabel, `${menuLabel}`);

  if (isOptionsMenu) {
    if (isScrollable) {
      const styleText = 'this.style.height=';
      setAttribute(menu, 'onmouseout', `${styleText}'${menuHeight}'`);
      setAttribute(menu, 'onmouseover', `${styleText}'${menuHeightHover}'`);
    }
    const menuStyle = {
      height: isScrollable ? menuHeight : '', gridTemplateColumns, gridTemplateRows, gap,
    };
    setElementStyle(menu, menuStyle);
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

    setAttribute(option, 'tabindex', '0');
    setAttribute(option, 'data-value', `${value}`);
    setAttribute(option, 'role', 'option');
    setAttribute(option, ariaSelected, isActive ? 'true' : 'false');

    if (isOptionsMenu) {
      setElementStyle(option, {
        width: `${optionSize}rem`, height: `${optionSize}rem`, backgroundColor: x,
      });
    }

    menu.append(option);
  });
  return menu;
}
