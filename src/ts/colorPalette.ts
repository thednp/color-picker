import Color from '@thednp/color';
// import { isNumber } from '@thednp/shorty';

/**
 * Returns a color palette with a given set of parameters.
 *
 * @example
 * new ColorPalette(0, 12, 10, 80);
 * // => { hue: 0, hueSteps: 12, lightSteps: 10, saturation: 80, colors: Array<Color> }
 */
export default class ColorPalette {
  public static Color = Color;
  hue: number;
  hueSteps: number;
  lightSteps: number;
  saturation: number;
  colors: Color[];
  /**
   * The `hue` parameter is optional, which would be set to 0.
   * * `args.hue` the starting Hue [0, 360]
   * * `args.hueSteps` Hue Steps Count [5, 24]
   * * `args.lightSteps` Lightness Steps Count [5, 12]
   * * `args.saturation` Saturation [0, 100]
   */
  constructor(...args: [number?, number?, number?, number?]) {
    let hue = 0;
    let hueSteps = 12;
    let lightSteps = 10;
    let lightnessArray = [0.5];
    let saturation = 100;
    // if (!args.every(n => isNumber(n))) throw TypeError('ColorPalette only accepts numbers.');

    if (args.length === 4) {
      [hue, hueSteps, lightSteps, saturation] = args as [number, number, number, number];
    } else if (args.length === 3) {
      [hue, hueSteps, lightSteps] = args as [number, number, number];
    } else if (args.length === 2) {
      [hueSteps, lightSteps] = args as [number, number];
      if ([hueSteps, lightSteps].some(n => n < 1)) {
        throw TypeError('ColorPalette: the two minimum arguments must be numbers higher than 0.');
      }
    }

    const colors: Color[] = [];
    const hueStep = 360 / hueSteps;
    const half = Color.roundPart((lightSteps - (lightSteps % 2 ? 1 : 0)) / 2);
    const steps1To13 = [0.25, 0.2, 0.15, 0.11, 0.09, 0.075];
    const lightSets = [
      [1, 2, 3],
      [4, 5],
      [6, 7],
      [8, 9],
      [10, 11],
      [12, 13],
    ];
    const closestSet = lightSets.find(set => set.includes(lightSteps));

    // find a lightStep that won't go beyond black and white
    // something within the [10-90] range of lightness
    const lightStep = closestSet
      ? steps1To13[lightSets.indexOf(closestSet)]
      : 100 / (lightSteps + (lightSteps % 2 ? 0 : 1)) / 100;

    // light tints
    for (let i = 1; i < half + 1; i += 1) {
      lightnessArray = [...lightnessArray, 0.5 + lightStep * i];
    }

    // dark tints
    for (let i = 1; i < lightSteps - half; i += 1) {
      lightnessArray = [0.5 - lightStep * i, ...lightnessArray];
    }

    // feed `colors` Array
    for (let i = 0; i < hueSteps; i += 1) {
      const currentHue = ((hue + i * hueStep) % 360) / 360;
      lightnessArray.forEach(l => {
        const newColor = new Color({ h: currentHue, s: 1, l });
        colors.push(saturation < 100 ? newColor.saturate(saturation - 100) : newColor);
      });
    }

    this.hue = hue;
    this.hueSteps = hueSteps;
    this.lightSteps = lightSteps;
    this.saturation = saturation;
    this.colors = colors;
  }
}
