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
   * * `args.hueSteps` Hue Steps Count [5, 13]
   * * `args.lightSteps` Lightness Steps Count [8, 10]
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
      throw TypeError('The ColorPalette requires minimum 2 arguments');
    }

    /** @type {string[]} */
    const colors = [];

    const hueStep = 360 / hueSteps;
    const lightStep = 100 / (lightSteps + (lightSteps % 2 ? 0 : 1)) / 100;
    const half = Math.round((lightSteps - (lightSteps % 2 ? 1 : 0)) / 2);

    // light tints
    for (let i = 0; i < half; i += 1) {
      lightnessArray = [...lightnessArray, (0.5 + lightStep * (i + 1))];
    }

    // dark tints
    for (let i = 0; i < lightSteps - half - 1; i += 1) {
      lightnessArray = [(0.5 - lightStep * (i + 1)), ...lightnessArray];
    }

    // feed `colors` Array
    for (let i = 0; i < hueSteps; i += 1) {
      const currentHue = ((hue + i * hueStep) % 360) / 360;
      lightnessArray.forEach((l) => {
        colors.push(new Color({ h: currentHue, s: 1, l }).toHexString());
      });
    }

    this.hue = hue;
    this.hueSteps = hueSteps;
    this.lightSteps = lightSteps;
    this.colors = colors;
  }
}
