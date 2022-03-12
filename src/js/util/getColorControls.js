import ariaLabel from 'shorter-js/src/strings/ariaLabel';
import ariaValueMin from 'shorter-js/src/strings/ariaValueMin';
import ariaValueMax from 'shorter-js/src/strings/ariaValueMax';
import createElement from 'shorter-js/src/misc/createElement';
import setAttribute from 'shorter-js/src/attr/setAttribute';
import isMobile from 'shorter-js/src/boolean/isMobile';

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
  } = componentLabels;

  const cv1w = isMobile ? 150 : 230;
  const cvh = isMobile ? 150 : 230;
  const cv2w = 21;
  const max1 = format === 'hsl' ? 360 : 100;
  const max2 = format === 'hsl' ? 100 : 360;
  const max3 = 100;
  const ctrl1Label = format === 'hsl'
    ? `${hueLabel} & ${lightnessLabel}`
    : `${lightnessLabel} & ${saturationLabel}`;
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
      w: cv1w,
      h: cvh,
      i: 1,
      c: colorPointer,
      l: ctrl1Label,
      min: 0,
      max: max1,
    },
    {
      w: cv2w,
      h: cvh,
      i: 2,
      c: colorSlider,
      l: ctrl2Label,
      min: 0,
      max: max2,
    },
  ];

  if (format !== 'hex') {
    controls.push({
      w: cv2w,
      h: cvh,
      i: 3,
      c: colorSlider,
      l: alphaLabel,
      min: 0,
      max: max3,
    });
  }

  controls.forEach((template) => {
    const {
      w, h, i, c, l, min, max,
    } = template;
    const control = createElement({
      tagName: 'div',
      className: 'color-control',
    });
    setAttribute(control, 'role', 'presentation');

    control.append(
      createElement({
        tagName: 'canvas',
        className: `visual-control${i}`,
        ariaHidden: 'true',
        width: `${w}`,
        height: `${h}`,
      }),
    );

    const knob = createElement({
      tagName: 'div',
      className: `${c} knob`,
      ariaLive: 'polite',
    });

    setAttribute(knob, ariaLabel, l);
    setAttribute(knob, 'role', 'slider');
    setAttribute(knob, 'tabindex', '0');
    setAttribute(knob, ariaValueMin, `${min}`);
    setAttribute(knob, ariaValueMax, `${max}`);
    control.append(knob);
    colorControls.append(control);
  });

  return colorControls;
}
