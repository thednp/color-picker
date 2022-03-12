import createElement from 'shorter-js/src/misc/createElement';
import setAttribute from 'shorter-js/src/attr/setAttribute';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';
import toUpperCase from 'shorter-js/src/misc/toUpperCase';

import vHidden from './vHidden';

/**
 * Returns the color form for `ColorPicker`.
 *
 * @param {CP.ColorPicker} self the `ColorPicker` instance
 * @returns {HTMLElement | Element} a new `<div>` element with color component `<input>`
 */
export default function getColorForm(self) {
  const { format, id, componentLabels } = self;
  const colorForm = createElement({
    tagName: 'div',
    className: `color-form ${format}`,
  });

  let components = ['hex'];
  if (format === 'rgb') components = ['red', 'green', 'blue', 'alpha'];
  else if (format === 'hsl') components = ['hue', 'saturation', 'lightness', 'alpha'];

  components.forEach((c) => {
    const [C] = format === 'hex' ? ['#'] : toUpperCase(c).split('');
    const cID = `color_${format}_${c}_${id}`;
    const formatLabel = componentLabels[`${c}Label`];
    const cInputLabel = createElement({ tagName: 'label' });
    setAttribute(cInputLabel, 'for', cID);
    cInputLabel.append(
      createElement({ tagName: 'span', ariaHidden: 'true', innerText: `${C}:` }),
      createElement({ tagName: 'span', className: vHidden, innerText: formatLabel }),
    );
    const cInput = createElement({
      tagName: 'input',
      id: cID,
      // name: cID, - prevent saving the value to a form
      type: format === 'hex' ? 'text' : 'number',
      value: c === 'alpha' ? '1' : '0',
      className: `color-input ${c}`,
      autocomplete: 'off',
      spellcheck: 'false',
    });
    if (format !== 'hex') {
      // alpha
      let max = '1';
      let step = '0.01';
      if (c !== 'alpha') {
        if (format === 'rgb') {
          max = '255'; step = '1';
        } else if (c === 'hue') {
          max = '360'; step = '1';
        } else {
          max = '100'; step = '1';
        }
      }
      ObjectAssign(cInput, {
        min: '0',
        max,
        step,
      });
    }
    colorForm.append(cInputLabel, cInput);
  });
  return colorForm;
}
