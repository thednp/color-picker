import { createElement } from '@thednp/shorty';

import ColorPicker from '..';

/**
 * Returns all color controls for `ColorPicker`.
 *
 * @param self the `ColorPicker` instance
 * @returns color controls
 */
const getColorControls = (self: ColorPicker): HTMLElement => {
  const { format, componentLabels } = self;
  const { hueLabel, alphaLabel, lightnessLabel, saturationLabel, whitenessLabel, blacknessLabel } = componentLabels;

  const max1 = format === 'hsl' ? 360 : 100;
  const max2 = format === 'hsl' ? 100 : 360;
  const max3 = 100;

  let ctrl1Label = format === 'hsl' ? `${hueLabel} & ${lightnessLabel}` : `${lightnessLabel} & ${saturationLabel}`;

  ctrl1Label = format === 'hwb' ? `${whitenessLabel} & ${blacknessLabel}` : ctrl1Label;

  const ctrl2Label = format === 'hsl' ? `${saturationLabel}` : `${hueLabel}`;

  const colorControls = createElement({
    tagName: 'div',
    className: `color-controls ${format}`,
  }) as HTMLElement;

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

  controls.forEach(template => {
    const { i, c, l, min, max } = template;
    const control = createElement({
      tagName: 'div',
      className: 'color-control',
      role: 'presentation',
    }) as HTMLElement;

    control.append(
      createElement({
        tagName: 'div',
        className: `visual-control visual-control${i}`,
      }) as HTMLElement,
    );

    const knob = createElement({
      tagName: 'div',
      className: `${c} knob`,
      ariaLive: 'polite',
      ariaLabel: l,
      role: 'slider',
      tabIndex: 0,
      ariaValueMin: `${min}`,
      ariaValueMax: `${max}`,
    }) as HTMLElement;

    control.append(knob);
    colorControls.append(control);
  });

  return colorControls;
};

export default getColorControls;
