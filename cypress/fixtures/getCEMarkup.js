import ColorPickerElement from '../../src/js/color-picker-element';

import getRandomInt from './getRandomInt';
import testSample from './testSample';
import FORMAT from './format';
import colorNamesFrench from './colorNamesFrench';
import componentLabelsFrench from './componentLabelsFrench';

export default function getCEMarkup(body) {
  const id = getRandomInt(0,9999);
  const format = FORMAT[getRandomInt(0,3)];
  const sample = testSample[getRandomInt(0,2)];
  const value = sample[format];

  // const cpe = document.createElement('color-picker');
  const cpe = new ColorPickerElement();
  cpe.setAttribute('data-id', `cpe-${format}-${id}`);
  cpe.setAttribute('data-format', format);
  cpe.setAttribute('data-value', value);
  cpe.setAttribute('data-component-labels', JSON.stringify(componentLabelsFrench));
  cpe.setAttribute('data-color-labels', colorNamesFrench);
  cpe.setAttribute('data-color-keywords', 'red,gree,blue');
  cpe.setAttribute('data-color-presets', '#330000,#990000,#ff0000,#ff6666,#ffcccc,#003333,#009999,#00ffff,#66ffff,#ccffff');

  if (body) {
    body.append(cpe);
  }
  return {value, id, format};
}