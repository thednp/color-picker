import getDocumentHead from 'shorter-js/src/get/getDocumentHead';
import getElementStyle from 'shorter-js/src/get/getElementStyle';
import setElementStyle from 'shorter-js/src/misc/setElementStyle';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';

import webColors from './util/webColors';
import nonColors from './util/nonColors';

// <http://www.w3.org/TR/css3-values/#integers>
const CSS_INTEGER = '[-\\+]?\\d+%?';

// <http://www.w3.org/TR/css3-values/#number-value>
const CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';

// Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
const CSS_UNIT = `(?:${CSS_NUMBER})|(?:${CSS_INTEGER})`;

// Actual matching.
// Parentheses and commas are optional, but not required.
// Whitespace can take the place of commas or opening paren
const PERMISSIVE_MATCH3 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)?`;
const PERMISSIVE_MATCH4 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)?`;

const matchers = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp(`rgb${PERMISSIVE_MATCH3}`),
  rgba: new RegExp(`rgba${PERMISSIVE_MATCH4}`),
  hsl: new RegExp(`hsl${PERMISSIVE_MATCH3}`),
  hsla: new RegExp(`hsla${PERMISSIVE_MATCH4}`),
  hsv: new RegExp(`hsv${PERMISSIVE_MATCH3}`),
  hsva: new RegExp(`hsva${PERMISSIVE_MATCH4}`),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
};

/**
 * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
 * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
 * @param {string} n
 * @returns {boolean}
 */
function isOnePointZero(n) {
  return typeof n === 'string' && n.includes('.') && parseFloat(n) === 1;
}

/**
 * Check to see if string passed in is a percentage
 * @param {string} n
 * @returns {boolean}
 */
function isPercentage(n) {
  return typeof n === 'string' && n.includes('%');
}

/**
 * Check to see if it looks like a CSS unit
 * (see `matchers` above for definition).
 * @param {string | number} color
 * @returns {boolean}
 */
function isValidCSSUnit(color) {
  return Boolean(matchers.CSS_UNIT.exec(String(color)));
}

/**
 * Take input from [0, n] and return it as [0, 1]
 * @param {*} n
 * @param {number} max
 * @returns {number}
 */
function bound01(n, max) {
  let N = n;
  if (isOnePointZero(n)) N = '100%';

  N = max === 360 ? N : Math.min(max, Math.max(0, parseFloat(N)));

  // Automatically convert percentage into number
  if (isPercentage(N)) {
    N = parseInt(String(N * max), 10) / 100;
  }
  // Handle floating point rounding errors
  if (Math.abs(N - max) < 0.000001) {
    return 1;
  }
  // Convert into [0, 1] range if it isn't already
  if (max === 360) {
    // If n is a hue given in degrees,
    // wrap around out-of-range values into [0, 360] range
    // then convert into [0, 1].
    N = (N < 0 ? (N % max) + max : N % max) / parseFloat(String(max));
  } else {
    // If n not a hue given in degrees
    // Convert into [0, 1] range if it isn't already.
    N = (N % max) / parseFloat(String(max));
  }
  return N;
}

/**
 * Return a valid alpha value [0,1] with all invalid values being set to 1.
 * @param {string | number} a
 * @returns {number}
 */
function boundAlpha(a) {
  // @ts-ignore
  let na = parseFloat(a);

  if (Number.isNaN(na) || na < 0 || na > 1) {
    na = 1;
  }

  return na;
}

/**
 * Force a number between 0 and 1
 * @param {number} val
 * @returns {number}
 */
function clamp01(val) {
  return Math.min(1, Math.max(0, val));
}

/**
 * Returns the hexadecimal value of a web safe colour.
 * @param {string} name
 * @returns {string}
 */
function getHexFromColorName(name) {
  const documentHead = getDocumentHead();
  setElementStyle(documentHead, { color: name });
  const colorName = getElementStyle(documentHead, 'color');
  setElementStyle(documentHead, { color: '' });
  return colorName;
}

/**
 * Replace a decimal with it's percentage value
 * @param {number | string} n
 * @return {string | number}
 */
function convertToPercentage(n) {
  if (n <= 1) {
    return `${Number(n) * 100}%`;
  }
  return n;
}

/**
 * Force a hex value to have 2 characters
 * @param {string} c
 * @returns {string}
 */
function pad2(c) {
  return c.length === 1 ? `0${c}` : String(c);
}

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
/**
 * Handle bounds / percentage checking to conform to CSS colour spec
 * * *Assumes:* r, g, b in [0, 255] or [0, 1]
 * * *Returns:* { r, g, b } in [0, 255]
 * @see http://www.w3.org/TR/css3-color/
 * @param {number | string} r
 * @param {number | string} g
 * @param {number | string} b
 * @returns {CP.RGB}
 */
function rgbToRgb(r, g, b) {
  return {
    r: bound01(r, 255) * 255,
    g: bound01(g, 255) * 255,
    b: bound01(b, 255) * 255,
  };
}

/**
 * Converts an RGB colour value to HSL.
 * *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
 * *Returns:* { h, s, l } in [0,1]
 * @param {number} R
 * @param {number} G
 * @param {number} B
 * @returns {CP.HSL}
 */
function rgbToHsl(R, G, B) {
  const r = bound01(R, 255);
  const g = bound01(G, 255);
  const b = bound01(B, 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max === min) {
    s = 0;
    h = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
    }
    h /= 6;
  }
  return { h, s, l };
}

/**
 * Returns a normalized RGB component value.
 * @param {number} P
 * @param {number} Q
 * @param {number} T
 * @returns {number}
 */
function hue2rgb(P, Q, T) {
  const p = P;
  const q = Q;
  let t = T;
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * (6 * t);
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
}

/**
 * Converts an HSL colour value to RGB.
 *
 * * *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
 * * *Returns:* { r, g, b } in the set [0, 255]
 * @param {number | string} H
 * @param {number | string} S
 * @param {number | string} L
 * @returns {CP.RGB}
 */
function hslToRgb(H, S, L) {
  let r = 0;
  let g = 0;
  let b = 0;
  const h = bound01(H, 360);
  const s = bound01(S, 100);
  const l = bound01(L, 100);

  if (s === 0) {
    // achromatic
    g = l;
    b = l;
    r = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
}

/**
 * Converts an RGB colour value to HSV.
 *
 * *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
 * *Returns:* { h, s, v } in [0,1]
 * @param {number | string} R
 * @param {number | string} G
 * @param {number | string} B
 * @returns {CP.HSV}
 */
function rgbToHsv(R, G, B) {
  const r = bound01(R, 255);
  const g = bound01(G, 255);
  const b = bound01(B, 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const v = max;
  const d = max - min;
  const s = max === 0 ? 0 : d / max;
  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
    }
    h /= 6;
  }
  return { h, s, v };
}

/**
 * Converts an HSV colour value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 * @param {number | string} H
 * @param {number | string} S
 * @param {number | string} V
 * @returns {CP.RGB}
 */
function hsvToRgb(H, S, V) {
  const h = bound01(H, 360) * 6;
  const s = bound01(S, 100);
  const v = bound01(V, 100);
  const i = Math.floor(h);
  const f = h - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  const mod = i % 6;
  const r = [v, q, p, p, t, v][mod];
  const g = [t, v, v, q, p, p][mod];
  const b = [p, p, t, v, v, q][mod];
  return { r: r * 255, g: g * 255, b: b * 255 };
}

/**
 * Converts an RGB colour to hex
 *
 * Assumes r, g, and b are contained in the set [0, 255]
 * Returns a 3 or 6 character hex
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {string}
 */
function rgbToHex(r, g, b) {
  const hex = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16)),
  ];

  return hex.join('');
}

/**
 * Converts a hex value to a decimal.
 * @param {string} h
 * @returns {number}
 */
function convertHexToDecimal(h) {
  return parseIntFromHex(h) / 255;
}

/**
 * Parse a base-16 hex value into a base-10 integer.
 * @param {string} val
 * @returns {number}
 */
function parseIntFromHex(val) {
  return parseInt(val, 16);
}

/**
 * Returns an `{r,g,b}` colour object corresponding to a given number.
 * @param {number} color
 * @returns {CP.RGB}
 */
function numberInputToObject(color) {
  /* eslint-disable no-bitwise */
  return {
    r: color >> 16,
    g: (color & 0xff00) >> 8,
    b: color & 0xff,
  };
  /* eslint-enable no-bitwise */
}

/**
 * Permissive string parsing.  Take in a number of formats, and output an object
 * based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
 * @param {string} input
 * @returns {Record<string, (number | string)> | false}
 */
function stringInputToObject(input) {
  let color = input.trim().toLowerCase();
  if (color.length === 0) {
    return {
      r: 0, g: 0, b: 0, a: 0,
    };
  }
  let named = false;
  if (webColors.includes(color)) {
    color = getHexFromColorName(color);
    named = true;
  } else if (nonColors.includes(color)) {
    return {
      r: 255, g: 255, b: 255, a: 1, format: 'rgb',
    };
  }

  // Try to match string input using regular expressions.
  // Keep most of the number bounding out of this function,
  //   don't worry about [0,1] or [0,100] or [0,360]
  // Just return an object and let the conversion functions handle that.
  // This way the result will be the same whether Color is initialized with string or object.
  let match = matchers.rgb.exec(color);
  if (match) {
    return { r: match[1], g: match[2], b: match[3] };
  }
  match = matchers.rgba.exec(color);
  if (match) {
    return {
      r: match[1], g: match[2], b: match[3], a: match[4],
    };
  }
  match = matchers.hsl.exec(color);
  if (match) {
    return { h: match[1], s: match[2], l: match[3] };
  }
  match = matchers.hsla.exec(color);
  if (match) {
    return {
      h: match[1], s: match[2], l: match[3], a: match[4],
    };
  }
  match = matchers.hsv.exec(color);
  if (match) {
    return { h: match[1], s: match[2], v: match[3] };
  }
  match = matchers.hsva.exec(color);
  if (match) {
    return {
      h: match[1], s: match[2], v: match[3], a: match[4],
    };
  }
  match = matchers.hex8.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: named ? 'rgb' : 'hex8',
    };
  }
  match = matchers.hex6.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: named ? 'rgb' : 'hex',
    };
  }
  match = matchers.hex4.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      a: convertHexToDecimal(match[4] + match[4]),
      format: named ? 'rgb' : 'hex8',
    };
  }
  match = matchers.hex3.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      format: named ? 'rgb' : 'hex',
    };
  }
  return false;
}

/**
 * Given a string or object, convert that input to RGB
 *
 * Possible string inputs:
 * ```
 * "red"
 * "#f00" or "f00"
 * "#ff0000" or "ff0000"
 * "#ff000000" or "ff000000"
 * "rgb 255 0 0" or "rgb (255, 0, 0)"
 * "rgb 1.0 0 0" or "rgb (1, 0, 0)"
 * "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
 * "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
 * "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
 * "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
 * "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
 * ```
 * @param {string | Record<string, any>} input
 * @returns {CP.ColorObject}
 */
function inputToRGB(input) {
  /** @type {CP.RGB} */
  let rgb = { r: 0, g: 0, b: 0 };
  let color = input;
  let a;
  let s = null;
  let v = null;
  let l = null;
  let ok = false;
  let format = 'hex';

  if (typeof input === 'string') {
    // @ts-ignore -- this now is converted to object
    color = stringInputToObject(input);
    if (color) ok = true;
  }
  if (typeof color === 'object') {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format = `${color.r}`.slice(-1) === '%' ? 'prgb' : 'rgb';
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s);
      v = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s, v);
      ok = true;
      format = 'hsv';
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s = convertToPercentage(color.s);
      l = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, s, l);
      ok = true;
      format = 'hsl';
    }
    if ('a' in color) a = color.a;
  }

  return {
    ok, // @ts-ignore
    format: color.format || format,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a: boundAlpha(a),
  };
}

/**
 * Returns a new `Color` instance.
 * @see https://github.com/bgrins/TinyColor
 * @class
 */
export default class Color {
  /**
   * @constructor
   * @param {CP.ColorInput} input
   * @param {CP.ColorFormats=} config
   */
  constructor(input, config) {
    let color = input;
    const configFormat = config && ['hex', 'rgb', 'hsl'].includes(config)
      ? config : 'hex';

    // If input is already a `Color`, return itself
    if (color instanceof Color) {
      color = inputToRGB(color);
    }
    if (typeof color === 'number') {
      color = numberInputToObject(color);
    }
    const {
      r, g, b, a, ok, format,
    } = inputToRGB(color);

    /** @type {CP.ColorInput} */
    this.originalInput = color;
    /** @type {number} */
    this.r = r;
    /** @type {number} */
    this.g = g;
    /** @type {number} */
    this.b = b;
    /** @type {number} */
    this.a = a;
    /** @type {boolean} */
    this.ok = ok;
    /** @type {number} */
    this.roundA = Math.round(100 * this.a) / 100;
    /** @type {CP.ColorFormats} */
    this.format = configFormat || format;

    // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
    if (this.r < 1) {
      this.r = Math.round(this.r);
    }
    if (this.g < 1) {
      this.g = Math.round(this.g);
    }
    if (this.b < 1) {
      this.b = Math.round(this.b);
    }
  }

  /**
   * Checks if the current input value is a valid colour.
   * @returns {boolean} the query result
   */
  get isValid() {
    return this.ok;
  }

  /**
   * Checks if the current colour requires a light text colour.
   * @returns {boolean} the query result
   */
  get isDark() {
    return this.brightness < 128;
  }

  /**
   * Returns the perceived luminance of a colour.
   * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   * @returns {number} a number in the [0-1] range
   */
  get luminance() {
    const { r, g, b } = this;
    let R = 0;
    let G = 0;
    let B = 0;
    const RsRGB = r / 255;
    const GsRGB = g / 255;
    const BsRGB = b / 255;

    if (RsRGB <= 0.03928) {
      R = RsRGB / 12.92;
    } else {
      R = ((RsRGB + 0.055) / 1.055) ** 2.4;
    }
    if (GsRGB <= 0.03928) {
      G = GsRGB / 12.92;
    } else {
      G = ((GsRGB + 0.055) / 1.055) ** 2.4;
    }
    if (BsRGB <= 0.03928) {
      B = BsRGB / 12.92;
    } else {
      B = ((BsRGB + 0.055) / 1.055) ** 2.4;
    }
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }

  /**
   * Returns the perceived brightness of the colour.
   * @returns {number} a number in the [0-255] range
   */
  get brightness() {
    const { r, g, b } = this;
    return (r * 299 + g * 587 + b * 114) / 1000;
  }

  /**
   * Returns the colour as an RGBA object.
   * @returns {CP.RGBA}
   */
  toRgb() {
    return {
      r: Math.round(this.r),
      g: Math.round(this.g),
      b: Math.round(this.b),
      a: this.a,
    };
  }

  /**
   * Returns the RGBA values concatenated into a string.
   * @returns {string} the CSS valid colour in RGB/RGBA format
   */
  toRgbString() {
    const r = Math.round(this.r);
    const g = Math.round(this.g);
    const b = Math.round(this.b);
    return this.a === 1
      ? `rgb(${r},${g},${b})`
      : `rgba(${r},${g},${b},${this.roundA})`;
  }

  /**
   * Returns the HEX value of the colour.
   * @returns {string} the hexadecimal colour format
   */
  toHex() {
    return rgbToHex(this.r, this.g, this.b);
  }

  /**
   * Returns the HEX value of the colour.
   * @returns {string} the CSS valid colour in hexadecimal format
   */
  toHexString() {
    return `#${this.toHex()}`;
  }

  /**
   * Returns the colour as a HSVA object.
   * @returns {CP.HSVA} the `{h,s,v,a}` object
   */
  toHsv() {
    const { h, s, v } = rgbToHsv(this.r, this.g, this.b);
    return {
      h: h * 360, s, v, a: this.a,
    };
  }

  /**
   * Returns the colour as a HSLA object.
   * @returns {CP.HSLA}
   */
  toHsl() {
    const { h, s, l } = rgbToHsl(this.r, this.g, this.b);
    return {
      h: h * 360, s, l, a: this.a,
    };
  }

  /**
   * Returns the HSLA values concatenated into a string.
   * @returns {string} the CSS valid colour in HSL/HSLA format
   */
  toHslString() {
    let { h, s, l } = this.toHsl();
    h = Math.round(h);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return this.a === 1
      ? `hsl(${h},${s}%,${l}%)`
      : `hsla(${h},${s}%,${l}%,${this.roundA})`;
  }

  /**
   * Sets the alpha value on the current colour.
   * @param {number} alpha a new alpha value in [0-1] range.
   * @returns {Color} a new `Color` instance
   */
  setAlpha(alpha) {
    this.a = boundAlpha(alpha);
    this.roundA = Math.round(100 * this.a) / 100;
    return this;
  }

  /**
   * Saturate the colour with a given amount.
   * @param {number=} amount a value in [0-100] range
   * @returns {Color} a new `Color` instance
   */
  saturate(amount) {
    if (!amount) return this;
    const hsl = this.toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return new Color(hsl);
  }

  /**
   * Desaturate the colour with a given amount.
   * @param {number=} amount a value in [0-100] range
   * @returns {Color} a new `Color` instance
   */
  desaturate(amount) {
    return amount ? this.saturate(-amount) : this;
  }

  /**
   * Completely desaturates a colour into greyscale.
   * Same as calling `desaturate(100)`
   * @returns {Color} a new `Color` instance
   */
  greyscale() {
    return this.desaturate(100);
  }

  /** Returns a clone of the current `Color` instance. */
  clone() {
    return new Color(this);
  }

  /**
   * Returns the colour value in CSS valid string format.
   * @returns {string}
   */
  toString() {
    const { format } = this;

    if (format === 'rgb') {
      return this.toRgbString();
    }
    if (format === 'hsl') {
      return this.toHslString();
    }
    return this.toHexString();
  }
}

ObjectAssign(Color, {
  webColors,
  CSS_INTEGER,
  CSS_NUMBER,
  CSS_UNIT,
  PERMISSIVE_MATCH3,
  PERMISSIVE_MATCH4,
  matchers,
  isOnePointZero,
  isPercentage,
  isValidCSSUnit,
  bound01,
  boundAlpha,
  clamp01,
  getHexFromColorName,
  convertToPercentage,
  convertHexToDecimal,
  pad2,
  rgbToRgb,
  rgbToHsl,
  rgbToHex,
  rgbToHsv,
  hslToRgb,
  hsvToRgb,
  hue2rgb,
  parseIntFromHex,
  numberInputToObject,
  stringInputToObject,
  inputToRGB,
});
