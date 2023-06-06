import { createElement, setAttribute, ObjectAssign, toUpperCase } from '@thednp/shorty';

import vHidden from './vHidden';
import ColorPicker from '../index';

/**
 * Returns the color form for `ColorPicker`.
 *
 * @param self the `ColorPicker` instance
 * @returns a new `<div>` element with color component `<input>`
 */
const getColorForm = (self: ColorPicker): HTMLElement => {
  const { format, id, componentLabels } = self;
  const colorForm = createElement({
    tagName: 'div',
    className: `color-form ${format}`,
  }) as HTMLElement;

  let components = ['hex'];
  if (format === 'rgb') components = ['red', 'green', 'blue', 'alpha'];
  else if (format === 'hsl') components = ['hue', 'saturation', 'lightness', 'alpha'];
  else if (format === 'hwb') components = ['hue', 'whiteness', 'blackness', 'alpha'];

  components.forEach((c: string): void => {
    const [C] = format === 'hex' ? ['#'] : toUpperCase(c).split('');
    const cID = `color_${format}_${c}_${id}`;
    const formatLabel = componentLabels[`${c}Label`];
    const cInputLabel = createElement({ tagName: 'label' }) as HTMLElement;
    setAttribute(cInputLabel, 'for', cID);
    cInputLabel.append(
      createElement({
        tagName: 'span',
        ariaHidden: 'true',
        innerText: `${C}:`,
      }) as HTMLElement,
      createElement({
        tagName: 'span',
        className: vHidden,
        innerText: formatLabel,
      }) as HTMLElement,
    );
    const cInput = createElement({
      tagName: 'input',
      id: cID,
      // name: cID, - prevent saving the value to a form
      type: format === 'hex' ? 'text' : 'number',
      value: c === 'alpha' ? '100' : '0',
      className: `color-input ${c}`,
      autocomplete: 'off',
      spellcheck: false,
    } as Partial<HTMLInputElement>) as HTMLInputElement;

    // alpha
    let max = '100';
    let step = '1';
    if (c !== 'alpha') {
      if (format === 'rgb') {
        max = '255';
        step = '1';
      } else if (c === 'hue') {
        max = '360';
        step = '1';
      }
    }
    ObjectAssign(cInput, {
      min: '0',
      max,
      step,
    });
    colorForm.append(cInputLabel, cInput);
  });
  return colorForm;
};

export default getColorForm;
