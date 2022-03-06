import createElement from 'shorter-js/src/misc/createElement';
import setAttribute from 'shorter-js/src/attr/setAttribute';
import ariaLabelledBy from 'shorter-js/src/strings/ariaLabelledBy';

import vHidden from './vHidden';

/**
 * Returns a new color control `HTMLElement`.
 * @param {number} iteration
 * @param {number} id
 * @param {number} width
 * @param {number} height
 * @param {string=} labelledby
 * @returns {HTMLElement | Element}
 */
export default function getColorControl(iteration, id, width, height, labelledby) {
  const labelID = `appearance${iteration}_${id}`;
  const knobClass = iteration === 1 ? 'color-pointer' : 'color-slider';
  const control = createElement({
    tagName: 'div',
    className: 'color-control',
  });
  setAttribute(control, 'role', 'presentation');

  control.append(
    createElement({
      id: labelID,
      tagName: 'label',
      className: `color-label ${vHidden}`,
      ariaLive: 'polite',
    }),
    createElement({
      tagName: 'canvas',
      className: `visual-control${iteration}`,
      ariaHidden: 'true',
      width: `${width}`,
      height: `${height}`,
    }),
  );

  const knob = createElement({
    tagName: 'div',
    className: `${knobClass} knob`,
  });
  setAttribute(knob, ariaLabelledBy, labelledby || labelID);
  setAttribute(knob, 'tabindex', '0');
  control.append(knob);
  return control;
}
