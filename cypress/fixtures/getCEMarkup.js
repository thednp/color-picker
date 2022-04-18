import getRandomInt from './getRandomInt';
import testSample from './testSample';
import FORMAT from './format';

export default function getCEMarkup(body) {
  const id = getRandomInt(0,9999);
  const format = FORMAT[getRandomInt(0,3)];
  const sample = testSample[getRandomInt(0,2)];
  const value = sample[format];

  const cpe = document.createElement('color-picker');
  cpe.setAttribute('data-id', `cpe-${format}-${id}`);
  cpe.setAttribute('data-format', format);
  cpe.setAttribute('data-value', value);
  if (body) {
    body.append(cpe);
  }
  return {value, id, format};
}