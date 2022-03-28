import ariaLabel from 'shorter-js/src/strings/ariaLabel';
import ariaValueMin from 'shorter-js/src/strings/ariaValueMin';
import ariaValueMax from 'shorter-js/src/strings/ariaValueMax';
import createElement from 'shorter-js/src/misc/createElement';
import setAttribute from 'shorter-js/src/attr/setAttribute';

import tabIndex from './tabindex';

/**
 * Returns all color controls for `ColorPicker`.
 *
 * @param {CP.ColorPicker} self the `ColorPicker` instance
 * @returns {HTMLElement | Element} color controls
 */
export default function getColorControls(self) {
  const { format, componentLabels } = self;
  const {
    hueLabel, alphaLabel, lightnessLabel, saturationLabel,
    whitenessLabel, blacknessLabel,
  } = componentLabels;

  const max1 = format === 'hsl' ? 360 : 100;
  const max2 = format === 'hsl' ? 100 : 360;
  const max3 = 100;

  let ctrl1Label = format === 'hsl'
    ? `${hueLabel} & ${lightnessLabel}`
    : `${lightnessLabel} & ${saturationLabel}`;

  ctrl1Label = format === 'hwb'
    ? `${whitenessLabel} & ${blacknessLabel}`
    : ctrl1Label;

  const ctrl2Label = format === 'hsl'
    ? `${saturationLabel}`
    : `${hueLabel}`;

  const colorControls = createElement({
    tagName: 'div',
    className: `color-controls ${format}`,
  });

  const colorPointer = 'color-pointer';
  const colorSlider = 'color-slider';

  const controls = [
    {
      i: 1,
      c: colorPointer,
      l: ctrl1Label,
      min: 0,
      max: max1,
    },
    {
      i: 2,
      c: colorSlider,
      l: ctrl2Label,
      min: 0,
      max: max2,
    },
    {
      i: 3,
      c: colorSlider,
      l: alphaLabel,
      min: 0,
      max: max3,
    },
  ];

  controls.forEach((template) => {
    const {
      i, c, l, min, max,
    } = template;
    const control = createElement({
      tagName: 'div',
      className: 'color-control',
    });
    setAttribute(control, 'role', 'presentation');

    control.append(
      createElement({
        tagName: 'div',
        className: `visual-control visual-control${i}`,
      }),
    );

    const knob = createElement({
      tagName: 'div',
      className: `${c} knob`,
      ariaLive: 'polite',
    });

    setAttribute(knob, ariaLabel, l);
    setAttribute(knob, 'role', 'slider');
    setAttribute(knob, tabIndex, '0');
    setAttribute(knob, ariaValueMin, `${min}`);
    setAttribute(knob, ariaValueMax, `${max}`);
    control.append(knob);
    colorControls.append(control);
  });

  return colorControls;
}
