/*!
* ColorPalette v1.0.1 (http://thednp.github.io/color-picker)
* Copyright 2022 © thednp
* Licensed under MIT (https://github.com/thednp/color-picker/blob/master/LICENSE)
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ColorPalette = factory());
})(this, (function () { 'use strict';

  /**
   * Shortcut for `Object.assign()` static method.
   * @param  {Record<string, any>} obj a target object
   * @param  {Record<string, any>} source a source object
   */
  const ObjectAssign = (obj, source) => Object.assign(obj, source);

  /**
   * Round colour components, for all formats except HEX.
   * @param {number} v one of the colour components
   * @returns {number} the rounded number
   */
  function roundPart(v) {
    const floor = Math.floor(v);
    return v - floor < 0.5 ? floor : Math.round(v);
  }

  /**
   * A global namespace for `document.head`.
   */
  const { head: documentHead } = document;

  /**
   * Shortcut for `window.getComputedStyle(element).propertyName`
   * static method.
   *
   * * If `element` parameter is not an `HTMLElement`, `getComputedStyle`
   * throws a `ReferenceError`.
   *
   * @param {HTMLElement | Element} element target
   * @param {string} property the css property
   * @return {string} the css property value
   */
  function getElementStyle(element, property) {
    const computedStyle = getComputedStyle(element);

    // @ts-ignore -- must use camelcase strings,
    // or non-camelcase strings with `getPropertyValue`
    return property in computedStyle ? computedStyle[property] : '';
  }

  /**
   * Shortcut for multiple uses of `HTMLElement.style.propertyName` method.
   * @param  {HTMLElement | Element} element target element
   * @param  {Partial<CSSStyleDeclaration>} styles attribute value
   */
  // @ts-ignore
  const setElementStyle = (element, styles) => { ObjectAssign(element.style, styles); };

  /**
   * Shortcut for `String.toLowerCase()`.
   *
   * @param {string} source input string
   * @returns {string} lowercase output string
   */
  const toLowerCase = (source) => source.toLowerCase();

  /**
   * A list of explicit default non-color values.
   */
  const nonColors = ['transparent', 'currentColor', 'inherit', 'revert', 'initial'];

  // Color supported formats
  const COLOR_FORMAT = ['rgb', 'hex', 'hsl', 'hsv', 'hwb'];

  // Hue angles
  const ANGLES = 'deg|rad|grad|turn';

  // <http://www.w3.org/TR/css3-values/#integers>
  const CSS_INTEGER = '[-\\+]?\\d+%?';

  // Include CSS3 Module
  // <http://www.w3.org/TR/css3-values/#number-value>
  const CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';

  // Include CSS4 Module Hue degrees unit
  // <https://www.w3.org/TR/css3-values/#angle-value>
  const CSS_ANGLE = `[-\\+]?\\d*\\.?\\d+(?:${ANGLES})?`;

  // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
  const CSS_UNIT = `(?:${CSS_NUMBER})|(?:${CSS_INTEGER})`;

  // Add angles to the mix
  const CSS_UNIT2 = `(?:${CSS_UNIT})|(?:${CSS_ANGLE})`;

  // Start & end
  const START_MATCH = '(?:[\\s|\\(\\s|\\s\\(\\s]+)?';
  const END_MATCH = '(?:[\\s|\\)\\s]+)?';
  // Components separation
  const SEP = '(?:[,|\\s]+)';
  const SEP2 = '(?:[,|\\/\\s]*)?';

  // Actual matching.
  // Parentheses and commas are optional, but not required.
  // Whitespace can take the place of commas or opening paren
  const PERMISSIVE_MATCH = `${START_MATCH}(${CSS_UNIT2})${SEP}(${CSS_UNIT})${SEP}(${CSS_UNIT})${SEP2}(${CSS_UNIT})?${END_MATCH}`;

  const matchers = {
    CSS_UNIT: new RegExp(CSS_UNIT2),
    hwb: new RegExp(`hwb${PERMISSIVE_MATCH}`),
    rgb: new RegExp(`rgb(?:a)?${PERMISSIVE_MATCH}`),
    hsl: new RegExp(`hsl(?:a)?${PERMISSIVE_MATCH}`),
    hsv: new RegExp(`hsv(?:a)?${PERMISSIVE_MATCH}`),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  };

  /**
   * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
   * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
   * @param {string} n testing number
   * @returns {boolean} the query result
   */
  function isOnePointZero(n) {
    return `${n}`.includes('.') && parseFloat(n) === 1;
  }

  /**
   * Check to see if string passed in is a percentage
   * @param {string} n testing number
   * @returns {boolean} the query result
   */
  function isPercentage(n) {
    return `${n}`.includes('%');
  }

  /**
   * Check to see if string passed is a web safe colour.
   * @see https://stackoverflow.com/a/16994164
   * @param {string} color a colour name, EG: *red*
   * @returns {boolean} the query result
   */
  function isColorName(color) {
    if (nonColors.includes(color)
      || ['#', ...COLOR_FORMAT].some((f) => color.includes(f))) return false;

    if (['black', 'white'].includes(color)) return true;

    return ['rgb(255, 255, 255)', 'rgb(0, 0, 0)'].every((c) => {
      setElementStyle(documentHead, { color });
      const computedColor = getElementStyle(documentHead, 'color');
      setElementStyle(documentHead, { color: '' });
      return computedColor !== c;
    });
  }

  /**
   * Check to see if it looks like a CSS unit
   * (see `matchers` above for definition).
   * @param {string | number} color testing value
   * @returns {boolean} the query result
   */
  function isValidCSSUnit(color) {
    return Boolean(matchers.CSS_UNIT.exec(String(color)));
  }

  /**
   * Take input from [0, n] and return it as [0, 1]
   * @param {*} N the input number
   * @param {number} max the number maximum value
   * @returns {number} the number in [0, 1] value range
   */
  function bound01(N, max) {
    let n = N;

    if (typeof N === 'number'
      && Math.min(N, 0) === 0 // round values to 6 decimals Math.round(N * (10 ** 6)) / 10 ** 6
      && Math.max(N, 1) === 1) return N;

    if (isOnePointZero(N)) n = '100%';

    const processPercent = isPercentage(n);
    n = max === 360
      ? parseFloat(n)
      : Math.min(max, Math.max(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) n = (n * max) / 100;

    // Handle floating point rounding errors
    if (Math.abs(n - max) < 0.000001) {
      return 1;
    }
    // Convert into [0, 1] range if it isn't already
    if (max === 360) {
      // If n is a hue given in degrees,
      // wrap around out-of-range values into [0, 360] range
      // then convert into [0, 1].
      n = (n < 0 ? (n % max) + max : n % max) / max;
    } else {
      // If n not a hue given in degrees
      // Convert into [0, 1] range if it isn't already.
      n = (n % max) / max;
    }
    return n;
  }

  /**
   * Return a valid alpha value [0,1] with all invalid values being set to 1.
   * @param {string | number} a transparency value
   * @returns {number} a transparency value in the [0, 1] range
   */
  function boundAlpha(a) {
    let na = parseFloat(`${a}`);

    if (Number.isNaN(na) || na < 0 || na > 1) {
      na = 1;
    }

    return na;
  }

  /**
   * Force a number between 0 and 1.
   * @param {number} v the float number
   * @returns {number} - the resulting number
   */
  function clamp01(v) {
    return Math.min(1, Math.max(0, v));
  }

  /**
   * Returns the hexadecimal value of a web safe colour.
   * @param {string} name
   * @returns {string}
   */
  function getRGBFromName(name) {
    setElementStyle(documentHead, { color: name });
    const colorName = getElementStyle(documentHead, 'color');
    setElementStyle(documentHead, { color: '' });
    return colorName;
  }

  /**
   * Converts a decimal value to hexadecimal.
   * @param {number} d the input number
   * @returns {string} - the hexadecimal value
   */
  function convertDecimalToHex(d) {
    return roundPart(d * 255).toString(16);
  }

  /**
   * Converts a hexadecimal value to decimal.
   * @param {string} h hexadecimal value
   * @returns {number} number in decimal format
   */
  function convertHexToDecimal(h) {
    return parseIntFromHex(h) / 255;
  }

  /**
   * Converts a base-16 hexadecimal value into a base-10 integer.
   * @param {string} val
   * @returns {number}
   */
  function parseIntFromHex(val) {
    return parseInt(val, 16);
  }

  /**
   * Force a hexadecimal value to have 2 characters.
   * @param {string} c string with [0-9A-F] ranged values
   * @returns {string} 0 => 00, a => 0a
   */
  function pad2(c) {
    return c.length === 1 ? `0${c}` : String(c);
  }

  /**
   * Converts an RGB colour value to HSL.
   *
   * @param {number} r Red component [0, 1]
   * @param {number} g Green component [0, 1]
   * @param {number} b Blue component [0, 1]
   * @returns {CP.HSL} {h,s,l} object with [0, 1] ranged values
   */
  function rgbToHsl(r, g, b) {
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
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      if (max === g) h = (b - r) / d + 2;
      if (max === b) h = (r - g) / d + 4;

      h /= 6;
    }
    return { h, s, l };
  }

  /**
   * Returns a normalized RGB component value.
   * @param {number} p
   * @param {number} q
   * @param {number} t
   * @returns {number}
   */
  function hueToRgb(p, q, t) {
    let T = t;
    if (T < 0) T += 1;
    if (T > 1) T -= 1;
    if (T < 1 / 6) return p + (q - p) * (6 * T);
    if (T < 1 / 2) return q;
    if (T < 2 / 3) return p + (q - p) * (2 / 3 - T) * 6;
    return p;
  }

  /**
   * Converts an HSL colour value to RGB.
   *
   * @param {number} h Hue Angle [0, 1]
   * @param {number} s Saturation [0, 1]
   * @param {number} l Lightness Angle [0, 1]
   * @returns {CP.RGB} {r,g,b} object with [0, 1] ranged values
   */
  function hslToRgb(h, s, l) {
    let r = 0;
    let g = 0;
    let b = 0;

    if (s === 0) {
      // achromatic
      g = l;
      b = l;
      r = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hueToRgb(p, q, h + 1 / 3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1 / 3);
    }

    return { r, g, b };
  }

  /**
  * Returns an HWB colour object from an RGB colour object.
  * @link https://www.w3.org/TR/css-color-4/#hwb-to-rgb
  * @link http://alvyray.com/Papers/CG/hwb2rgb.htm
  *
  * @param {number} r Red component [0, 1]
  * @param {number} g Green [0, 1]
  * @param {number} b Blue [0, 1]
  * @return {CP.HWB} {h,w,b} object with [0, 1] ranged values
  */
  function rgbToHwb(r, g, b) {
    let f = 0;
    let i = 0;
    const whiteness = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const black = 1 - max;

    if (max === whiteness) return { h: 0, w: whiteness, b: black };
    if (r === whiteness) {
      f = g - b;
      i = 3;
    } else {
      f = g === whiteness ? b - r : r - g;
      i = g === whiteness ? 5 : 1;
    }

    const h = (i - f / (max - whiteness)) / 6;
    return {
      h: h === 1 ? 0 : h,
      w: whiteness,
      b: black,
    };
  }

  /**
  * Returns an RGB colour object from an HWB colour.
  *
  * @param {number} H Hue Angle [0, 1]
  * @param {number} W Whiteness [0, 1]
  * @param {number} B Blackness [0, 1]
  * @return {CP.RGB} {r,g,b} object with [0, 1] ranged values
  *
  * @link https://www.w3.org/TR/css-color-4/#hwb-to-rgb
  * @link http://alvyray.com/Papers/CG/hwb2rgb.htm
  */
  function hwbToRgb(H, W, B) {
    if (W + B >= 1) {
      const gray = W / (W + B);
      return { r: gray, g: gray, b: gray };
    }
    let { r, g, b } = hslToRgb(H, 1, 0.5);
    [r, g, b] = [r, g, b].map((v) => v * (1 - W - B) + W);

    return { r, g, b };
  }

  /**
   * Converts an RGB colour value to HSV.
   *
   * @param {number} r Red component [0, 1]
   * @param {number} g Green [0, 1]
   * @param {number} b Blue [0, 1]
   * @returns {CP.HSV} {h,s,v} object with [0, 1] ranged values
   */
  function rgbToHsv(r, g, b) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    const v = max;
    const d = max - min;
    const s = max === 0 ? 0 : d / max;
    if (max === min) {
      h = 0; // achromatic
    } else {
      if (r === max) h = (g - b) / d + (g < b ? 6 : 0);
      if (g === max) h = (b - r) / d + 2;
      if (b === max) h = (r - g) / d + 4;

      h /= 6;
    }
    return { h, s, v };
  }

  /**
   * Converts an HSV colour value to RGB.
   *
   * @param {number} H Hue Angle [0, 1]
   * @param {number} S Saturation [0, 1]
   * @param {number} V Brightness Angle [0, 1]
   * @returns {CP.RGB} {r,g,b} object with [0, 1] ranged values
   */
  function hsvToRgb(H, S, V) {
    const h = H * 6;
    const s = S;
    const v = V;
    const i = Math.floor(h);
    const f = h - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    const mod = i % 6;
    const r = [v, q, p, p, t, v][mod];
    const g = [t, v, v, q, p, p][mod];
    const b = [p, p, t, v, v, q][mod];
    return { r, g, b };
  }

  /**
   * Converts an RGB colour to hex
   *
   * Assumes r, g, and b are contained in the set [0, 255]
   * Returns a 3 or 6 character hex
   * @param {number} r Red component [0, 255]
   * @param {number} g Green [0, 255]
   * @param {number} b Blue [0, 255]
   * @param {boolean=} allow3Char
   * @returns {string}
   */
  function rgbToHex(r, g, b, allow3Char) {
    const hex = [
      pad2(roundPart(r).toString(16)),
      pad2(roundPart(g).toString(16)),
      pad2(roundPart(b).toString(16)),
    ];

    // Return a 3 character hex if possible
    if (allow3Char && hex[0].charAt(0) === hex[0].charAt(1)
      && hex[1].charAt(0) === hex[1].charAt(1)
      && hex[2].charAt(0) === hex[2].charAt(1)) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }

    return hex.join('');
  }

  /**
   * Converts an RGBA color plus alpha transparency to hex8.
   *
   * @param {number} r Red component [0, 255]
   * @param {number} g Green [0, 255]
   * @param {number} b Blue [0, 255]
   * @param {number} a Alpha transparency [0, 1]
   * @param {boolean=} allow4Char when *true* it will also find hex shorthand
   * @returns {string} a hexadecimal value with alpha transparency
   */
  function rgbaToHex(r, g, b, a, allow4Char) {
    const hex = [
      pad2(roundPart(r).toString(16)),
      pad2(roundPart(g).toString(16)),
      pad2(roundPart(b).toString(16)),
      pad2(convertDecimalToHex(a)),
    ];

    // Return a 4 character hex if possible
    if (allow4Char && hex[0].charAt(0) === hex[0].charAt(1)
      && hex[1].charAt(0) === hex[1].charAt(1)
      && hex[2].charAt(0) === hex[2].charAt(1)
      && hex[3].charAt(0) === hex[3].charAt(1)) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }
    return hex.join('');
  }

  /**
   * Permissive string parsing. Take in a number of formats, and output an object
   * based on detected format. Returns {r,g,b} or {h,s,l} or {h,s,v}
   * @param {string} input colour value in any format
   * @returns {Record<string, (number | string | boolean)> | false} an object matching the RegExp
   */
  function stringInputToObject(input) {
    let color = toLowerCase(input.trim());

    if (color.length === 0) {
      return {
        r: 0, g: 0, b: 0, a: 1,
      };
    }

    if (isColorName(color)) {
      color = getRGBFromName(color);
    } else if (nonColors.includes(color)) {
      const a = color === 'transparent' ? 0 : 1;
      return {
        r: 0, g: 0, b: 0, a, format: 'rgb', ok: true,
      };
    }

    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function,
    //   don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether Color is initialized with string or object.
    let [, m1, m2, m3, m4] = matchers.rgb.exec(color) || [];
    if (m1 && m2 && m3/* && m4 */) {
      return {
        r: m1, g: m2, b: m3, a: m4 !== undefined ? m4 : 1, format: 'rgb',
      };
    }

    [, m1, m2, m3, m4] = matchers.hsl.exec(color) || [];
    if (m1 && m2 && m3/* && m4 */) {
      return {
        h: m1, s: m2, l: m3, a: m4 !== undefined ? m4 : 1, format: 'hsl',
      };
    }

    [, m1, m2, m3, m4] = matchers.hsv.exec(color) || [];
    if (m1 && m2 && m3/* && m4 */) {
      return {
        h: m1, s: m2, v: m3, a: m4 !== undefined ? m4 : 1, format: 'hsv',
      };
    }

    [, m1, m2, m3, m4] = matchers.hwb.exec(color) || [];
    if (m1 && m2 && m3) {
      return {
        h: m1, w: m2, b: m3, a: m4 !== undefined ? m4 : 1, format: 'hwb',
      };
    }

    [, m1, m2, m3, m4] = matchers.hex8.exec(color) || [];
    if (m1 && m2 && m3 && m4) {
      return {
        r: parseIntFromHex(m1),
        g: parseIntFromHex(m2),
        b: parseIntFromHex(m3),
        a: convertHexToDecimal(m4),
        format: 'hex',
      };
    }

    [, m1, m2, m3] = matchers.hex6.exec(color) || [];
    if (m1 && m2 && m3) {
      return {
        r: parseIntFromHex(m1),
        g: parseIntFromHex(m2),
        b: parseIntFromHex(m3),
        format: 'hex',
      };
    }

    [, m1, m2, m3, m4] = matchers.hex4.exec(color) || [];
    if (m1 && m2 && m3 && m4) {
      return {
        r: parseIntFromHex(m1 + m1),
        g: parseIntFromHex(m2 + m2),
        b: parseIntFromHex(m3 + m3),
        a: convertHexToDecimal(m4 + m4),
        format: 'hex',
      };
    }

    [, m1, m2, m3] = matchers.hex3.exec(color) || [];
    if (m1 && m2 && m3) {
      return {
        r: parseIntFromHex(m1 + m1),
        g: parseIntFromHex(m2 + m2),
        b: parseIntFromHex(m3 + m3),
        format: 'hex',
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
   * "#ff000000" or "ff000000" // CSS4 Module
   * "rgb 255 0 0" or "rgb (255, 0, 0)"
   * "rgb 1.0 0 0" or "rgb (1, 0, 0)"
   * "rgba(255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
   * "rgba(1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
   * "rgb(255 0 0 / 10%)" or "rgb 255 0 0 0.1" // CSS4 Module
   * "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
   * "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
   * "hsl(0deg 100% 50% / 50%)" or "hsl 0 100 50 50" // CSS4 Module
   * "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
   * "hsva(0, 100%, 100%, 0.1)" or "hsva 0 100% 100% 0.1"
   * "hsv(0deg 100% 100% / 10%)" or "hsv 0 100 100 0.1" // CSS4 Module
   * "hwb(0deg, 100%, 100%, 100%)" or "hwb 0 100% 100% 0.1" // CSS4 Module
   * ```
   * @param {string | Record<string, any>} input
   * @returns {CP.ColorObject}
   */
  function inputToRGB(input) {
    let rgb = { r: 0, g: 0, b: 0 };
    /** @type {*} */
    let color = input;
    /** @type {string | number} */
    let a = 1;
    let s = null;
    let v = null;
    let l = null;
    let w = null;
    let b = null;
    let h = null;
    let r = null;
    let g = null;
    let ok = false;
    const inputFormat = typeof color === 'object' && color.format;
    let format = inputFormat && COLOR_FORMAT.includes(inputFormat) ? inputFormat : 'rgb';

    if (typeof input === 'string') {
      color = stringInputToObject(input);
      if (color) ok = true;
    }
    if (typeof color === 'object') {
      if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
        ({ r, g, b } = color);
        // RGB values now are all in [0, 1] range
        [r, g, b] = [r, g, b].map((n) => bound01(n, isPercentage(n) ? 100 : 255));
        rgb = { r, g, b };
        ok = true;
        format = color.format || 'rgb';
      }
      if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
        ({ h, s, v } = color);
        h = bound01(h, 360); // hue can be `5deg` or a [0, 1] value
        s = bound01(s, 100); // saturation can be `5%` or a [0, 1] value
        v = bound01(v, 100); // brightness can be `5%` or a [0, 1] value
        rgb = hsvToRgb(h, s, v);
        ok = true;
        format = 'hsv';
      }
      if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
        ({ h, s, l } = color);
        h = bound01(h, 360); // hue can be `5deg` or a [0, 1] value
        s = bound01(s, 100); // saturation can be `5%` or a [0, 1] value
        l = bound01(l, 100); // lightness can be `5%` or a [0, 1] value
        rgb = hslToRgb(h, s, l);
        ok = true;
        format = 'hsl';
      }
      if (isValidCSSUnit(color.h) && isValidCSSUnit(color.w) && isValidCSSUnit(color.b)) {
        ({ h, w, b } = color);
        h = bound01(h, 360); // hue can be `5deg` or a [0, 1] value
        w = bound01(w, 100); // whiteness can be `5%` or a [0, 1] value
        b = bound01(b, 100); // blackness can be `5%` or a [0, 1] value
        rgb = hwbToRgb(h, w, b);
        ok = true;
        format = 'hwb';
      }
      if (isValidCSSUnit(color.a)) {
        a = color.a;
        a = isPercentage(`${a}`) || parseFloat(a) > 1 ? bound01(a, 100) : a;
      }
    }
    if (typeof color === 'undefined') {
      ok = true;
    }

    return {
      ok,
      format,
      r: rgb.r,
      g: rgb.g,
      b: rgb.b,
      a: boundAlpha(a),
    };
  }

  /**
   * @class
   * Returns a new `Color` instance.
   * @see https://github.com/bgrins/TinyColor
   */
  class Color {
    /**
     * @constructor
     * @param {CP.ColorInput} input the given colour value
     * @param {CP.ColorFormats=} config the given format
     */
    constructor(input, config) {
      let color = input;
      const configFormat = config && COLOR_FORMAT.includes(config)
        ? config : '';

      // If input is already a `Color`, clone its values
      if (color instanceof Color) {
        color = inputToRGB(color);
      }

      const {
        r, g, b, a, ok, format,
      } = inputToRGB(color);

      // bind
      const self = this;

      /** @type {CP.ColorInput} */
      self.originalInput = input;
      /** @type {number} */
      self.r = r;
      /** @type {number} */
      self.g = g;
      /** @type {number} */
      self.b = b;
      /** @type {number} */
      self.a = a;
      /** @type {boolean} */
      self.ok = ok;
      /** @type {CP.ColorFormats} */
      self.format = configFormat || format;
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
      return this.brightness < 120;
    }

    /**
     * Returns the perceived luminance of a colour.
     * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
     * @returns {number} a number in the [0, 1] range
     */
    get luminance() {
      const { r, g, b } = this;
      let R = 0;
      let G = 0;
      let B = 0;

      if (r <= 0.03928) {
        R = r / 12.92;
      } else {
        R = ((r + 0.055) / 1.055) ** 2.4;
      }
      if (g <= 0.03928) {
        G = g / 12.92;
      } else {
        G = ((g + 0.055) / 1.055) ** 2.4;
      }
      if (b <= 0.03928) {
        B = b / 12.92;
      } else {
        B = ((b + 0.055) / 1.055) ** 2.4;
      }
      return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    }

    /**
     * Returns the perceived brightness of the colour.
     * @returns {number} a number in the [0, 255] range
     */
    get brightness() {
      const { r, g, b } = this.toRgb();
      return (r * 299 + g * 587 + b * 114) / 1000;
    }

    /**
     * Returns the colour as an RGBA object.
     * @returns {CP.RGBA} an {r,g,b,a} object with [0, 255] ranged values
     */
    toRgb() {
      let {
        r, g, b, a,
      } = this;

      [r, g, b] = [r, g, b].map((n) => roundPart(n * 255 * 100) / 100);
      a = roundPart(a * 100) / 100;
      return {
        r, g, b, a,
      };
    }

    /**
     * Returns the RGBA values concatenated into a CSS3 Module string format.
     * * rgb(255,255,255)
     * * rgba(255,255,255,0.5)
     * @returns {string} the CSS valid colour in RGB/RGBA format
     */
    toRgbString() {
      const {
        r, g, b, a,
      } = this.toRgb();
      const [R, G, B] = [r, g, b].map(roundPart);

      return a === 1
        ? `rgb(${R}, ${G}, ${B})`
        : `rgba(${R}, ${G}, ${B}, ${a})`;
    }

    /**
     * Returns the RGBA values concatenated into a CSS4 Module string format.
     * * rgb(255 255 255)
     * * rgb(255 255 255 / 50%)
     * @returns {string} the CSS valid colour in CSS4 RGB format
     */
    toRgbCSS4String() {
      const {
        r, g, b, a,
      } = this.toRgb();
      const [R, G, B] = [r, g, b].map(roundPart);
      const A = a === 1 ? '' : ` / ${roundPart(a * 100)}%`;

      return `rgb(${R} ${G} ${B}${A})`;
    }

    /**
     * Returns the hexadecimal value of the colour. When the parameter is *true*
     * it will find a 3 characters shorthand of the decimal value.
     *
     * @param {boolean=} allow3Char when `true` returns shorthand HEX
     * @returns {string} the hexadecimal colour format
     */
    toHex(allow3Char) {
      const {
        r, g, b, a,
      } = this.toRgb();

      return a === 1
        ? rgbToHex(r, g, b, allow3Char)
        : rgbaToHex(r, g, b, a, allow3Char);
    }

    /**
     * Returns the CSS valid hexadecimal vaue of the colour. When the parameter is *true*
     * it will find a 3 characters shorthand of the value.
     *
     * @param {boolean=} allow3Char when `true` returns shorthand HEX
     * @returns {string} the CSS valid colour in hexadecimal format
     */
    toHexString(allow3Char) {
      return `#${this.toHex(allow3Char)}`;
    }

    /**
     * Returns the HEX8 value of the colour.
     * @param {boolean=} allow4Char when `true` returns shorthand HEX
     * @returns {string} the CSS valid colour in hexadecimal format
     */
    toHex8(allow4Char) {
      const {
        r, g, b, a,
      } = this.toRgb();

      return rgbaToHex(r, g, b, a, allow4Char);
    }

    /**
     * Returns the HEX8 value of the colour.
     * @param {boolean=} allow4Char  when `true` returns shorthand HEX
     * @returns {string} the CSS valid colour in hexadecimal format
     */
    toHex8String(allow4Char) {
      return `#${this.toHex8(allow4Char)}`;
    }

    /**
     * Returns the colour as a HSVA object.
     * @returns {CP.HSVA} the `{h,s,v,a}` object with [0, 1] ranged values
     */
    toHsv() {
      const {
        r, g, b, a,
      } = this;
      const { h, s, v } = rgbToHsv(r, g, b);

      return {
        h, s, v, a,
      };
    }

    /**
     * Returns the colour as an HSLA object.
     * @returns {CP.HSLA} the `{h,s,l,a}` object with [0, 1] ranged values
     */
    toHsl() {
      const {
        r, g, b, a,
      } = this;
      const { h, s, l } = rgbToHsl(r, g, b);

      return {
        h, s, l, a,
      };
    }

    /**
     * Returns the HSLA values concatenated into a CSS3 Module format string.
     * * `hsl(150, 100%, 50%)`
     * * `hsla(150, 100%, 50%, 0.5)`
     * @returns {string} the CSS valid colour in HSL/HSLA format
     */
    toHslString() {
      let {
        h, s, l, a,
      } = this.toHsl();
      h = roundPart(h * 360);
      s = roundPart(s * 100);
      l = roundPart(l * 100);
      a = roundPart(a * 100) / 100;

      return a === 1
        ? `hsl(${h}, ${s}%, ${l}%)`
        : `hsla(${h}, ${s}%, ${l}%, ${a})`;
    }

    /**
     * Returns the HSLA values concatenated into a CSS4 Module format string.
     * * `hsl(150deg 100% 50%)`
     * * `hsl(150deg 100% 50% / 50%)`
     * @returns {string} the CSS valid colour in CSS4 HSL format
     */
    toHslCSS4String() {
      let {
        h, s, l, a,
      } = this.toHsl();
      h = roundPart(h * 360);
      s = roundPart(s * 100);
      l = roundPart(l * 100);
      a = roundPart(a * 100);
      const A = a < 100 ? ` / ${roundPart(a)}%` : '';

      return `hsl(${h}deg ${s}% ${l}%${A})`;
    }

    /**
     * Returns the colour as an HWBA object.
     * @returns {CP.HWBA} the `{h,w,b,a}` object with [0, 1] ranged values
     */
    toHwb() {
      const {
        r, g, b, a,
      } = this;
      const { h, w, b: bl } = rgbToHwb(r, g, b);
      return {
        h, w, b: bl, a,
      };
    }

    /**
     * Returns the HWBA values concatenated into a string.
     * @returns {string} the CSS valid colour in HWB format
     */
    toHwbString() {
      let {
        h, w, b, a,
      } = this.toHwb();
      h = roundPart(h * 360);
      w = roundPart(w * 100);
      b = roundPart(b * 100);
      a = roundPart(a * 100);
      const A = a < 100 ? ` / ${roundPart(a)}%` : '';

      return `hwb(${h}deg ${w}% ${b}%${A})`;
    }

    /**
     * Sets the alpha value of the current colour.
     * @param {number} alpha a new alpha value in the [0, 1] range.
     * @returns {Color} the `Color` instance
     */
    setAlpha(alpha) {
      const self = this;
      if (typeof alpha !== 'number') return self;
      self.a = boundAlpha(alpha);
      return self;
    }

    /**
     * Saturate the colour with a given amount.
     * @param {number=} amount a value in the [0, 100] range
     * @returns {Color} the `Color` instance
     */
    saturate(amount) {
      const self = this;
      if (typeof amount !== 'number') return self;
      const { h, s, l } = self.toHsl();
      const { r, g, b } = hslToRgb(h, clamp01(s + amount / 100), l);

      ObjectAssign(self, { r, g, b });
      return self;
    }

    /**
     * Desaturate the colour with a given amount.
     * @param {number=} amount a value in the [0, 100] range
     * @returns {Color} the `Color` instance
     */
    desaturate(amount) {
      return typeof amount === 'number' ? this.saturate(-amount) : this;
    }

    /**
     * Completely desaturates a colour into greyscale.
     * Same as calling `desaturate(100)`
     * @returns {Color} the `Color` instance
     */
    greyscale() {
      return this.saturate(-100);
    }

    /**
     * Increase the colour lightness with a given amount.
     * @param {number=} amount a value in the [0, 100] range
     * @returns {Color} the `Color` instance
     */
    lighten(amount) {
      const self = this;
      if (typeof amount !== 'number') return self;

      const { h, s, l } = self.toHsl();
      const { r, g, b } = hslToRgb(h, s, clamp01(l + amount / 100));

      ObjectAssign(self, { r, g, b });
      return self;
    }

    /**
     * Decrease the colour lightness with a given amount.
     * @param {number=} amount a value in the [0, 100] range
     * @returns {Color} the `Color` instance
     */
    darken(amount) {
      return typeof amount === 'number' ? this.lighten(-amount) : this;
    }

    /**
     * Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
     * Values outside of this range will be wrapped into this range.
     *
     * @param {number=} amount a value in the [0, 100] range
     * @returns {Color} the `Color` instance
     */
    spin(amount) {
      const self = this;
      if (typeof amount !== 'number') return self;

      const { h, s, l } = self.toHsl();
      const { r, g, b } = hslToRgb(clamp01(((h * 360 + amount) % 360) / 360), s, l);

      ObjectAssign(self, { r, g, b });
      return self;
    }

    /** Returns a clone of the current `Color` instance. */
    clone() {
      return new Color(this);
    }

    /**
     * Returns the colour value in CSS valid string format.
     * @param {boolean=} allowShort when *true*, HEX values can be shorthand
     * @returns {string} the CSS valid colour in the configured format
     */
    toString(allowShort) {
      const self = this;
      const { format } = self;

      if (format === 'hex') return self.toHexString(allowShort);
      if (format === 'hsl') return self.toHslString();
      if (format === 'hwb') return self.toHwbString();

      return self.toRgbString();
    }
  }

  ObjectAssign(Color, {
    ANGLES,
    CSS_ANGLE,
    CSS_INTEGER,
    CSS_NUMBER,
    CSS_UNIT,
    CSS_UNIT2,
    PERMISSIVE_MATCH,
    matchers,
    isOnePointZero,
    isPercentage,
    isValidCSSUnit,
    isColorName,
    pad2,
    clamp01,
    bound01,
    boundAlpha,
    getRGBFromName,
    convertHexToDecimal,
    convertDecimalToHex,
    rgbToHsl,
    rgbToHex,
    rgbToHsv,
    rgbToHwb,
    rgbaToHex,
    hslToRgb,
    hsvToRgb,
    hueToRgb,
    hwbToRgb,
    parseIntFromHex,
    stringInputToObject,
    inputToRGB,
    roundPart,
    getElementStyle,
    setElementStyle,
    ObjectAssign,
  });

  /**
   * @class
   * Returns a color palette with a given set of parameters.
   * @example
   * new ColorPalette(0, 12, 10);
   * // => { hue: 0, hueSteps: 12, lightSteps: 10, colors: Array<Color> }
   */
  class ColorPalette {
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

  return ColorPalette;

}));
