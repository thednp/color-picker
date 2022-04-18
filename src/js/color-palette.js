import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';

import roundPart from './util/roundPart';
import Color from './color';

/**
 * @class
 * Returns a color palette with a given set of parameters.
 * @example
 * new ColorPalette(0, 12, 10);
 * // => { hue: 0, hueSteps: 12, lightSteps: 10, colors: Array<Color> }
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
      if ([hueSteps, lightSteps].some((n) => n < 1)) {
        throw TypeError('ColorPalette: both arguments must be higher than 0.');
      }
    }

    /** @type {*} */
    const colors = [];
    const hueStep = 360 / hueSteps;
    const half = roundPart((lightSteps - (lightSteps % 2 ? 1 : 0)) / 2);
    const steps1To13 = [0.25, 0.2, 0.15, 0.11, 0.09, 0.075];
    const lightSets = [[1, 2, 3], [4, 5], [6, 7], [8, 9], [10, 11], [12, 13]];
    const closestSet = lightSets.find((set) => set.includes(lightSteps));

    // find a lightStep that won't go beyond black and white
    // something within the [10-90] range of lightness
    const lightStep = closestSet
      ? steps1To13[lightSets.indexOf(closestSet)]
      : (100 / (lightSteps + (lightSteps % 2 ? 0 : 1)) / 100);

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

ObjectAssign(ColorPalette, { Color });
