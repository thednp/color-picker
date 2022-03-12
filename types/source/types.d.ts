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
  // h: number | string;
  // s: number | string;
  // l: number | string;
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

export type ColorInput = string | number | RGB | RGBA | HSL | HSLA | HSV | HSVA | ColorObject;
export type ColorFormats = string | 'rgb' | 'hex' | 'hex3' | 'hex4' | 'hex6' | 'hex8' | 'hsl' | 'hsv';

export type GetInstance<T> = (element: string | HTMLInputElement) => T | null;
export type InitCallback<T> = (element: string | HTMLInputElement, format?: ColorFormats | undefined) => T;