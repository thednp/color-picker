/**
 * A `Color` compatible object.
 */
 export interface ColorObject {
  r: number;
  g: number;
  b: number;
  a: number;
  ok: boolean;
  format: ColorFormats;
}

/**
 * A representation of additive color mixing.
 * Projection of primary color lights on a white screen shows secondary
 * colors where two overlap; the combination of all three of red, green,
 * and blue in equal intensities makes white.
 */
export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface RGBA extends RGB {
  a: number;
}

/**
 * The HSL model describes colors in terms of hue, saturation,
 * and lightness (also called luminance).
 * @link https://en.wikibooks.org/wiki/Color_Models:_RGB,_HSV,_HSL#HSL
 */
export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface HSLA extends HSL {
  a: number;
}

/**
 * The HSV, or HSB, model describes colors in terms of
 * hue, saturation, and value (brightness).
 * @link https://en.wikibooks.org/wiki/Color_Models:_RGB,_HSV,_HSL#HSV
 */
export interface HSV {
  h: number;
  s: number;
  v: number;
}

export interface HSVA extends HSV {
  a: number;
}

/**
 * The HWB model describes colors in terms of
 * hue, whiteness, and blackness.
 * @link https://www.w3.org/TR/css-color-4/#hwb-to-rgb
 * @link http://alvyray.com/Papers/CG/hwb2rgb.htm
 */
 export interface HWB {
  h: number;
  w: number;
  b: number;
}

export interface HWBA extends HWB {
  a: number;
}

export interface ColorPickerOptions {
  colorLabels?: string[];
  componentLabels?: Record<string, string>;
  format?: ColorFormats;
  colorPresets?: string[] | {
    hue: number,
    lightSteps: number,
    hueSteps: number,
    colors: string[],
  };
  colorKeywords?: string[];
}

export type ColorInput = string | RGB | RGBA | HSL | HSLA | HSV | HSVA | HWB | ColorObject;
export type ColorFormats = string | 'rgb' | 'hex' | 'hex3' | 'hex4' | 'hex6' | 'hex8' | 'hsl' | 'hsv' | 'hwb';

export type GetInstance<T, ET> = (target: ET | string, component: string) => T | null;
export type InitCallback<T> = (element: HTMLInputElement | string ) => T;