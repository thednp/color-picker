import roundPart from './util/roundPart';
import Color from './color';

/**
 * @class
 * Returns a color palette with a given set of parameters.
 * @example
 * new ColorPalette(0, 12, 10);
 * // => { hue: 0, hueSteps: 12, lightSteps: 10, colors: array }
 */
export default class ColorPalette {
  /**
   * The `hue` parameter is optional, which would be set to 0.
   * @param {number[]} args represeinting hue, hueSteps, lightSteps
   * * `args.hue` the starting Hue [0, 360]
   * * `args.hueSteps` Hue Steps Count [5, 24]
   * * `args.lightSteps` Lightness Steps Count [5, 12]
   */
  constructor(...args) {
    let hue = 0;
    let hueSteps = 12;
    let lightSteps = 10;
    let lightnessArray = [0.5];

    if (args.length === 3) {
      [hue, hueSteps, lightSteps] = args;
    } else if (args.length === 2) {
      [hueSteps, lightSteps] = args;
    } else {
      throw TypeError('ColorPalette requires minimum 2 arguments');
    }

    /** @type {Color[]} */
    const colors = [];

    const hueStep = 360 / hueSteps;
    const half = roundPart((lightSteps - (lightSteps % 2 ? 1 : 0)) / 2);
    const estimatedStep = 100 / (lightSteps + (lightSteps % 2 ? 0 : 1)) / 100;

    let lightStep = 0.25;
    lightStep = [4, 5].includes(lightSteps) ? 0.2 : lightStep;
    lightStep = [6, 7].includes(lightSteps) ? 0.15 : lightStep;
    lightStep = [8, 9].includes(lightSteps) ? 0.11 : lightStep;
    lightStep = [10, 11].includes(lightSteps) ? 0.09 : lightStep;
    lightStep = [12, 13].includes(lightSteps) ? 0.075 : lightStep;
    lightStep = lightSteps > 13 ? estimatedStep : lightStep;

    // light tints
    for (let i = 1; i < half + 1; i += 1) {
      lightnessArray = [...lightnessArray, (0.5 + lightStep * (i))];
    }

    // dark tints
    for (let i = 1; i < lightSteps - half; i += 1) {
      lightnessArray = [(0.5 - lightStep * (i)), ...lightnessArray];
    }

    // feed `colors` Array
    for (let i = 0; i < hueSteps; i += 1) {
      const currentHue = ((hue + i * hueStep) % 360) / 360;
      lightnessArray.forEach((l) => {
        colors.push(new Color({ h: currentHue, s: 1, l }));
      });
    }

    this.hue = hue;
    this.hueSteps = hueSteps;
    this.lightSteps = lightSteps;
    this.colors = colors;
  }
}
