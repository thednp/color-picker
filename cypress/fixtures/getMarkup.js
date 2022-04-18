import testSample from "./testSample";
import getRandomInt from "./getRandomInt";

export default function getMarkup(body, id, format) {
  const set = testSample[getRandomInt(0,3)]
  const value = set[format];

  const label = document.createElement('label');
  label.setAttribute('for', `color-picker-${id}`);
  label.innerText = `Color Picker Test`;

  const cpWrapper = document.createElement('div');
  cpWrapper.className = 'color-picker';

  const input = document.createElement('input');
  input.type = 'text';
  input.id = `color-picker-${id}`;
  input.className = 'btn-appearance color-preview';
  input.setAttribute('value', value);
  input.setAttribute('autocomplete', "off");
  input.setAttribute('spellcheck', "false");
  input.setAttribute('data-format', format);
  cpWrapper.append(input);
  if (body) {
    body.append(label, cpWrapper);
  }
  return value;
}
