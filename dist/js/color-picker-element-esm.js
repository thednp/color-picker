/*!
* ColorPickerElement v0.0.1alpha1 (http://thednp.github.io/color-picker)
* Copyright 2022 © thednp
* Licensed under MIT (https://github.com/thednp/color-picker/blob/master/LICENSE)
*/
/**
 * Returns the `document` or the `#document` element.
 * @see https://github.com/floating-ui/floating-ui
 * @param {(Node | HTMLElement | Element | globalThis)=} node
 * @returns {Document}
 */
function getDocument(node) {
  if (node instanceof HTMLElement) return node.ownerDocument;
  if (node instanceof Window) return node.document;
  return window.document;
}

/**
 * A global array of possible `ParentNode`.
 */
const parentNodes = [Document, Element, HTMLElement];

/**
 * A global array with `Element` | `HTMLElement`.
 */
const elementNodes = [Element, HTMLElement];

/**
 * Utility to check if target is typeof `HTMLElement`, `Element`, `Node`
 * or find one that matches a selector.
 *
 * @param {HTMLElement | Element | string} selector the input selector or target element
 * @param {(HTMLElement | Element | Document)=} parent optional node to look into
 * @return {(HTMLElement | Element)?} the `HTMLElement` or `querySelector` result
 */
function querySelector(selector, parent) {
  const lookUp = parentNodes.some((x) => parent instanceof x)
    ? parent : getDocument();

  // @ts-ignore
  return elementNodes.some((x) => selector instanceof x)
    // @ts-ignore
    ? selector : lookUp.querySelector(selector);
}

/**
 * Shortcut for `Object.assign()` static method.
 * @param  {Record<string, any>} obj a target object
 * @param  {Record<string, any>} source a source object
 */
const ObjectAssign = (obj, source) => Object.assign(obj, source);

/**
 * This is a shortie for `document.createElement` method
 * which allows you to create a new `HTMLElement` for a given `tagName`
 * or based on an object with specific non-readonly attributes:
 * `id`, `className`, `textContent`, `style`, etc.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
 *
 * @param {Record<string, string> | string} param `tagName` or object
 * @return {HTMLElement | Element} a new `HTMLElement` or `Element`
 */
function createElement(param) {
  if (typeof param === 'string') {
    return getDocument().createElement(param);
  }

  const { tagName } = param;
  const attr = { ...param };
  const newElement = createElement(tagName);
  delete attr.tagName;
  ObjectAssign(newElement, attr);
  return newElement;
}

/**
 * Returns the `document.head` or the `<head>` element.
 *
 * @param {(Node | HTMLElement | Element | globalThis)=} node
 * @returns {HTMLElement | HTMLHeadElement}
 */
function getDocumentHead(node) {
  return getDocument(node).head;
}

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
 * A complete list of web safe colors.
 * @see https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json
 * @type {string[]}
 */
const colorNames = [
  'aliceblue',
  'antiquewhite',
  'aqua',
  'aquamarine',
  'azure',
  'beige',
  'bisque',
  'black',
  'blanchedalmond',
  'blue',
  'blueviolet',
  'brown',
  'burlywood',
  'cadetblue',
  'chartreuse',
  'chocolate',
  'coral',
  'cornflowerblue',
  'cornsilk',
  'crimson',
  'cyan',
  'darkblue',
  'darkcyan',
  'darkgoldenrod',
  'darkgray',
  'darkgreen',
  'darkgrey',
  'darkkhaki',
  'darkmagenta',
  'darkolivegreen',
  'darkorange',
  'darkorchid',
  'darkred',
  'darksalmon',
  'darkseagreen',
  'darkslateblue',
  'darkslategray',
  'darkslategrey',
  'darkturquoise',
  'darkviolet',
  'deeppink',
  'deepskyblue',
  'dimgray',
  'dimgrey',
  'dodgerblue',
  'firebrick',
  'floralwhite',
  'forestgreen',
  'fuchsia',
  'gainsboro',
  'ghostwhite',
  'goldenrod',
  'gold',
  'gray',
  'green',
  'greenyellow',
  'grey',
  'honeydew',
  'hotpink',
  'indianred',
  'indigo',
  'ivory',
  'khaki',
  'lavenderblush',
  'lavender',
  'lawngreen',
  'lemonchiffon',
  'lightblue',
  'lightcoral',
  'lightcyan',
  'lightgoldenrodyellow',
  'lightgray',
  'lightgreen',
  'lightgrey',
  'lightpink',
  'lightsalmon',
  'lightseagreen',
  'lightskyblue',
  'lightslategray',
  'lightslategrey',
  'lightsteelblue',
  'lightyellow',
  'lime',
  'limegreen',
  'linen',
  'magenta',
  'maroon',
  'mediumaquamarine',
  'mediumblue',
  'mediumorchid',
  'mediumpurple',
  'mediumseagreen',
  'mediumslateblue',
  'mediumspringgreen',
  'mediumturquoise',
  'mediumvioletred',
  'midnightblue',
  'mintcream',
  'mistyrose',
  'moccasin',
  'navajowhite',
  'navy',
  'oldlace',
  'olive',
  'olivedrab',
  'orange',
  'orangered',
  'orchid',
  'palegoldenrod',
  'palegreen',
  'paleturquoise',
  'palevioletred',
  'papayawhip',
  'peachpuff',
  'peru',
  'pink',
  'plum',
  'powderblue',
  'purple',
  'rebeccapurple',
  'red',
  'rosybrown',
  'royalblue',
  'saddlebrown',
  'salmon',
  'sandybrown',
  'seagreen',
  'seashell',
  'sienna',
  'silver',
  'skyblue',
  'slateblue',
  'slategray',
  'slategrey',
  'snow',
  'springgreen',
  'steelblue',
  'tan',
  'teal',
  'thistle',
  'tomato',
  'turquoise',
  'violet',
  'wheat',
  'white',
  'whitesmoke',
  'yellow',
  'yellowgreen',
];

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
 * Handle bounds / percentage checking to conform to CSS color spec
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
 * Converts an RGB color value to HSL.
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
    }
    h /= 6;
  }
  return { h, s, v };
}

/**
 * Converts an HSV color value to RGB.
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
 * Converts an RGB color to hex
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
 * Returns an `{r,g,b}` color object corresponding to a given number.
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
  if (colorNames.includes(color)) {
    color = getHexFromColorName(color);
    named = true;
  } else if (color === 'transparent') {
    return {
      r: 0, g: 0, b: 0, a: 0, format: 'name',
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
      format: named ? 'name' : 'hex8',
    };
  }
  match = matchers.hex6.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: named ? 'name' : 'hex',
    };
  }
  match = matchers.hex4.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      a: convertHexToDecimal(match[4] + match[4]),
      format: named ? 'name' : 'hex8',
    };
  }
  match = matchers.hex3.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      format: named ? 'name' : 'hex',
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

/** @type {CP.ColorOptions} */
const colorPickerDefaults = {
  format: 'hex',
};

/**
 * Returns a new `Color` instance.
 * @see https://github.com/bgrins/TinyColor
 * @class
 */
class Color {
  /**
   * @constructor
   * @param {CP.ColorInput} input
   * @param {CP.ColorOptions=} config
   */
  constructor(input, config) {
    let color = input;
    const opts = typeof config === 'object'
      ? ObjectAssign(colorPickerDefaults, config)
      : ObjectAssign({}, colorPickerDefaults);

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
    this.format = opts.format || format;

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
   * Returns the perceived luminance of a color.
   * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   * @returns {number} a number in [0-1] range
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
   * Returns the perceived brightness of the color.
   * @returns {number} a number in [0-255] range
   */
  get brightness() {
    const { r, g, b } = this;
    return (r * 299 + g * 587 + b * 114) / 1000;
  }

  /**
   * Returns the color as a RGBA object.
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
   * @returns {string} the CSS valid color in RGB/RGBA format
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
   * Returns the HEX value of the color.
   * @returns {string} the hexadecimal color format
   */
  toHex() {
    return rgbToHex(this.r, this.g, this.b);
  }

  /**
   * Returns the HEX value of the color.
   * @returns {string} the CSS valid color in hexadecimal format
   */
  toHexString() {
    return `#${this.toHex()}`;
  }

  /**
   * Returns the color as a HSVA object.
   * @returns {CP.HSVA} the `{h,s,v,a}` object
   */
  toHsv() {
    const { h, s, v } = rgbToHsv(this.r, this.g, this.b);
    return {
      h: h * 360, s, v, a: this.a,
    };
  }

  /**
   * Returns the color as a HSLA object.
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
   * @returns {string} the CSS valid color in HSL/HSLA format
   */
  toHslString() {
    const hsl = this.toHsl();
    const h = Math.round(hsl.h);
    const s = Math.round(hsl.s * 100);
    const l = Math.round(hsl.l * 100);
    return this.a === 1
      ? `hsl(${h},${s}%,${l}%)`
      : `hsla(${h},${s}%,${l}%,${this.roundA})`;
  }

  /**
   * Sets the alpha value on the current color.
   * @param {number} alpha a new alpha value in [0-1] range.
   * @returns {Color} a new `Color` instance
   */
  setAlpha(alpha) {
    this.a = boundAlpha(alpha);
    this.roundA = Math.round(100 * this.a) / 100;
    return this;
  }

  /**
   * Saturate the color with a given amount.
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
   * Desaturate the color with a given amount.
   * @param {number=} amount a value in [0-100] range
   * @returns {Color} a new `Color` instance
   */
  desaturate(amount) {
    return amount ? this.saturate(-amount) : this;
  }

  /**
   * Completely desaturates a color into greyscale.
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
   * Returns the color value in CSS valid string format.
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
  colorNames,
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

/** @type {Record<string, any>} */
const EventRegistry = {};

/**
 * The global event listener.
 *
 * @this {Element | HTMLElement | Window | Document}
 * @param {Event} e
 * @returns {void}
 */
function globalListener(e) {
  const that = this;
  const { type } = e;
  const oneEvMap = EventRegistry[type] ? [...EventRegistry[type]] : [];

  oneEvMap.forEach((elementsMap) => {
    const [element, listenersMap] = elementsMap;
    [...listenersMap].forEach((listenerMap) => {
      if (element === that) {
        const [listener, options] = listenerMap;
        listener.apply(element, [e]);

        if (options && options.once) {
          removeListener(element, type, listener, options);
        }
      }
    });
  });
}

/**
 * Register a new listener with its options and attach the `globalListener`
 * to the target if this is the first listener.
 *
 * @param {Element | HTMLElement | Window | Document} element
 * @param {string} eventType
 * @param {EventListenerObject['handleEvent']} listener
 * @param {AddEventListenerOptions=} options
 */
const addListener = (element, eventType, listener, options) => {
  // get element listeners first
  if (!EventRegistry[eventType]) {
    EventRegistry[eventType] = new Map();
  }
  const oneEventMap = EventRegistry[eventType];

  if (!oneEventMap.has(element)) {
    oneEventMap.set(element, new Map());
  }
  const oneElementMap = oneEventMap.get(element);

  // get listeners size
  const { size } = oneElementMap;

  // register listener with its options
  if (oneElementMap) {
    oneElementMap.set(listener, options);
  }

  // add listener last
  if (!size) {
    element.addEventListener(eventType, globalListener, options);
  }
};

/**
 * Remove a listener from registry and detach the `globalListener`
 * if no listeners are found in the registry.
 *
 * @param {Element | HTMLElement | Window | Document} element
 * @param {string} eventType
 * @param {EventListenerObject['handleEvent']} listener
 * @param {AddEventListenerOptions=} options
 */
const removeListener = (element, eventType, listener, options) => {
  // get listener first
  const oneEventMap = EventRegistry[eventType];
  const oneElementMap = oneEventMap && oneEventMap.get(element);
  const savedOptions = oneElementMap && oneElementMap.get(listener);

  // also recover initial options
  const { options: eventOptions } = savedOptions !== undefined
    ? savedOptions
    : { options };

  // unsubscribe second, remove from registry
  if (oneElementMap && oneElementMap.has(listener)) oneElementMap.delete(listener);
  if (oneEventMap && (!oneElementMap || !oneElementMap.size)) oneEventMap.delete(element);
  if (!oneEventMap || !oneEventMap.size) delete EventRegistry[eventType];

  // remove listener last
  if (!oneElementMap || !oneElementMap.size) {
    element.removeEventListener(eventType, globalListener, eventOptions);
  }
};

/**
 * A global namespace for aria-selected.
 * @type {string}
 */
const ariaSelected = 'aria-selected';

/**
 * A global namespace for aria-expanded.
 * @type {string}
 */
const ariaExpanded = 'aria-expanded';

/**
 * A global namespace for aria-hidden.
 * @type {string}
 */
const ariaHidden = 'aria-hidden';

/**
 * A global namespace for aria-labelledby.
 * @type {string}
 */
const ariaLabelledBy = 'aria-labelledby';

/**
 * A global namespace for `ArrowDown` key.
 * @type {string} e.which = 40 equivalent
 */
const keyArrowDown = 'ArrowDown';

/**
 * A global namespace for `ArrowUp` key.
 * @type {string} e.which = 38 equivalent
 */
const keyArrowUp = 'ArrowUp';

/**
 * A global namespace for `ArrowLeft` key.
 * @type {string} e.which = 37 equivalent
 */
const keyArrowLeft = 'ArrowLeft';

/**
 * A global namespace for `ArrowRight` key.
 * @type {string} e.which = 39 equivalent
 */
const keyArrowRight = 'ArrowRight';

/**
 * A global namespace for `Enter` key.
 * @type {string} e.which = 13 equivalent
 */
const keyEnter = 'Enter';

/**
 * A global namespace for `Space` key.
 * @type {string} e.which = 32 equivalent
 */
const keySpace = 'Space';

/**
 * A global namespace for `Escape` key.
 * @type {string} e.which = 27 equivalent
 */
const keyEscape = 'Escape';

// @ts-ignore
const { userAgentData: uaDATA } = navigator;

/**
 * A global namespace for `userAgentData` object.
 */
const userAgentData = uaDATA;

const { userAgent: userAgentString } = navigator;

/**
 * A global namespace for `navigator.userAgent` string.
 */
const userAgent = userAgentString;

const mobileBrands = /iPhone|iPad|iPod|Android/i;
let isMobileCheck = false;

if (userAgentData) {
  isMobileCheck = userAgentData.brands
    .some((/** @type {Record<String, any>} */x) => mobileBrands.test(x.brand));
} else {
  isMobileCheck = mobileBrands.test(userAgent);
}

/**
 * A global `boolean` for mobile detection.
 * @type {boolean}
 */
const isMobile = isMobileCheck;

let elementUID = 1;
const elementIDMap = new Map();

/**
 * Returns a unique identifier for popover, tooltip, scrollspy.
 *
 * @param {HTMLElement | Element} element target element
 * @param {string=} key predefined key
 * @returns {number} an existing or new unique ID
 */
function getUID(element, key) {
  elementUID += 1;
  let elMap = elementIDMap.get(element);
  let result = elementUID;

  if (key && key.length) {
    if (elMap) {
      const elMapId = elMap.get(key);
      if (!Number.isNaN(elMapId)) {
        result = elMapId;
      } else {
        elMap.set(key, result);
      }
    } else {
      elementIDMap.set(element, new Map());
      elMap = elementIDMap.get(element);
      elMap.set(key, result);
    }
  } else if (!Number.isNaN(elMap)) {
    result = elMap;
  } else {
    elementIDMap.set(element, result);
  }
  return result;
}

/**
 * Returns the bounding client rect of a target `HTMLElement`.
 *
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param {HTMLElement | Element} element event.target
 * @param {boolean=} includeScale when *true*, the target scale is also computed
 * @returns {SHORTER.BoundingClientRect} the bounding client rect object
 */
function getBoundingClientRect(element, includeScale) {
  const {
    width, height, top, right, bottom, left,
  } = element.getBoundingClientRect();
  let scaleX = 1;
  let scaleY = 1;

  if (includeScale && element instanceof HTMLElement) {
    const { offsetWidth, offsetHeight } = element;
    scaleX = offsetWidth > 0 ? Math.round(width) / offsetWidth || 1 : 1;
    scaleY = offsetHeight > 0 ? Math.round(height) / offsetHeight || 1 : 1;
  }

  return {
    width: width / scaleX,
    height: height / scaleY,
    top: top / scaleY,
    right: right / scaleX,
    bottom: bottom / scaleY,
    left: left / scaleX,
    x: left / scaleX,
    y: top / scaleY,
  };
}

/**
 * A shortcut for `(document|Element).querySelectorAll`.
 *
 * @param {string} selector the input selector
 * @param {(HTMLElement | Element | Document | Node)=} parent optional node to look into
 * @return {NodeListOf<HTMLElement | Element>} the query result
 */
function querySelectorAll(selector, parent) {
  const lookUp = parent && parentNodes
    .some((x) => parent instanceof x) ? parent : getDocument();
  // @ts-ignore -- `ShadowRoot` is also a node
  return lookUp.querySelectorAll(selector);
}

/**
 * Shortcut for `HTMLElement.closest` method which also works
 * with children of `ShadowRoot`. The order of the parameters
 * is intentional since they're both required.
 *
 * @see https://stackoverflow.com/q/54520554/803358
 *
 * @param {HTMLElement | Element} element Element to look into
 * @param {string} selector the selector name
 * @return {(HTMLElement | Element)?} the query result
 */
function closest(element, selector) {
  return element ? (element.closest(selector)
    // @ts-ignore -- break out of `ShadowRoot`
    || closest(element.getRootNode().host, selector)) : null;
}

/**
 * This is a shortie for `document.createElementNS` method
 * which allows you to create a new `HTMLElement` for a given `tagName`
 * or based on an object with specific non-readonly attributes:
 * `id`, `className`, `textContent`, `style`, etc.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
 *
 * @param {string} namespace `namespaceURI` to associate with the new `HTMLElement`
 * @param {Record<string, string> | string} param `tagName` or object
 * @return {HTMLElement | Element} a new `HTMLElement` or `Element`
 */
function createElementNS(namespace, param) {
  if (typeof param === 'string') {
    return getDocument().createElementNS(namespace, param);
  }

  const { tagName } = param;
  const attr = { ...param };
  const newElement = createElementNS(namespace, tagName);
  delete attr.tagName;
  ObjectAssign(newElement, attr);
  return newElement;
}

/**
 * Shortcut for the `Element.dispatchEvent(Event)` method.
 *
 * @param {HTMLElement | Element} element is the target
 * @param {Event} event is the `Event` object
 */
const dispatchEvent = (element, event) => element.dispatchEvent(event);

/** @type {Map<string, Map<HTMLElement | Element, Record<string, any>>>} */
const componentData = new Map();
/**
 * An interface for web components background data.
 * @see https://github.com/thednp/bootstrap.native/blob/master/src/components/base-component.js
 */
const Data = {
  /**
   * Sets web components data.
   * @param {HTMLElement | Element | string} target target element
   * @param {string} component the component's name or a unique key
   * @param {Record<string, any>} instance the component instance
   */
  set: (target, component, instance) => {
    const element = querySelector(target);
    if (!element) return;

    if (!componentData.has(component)) {
      componentData.set(component, new Map());
    }

    const instanceMap = componentData.get(component);
    // @ts-ignore - not undefined, but defined right above
    instanceMap.set(element, instance);
  },

  /**
   * Returns all instances for specified component.
   * @param {string} component the component's name or a unique key
   * @returns {Map<HTMLElement | Element, Record<string, any>>?} all the component instances
   */
  getAllFor: (component) => {
    const instanceMap = componentData.get(component);

    return instanceMap || null;
  },

  /**
   * Returns the instance associated with the target.
   * @param {HTMLElement | Element | string} target target element
   * @param {string} component the component's name or a unique key
   * @returns {Record<string, any>?} the instance
   */
  get: (target, component) => {
    const element = querySelector(target);
    const allForC = Data.getAllFor(component);
    const instance = element && allForC && allForC.get(element);

    return instance || null;
  },

  /**
   * Removes web components data.
   * @param {HTMLElement | Element | string} target target element
   * @param {string} component the component's name or a unique key
   */
  remove: (target, component) => {
    const element = querySelector(target);
    const instanceMap = componentData.get(component);
    if (!instanceMap || !element) return;

    instanceMap.delete(element);

    if (instanceMap.size === 0) {
      componentData.delete(component);
    }
  },
};

/**
 * An alias for `Data.get()`.
 * @type {SHORTER.getInstance<any>}
 */
const getInstance = (target, component) => Data.get(target, component);

/**
 * Check class in `HTMLElement.classList`.
 *
 * @param {HTMLElement | Element} element target
 * @param {string} classNAME to check
 * @returns {boolean}
 */
function hasClass(element, classNAME) {
  return element.classList.contains(classNAME);
}

/**
 * Add class to `HTMLElement.classList`.
 *
 * @param {HTMLElement | Element} element target
 * @param {string} classNAME to add
 * @returns {void}
 */
function addClass(element, classNAME) {
  element.classList.add(classNAME);
}

/**
 * Remove class from `HTMLElement.classList`.
 *
 * @param {HTMLElement | Element} element target
 * @param {string} classNAME to remove
 * @returns {void}
 */
function removeClass(element, classNAME) {
  element.classList.remove(classNAME);
}

/**
 * Shortcut for `HTMLElement.hasAttribute()` method.
 * @param  {HTMLElement | Element} element target element
 * @param  {string} attribute attribute name
 * @returns {boolean} the query result
 */
const hasAttribute = (element, attribute) => element.hasAttribute(attribute);

/**
 * Shortcut for `HTMLElement.setAttribute()` method.
 * @param  {HTMLElement | Element} element target element
 * @param  {string} attribute attribute name
 * @param  {string} value attribute value
 * @returns {void}
 */
const setAttribute = (element, attribute, value) => element.setAttribute(attribute, value);

/**
 * Shortcut for `HTMLElement.getAttribute()` method.
 * @param {HTMLElement | Element} element target element
 * @param {string} attribute attribute name
 * @returns {string?} attribute value
 */
const getAttribute = (element, attribute) => element.getAttribute(attribute);

/**
 * Shortcut for `HTMLElement.removeAttribute()` method.
 * @param  {HTMLElement | Element} element target element
 * @param  {string} attribute attribute name
 * @returns {void}
 */
const removeAttribute = (element, attribute) => element.removeAttribute(attribute);

/**
 * Shortcut for `String.toUpperCase()`.
 *
 * @param {string} source input string
 * @returns {string} uppercase output string
 */
const toUpperCase = (source) => source.toUpperCase();

const vHidden = 'v-hidden';

/**
 * Returns the color form.
 * @param {CP.ColorPicker} self the `ColorPicker` instance
 * @returns {HTMLElement | Element}
 */
function getColorForm(self) {
  const { format, id } = self;
  const colorForm = createElement({
    tagName: 'div',
    className: `color-form ${format}`,
  });

  let components = ['hex'];
  if (format === 'rgb') components = ['red', 'green', 'blue', 'alpha'];
  else if (format === 'hsl') components = ['hue', 'saturation', 'lightness', 'alpha'];

  components.forEach((c) => {
    const [C] = format === 'hex' ? ['#'] : toUpperCase(c).split('');
    const cID = `color_${format}_${c}_${id}`;
    const cInputLabel = createElement({ tagName: 'label' });
    setAttribute(cInputLabel, 'for', cID);
    cInputLabel.append(
      createElement({ tagName: 'span', ariaHidden: 'true', innerText: `${C}:` }),
      createElement({ tagName: 'span', className: vHidden, innerText: `${c}` }),
    );
    const cInput = createElement({
      tagName: 'input',
      id: cID, // name: cID,
      type: format === 'hex' ? 'text' : 'number',
      value: c === 'alpha' ? '1' : '0',
      className: `color-input ${c}`,
      autocomplete: 'off',
      spellcheck: 'false',
    });
    if (format !== 'hex') {
      // alpha
      let max = '1';
      let step = '0.01';
      if (c !== 'alpha') {
        if (format === 'rgb') { max = '255'; step = '1'; } else if (c === 'hue') { max = '360'; step = '1'; } else { max = '100'; step = '1'; }
      }
      ObjectAssign(cInput, {
        min: '0',
        max,
        step,
      });
    }
    colorForm.append(cInputLabel, cInput);
  });
  return colorForm;
}

/**
 * Returns a new color control `HTMLElement`.
 * @param {number} iteration
 * @param {number} id
 * @param {number} width
 * @param {number} height
 * @param {string=} labelledby
 * @returns {HTMLElement | Element}
 */
function getColorControl(iteration, id, width, height, labelledby) {
  const labelID = `appearance${iteration}_${id}`;
  const knobClass = iteration === 1 ? 'color-pointer' : 'color-slider';
  const control = createElement({
    tagName: 'div',
    className: 'color-control',
  });
  setAttribute(control, 'role', 'presentation');

  control.append(
    createElement({
      id: labelID,
      tagName: 'label',
      className: `color-label ${vHidden}`,
      ariaLive: 'polite',
    }),
    createElement({
      tagName: 'canvas',
      className: `visual-control${iteration}`,
      ariaHidden: 'true',
      width: `${width}`,
      height: `${height}`,
    }),
  );

  const knob = createElement({
    tagName: 'div',
    className: `${knobClass} knob`,
  });
  setAttribute(knob, ariaLabelledBy, labelledby || labelID);
  setAttribute(knob, 'tabindex', '0');
  control.append(knob);
  return control;
}

// ColorPicker GC
// ==============
const colorPickerString = 'color-picker';
const colorPickerSelector = `[data-function="${colorPickerString}"]`;
const nonColors = ['transparent', 'currentColor', 'inherit', 'initial'];
const colorNames$1 = ['white', 'black', 'grey', 'red', 'orange', 'brown', 'gold', 'olive', 'yellow', 'lime', 'green', 'teal', 'cyan', 'blue', 'violet', 'magenta', 'pink'];
const colorPickerLabels = {
  pickerLabel: 'Colour Picker',
  toggleLabel: 'Select colour',
  menuLabel: 'Select colour preset',
  requiredLabel: 'Required',
  formatLabel: 'Colour Format',
  formatHEX: 'Hexadecimal Format',
  formatRGB: 'RGB Format',
  formatHSL: 'HSL Format',
  alphaLabel: 'Alpha',
  appearanceLabel: 'Colour Appearance',
  hexLabel: 'Hexadecimal',
  hueLabel: 'Hue',
  saturationLabel: 'Saturation',
  lightnessLabel: 'Lightness',
  redLabel: 'Red',
  greenLabel: 'Green',
  blueLabel: 'Blue',
};

// ColorPicker Static Methods
// ==========================

/** @type {CP.GetInstance<ColorPicker>} */
const getColorPickerInstance = (element) => getInstance(element, colorPickerString);

/** @type {CP.InitCallback<ColorPicker>} */
const initColorPicker = (element) => new ColorPicker(element);

// ColorPicker Private Methods
// ===========================

/**
 * Add / remove `ColorPicker` main event listeners.
 * @param {ColorPicker} self
 * @param {boolean=} action
 */
function toggleEvents(self, action) {
  const fn = action ? addListener : removeListener;
  const { input, pickerToggle, menuToggle } = self;

  fn(input, 'focusin', self.showPicker);
  fn(pickerToggle, 'click', self.togglePicker);

  fn(input, 'keydown', self.keyHandler);

  if (menuToggle) {
    fn(menuToggle, 'click', self.toggleMenu);
  }
}

/**
 * Generate HTML markup and update instance properties.
 * @param {ColorPicker} self
 */
function initCallback(self) {
  const {
    input, parent, format, id, componentLabels, keywords,
  } = self;
  const colorValue = getAttribute(input, 'value') || '#fff';

  const {
    toggleLabel, menuLabel, formatLabel, pickerLabel, appearanceLabel,
  } = componentLabels;

  // update color
  const color = nonColors.includes(colorValue) ? '#fff' : colorValue;
  self.color = new Color(color, { format });

  // set initial controls dimensions
  // make the controls smaller on mobile
  const cv1w = isMobile ? 150 : 230;
  const cvh = isMobile ? 150 : 230;
  const cv2w = 21;
  const dropClass = isMobile ? ' mobile' : '';
  const ctrl1Labelledby = format === 'hsl' ? `appearance_${id} appearance1_${id}` : `appearance1_${id}`;
  const ctrl2Labelledby = format === 'hsl' ? `appearance2_${id}` : `appearance_${id} appearance2_${id}`;

  const pickerBtn = createElement({
    tagName: 'button',
    className: 'picker-toggle button-appearance',
    ariaExpanded: 'false',
    ariaHasPopup: 'true',
    ariaLive: 'polite',
  });
  setAttribute(pickerBtn, 'tabindex', '-1');
  pickerBtn.append(createElement({
    tagName: 'span',
    className: vHidden,
    innerText: 'Open Color Picker',
  }));

  const colorPickerDropdown = createElement({
    tagName: 'div',
    className: `color-dropdown picker${dropClass}`,
  });
  setAttribute(colorPickerDropdown, ariaLabelledBy, `picker-label-${id} format-label-${id}`);
  setAttribute(colorPickerDropdown, 'role', 'group');
  colorPickerDropdown.append(
    createElement({
      tagName: 'label',
      className: vHidden,
      ariaHidden: 'true',
      id: `picker-label-${id}`,
      innerText: `${pickerLabel}`,
    }),
    createElement({
      tagName: 'label',
      className: vHidden,
      ariaHidden: 'true',
      id: `format-label-${id}`,
      innerText: `${formatLabel}`,
    }),
    createElement({
      tagName: 'label',
      className: `color-appearance ${vHidden}`,
      ariaHidden: 'true',
      ariaLive: 'polite',
      id: `appearance_${id}`,
      innerText: `${appearanceLabel}`,
    }),
  );

  const colorControls = createElement({
    tagName: 'div',
    className: `color-controls ${format}`,
  });

  colorControls.append(
    getColorControl(1, id, cv1w, cvh, ctrl1Labelledby),
    getColorControl(2, id, cv2w, cvh, ctrl2Labelledby),
  );

  if (format !== 'hex') {
    colorControls.append(
      getColorControl(3, id, cv2w, cvh),
    );
  }

  // @ts-ignore
  const colorForm = getColorForm(self);
  colorPickerDropdown.append(colorControls, colorForm);
  parent.append(pickerBtn, colorPickerDropdown);

  // set color key menu template
  if (keywords) {
    const colorKeys = keywords;
    const presetsDropdown = createElement({
      tagName: 'div',
      className: `color-dropdown menu${dropClass}`,
    });
    const presetsMenu = createElement({
      tagName: 'ul',
      ariaLabel: `${menuLabel}`,
      className: 'color-menu',
    });
    setAttribute(presetsMenu, 'role', 'listbox');
    presetsDropdown.append(presetsMenu);

    colorKeys.forEach((x) => {
      const xKey = x.trim();
      const xRealColor = new Color(xKey, { format }).toString();
      const isActive = xRealColor === getAttribute(input, 'value');
      const active = isActive ? ' active' : '';

      const keyOption = createElement({
        tagName: 'li',
        className: `color-option${active}`,
        ariaSelected: isActive ? 'true' : 'false',
        innerText: `${x}`,
      });
      setAttribute(keyOption, 'role', 'option');
      setAttribute(keyOption, 'tabindex', '0');
      setAttribute(keyOption, 'data-value', `${xKey}`);
      presetsMenu.append(keyOption);
    });
    const presetsBtn = createElement({
      tagName: 'button',
      className: 'menu-toggle button-appearance',
      ariaExpanded: 'false',
      ariaHasPopup: 'true',
    });
    const xmlns = encodeURI('http://www.w3.org/2000/svg');
    const presetsIcon = createElementNS(xmlns, { tagName: 'svg' });
    setAttribute(presetsIcon, 'xmlns', xmlns);
    setAttribute(presetsIcon, ariaHidden, 'true');
    setAttribute(presetsIcon, 'viewBox', '0 0 512 512');
    const piPath = createElementNS(xmlns, { tagName: 'path' });
    setAttribute(piPath, 'd', 'M98,158l157,156L411,158l27,27L255,368L71,185L98,158z');
    setAttribute(piPath, 'fill', '#fff');
    presetsIcon.append(piPath);
    presetsBtn.append(createElement({
      tagName: 'span',
      className: vHidden,
      innerText: `${toggleLabel}`,
    }), presetsIcon);

    parent.append(presetsBtn, presetsDropdown);
  }

  // solve non-colors after settings save
  if (keywords && nonColors.includes(colorValue)) {
    self.value = colorValue;
  }
}

/**
 * Add / remove `ColorPicker` event listeners active only when open.
 * @param {ColorPicker} self
 * @param {boolean=} action
 */
function toggleEventsOnShown(self, action) {
  const fn = action ? addListener : removeListener;
  const pointerEvents = 'ontouchstart' in document
    ? { down: 'touchstart', move: 'touchmove', up: 'touchend' }
    : { down: 'mousedown', move: 'mousemove', up: 'mouseup' };

  fn(self.controls, pointerEvents.down, self.pointerDown);
  self.controlKnobs.forEach((x) => fn(x, 'keydown', self.handleKnobs));

  fn(window, 'scroll', self.handleScroll);

  [self.input, ...self.inputs].forEach((x) => fn(x, 'change', self.changeHandler));

  if (self.colorMenu) {
    fn(self.colorMenu, 'click', self.menuClickHandler);
    fn(self.colorMenu, 'keydown', self.menuKeyHandler);
  }

  fn(document, pointerEvents.move, self.pointerMove);
  fn(document, pointerEvents.up, self.pointerUp);
  fn(window, 'keyup', self.handleDismiss);
  fn(self.parent, 'focusout', self.handleFocusOut);
}

/**
 * Triggers the `ColorPicker` original event.
 * @param {ColorPicker} self
 */
function firePickerChange(self) {
  dispatchEvent(self.input, new CustomEvent('colorpicker.change'));
}

/**
 * Toggles the visibility of a dropdown or returns false if none is visible.
 * @param {HTMLElement} element
 * @param {boolean=} check
 * @returns {void | boolean}
 */
function classToggle(element, check) {
  const fn1 = !check ? 'forEach' : 'some';
  const fn2 = !check ? removeClass : hasClass;

  if (element) {
    return ['show', 'show-top'][fn1]((x) => fn2(element, x));
  }

  return false;
}

/**
 * Shows the `ColorPicker` presets menu.
 * @param {ColorPicker} self
 */
function showMenu(self) {
  classToggle(self.colorPicker);
  addClass(self.colorMenu, 'show');
  self.show();
  setAttribute(self.menuToggle, ariaExpanded, 'true');
}

/**
 * Color Picker
 * @see http://thednp.github.io/color-picker
 */
class ColorPicker {
  /**
   * Returns a new ColorPicker instance.
   * @param {HTMLInputElement | string} target the target `<input>` element
   */
  constructor(target) {
    const self = this;
    /** @type {HTMLInputElement} */
    // @ts-ignore
    self.input = querySelector(target);
    // invalidate
    if (!self.input) throw new TypeError(`ColorPicker target ${target} cannot be found.`);
    const { input } = self;

    /** @type {HTMLElement} */
    // @ts-ignore
    self.parent = closest(input, `.${colorPickerString},${colorPickerString}`);
    if (!self.parent) throw new TypeError('ColorPicker requires a specific markup to work.');

    /** @type {number} */
    self.id = getUID(input, colorPickerString);

    // set initial state
    /** @type {HTMLCanvasElement?} */
    self.dragElement = null;
    /** @type {boolean} */
    self.isOpen = false;
    /** @type {Record<string, number>} */
    self.controlPositions = {
      c1x: 0, c1y: 0, c2y: 0, c3y: 0,
    };
    /** @type {Record<string, string>} */
    self.colorLabels = {};
    /** @type {Array<string> | false} */
    self.keywords = false;
    /** @type {Color} */
    self.color = new Color('white', { format: self.format });
    /** @type {Record<string, string>} */
    self.componentLabels = ObjectAssign({}, colorPickerLabels);

    const { componentLabels, colorLabels, keywords } = input.dataset;
    const temp = componentLabels ? JSON.parse(componentLabels) : {};
    self.componentLabels = ObjectAssign(self.componentLabels, temp);

    const translatedColorLabels = colorLabels && colorLabels.split(',').length === 17
      ? colorLabels.split(',') : colorNames$1;

    // expose color labels to all methods
    colorNames$1.forEach((c, i) => { self.colorLabels[c] = translatedColorLabels[i]; });

    // set colour presets
    if (keywords !== 'false') {
      self.keywords = keywords ? keywords.split(',') : nonColors;
    }

    // bind events
    self.showPicker = self.showPicker.bind(self);
    self.togglePicker = self.togglePicker.bind(self);
    self.toggleMenu = self.toggleMenu.bind(self);
    self.menuClickHandler = self.menuClickHandler.bind(self);
    self.menuKeyHandler = self.menuKeyHandler.bind(self);
    self.pointerDown = self.pointerDown.bind(self);
    self.pointerMove = self.pointerMove.bind(self);
    self.pointerUp = self.pointerUp.bind(self);
    self.handleScroll = self.handleScroll.bind(self);
    self.handleFocusOut = self.handleFocusOut.bind(self);
    self.changeHandler = self.changeHandler.bind(self);
    self.handleDismiss = self.handleDismiss.bind(self);
    self.keyHandler = self.keyHandler.bind(self);
    self.handleKnobs = self.handleKnobs.bind(self);

    // generate markup
    initCallback(self);

    const { parent } = self;
    // set main elements
    /** @type {HTMLElement} */
    // @ts-ignore
    self.pickerToggle = querySelector('.picker-toggle', parent);
    /** @type {HTMLElement} */
    // @ts-ignore
    self.menuToggle = querySelector('.menu-toggle', parent);
    /** @type {HTMLElement} */
    // @ts-ignore
    self.colorMenu = querySelector('.color-dropdown.menu', parent);
    /** @type {HTMLElement} */
    // @ts-ignore
    self.colorPicker = querySelector('.color-dropdown.picker', parent);
    /** @type {HTMLElement} */
    // @ts-ignore
    self.controls = querySelector('.color-controls', parent);
    /** @type {HTMLInputElement[]} */
    // @ts-ignore
    self.inputs = [...querySelectorAll('.color-input', parent)];
    /** @type {(HTMLElement)[]} */
    // @ts-ignore
    self.controlKnobs = [...querySelectorAll('.knob', parent)];
    /** @type {HTMLCanvasElement[]} */
    // @ts-ignore
    self.visuals = [...querySelectorAll('canvas', self.controls)];
    /** @type {HTMLLabelElement[]} */
    // @ts-ignore
    self.knobLabels = [...querySelectorAll('.color-label', parent)];
    /** @type {HTMLLabelElement} */
    // @ts-ignore
    self.appearance = querySelector('.color-appearance', parent);

    const [v1, v2, v3] = self.visuals;
    // set dimensions
    /** @type {number} */
    self.width1 = v1.width;
    /** @type {number} */
    self.height1 = v1.height;
    /** @type {number} */
    self.width2 = v2.width;
    /** @type {number} */
    self.height2 = v2.height;
    // set main controls
    /** @type {*} */
    self.ctx1 = v1.getContext('2d');
    /** @type {*} */
    self.ctx2 = v2.getContext('2d');
    self.ctx1.rect(0, 0, self.width1, self.height1);
    self.ctx2.rect(0, 0, self.width2, self.height2);

    /** @type {number} */
    self.width3 = 0;
    /** @type {number} */
    self.height3 = 0;

    // set alpha control except hex
    if (self.format !== 'hex') {
      self.width3 = v3.width;
      self.height3 = v3.height;
      /** @type {*} */
      this.ctx3 = v3.getContext('2d');
      self.ctx3.rect(0, 0, self.width3, self.height3);
    }

    // update color picker controls, inputs and visuals
    this.setControlPositions();
    this.setColorAppearence();
    // don't trigger change at initialization
    this.updateInputs(true);
    this.updateControls();
    this.updateVisuals();
    // add main events listeners
    toggleEvents(self, true);

    // set component data
    Data.set(input, colorPickerString, self);
  }

  /** Returns the current color value */
  get value() { return this.input.value; }

  /**
   * Sets a new color value.
   * @param {string} v new color value
   */
  set value(v) { this.input.value = v; }

  /** Check if the input is required to have a valid value. */
  get required() { return hasAttribute(this.input, 'required'); }

  /**
   * Returns the colour format.
   * @returns {CP.ColorFormats | string}
   */
  get format() { return getAttribute(this.input, 'format') || 'hex'; }

  /** Returns the input name. */
  get name() { return getAttribute(this.input, 'name'); }

  /**
   * Returns the label associated to the input.
   * @returns {HTMLLabelElement?}
   */
  // @ts-ignore
  get label() { return querySelector(`[for="${this.input.id}"]`); }

  /** Check if the color presets include any non-color. */
  get includeNonColor() {
    return this.keywords instanceof Array
      && this.keywords.some((x) => nonColors.includes(x));
  }

  /** Returns hexadecimal value of the current color. */
  get hex() { return this.color.toHex(); }

  /** Returns the current color value in {h,s,v,a} object format. */
  get hsv() { return this.color.toHsv(); }

  /** Returns the current color value in {h,s,l,a} object format. */
  get hsl() { return this.color.toHsl(); }

  /** Returns the current color value in {r,g,b,a} object format. */
  get rgb() { return this.color.toRgb(); }

  /** Returns the current color brightness. */
  get brightness() { return this.color.brightness; }

  /** Returns the current color luminance. */
  get luminance() { return this.color.luminance; }

  /** Checks if the current colour requires a light text color. */
  get isDark() {
    const { rgb, brightness } = this;
    return brightness < 120 && rgb.a > 0.33;
  }

  /** Checks if the current input value is a valid color. */
  get isValid() {
    const inputValue = this.input.value;
    return inputValue !== '' && new Color(inputValue).isValid;
  }

  /** Updates `ColorPicker` visuals. */
  updateVisuals() {
    const self = this;
    const {
      color, format, controlPositions,
      width1, width2, width3,
      height1, height2, height3,
      ctx1, ctx2, ctx3,
    } = self;
    const { r, g, b } = color;

    if (format !== 'hsl') {
      const hue = Math.round((controlPositions.c2y / height2) * 360);
      ctx1.fillStyle = new Color(`hsl(${hue},100%,50%})`).toRgbString();
      ctx1.fillRect(0, 0, width1, height1);

      const whiteGrad = ctx2.createLinearGradient(0, 0, width1, 0);
      whiteGrad.addColorStop(0, 'rgba(255,255,255,1)');
      whiteGrad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx1.fillStyle = whiteGrad;
      ctx1.fillRect(0, 0, width1, height1);

      const blackGrad = ctx2.createLinearGradient(0, 0, 0, height1);
      blackGrad.addColorStop(0, 'rgba(0,0,0,0)');
      blackGrad.addColorStop(1, 'rgba(0,0,0,1)');
      ctx1.fillStyle = blackGrad;
      ctx1.fillRect(0, 0, width1, height1);

      const hueGrad = ctx2.createLinearGradient(0, 0, 0, height1);
      hueGrad.addColorStop(0, 'rgba(255,0,0,1)');
      hueGrad.addColorStop(0.17, 'rgba(255,255,0,1)');
      hueGrad.addColorStop(0.34, 'rgba(0,255,0,1)');
      hueGrad.addColorStop(0.51, 'rgba(0,255,255,1)');
      hueGrad.addColorStop(0.68, 'rgba(0,0,255,1)');
      hueGrad.addColorStop(0.85, 'rgba(255,0,255,1)');
      hueGrad.addColorStop(1, 'rgba(255,0,0,1)');
      ctx2.fillStyle = hueGrad;
      ctx2.fillRect(0, 0, width2, height2);
    } else {
      const hueGrad = ctx1.createLinearGradient(0, 0, width1, 0);
      const saturation = Math.round((1 - controlPositions.c2y / height2) * 100);

      hueGrad.addColorStop(0, new Color('rgba(255,0,0,1)').desaturate(100 - saturation).toRgbString());
      hueGrad.addColorStop(0.17, new Color('rgba(255,255,0,1)').desaturate(100 - saturation).toRgbString());
      hueGrad.addColorStop(0.34, new Color('rgba(0,255,0,1)').desaturate(100 - saturation).toRgbString());
      hueGrad.addColorStop(0.51, new Color('rgba(0,255,255,1)').desaturate(100 - saturation).toRgbString());
      hueGrad.addColorStop(0.68, new Color('rgba(0,0,255,1)').desaturate(100 - saturation).toRgbString());
      hueGrad.addColorStop(0.85, new Color('rgba(255,0,255,1)').desaturate(100 - saturation).toRgbString());
      hueGrad.addColorStop(1, new Color('rgba(255,0,0,1)').desaturate(100 - saturation).toRgbString());

      ctx1.fillStyle = hueGrad;
      ctx1.fillRect(0, 0, width1, height1);

      const whiteGrad = ctx1.createLinearGradient(0, 0, 0, height1);
      whiteGrad.addColorStop(0, 'rgba(255,255,255,1)');
      whiteGrad.addColorStop(0.5, 'rgba(255,255,255,0)');
      ctx1.fillStyle = whiteGrad;
      ctx1.fillRect(0, 0, width1, height1);

      const blackGrad = ctx1.createLinearGradient(0, 0, 0, height1);
      blackGrad.addColorStop(0.5, 'rgba(0,0,0,0)');
      blackGrad.addColorStop(1, 'rgba(0,0,0,1)');
      ctx1.fillStyle = blackGrad;
      ctx1.fillRect(0, 0, width1, height1);

      const saturationGrad = ctx2.createLinearGradient(0, 0, 0, height2);
      const incolor = color.clone().greyscale().toRgb();

      saturationGrad.addColorStop(0, `rgba(${r},${g},${b},1)`);
      saturationGrad.addColorStop(1, `rgba(${incolor.r},${incolor.g},${incolor.b},1)`);

      ctx2.fillStyle = saturationGrad;
      ctx2.fillRect(0, 0, width3, height3);
    }

    if (format !== 'hex') {
      ctx3.clearRect(0, 0, width3, height3);
      const alphaGrad = ctx3.createLinearGradient(0, 0, 0, height3);
      alphaGrad.addColorStop(0, `rgba(${r},${g},${b},1)`);
      alphaGrad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx3.fillStyle = alphaGrad;
      ctx3.fillRect(0, 0, width3, height3);
    }
  }

  /**
   * Handles the `focusout` listener of the `ColorPicker`.
   * @param {FocusEvent} e
   * @this {ColorPicker}
   */
  handleFocusOut({ relatedTarget }) {
    // @ts-ignore
    if (relatedTarget && !this.parent.contains(relatedTarget)) {
      this.hide(true);
    }
  }

  /**
   * Handles the `focusout` listener of the `ColorPicker`.
   * @param {KeyboardEvent} e
   * @this {ColorPicker}
   */
  handleDismiss({ code }) {
    const self = this;
    if (self.isOpen && code === keyEscape) {
      self.hide();
    }
  }

  /**
   * Handles the `ColorPicker` scroll listener when open.
   * @param {Event} e
   * @this {ColorPicker}
   */
  handleScroll(e) {
    const self = this;
    /** @type {*} */
    const { activeElement } = document;

    if ((isMobile && self.dragElement)
      || (activeElement && self.controlKnobs.includes(activeElement))) {
      e.stopPropagation();
      e.preventDefault();
    }

    self.updateDropdownPosition();
  }

  /**
   * Handles all `ColorPicker` click listeners.
   * @param {KeyboardEvent} e
   * @this {ColorPicker}
   */
  menuKeyHandler(e) {
    const { target, code } = e;

    if ([keyArrowDown, keyArrowUp].includes(code)) {
      e.preventDefault();
    } else if ([keyEnter, keySpace].includes(code)) {
      this.menuClickHandler({ target });
    }
  }

  /**
   * Handles all `ColorPicker` click listeners.
   * @param {Partial<Event>} e
   * @this {ColorPicker}
   */
  menuClickHandler(e) {
    const self = this;
    /** @type {*} */
    const { target } = e;
    const { format } = self;
    const newOption = (getAttribute(target, 'data-value') || '').trim();
    const currentActive = self.colorMenu.querySelector('li.active');
    const newColor = nonColors.includes(newOption) ? 'white' : newOption;
    self.color = new Color(newColor, { format });
    self.setControlPositions();
    self.setColorAppearence();
    self.updateInputs(true);
    self.updateControls();
    self.updateVisuals();

    if (currentActive) {
      removeClass(currentActive, 'active');
      removeAttribute(currentActive, ariaSelected);
    }

    if (currentActive !== target) {
      addClass(target, 'active');
      setAttribute(target, ariaSelected, 'true');

      if (nonColors.includes(newOption)) {
        self.value = newOption;
        firePickerChange(self);
      }
    }
  }

  /**
   * Handles the `ColorPicker` touchstart / mousedown events listeners.
   * @param {TouchEvent} e
   * @this {ColorPicker}
   */
  pointerDown(e) {
    const self = this;
    const {
      // @ts-ignore
      type, target, touches, pageX, pageY,
    } = e;
    const { visuals, controlKnobs, format } = self;
    const [v1, v2, v3] = visuals;
    const [c1, c2, c3] = controlKnobs;
    /** @type {HTMLCanvasElement} */
    // @ts-ignore
    const visual = target.tagName === 'canvas' // @ts-ignore
      ? target : querySelector('canvas', target.parentElement);
    const visualRect = getBoundingClientRect(visual);
    const X = type === 'touchstart' ? touches[0].pageX : pageX;
    const Y = type === 'touchstart' ? touches[0].pageY : pageY;
    const offsetX = X - window.pageXOffset - visualRect.left;
    const offsetY = Y - window.pageYOffset - visualRect.top;

    if (target === v1 || target === c1) {
      self.dragElement = visual;
      self.changeControl1({ offsetX, offsetY });
    } else if (target === v2 || target === c2) {
      self.dragElement = visual;
      self.changeControl2({ offsetY });
    } else if (format !== 'hex' && (target === v3 || target === c3)) {
      self.dragElement = visual;
      self.changeAlpha({ offsetY });
    }
    e.preventDefault();
  }

  /**
   * Handles the `ColorPicker` touchend / mouseup events listeners.
   * @param {TouchEvent} e
   * @this {ColorPicker}
   */
  pointerUp({ target }) {
    const self = this;
    const selection = document.getSelection();
    // @ts-ignore
    if (!self.dragElement && !selection.toString().length
      // @ts-ignore
      && !self.parent.contains(target)) {
      self.hide();
    }

    self.dragElement = null;
  }

  /**
   * Handles the `ColorPicker` touchmove / mousemove events listeners.
   * @param {TouchEvent} e
   */
  pointerMove(e) {
    const self = this;
    const { dragElement, visuals, format } = self;
    const [v1, v2, v3] = visuals;
    const {
      // @ts-ignore
      type, touches, pageX, pageY,
    } = e;

    if (!dragElement) return;

    const controlRect = getBoundingClientRect(dragElement);
    const X = type === 'touchmove' ? touches[0].pageX : pageX;
    const Y = type === 'touchmove' ? touches[0].pageY : pageY;
    const offsetX = X - window.pageXOffset - controlRect.left;
    const offsetY = Y - window.pageYOffset - controlRect.top;

    if (dragElement === v1) {
      self.changeControl1({ offsetX, offsetY });
    }

    if (dragElement === v2) {
      self.changeControl2({ offsetY });
    }

    if (dragElement === v3 && format !== 'hex') {
      self.changeAlpha({ offsetY });
    }
  }

  /**
   * Handles the `ColorPicker` events listeners associated with the color knobs.
   * @param {KeyboardEvent} e
   */
  handleKnobs(e) {
    const { target, code } = e;
    const self = this;

    // only react to arrow buttons
    if (![keyArrowUp, keyArrowDown, keyArrowLeft, keyArrowRight].includes(code)) return;
    e.preventDefault();

    const { activeElement } = document;
    const { controlKnobs } = self;
    const currentKnob = controlKnobs.find((x) => x === activeElement);
    const [c1, c2, c3] = controlKnobs;

    if (currentKnob) {
      let offsetX = 0;
      let offsetY = 0;
      if (target === c1) {
        if ([keyArrowLeft, keyArrowRight].includes(code)) {
          self.controlPositions.c1x += code === keyArrowRight ? +1 : -1;
        } else if ([keyArrowUp, keyArrowDown].includes(code)) {
          self.controlPositions.c1y += code === keyArrowDown ? +1 : -1;
        }

        offsetX = self.controlPositions.c1x;
        offsetY = self.controlPositions.c1y;
        self.changeControl1({ offsetX, offsetY });
      } else if (target === c2) {
        self.controlPositions.c2y += [keyArrowDown, keyArrowRight].includes(code) ? +1 : -1;
        offsetY = self.controlPositions.c2y;
        self.changeControl2({ offsetY });
      } else if (target === c3) {
        self.controlPositions.c3y += [keyArrowDown, keyArrowRight].includes(code) ? +1 : -1;
        offsetY = self.controlPositions.c3y;
        self.changeAlpha({ offsetY });
      }

      self.setColorAppearence();
      self.updateInputs();
      self.updateControls();
      self.updateVisuals();
      self.handleScroll(e);
    }
  }

  /** Handles the event listeners of the color form. */
  changeHandler() {
    const self = this;
    let colorSource;
    /** @type {HTMLInputElement} */
    // @ts-ignore
    const { activeElement } = document;
    const {
      inputs, format, value: currentValue, input,
    } = self;
    const [i1, i2, i3, i4] = inputs;
    const isNonColorValue = self.includeNonColor && nonColors.includes(currentValue);

    if (activeElement === input || (activeElement && inputs.includes(activeElement))) {
      if (activeElement === input) {
        if (isNonColorValue) {
          colorSource = 'white';
        } else {
          colorSource = currentValue;
        }
      } else if (format === 'hex') {
        colorSource = i1.value;
      } else if (format === 'hsl') {
        colorSource = `hsla(${i1.value},${i2.value}%,${i3.value}%,${i4.value})`;
      } else {
        colorSource = `rgba(${inputs.map((x) => x.value).join(',')})`;
      }

      self.color = new Color(colorSource, { format });
      self.setControlPositions();
      self.setColorAppearence();
      self.updateInputs();
      self.updateControls();
      self.updateVisuals();

      // set non-color keyword
      if (activeElement === input && isNonColorValue) {
        self.value = currentValue;
      }
    }
  }

  /**
   * Updates `ColorPicker` first control:
   * * `lightness` and `saturation` for HEX/RGB;
   * * `lightness` and `hue` for HSL.
   *
   * @param {Record<string, number>} offsets
   */
  changeControl1(offsets) {
    const self = this;
    let [offsetX, offsetY] = [0, 0];
    const { offsetX: X, offsetY: Y } = offsets;
    const {
      format, controlPositions,
      height1, height2, height3, width1,
    } = self;

    if (X > width1) {
      offsetX = width1;
    } else if (X >= 0) {
      offsetX = X;
    }

    if (Y > height1) {
      offsetY = height1;
    } else if (Y >= 0) {
      offsetY = Y;
    }

    const hue = format !== 'hsl'
      ? Math.round((controlPositions.c2y / height2) * 360)
      : Math.round((offsetX / width1) * 360);

    const saturation = format !== 'hsl'
      ? Math.round((offsetX / width1) * 100)
      : Math.round((1 - controlPositions.c2y / height2) * 100);

    const lightness = Math.round((1 - offsetY / height1) * 100);
    const alpha = format !== 'hex' ? Math.round((1 - controlPositions.c3y / height3) * 100) / 100 : 1;
    const tempFormat = format !== 'hsl' ? 'hsva' : 'hsla';

    // new color
    self.color = new Color(`${tempFormat}(${hue},${saturation}%,${lightness}%,${alpha})`, { format });
    // new positions
    self.controlPositions.c1x = offsetX;
    self.controlPositions.c1y = offsetY;

    // update color picker
    self.setColorAppearence();
    self.updateInputs();
    self.updateControls();
    self.updateVisuals();
  }

  /**
   * Updates `ColorPicker` second control:
   * * `hue` for HEX/RGB;
   * * `saturation` for HSL.
   *
   * @param {Record<string, number>} offset
   */
  changeControl2(offset) {
    const self = this;
    const { offsetY: Y } = offset;
    const {
      format, width1, height1, height2, height3, controlPositions,
    } = self;
    let offsetY = 0;

    if (Y > height2) {
      offsetY = height2;
    } else if (Y >= 0) {
      offsetY = Y;
    }

    const hue = format !== 'hsl' ? Math.round((offsetY / height2) * 360) : Math.round((controlPositions.c1x / width1) * 360);
    const saturation = format !== 'hsl' ? Math.round((controlPositions.c1x / width1) * 100) : Math.round((1 - offsetY / height2) * 100);
    const lightness = Math.round((1 - controlPositions.c1y / height1) * 100);
    const alpha = format !== 'hex' ? Math.round((1 - controlPositions.c3y / height3) * 100) / 100 : 1;
    const colorFormat = format !== 'hsl' ? 'hsva' : 'hsla';

    // new color
    self.color = new Color(`${colorFormat}(${hue},${saturation}%,${lightness}%,${alpha})`, { format });
    // new position
    self.controlPositions.c2y = offsetY;
    // update color picker
    self.setColorAppearence();
    self.updateInputs();
    self.updateControls();
    self.updateVisuals();
  }

  /**
   * Updates `ColorPicker` last control,
   * the `alpha` channel for RGB/HSL.
   *
   * @param {Record<string, number>} offset
   */
  changeAlpha(offset) {
    const self = this;
    const { height3 } = self;
    const { offsetY: Y } = offset;
    let offsetY = 0;

    if (Y > height3) {
      offsetY = height3;
    } else if (Y >= 0) {
      offsetY = Y;
    }

    // update color alpha
    const alpha = Math.round((1 - offsetY / height3) * 100);
    self.color.setAlpha(alpha / 100);
    // update position
    self.controlPositions.c3y = offsetY;
    // update color picker
    self.updateInputs();
    self.updateControls();
    // alpha?
    self.updateVisuals();
  }

  /** Update opened dropdown position on scroll. */
  updateDropdownPosition() {
    const self = this;
    const { input, colorPicker, colorMenu } = self;
    const elRect = getBoundingClientRect(input);
    const { offsetHeight: elHeight } = input;
    const windowHeight = document.documentElement.clientHeight;
    const isPicker = classToggle(colorPicker, true);
    const dropdown = isPicker ? colorPicker : colorMenu;
    const { offsetHeight: dropHeight } = dropdown;
    const distanceBottom = windowHeight - elRect.bottom;
    const distanceTop = elRect.top;
    const bottomExceed = elRect.top + dropHeight + elHeight > windowHeight; // show
    const topExceed = elRect.top - dropHeight < 0; // show-top

    if (hasClass(dropdown, 'show') && distanceBottom < distanceTop && bottomExceed) {
      removeClass(dropdown, 'show');
      addClass(dropdown, 'show-top');
    }
    if (hasClass(dropdown, 'show-top') && distanceBottom > distanceTop && topExceed) {
      removeClass(dropdown, 'show-top');
      addClass(dropdown, 'show');
    }
  }

  /** Update control knobs' positions. */
  setControlPositions() {
    const self = this;
    const {
      hsv, hsl, format, height1, height2, height3, width1,
    } = self;
    const hue = hsl.h;
    const saturation = format !== 'hsl' ? hsv.s : hsl.s;
    const lightness = format !== 'hsl' ? hsv.v : hsl.l;
    const alpha = hsv.a;

    self.controlPositions.c1x = format !== 'hsl' ? saturation * width1 : (hue / 360) * width1;
    self.controlPositions.c1y = (1 - lightness) * height1;
    self.controlPositions.c2y = format !== 'hsl' ? (hue / 360) * height2 : (1 - saturation) * height2;

    if (format !== 'hex') {
      self.controlPositions.c3y = (1 - alpha) * height3;
    }
  }

  /** Update the visual appearance label. */
  setColorAppearence() {
    const self = this;
    const {
      componentLabels, colorLabels, hsl, hsv, hex, format, knobLabels,
    } = self;
    const {
      lightnessLabel, saturationLabel, hueLabel, alphaLabel, appearanceLabel, hexLabel,
    } = componentLabels;
    let { requiredLabel } = componentLabels;
    const [knob1Lbl, knob2Lbl, knob3Lbl] = knobLabels;
    const hue = Math.round(hsl.h);
    const alpha = hsv.a;
    const saturationSource = format === 'hsl' ? hsl.s : hsv.s;
    const saturation = Math.round(saturationSource * 100);
    const lightness = Math.round(hsl.l * 100);
    const hsvl = hsv.v * 100;
    let colorName;

    // determine color appearance
    if (lightness === 100 && saturation === 0) {
      colorName = colorLabels.white;
    } else if (lightness === 0) {
      colorName = colorLabels.black;
    } else if (saturation === 0) {
      colorName = colorLabels.grey;
    } else if (hue < 15 || hue >= 345) {
      colorName = colorLabels.red;
    } else if (hue >= 15 && hue < 45) {
      colorName = hsvl > 80 && saturation > 80 ? colorLabels.orange : colorLabels.brown;
    } else if (hue >= 45 && hue < 75) {
      const isGold = hue > 46 && hue < 54 && hsvl < 80 && saturation > 90;
      const isOlive = hue >= 54 && hue < 75 && hsvl < 80;
      colorName = isGold ? colorLabels.gold : colorLabels.yellow;
      colorName = isOlive ? colorLabels.olive : colorName;
    } else if (hue >= 75 && hue < 155) {
      colorName = hsvl < 68 ? colorLabels.green : colorLabels.lime;
    } else if (hue >= 155 && hue < 175) {
      colorName = colorLabels.teal;
    } else if (hue >= 175 && hue < 195) {
      colorName = colorLabels.cyan;
    } else if (hue >= 195 && hue < 255) {
      colorName = colorLabels.blue;
    } else if (hue >= 255 && hue < 270) {
      colorName = colorLabels.violet;
    } else if (hue >= 270 && hue < 295) {
      colorName = colorLabels.magenta;
    } else if (hue >= 295 && hue < 345) {
      colorName = colorLabels.pink;
    }

    if (format === 'hsl') {
      knob1Lbl.innerText = `${hueLabel}: ${hue}°. ${lightnessLabel}: ${lightness}%`;
      knob2Lbl.innerText = `${saturationLabel}: ${saturation}%`;
    } else {
      knob1Lbl.innerText = `${lightnessLabel}: ${lightness}%. ${saturationLabel}: ${saturation}%`;
      knob2Lbl.innerText = `${hueLabel}: ${hue}°`;
    }

    if (format !== 'hex') {
      const alphaValue = Math.round(alpha * 100);
      knob3Lbl.innerText = `${alphaLabel}: ${alphaValue}%`;
    }

    // update color labels
    self.appearance.innerText = `${appearanceLabel}: ${colorName}.`;
    const colorLabel = format === 'hex'
      ? `${hexLabel} ${hex.split('').join(' ')}.`
      : self.value.toUpperCase();

    if (self.label) {
      const fieldLabel = self.label.innerText.replace('*', '').trim();
      /** @type {HTMLSpanElement} */
      // @ts-ignore
      const [pickerBtnSpan] = self.pickerToggle.children;
      requiredLabel = self.required ? ` ${requiredLabel}` : '';
      pickerBtnSpan.innerText = `${fieldLabel}: ${colorLabel}${requiredLabel}`;
    }
  }

  /** Updates the control knobs positions. */
  updateControls() {
    const { format, controlKnobs, controlPositions } = this;
    const [control1, control2, control3] = controlKnobs;
    control1.style.transform = `translate3d(${controlPositions.c1x - 3}px,${controlPositions.c1y - 3}px,0)`;
    control2.style.transform = `translate3d(0,${controlPositions.c2y - 3}px,0)`;

    if (format !== 'hex') {
      control3.style.transform = `translate3d(0,${controlPositions.c3y - 3}px,0)`;
    }
  }

  /**
   * Update all color form inputs.
   * @param {boolean=} isPrevented when `true`, the component original event is prevented
   */
  updateInputs(isPrevented) {
    const self = this;
    const {
      value: oldColor, rgb, hsl, hsv, format, parent, input, inputs,
    } = self;
    const [i1, i2, i3, i4] = inputs;

    const alpha = hsl.a;
    const hue = Math.round(hsl.h);
    const saturation = Math.round(hsl.s * 100);
    const lightSource = format === 'hsl' ? hsl.l : hsv.v;
    const lightness = Math.round(lightSource * 100);
    let newColor;

    if (format === 'hex') {
      newColor = self.color.toHexString();
      i1.value = self.hex;
    } else if (format === 'hsl') {
      newColor = self.color.toHslString();
      i1.value = `${hue}`;
      i2.value = `${saturation}`;
      i3.value = `${lightness}`;
      i4.value = `${alpha}`;
    } else if (format === 'rgb') {
      newColor = self.color.toRgbString();
      i1.value = `${rgb.r}`;
      i2.value = `${rgb.g}`;
      i3.value = `${rgb.b}`;
      i4.value = `${alpha}`;
    }

    // update the color value
    self.value = `${newColor}`;

    // update the input backgroundColor
    ObjectAssign(input.style, { backgroundColor: newColor });

    // toggle dark/light classes will also style the placeholder
    // dark sets color white, light sets color black
    // isDark ? '#000' : '#fff'
    if (!self.isDark) {
      if (hasClass(parent, 'dark')) removeClass(parent, 'dark');
      if (!hasClass(parent, 'light')) addClass(parent, 'light');
    } else {
      if (hasClass(parent, 'light')) removeClass(parent, 'light');
      if (!hasClass(parent, 'dark')) addClass(parent, 'dark');
    }

    // don't trigger the custom event unless it's really changed
    if (!isPrevented && newColor !== oldColor) {
      firePickerChange(self);
    }
  }

  /**
   * Handles the `Space` and `Enter` keys inputs.
   * @param {KeyboardEvent} e
   * @this {ColorPicker}
   */
  keyHandler(e) {
    const self = this;
    const { menuToggle } = self;
    const { activeElement } = document;
    const { code } = e;

    if ([keyEnter, keySpace].includes(code)) {
      if ((menuToggle && activeElement === menuToggle) || !activeElement) {
        e.preventDefault();
        if (!activeElement) {
          self.togglePicker(e);
        } else {
          self.toggleMenu();
        }
      }
    }
  }

  /**
   * Toggle the `ColorPicker` dropdown visibility.
   * @param {Event} e
   * @this {ColorPicker}
   */
  togglePicker(e) {
    e.preventDefault();
    const self = this;
    const pickerIsOpen = classToggle(self.colorPicker, true);

    if (self.isOpen && pickerIsOpen) {
      self.hide(true);
    } else {
      self.showPicker();
    }
  }

  /** Shows the `ColorPicker` dropdown. */
  showPicker() {
    const self = this;
    classToggle(self.colorMenu);
    addClass(self.colorPicker, 'show');
    self.input.focus();
    self.show();
    setAttribute(self.pickerToggle, ariaExpanded, 'true');
  }

  /** Toggles the visibility of the `ColorPicker` presets menu. */
  toggleMenu() {
    const self = this;
    const menuIsOpen = classToggle(self.colorMenu, true);

    if (self.isOpen && menuIsOpen) {
      self.hide(true);
    } else {
      showMenu(self);
    }
  }

  /** Show the dropdown. */
  show() {
    const self = this;
    if (!self.isOpen) {
      addClass(self.parent, 'open');
      toggleEventsOnShown(self, true);
      self.updateDropdownPosition();
      self.isOpen = true;
    }
  }

  /**
   * Hides the currently opened dropdown.
   * @param {boolean=} focusPrevented
   */
  hide(focusPrevented) {
    const self = this;
    if (self.isOpen) {
      const { pickerToggle, colorMenu } = self;
      toggleEventsOnShown(self);

      removeClass(self.parent, 'open');

      classToggle(self.colorPicker);
      setAttribute(pickerToggle, ariaExpanded, 'false');

      if (colorMenu) {
        classToggle(colorMenu);
        setAttribute(self.menuToggle, ariaExpanded, 'false');
      }

      if (!self.isValid) {
        self.value = self.color.toString();
      }

      self.isOpen = false;

      if (!focusPrevented) {
        pickerToggle.focus();
      }
    }
  }

  dispose() {
    const self = this;
    const { input, parent } = self;
    self.hide(true);
    toggleEvents(self);
    [...parent.children].forEach((el) => {
      if (el !== input) el.remove();
    });
    Data.remove(input, colorPickerString);
  }
}

ObjectAssign(ColorPicker, {
  Color,
  getInstance: getColorPickerInstance,
  init: initColorPicker,
  selector: colorPickerSelector,
});

/**
 * `ColorPickerElement` Web Component.
 * @example
 * <color-picker>
 *   <input type="text">
 * </color-picker>
 */
class ColorPickerElement extends HTMLElement {
  constructor() {
    super();
    /** @type {ColorPicker?} */
    this.colorPicker = null;
    /** @type {HTMLInputElement} */
    // @ts-ignore - `HTMLInputElement` is also `HTMLElement`
    this.input = querySelector('input', this);
    /** @type {boolean} */
    this.isDisconnected = true;
    this.attachShadow({ mode: 'open' });
  }

  get value() { return this.input.value; }

  get color() { return this.colorPicker && this.colorPicker.color; }

  connectedCallback() {
    if (this.colorPicker) {
      if (this.isDisconnected) {
        this.isDisconnected = false;
      }
      return;
    }

    this.colorPicker = new ColorPicker(this.input);
    this.isDisconnected = false;

    if (this.shadowRoot) {
      this.shadowRoot.append(createElement('slot'));
    }
  }

  disconnectedCallback() {
    if (this.colorPicker) this.colorPicker.dispose();
    this.isDisconnected = true;
  }
}

ObjectAssign(ColorPickerElement, {
  Color,
  ColorPicker,
});

customElements.define('color-picker', ColorPickerElement);

export default ColorPickerElement;
