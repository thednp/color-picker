/*!
* ColorPicker v1.0.1 (http://thednp.github.io/color-picker)
* Copyright 2022 © thednp
* Licensed under MIT (https://github.com/thednp/color-picker/blob/master/LICENSE)
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ColorPicker = factory());
})(this, (function () { 'use strict';

  /** @type {Record<string, any>} */
  const EventRegistry = {};

  /**
   * The global event listener.
   *
   * @type {EventListener}
   * @this {EventTarget}
   */
  function globalListener(e) {
    const that = this;
    const { type } = e;

    [...EventRegistry[type]].forEach((elementsMap) => {
      const [element, listenersMap] = elementsMap;
      /* istanbul ignore else */
      if (element === that) {
        [...listenersMap].forEach((listenerMap) => {
          const [listener, options] = listenerMap;
          listener.apply(element, [e]);

          if (options && options.once) {
            removeListener(element, type, listener, options);
          }
        });
      }
    });
  }

  /**
   * Register a new listener with its options and attach the `globalListener`
   * to the target if this is the first listener.
   *
   * @type {Listener.ListenerAction<EventTarget>}
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
    oneElementMap.set(listener, options);

    // add listener last
    if (!size) {
      element.addEventListener(eventType, globalListener, options);
    }
  };

  /**
   * Remove a listener from registry and detach the `globalListener`
   * if no listeners are found in the registry.
   *
   * @type {Listener.ListenerAction<EventTarget>}
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
    /* istanbul ignore else */
    if (!oneElementMap || !oneElementMap.size) {
      element.removeEventListener(eventType, globalListener, eventOptions);
    }
  };

  /**
   * A global namespace for aria-description.
   * @type {string}
   */
  const ariaDescription = 'aria-description';

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
   * A global namespace for aria-valuetext.
   * @type {string}
   */
  const ariaValueText = 'aria-valuetext';

  /**
   * A global namespace for aria-valuenow.
   * @type {string}
   */
  const ariaValueNow = 'aria-valuenow';

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

  /**
   * A global namespace for `focusin` event.
   * @type {string}
   */
  const focusinEvent = 'focusin';

  /**
   * A global namespace for `click` event.
   * @type {string}
   */
  const mouseclickEvent = 'click';

  /**
   * A global namespace for `keydown` event.
   * @type {string}
   */
  const keydownEvent = 'keydown';

  /**
   * A global namespace for `change` event.
   * @type {string}
   */
  const changeEvent = 'change';

  /**
   * A global namespace for `touchmove` event.
   * @type {string}
   */
  const touchmoveEvent = 'touchmove';

  /**
   * A global namespace for `pointerdown` event.
   * @type {string}
   */
  const pointerdownEvent = 'pointerdown';

  /**
   * A global namespace for `pointermove` event.
   * @type {string}
   */
  const pointermoveEvent = 'pointermove';

  /**
   * A global namespace for `pointerup` event.
   * @type {string}
   */
  const pointerupEvent = 'pointerup';

  /**
   * A global namespace for `scroll` event.
   * @type {string}
   */
  const scrollEvent = 'scroll';

  /**
   * A global namespace for `keyup` event.
   * @type {string}
   */
  const keyupEvent = 'keyup';

  /**
   * A global namespace for `resize` event.
   * @type {string}
   */
  const resizeEvent = 'resize';

  /**
   * A global namespace for `focusout` event.
   * @type {string}
   */
  const focusoutEvent = 'focusout';

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
   * Returns the `document.documentElement` or the `<html>` element.
   *
   * @param {(Node | HTMLElement | Element | globalThis)=} node
   * @returns {HTMLElement | HTMLHtmlElement}
   */
  function getDocumentElement(node) {
    return getDocument(node).documentElement;
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

  let elementUID = 0;
  let elementMapUID = 0;
  const elementIDMap = new Map();

  /**
   * Returns a unique identifier for popover, tooltip, scrollspy.
   *
   * @param {HTMLElement | Element} element target element
   * @param {string=} key predefined key
   * @returns {number} an existing or new unique ID
   */
  function getUID(element, key) {
    let result = key ? elementUID : elementMapUID;

    if (key) {
      const elID = getUID(element);
      const elMap = elementIDMap.get(elID) || new Map();
      if (!elementIDMap.has(elID)) {
        elementIDMap.set(elID, elMap);
      }
      if (!elMap.has(key)) {
        elMap.set(key, result);
        elementUID += 1;
      } else result = elMap.get(key);
    } else {
      const elkey = element.id || element;

      if (!elementIDMap.has(elkey)) {
        elementIDMap.set(elkey, result);
        elementMapUID += 1;
      } else result = elementIDMap.get(elkey);
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
   * A global namespace for 'transitionDuration' string.
   * @type {string}
   */
  const transitionDuration = 'transitionDuration';

  /**
   * A global namespace for `transitionProperty` string for modern browsers.
   *
   * @type {string}
   */
  const transitionProperty = 'transitionProperty';

  /**
   * Utility to get the computed `transitionDuration`
   * from Element in miliseconds.
   *
   * @param {HTMLElement | Element} element target
   * @return {number} the value in miliseconds
   */
  function getElementTransitionDuration(element) {
    const propertyValue = getElementStyle(element, transitionProperty);
    const durationValue = getElementStyle(element, transitionDuration);
    const durationScale = durationValue.includes('ms') ? 1 : 1000;
    const duration = propertyValue && propertyValue !== 'none'
      ? parseFloat(durationValue) * durationScale : 0;

    return !Number.isNaN(duration) ? duration : 0;
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
   * Shortcut for `HTMLElement.getElementsByClassName` method. Some `Node` elements
   * like `ShadowRoot` do not support `getElementsByClassName`.
   *
   * @param {string} selector the class name
   * @param {(HTMLElement | Element | Document)=} parent optional Element to look into
   * @return {HTMLCollectionOf<HTMLElement | Element>} the 'HTMLCollection'
   */
  function getElementsByClassName(selector, parent) {
    const lookUp = parent && parentNodes.some((x) => parent instanceof x)
      ? parent : getDocument();
    return lookUp.getElementsByClassName(selector);
  }

  /**
   * Shortcut for the `Element.dispatchEvent(Event)` method.
   *
   * @param {HTMLElement | Element} element is the target
   * @param {Event} event is the `Event` object
   */
  const dispatchEvent = (element, event) => element.dispatchEvent(event);

  /**
   * Shortcut for `Object.assign()` static method.
   * @param  {Record<string, any>} obj a target object
   * @param  {Record<string, any>} source a source object
   */
  const ObjectAssign = (obj, source) => Object.assign(obj, source);

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
   * Shortcut for multiple uses of `HTMLElement.style.propertyName` method.
   * @param  {HTMLElement | Element} element target element
   * @param  {Partial<CSSStyleDeclaration>} styles attribute value
   */
  // @ts-ignore
  const setElementStyle = (element, styles) => { ObjectAssign(element.style, styles); };

  /**
   * Shortcut for `HTMLElement.getAttribute()` method.
   * @param {HTMLElement | Element} element target element
   * @param {string} attribute attribute name
   * @returns {string?} attribute value
   */
  const getAttribute = (element, attribute) => element.getAttribute(attribute);

  /**
   * The raw value or a given component option.
   *
   * @typedef {string | HTMLElement | Function | number | boolean | null} niceValue
   */

  /**
   * Utility to normalize component options
   *
   * @param {any} value the input value
   * @return {niceValue} the normalized value
   */
  function normalizeValue(value) {
    if (value === 'true') { // boolean
      return true;
    }

    if (value === 'false') { // boolean
      return false;
    }

    if (!Number.isNaN(+value)) { // number
      return +value;
    }

    if (value === '' || value === 'null') { // null
      return null;
    }

    // string / function / HTMLElement / object
    return value;
  }

  /**
   * Shortcut for `Object.keys()` static method.
   * @param  {Record<string, any>} obj a target object
   * @returns {string[]}
   */
  const ObjectKeys = (obj) => Object.keys(obj);

  /**
   * Shortcut for `String.toLowerCase()`.
   *
   * @param {string} source input string
   * @returns {string} lowercase output string
   */
  const toLowerCase = (source) => source.toLowerCase();

  /**
   * Utility to normalize component options.
   *
   * @param {HTMLElement | Element} element target
   * @param {Record<string, any>} defaultOps component default options
   * @param {Record<string, any>} inputOps component instance options
   * @param {string=} ns component namespace
   * @return {Record<string, any>} normalized component options object
   */
  function normalizeOptions(element, defaultOps, inputOps, ns) {
    // @ts-ignore -- our targets are always `HTMLElement`
    const data = { ...element.dataset };
    /** @type {Record<string, any>} */
    const normalOps = {};
    /** @type {Record<string, any>} */
    const dataOps = {};
    const title = 'title';

    ObjectKeys(data).forEach((k) => {
      const key = ns && k.includes(ns)
        ? k.replace(ns, '').replace(/[A-Z]/, (match) => toLowerCase(match))
        : k;

      dataOps[key] = normalizeValue(data[k]);
    });

    ObjectKeys(inputOps).forEach((k) => {
      inputOps[k] = normalizeValue(inputOps[k]);
    });

    ObjectKeys(defaultOps).forEach((k) => {
      if (k in inputOps) {
        normalOps[k] = inputOps[k];
      } else if (k in dataOps) {
        normalOps[k] = dataOps[k];
      } else {
        normalOps[k] = k === title
          ? getAttribute(element, title)
          : defaultOps[k];
      }
    });

    return normalOps;
  }

  /**
   * Utility to force re-paint of an `HTMLElement` target.
   *
   * @param {HTMLElement | Element} element is the target
   * @return {number} the `Element.offsetHeight` value
   */
  // @ts-ignore
  const reflow = (element) => element.offsetHeight;

  /**
   * Utility to focus an `HTMLElement` target.
   *
   * @param {HTMLElement | Element} element is the target
   */
  // @ts-ignore -- `Element`s resulted from querySelector can focus too
  const focus = (element) => element.focus();

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
   * Shortcut for `HTMLElement.setAttribute()` method.
   * @param  {HTMLElement | Element} element target element
   * @param  {string} attribute attribute name
   * @param  {string} value attribute value
   * @returns {void}
   */
  const setAttribute = (element, attribute, value) => element.setAttribute(attribute, value);

  /**
   * Shortcut for `HTMLElement.removeAttribute()` method.
   * @param  {HTMLElement | Element} element target element
   * @param  {string} attribute attribute name
   * @returns {void}
   */
  const removeAttribute = (element, attribute) => element.removeAttribute(attribute);

  /**
   * A global namespace for `document.head`.
   */
  const { head: documentHead } = document;

  /**
   * A list of explicit default non-color values.
   */
  const nonColors = ['transparent', 'currentColor', 'inherit', 'revert', 'initial'];

  /**
   * Round colour components, for all formats except HEX.
   * @param {number} v one of the colour components
   * @returns {number} the rounded number
   */
  function roundPart(v) {
    const floor = Math.floor(v);
    return v - floor < 0.5 ? floor : Math.round(v);
  }

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

  /** @type {Record<string, string>} */
  const colorPickerLabels = {
    pickerLabel: 'Colour Picker',
    appearanceLabel: 'Colour Appearance',
    valueLabel: 'Colour Value',
    toggleLabel: 'Select Colour',
    presetsLabel: 'Colour Presets',
    defaultsLabel: 'Colour Defaults',
    formatLabel: 'Format',
    alphaLabel: 'Alpha',
    hexLabel: 'Hexadecimal',
    hueLabel: 'Hue',
    whitenessLabel: 'Whiteness',
    blacknessLabel: 'Blackness',
    saturationLabel: 'Saturation',
    lightnessLabel: 'Lightness',
    redLabel: 'Red',
    greenLabel: 'Green',
    blueLabel: 'Blue',
  };

  /**
   * A list of 17 color names used for WAI-ARIA compliance.
   * @type {string[]}
   */
  const colorNames = ['white', 'black', 'grey', 'red', 'orange', 'brown', 'gold', 'olive', 'yellow', 'lime', 'green', 'teal', 'cyan', 'blue', 'violet', 'magenta', 'pink'];

  const tabIndex = 'tabindex';

  /**
   * Check if a string is valid JSON string.
   * @param {string} str the string input
   * @returns {boolean} the query result
   */
  function isValidJSON(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  /**
   * Shortcut for `String.toUpperCase()`.
   *
   * @param {string} source input string
   * @returns {string} uppercase output string
   */
  const toUpperCase = (source) => source.toUpperCase();

  /**
   * A global namespace for aria-haspopup.
   * @type {string}
   */
  const ariaHasPopup = 'aria-haspopup';

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

  const vHidden = 'v-hidden';

  /**
   * Returns the color form for `ColorPicker`.
   *
   * @param {CP.ColorPicker} self the `ColorPicker` instance
   * @returns {HTMLElement | Element} a new `<div>` element with color component `<input>`
   */
  function getColorForm(self) {
    const { format, id, componentLabels } = self;
    const colorForm = createElement({
      tagName: 'div',
      className: `color-form ${format}`,
    });

    let components = ['hex'];
    if (format === 'rgb') components = ['red', 'green', 'blue', 'alpha'];
    else if (format === 'hsl') components = ['hue', 'saturation', 'lightness', 'alpha'];
    else if (format === 'hwb') components = ['hue', 'whiteness', 'blackness', 'alpha'];

    components.forEach((c) => {
      const [C] = format === 'hex' ? ['#'] : toUpperCase(c).split('');
      const cID = `color_${format}_${c}_${id}`;
      const formatLabel = componentLabels[`${c}Label`];
      const cInputLabel = createElement({ tagName: 'label' });
      setAttribute(cInputLabel, 'for', cID);
      cInputLabel.append(
        createElement({ tagName: 'span', ariaHidden: 'true', innerText: `${C}:` }),
        createElement({ tagName: 'span', className: vHidden, innerText: formatLabel }),
      );
      const cInput = createElement({
        tagName: 'input',
        id: cID,
        // name: cID, - prevent saving the value to a form
        type: format === 'hex' ? 'text' : 'number',
        value: c === 'alpha' ? '100' : '0',
        className: `color-input ${c}`,
      });
      setAttribute(cInput, 'autocomplete', 'off');
      setAttribute(cInput, 'spellcheck', 'false');

      // alpha
      let max = '100';
      let step = '1';
      if (c !== 'alpha') {
        if (format === 'rgb') {
          max = '255'; step = '1';
        } else if (c === 'hue') {
          max = '360'; step = '1';
        }
      }
      ObjectAssign(cInput, {
        min: '0',
        max,
        step,
      });
      colorForm.append(cInputLabel, cInput);
    });
    return colorForm;
  }

  /**
   * A global namespace for aria-label.
   * @type {string}
   */
  const ariaLabel = 'aria-label';

  /**
   * A global namespace for aria-valuemin.
   * @type {string}
   */
  const ariaValueMin = 'aria-valuemin';

  /**
   * A global namespace for aria-valuemax.
   * @type {string}
   */
  const ariaValueMax = 'aria-valuemax';

  /**
   * Returns all color controls for `ColorPicker`.
   *
   * @param {CP.ColorPicker} self the `ColorPicker` instance
   * @returns {HTMLElement | Element} color controls
   */
  function getColorControls(self) {
    const { format, componentLabels } = self;
    const {
      hueLabel, alphaLabel, lightnessLabel, saturationLabel,
      whitenessLabel, blacknessLabel,
    } = componentLabels;

    const max1 = format === 'hsl' ? 360 : 100;
    const max2 = format === 'hsl' ? 100 : 360;
    const max3 = 100;

    let ctrl1Label = format === 'hsl'
      ? `${hueLabel} & ${lightnessLabel}`
      : `${lightnessLabel} & ${saturationLabel}`;

    ctrl1Label = format === 'hwb'
      ? `${whitenessLabel} & ${blacknessLabel}`
      : ctrl1Label;

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
        i: 1,
        c: colorPointer,
        l: ctrl1Label,
        min: 0,
        max: max1,
      },
      {
        i: 2,
        c: colorSlider,
        l: ctrl2Label,
        min: 0,
        max: max2,
      },
      {
        i: 3,
        c: colorSlider,
        l: alphaLabel,
        min: 0,
        max: max3,
      },
    ];

    controls.forEach((template) => {
      const {
        i, c, l, min, max,
      } = template;
      const control = createElement({
        tagName: 'div',
        className: 'color-control',
      });
      setAttribute(control, 'role', 'presentation');

      control.append(
        createElement({
          tagName: 'div',
          className: `visual-control visual-control${i}`,
        }),
      );

      const knob = createElement({
        tagName: 'div',
        className: `${c} knob`,
        ariaLive: 'polite',
      });

      setAttribute(knob, ariaLabel, l);
      setAttribute(knob, 'role', 'slider');
      setAttribute(knob, tabIndex, '0');
      setAttribute(knob, ariaValueMin, `${min}`);
      setAttribute(knob, ariaValueMax, `${max}`);
      control.append(knob);
      colorControls.append(control);
    });

    return colorControls;
  }

  /**
   * Helps setting CSS variables to the color-menu.
   * @param {HTMLElement} element
   * @param {Record<string,any>} props
   */
  function setCSSProperties(element, props) {
    ObjectKeys(props).forEach((prop) => {
      element.style.setProperty(prop, props[prop]);
    });
  }

  /**
   * Returns a color-defaults with given values and class.
   * @param {CP.ColorPicker} self
   * @param {CP.ColorPalette | string[]} colorsSource
   * @param {string} menuClass
   * @returns {HTMLElement | Element}
   */
  function getColorMenu(self, colorsSource, menuClass) {
    const { input, format, componentLabels } = self;
    const { defaultsLabel, presetsLabel } = componentLabels;
    const isOptionsMenu = menuClass === 'color-options';
    const isPalette = colorsSource instanceof ColorPalette;
    const menuLabel = isOptionsMenu ? presetsLabel : defaultsLabel;
    const colorsArray = isPalette ? colorsSource.colors : colorsSource;
    const colorsCount = colorsArray.length;
    const { lightSteps } = isPalette ? colorsSource : { lightSteps: null };
    const fit = lightSteps || [9, 10].find((x) => colorsCount >= x * 2 && !(colorsCount % x)) || 5;
    const isMultiLine = isOptionsMenu && colorsCount > fit;
    let rowCountHover = 2;
    rowCountHover = isMultiLine && colorsCount > fit * 2 ? 3 : rowCountHover;
    rowCountHover = isMultiLine && colorsCount > fit * 3 ? 4 : rowCountHover;
    rowCountHover = isMultiLine && colorsCount > fit * 4 ? 5 : rowCountHover;
    const rowCount = rowCountHover - (colorsCount <= fit * 3 ? 1 : 2);
    const isScrollable = isMultiLine && colorsCount > rowCount * fit;
    let finalClass = menuClass;
    finalClass += isScrollable ? ' scrollable' : '';
    finalClass += isMultiLine ? ' multiline' : '';
    const gap = isMultiLine ? '1px' : '0.25rem';
    let optionSize = isMultiLine ? 1.75 : 2;
    optionSize = fit > 5 && isMultiLine ? 1.5 : optionSize;
    const menuHeight = `${rowCount * optionSize}rem`;
    const menuHeightHover = `calc(${rowCountHover} * ${optionSize}rem + ${rowCountHover - 1} * ${gap})`;
    /** @type {HTMLUListElement} */
    // @ts-ignore -- <UL> is an `HTMLElement`
    const menu = createElement({
      tagName: 'ul',
      className: finalClass,
    });
    setAttribute(menu, 'role', 'listbox');
    setAttribute(menu, ariaLabel, menuLabel);

    if (isScrollable) {
      setCSSProperties(menu, {
        '--grid-item-size': `${optionSize}rem`,
        '--grid-fit': fit,
        '--grid-gap': gap,
        '--grid-height': menuHeight,
        '--grid-hover-height': menuHeightHover,
      });
    }

    colorsArray.forEach((x) => {
      let [value, label] = typeof x === 'string' ? x.trim().split(':') : [];
      if (x instanceof Color) {
        value = x.toHexString();
        label = value;
      }
      const color = new Color(x instanceof Color ? x : value, format);
      const isActive = color.toString() === getAttribute(input, 'value');
      const active = isActive ? ' active' : '';

      const option = createElement({
        tagName: 'li',
        className: `color-option${active}`,
        innerText: `${label || value}`,
      });

      setAttribute(option, tabIndex, '0');
      setAttribute(option, 'data-value', `${value}`);
      setAttribute(option, 'role', 'option');
      setAttribute(option, ariaSelected, isActive ? 'true' : 'false');

      if (isOptionsMenu) {
        setElementStyle(option, { backgroundColor: value });
      }

      menu.append(option);
    });
    return menu;
  }

  /**
  * Generate HTML markup and update instance properties.
  * @param {CP.ColorPicker} self
  */
  function setMarkup(self) {
    const {
      input, parent, format, id, componentLabels, colorKeywords, colorPresets,
    } = self;
    const colorValue = getAttribute(input, 'value') || '#fff';

    const {
      toggleLabel, pickerLabel, formatLabel, hexLabel,
    } = componentLabels;

    // update color
    const color = nonColors.includes(colorValue) ? '#fff' : colorValue;
    self.color = new Color(color, format);

    // set initial controls dimensions
    const formatString = format === 'hex' ? hexLabel : toUpperCase(format);

    const pickerBtn = createElement({
      id: `picker-btn-${id}`,
      tagName: 'button',
      className: 'picker-toggle btn-appearance',
    });
    setAttribute(pickerBtn, ariaExpanded, 'false');
    setAttribute(pickerBtn, ariaHasPopup, 'true');
    pickerBtn.append(createElement({
      tagName: 'span',
      className: vHidden,
      innerText: `${pickerLabel}. ${formatLabel}: ${formatString}`,
    }));

    const pickerDropdown = createElement({
      tagName: 'div',
      className: 'color-dropdown picker',
    });
    setAttribute(pickerDropdown, ariaLabelledBy, `picker-btn-${id}`);
    setAttribute(pickerDropdown, 'role', 'group');

    const colorControls = getColorControls(self);
    const colorForm = getColorForm(self);

    pickerDropdown.append(colorControls, colorForm);
    input.before(pickerBtn);
    parent.append(pickerDropdown);

    // set colour key menu template
    if (colorKeywords || colorPresets) {
      const presetsDropdown = createElement({
        tagName: 'div',
        className: 'color-dropdown scrollable menu',
      });

      // color presets
      if (colorPresets) {
        presetsDropdown.append(getColorMenu(self, colorPresets, 'color-options'));
      }

      // explicit defaults [reset, initial, inherit, transparent, currentColor]
      // also custom defaults [default: #069, complementary: #930]
      if (colorKeywords && colorKeywords.length) {
        presetsDropdown.append(getColorMenu(self, colorKeywords, 'color-defaults'));
      }

      const presetsBtn = createElement({
        tagName: 'button',
        className: 'menu-toggle btn-appearance',
      });
      setAttribute(presetsBtn, tabIndex, '-1');
      setAttribute(presetsBtn, ariaExpanded, 'false');
      setAttribute(presetsBtn, ariaHasPopup, 'true');

      const xmlns = encodeURI('http://www.w3.org/2000/svg');
      const presetsIcon = createElementNS(xmlns, { tagName: 'svg' });
      setAttribute(presetsIcon, 'xmlns', xmlns);
      setAttribute(presetsIcon, 'viewBox', '0 0 512 512');
      setAttribute(presetsIcon, ariaHidden, 'true');

      const path = createElementNS(xmlns, { tagName: 'path' });
      setAttribute(path, 'd', 'M98,158l157,156L411,158l27,27L255,368L71,185L98,158z');
      setAttribute(path, 'fill', '#fff');
      presetsIcon.append(path);
      presetsBtn.append(createElement({
        tagName: 'span',
        className: vHidden,
        innerText: `${toggleLabel}`,
      }), presetsIcon);

      parent.append(presetsBtn, presetsDropdown);
    }

    // solve non-colors after settings save
    if (colorKeywords && nonColors.includes(colorValue)) {
      self.value = colorValue;
    }
    setAttribute(input, tabIndex, '-1');
  }

  var version = "1.0.1";

  const Version = version;

  // ColorPicker GC
  // ==============
  const colorPickerString = 'color-picker';
  const colorPickerSelector = `[data-function="${colorPickerString}"]`;
  const colorPickerParentSelector = `.${colorPickerString},${colorPickerString}`;
  const colorPickerDefaults = {
    componentLabels: colorPickerLabels,
    colorLabels: colorNames,
    format: 'rgb',
    colorPresets: false,
    colorKeywords: false,
  };

  // ColorPicker Static Methods
  // ==========================

  /** @type {CP.GetInstance<ColorPicker, HTMLInputElement>} */
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

    fn(input, focusinEvent, self.showPicker);
    fn(pickerToggle, mouseclickEvent, self.togglePicker);

    if (menuToggle) {
      fn(menuToggle, mouseclickEvent, self.toggleMenu);
    }
  }

  /**
   * Add / remove `ColorPicker` event listeners active only when open.
   * @param {ColorPicker} self
   * @param {boolean=} action
   */
  function toggleEventsOnShown(self, action) {
    const fn = action ? addListener : removeListener;
    const { input, colorMenu, parent } = self;
    const doc = getDocument(input);
    const win = doc.defaultView;

    fn(self.controls, pointerdownEvent, self.pointerDown);
    self.controlKnobs.forEach((x) => fn(x, keydownEvent, self.handleKnobs));

    fn(win, scrollEvent, self.handleScroll);
    fn(win, resizeEvent, self.update);

    [input, ...self.inputs].forEach((x) => fn(x, changeEvent, self.changeHandler));

    if (colorMenu) {
      fn(colorMenu, mouseclickEvent, self.menuClickHandler);
      fn(colorMenu, keydownEvent, self.menuKeyHandler);
    }

    fn(doc, pointermoveEvent, self.pointerMove);
    fn(doc, pointerupEvent, self.pointerUp);
    fn(parent, focusoutEvent, self.handleFocusOut);
    fn(doc, keyupEvent, self.handleDismiss);
  }

  /**
   * Triggers the `ColorPicker` original event.
   * @param {ColorPicker} self
   */
  function firePickerChange(self) {
    dispatchEvent(self.input, new CustomEvent('colorpicker.change'));
  }

  /**
   * Hides a visible dropdown.
   * @param {HTMLElement} element
   * @returns {void}
   */
  function removePosition(element) {
    /* istanbul ignore else */
    if (element) {
      ['bottom', 'top'].forEach((x) => removeClass(element, x));
    }
  }

  /**
   * Shows a `ColorPicker` dropdown and close the curent open dropdown.
   * @param {ColorPicker} self
   * @param {HTMLElement | Element} dropdown
   */
  function showDropdown(self, dropdown) {
    const {
      colorPicker, colorMenu, menuToggle, pickerToggle, parent,
    } = self;
    const isPicker = dropdown === colorPicker;
    const openDropdown = isPicker ? colorMenu : colorPicker;
    const activeBtn = isPicker ? menuToggle : pickerToggle;
    const nextBtn = !isPicker ? menuToggle : pickerToggle;

    if (!hasClass(parent, 'open')) {
      addClass(parent, 'open');
    }
    if (openDropdown) {
      removeClass(openDropdown, 'show');
      removePosition(openDropdown);
    }
    addClass(dropdown, 'bottom');
    reflow(dropdown);
    addClass(dropdown, 'show');

    if (isPicker) self.update();

    if (!self.isOpen) {
      toggleEventsOnShown(self, true);
      self.updateDropdownPosition();
      self.isOpen = true;
      setAttribute(self.input, tabIndex, '0');
      if (menuToggle) {
        setAttribute(menuToggle, tabIndex, '0');
      }
    }

    setAttribute(nextBtn, ariaExpanded, 'true');
    if (activeBtn) {
      setAttribute(activeBtn, ariaExpanded, 'false');
    }
  }

  /**
   * Color Picker Web Component
   * @see http://thednp.github.io/color-picker
   */
  class ColorPicker {
    /**
     * Returns a new `ColorPicker` instance. The target of this constructor
     * must be an `HTMLInputElement`.
     *
     * @param {HTMLInputElement | string} target the target `<input>` element
     * @param {CP.ColorPickerOptions=} config instance options
     */
    constructor(target, config) {
      const self = this;
      /** @type {HTMLInputElement} */
      const input = querySelector(target);

      // invalidate
      if (!input) throw new TypeError(`ColorPicker target "${target}" cannot be found.`);
      self.input = input;

      const parent = closest(input, colorPickerParentSelector);
      if (!parent) throw new TypeError('ColorPicker requires a specific markup to work.');

      /** @type {HTMLElement} */
      self.parent = parent;

      /** @type {number} */
      self.id = getUID(input, colorPickerString);

      // set initial state
      /** @type {HTMLElement?} */
      self.dragElement = null;
      /** @type {boolean} */
      self.isOpen = false;
      /** @type {Record<string, number>} */
      self.controlPositions = {
        c1x: 0, c1y: 0, c2y: 0, c3y: 0,
      };
      /** @type {Record<string, string>} */
      self.colorLabels = {};
      /** @type {string[]=} */
      self.colorKeywords = undefined;
      /** @type {(ColorPalette | string[])=} */
      self.colorPresets = undefined;

      // process options
      const {
        format, componentLabels, colorLabels, colorKeywords, colorPresets,
      } = normalizeOptions(this.isCE ? parent : input, colorPickerDefaults, config || {});

      let translatedColorLabels = colorNames;
      /* istanbul ignore else */
      if (colorLabels instanceof Array && colorLabels.length === 17) {
        translatedColorLabels = colorLabels;
      } else if (colorLabels && colorLabels.split(',').length === 17) {
        translatedColorLabels = colorLabels.split(',');
      }

      // expose colour labels to all methods
      colorNames.forEach((c, i) => {
        self.colorLabels[c] = translatedColorLabels[i].trim();
      });

      // update and expose component labels
      const tempComponentLabels = componentLabels && isValidJSON(componentLabels)
        ? JSON.parse(componentLabels) : componentLabels;

      /** @type {Record<string, string>} */
      self.componentLabels = ObjectAssign({ ...colorPickerLabels }, tempComponentLabels);

      /** @type {Color} */
      self.color = new Color(input.value || '#fff', format);

      /** @type {CP.ColorFormats} */
      self.format = format;

      // set colour defaults
      if (colorKeywords instanceof Array && colorKeywords.length) {
        self.colorKeywords = colorKeywords;
      } else if (typeof colorKeywords === 'string' && colorKeywords.length) {
        self.colorKeywords = colorKeywords.split(',').map((x) => x.trim());
      }

      // set colour presets
      if (colorPresets instanceof Array && colorPresets.length) {
        self.colorPresets = colorPresets;
      } else if (typeof colorPresets === 'string' && colorPresets.length) {
        if (isValidJSON(colorPresets)) {
          const { hue, hueSteps, lightSteps } = JSON.parse(colorPresets);
          self.colorPresets = new ColorPalette(hue, hueSteps, lightSteps);
        } else {
          self.colorPresets = colorPresets.split(',').map((x) => x.trim());
        }
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
      self.update = self.update.bind(self);
      self.handleScroll = self.handleScroll.bind(self);
      self.handleFocusOut = self.handleFocusOut.bind(self);
      self.changeHandler = self.changeHandler.bind(self);
      self.handleDismiss = self.handleDismiss.bind(self);
      self.handleKnobs = self.handleKnobs.bind(self);

      // generate markup
      setMarkup(self);

      const [colorPicker, colorMenu] = getElementsByClassName('color-dropdown', parent);
      // set main elements
      /** @type {HTMLElement} */
      self.pickerToggle = querySelector('.picker-toggle', parent);
      /** @type {HTMLElement} */
      self.menuToggle = querySelector('.menu-toggle', parent);
      /** @type {HTMLElement} */
      self.colorPicker = colorPicker;
      /** @type {HTMLElement} */
      self.colorMenu = colorMenu;
      /** @type {HTMLInputElement[]} */
      self.inputs = [...getElementsByClassName('color-input', parent)];
      const [controls] = getElementsByClassName('color-controls', parent);
      self.controls = controls;
      /** @type {(HTMLElement | Element)[]} */
      self.controlKnobs = [...getElementsByClassName('knob', controls)];
      /** @type {(HTMLElement)[]} */
      self.visuals = [...getElementsByClassName('visual-control', controls)];

      // update colour picker controls, inputs and visuals
      self.update();

      // add main events listeners
      toggleEvents(self, true);

      // set component data
      Data.set(input, colorPickerString, self);
    }

    /** Returns the current colour value */
    get value() { return this.input.value; }

    /**
     * Sets a new colour value.
     * @param {string} v new colour value
     */
    set value(v) { this.input.value = v; }

    /** Check if the colour presets include any non-colour. */
    get hasNonColor() {
      return this.colorKeywords instanceof Array
        && this.colorKeywords.some((x) => nonColors.includes(x));
    }

    /** Check if the parent of the target is a `ColorPickerElement` instance. */
    get isCE() { return this.parent.localName === colorPickerString; }

    /** Returns hexadecimal value of the current colour. */
    get hex() { return this.color.toHex(true); }

    /** Returns the current colour value in {h,s,v,a} object format. */
    get hsv() { return this.color.toHsv(); }

    /** Returns the current colour value in {h,s,l,a} object format. */
    get hsl() { return this.color.toHsl(); }

    /** Returns the current colour value in {h,w,b,a} object format. */
    get hwb() { return this.color.toHwb(); }

    /** Returns the current colour value in {r,g,b,a} object format. */
    get rgb() { return this.color.toRgb(); }

    /** Returns the current colour brightness. */
    get brightness() { return this.color.brightness; }

    /** Returns the current colour luminance. */
    get luminance() { return this.color.luminance; }

    /** Checks if the current colour requires a light text colour. */
    get isDark() {
      const { color, brightness } = this;
      return brightness < 120 && color.a > 0.33;
    }

    /** Checks if the current input value is a valid colour. */
    get isValid() {
      const inputValue = this.input.value;
      return inputValue !== '' && new Color(inputValue).isValid;
    }

    /** Returns the colour appearance, usually the closest colour name for the current value. */
    get appearance() {
      const {
        colorLabels, hsl, hsv, format,
      } = this;

      const hue = roundPart(hsl.h * 360);
      const saturationSource = format === 'hsl' ? hsl.s : hsv.s;
      const saturation = roundPart(saturationSource * 100);
      const lightness = roundPart(hsl.l * 100);
      const hsvl = hsv.v * 100;

      let colorName;

      // determine color appearance
      /* istanbul ignore else */
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
      return colorName;
    }

    /** Updates `ColorPicker` visuals. */
    updateVisuals() {
      const self = this;
      const {
        controlPositions, visuals,
      } = self;
      const [v1, v2, v3] = visuals;
      const { offsetHeight } = v1;
      const hue = controlPositions.c2y / offsetHeight;
      const { r, g, b } = new Color({ h: hue, s: 1, l: 0.5 }).toRgb();
      const whiteGrad = 'linear-gradient(rgb(255,255,255) 0%, rgb(255,255,255) 100%)';
      const alpha = 1 - controlPositions.c3y / offsetHeight;
      const roundA = roundPart((alpha * 100)) / 100;

      const fill = new Color({
        h: hue, s: 1, l: 0.5, a: alpha,
      }).toRgbString();
      const hueGradient = `linear-gradient(
      rgb(255,0,0) 0%, rgb(255,255,0) 16.67%,
      rgb(0,255,0) 33.33%, rgb(0,255,255) 50%,
      rgb(0,0,255) 66.67%, rgb(255,0,255) 83.33%,
      rgb(255,0,0) 100%)`;
      setElementStyle(v1, {
        background: `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,${roundA}) 100%),
      linear-gradient(to right, rgba(255,255,255,${roundA}) 0%, ${fill} 100%),
      ${whiteGrad}`,
      });
      setElementStyle(v2, { background: hueGradient });

      setElementStyle(v3, {
        background: `linear-gradient(rgba(${r},${g},${b},1) 0%,rgba(${r},${g},${b},0) 100%)`,
      });
    }

    /**
     * The `ColorPicker` *focusout* event listener when open.
     * @param {FocusEvent} e
     * @this {ColorPicker}
     */
    handleFocusOut({ relatedTarget }) {
      if (relatedTarget && !this.parent.contains(relatedTarget)) {
        this.hide(true);
      }
    }

    /**
     * The `ColorPicker` *keyup* event listener when open.
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
     * The `ColorPicker` *scroll* event listener when open.
     * @param {Event} e
     * @this {ColorPicker}
     */
    handleScroll(e) {
      const self = this;
      const { activeElement } = getDocument(self.input);

      self.updateDropdownPosition();

      /* istanbul ignore next */
      if (([pointermoveEvent, touchmoveEvent].includes(e.type) && self.dragElement)
        || (activeElement && self.controlKnobs.includes(activeElement))) {
        e.stopPropagation();
        e.preventDefault();
      }
    }

    /**
     * The `ColorPicker` keyboard event listener for menu navigation.
     * @param {KeyboardEvent} e
     * @this {ColorPicker}
     */
    menuKeyHandler(e) {
      const { target, code } = e;
      const { previousElementSibling, nextElementSibling, parentElement } = target;
      const isColorOptionsMenu = parentElement && hasClass(parentElement, 'color-options');
      const allSiblings = [...parentElement.children];
      const columnsCount = isColorOptionsMenu
        && getElementStyle(parentElement, 'grid-template-columns').split(' ').length;
      const currentIndex = allSiblings.indexOf(target);
      const previousElement = currentIndex > -1
        && columnsCount && allSiblings[currentIndex - columnsCount];
      const nextElement = currentIndex > -1
        && columnsCount && allSiblings[currentIndex + columnsCount];

      if ([keyArrowDown, keyArrowUp, keySpace].includes(code)) {
        // prevent scroll when navigating the menu via arrow keys / Space
        e.preventDefault();
      }
      if (isColorOptionsMenu) {
        if (previousElement && code === keyArrowUp) {
          focus(previousElement);
        } else if (nextElement && code === keyArrowDown) {
          focus(nextElement);
        } else if (previousElementSibling && code === keyArrowLeft) {
          focus(previousElementSibling);
        } else if (nextElementSibling && code === keyArrowRight) {
          focus(nextElementSibling);
        }
      } else if (previousElementSibling && [keyArrowLeft, keyArrowUp].includes(code)) {
        focus(previousElementSibling);
      } else if (nextElementSibling && [keyArrowRight, keyArrowDown].includes(code)) {
        focus(nextElementSibling);
      }

      if ([keyEnter, keySpace].includes(code)) {
        this.menuClickHandler({ target });
      }
    }

    /**
     * The `ColorPicker` click event listener for the colour menu presets / defaults.
     * @param {Event} e
     * @this {ColorPicker}
     */
    menuClickHandler(e) {
      const self = this;
      const { target } = e;
      const { colorMenu } = self;
      const newOption = (getAttribute(target, 'data-value') || '').trim();
      // invalidate for targets other than color options
      if (!newOption.length) return;
      const currentActive = querySelector('li.active', colorMenu);
      let newColor = newOption;
      newColor = nonColors.includes(newColor) ? 'white' : newColor;
      newColor = newColor === 'transparent' ? 'rgba(0,0,0,0)' : newColor;

      const {
        r, g, b, a,
      } = new Color(newColor);

      ObjectAssign(self.color, {
        r, g, b, a,
      });

      self.update();

      /* istanbul ignore else */
      if (currentActive !== target) {
        /* istanbul ignore else */
        if (currentActive) {
          removeClass(currentActive, 'active');
          removeAttribute(currentActive, ariaSelected);
        }

        addClass(target, 'active');
        setAttribute(target, ariaSelected, 'true');

        if (nonColors.includes(newOption)) {
          self.value = newOption;
        }
        firePickerChange(self);
      }
    }

    /**
     * The `ColorPicker` *touchstart* / *mousedown* events listener for control knobs.
     * @param {PointerEvent} e
     * @this {ColorPicker}
     */
    pointerDown(e) {
      const self = this;
      /** @type {*} */
      const { target, pageX, pageY } = e;
      const { colorMenu, visuals, controlKnobs } = self;
      const [v1, v2, v3] = visuals;
      const [c1, c2, c3] = controlKnobs;
      /** @type {HTMLElement} */
      const visual = controlKnobs.includes(target) ? target.previousElementSibling : target;
      const visualRect = getBoundingClientRect(visual);
      const html = getDocumentElement(v1);
      const offsetX = pageX - html.scrollLeft - visualRect.left;
      const offsetY = pageY - html.scrollTop - visualRect.top;

      /* istanbul ignore else */
      if (target === v1 || target === c1) {
        self.dragElement = visual;
        self.changeControl1(offsetX, offsetY);
      } else if (target === v2 || target === c2) {
        self.dragElement = visual;
        self.changeControl2(offsetY);
      } else if (target === v3 || target === c3) {
        self.dragElement = visual;
        self.changeAlpha(offsetY);
      }

      if (colorMenu) {
        const currentActive = querySelector('li.active', colorMenu);
        if (currentActive) {
          removeClass(currentActive, 'active');
          removeAttribute(currentActive, ariaSelected);
        }
      }
      e.preventDefault();
    }

    /**
     * The `ColorPicker` *touchend* / *mouseup* events listener for control knobs.
     * @param {PointerEvent} e
     * @this {ColorPicker}
     */
    pointerUp({ target }) {
      const self = this;
      const { parent } = self;
      const doc = getDocument(parent);
      const currentOpen = querySelector(`${colorPickerParentSelector}.open`, doc) !== null;
      const selection = doc.getSelection();

      if (!self.dragElement && !selection.toString().length
        && !parent.contains(target)) {
        self.hide(currentOpen);
      }

      self.dragElement = null;
    }

    /**
     * The `ColorPicker` *touchmove* / *mousemove* events listener for control knobs.
     * @param {PointerEvent} e
     */
    pointerMove(e) {
      const self = this;
      const { dragElement, visuals } = self;
      const [v1, v2, v3] = visuals;
      const { pageX, pageY } = e;

      if (!dragElement) return;

      const controlRect = getBoundingClientRect(dragElement);
      const win = getDocumentElement(v1);
      const offsetX = pageX - win.scrollLeft - controlRect.left;
      const offsetY = pageY - win.scrollTop - controlRect.top;

      if (dragElement === v1) {
        self.changeControl1(offsetX, offsetY);
      }

      if (dragElement === v2) {
        self.changeControl2(offsetY);
      }

      if (dragElement === v3) {
        self.changeAlpha(offsetY);
      }
    }

    /**
     * The `ColorPicker` *keydown* event listener for control knobs.
     * @param {KeyboardEvent} e
     */
    handleKnobs(e) {
      const { target, code } = e;
      const self = this;

      // only react to arrow buttons
      if (![keyArrowUp, keyArrowDown, keyArrowLeft, keyArrowRight].includes(code)) return;
      e.preventDefault();

      const { controlKnobs, visuals } = self;
      const { offsetWidth, offsetHeight } = visuals[0];
      const [c1, c2, c3] = controlKnobs;
      const { activeElement } = getDocument(c1);
      const currentKnob = controlKnobs.find((x) => x === activeElement);
      const yRatio = offsetHeight / 360;

      /* istanbul ignore else */
      if (currentKnob) {
        let offsetX = 0;
        let offsetY = 0;

        /* istanbul ignore else */
        if (target === c1) {
          const xRatio = offsetWidth / 100;

          /* istanbul ignore else */
          if ([keyArrowLeft, keyArrowRight].includes(code)) {
            self.controlPositions.c1x += code === keyArrowRight ? xRatio : -xRatio;
          } else if ([keyArrowUp, keyArrowDown].includes(code)) {
            self.controlPositions.c1y += code === keyArrowDown ? yRatio : -yRatio;
          }

          offsetX = self.controlPositions.c1x;
          offsetY = self.controlPositions.c1y;
          self.changeControl1(offsetX, offsetY);
        } else if (target === c2) {
          self.controlPositions.c2y += [keyArrowDown, keyArrowRight].includes(code)
            ? yRatio
            : -yRatio;

          offsetY = self.controlPositions.c2y;
          self.changeControl2(offsetY);
        } else if (target === c3) {
          self.controlPositions.c3y += [keyArrowDown, keyArrowRight].includes(code)
            ? yRatio
            : -yRatio;

          offsetY = self.controlPositions.c3y;
          self.changeAlpha(offsetY);
        }
        self.handleScroll(e);
      }
    }

    /** The event listener of the colour form inputs. */
    changeHandler() {
      const self = this;
      let colorSource;
      const {
        inputs, format, value: currentValue, input, controlPositions, visuals,
      } = self;
      /** @type {*} */
      const { activeElement } = getDocument(input);
      const { offsetHeight } = visuals[0];
      const [i1,,, i4] = inputs;
      const [v1, v2, v3, v4] = format === 'rgb'
        ? inputs.map((i) => parseFloat(i.value) / (i === i4 ? 100 : 1))
        : inputs.map((i) => parseFloat(i.value) / (i !== i1 ? 100 : 360));
      const isNonColorValue = self.hasNonColor && nonColors.includes(currentValue);
      const alpha = i4 ? v4 : (1 - controlPositions.c3y / offsetHeight);

      /* istanbul ignore else */
      if (activeElement === input || (activeElement && inputs.includes(activeElement))) {
        if (activeElement === input) {
          if (isNonColorValue) {
            colorSource = currentValue === 'transparent' ? 'rgba(0,0,0,0)' : 'rgb(0,0,0)';
          } else {
            colorSource = currentValue;
          }
        } else if (format === 'hex') {
          colorSource = i1.value;
        } else if (format === 'hsl') {
          colorSource = {
            h: v1, s: v2, l: v3, a: alpha,
          };
        } else if (format === 'hwb') {
          colorSource = {
            h: v1, w: v2, b: v3, a: alpha,
          };
        } else {
          colorSource = {
            r: v1, g: v2, b: v3, a: alpha,
          };
        }

        const {
          r, g, b, a,
        } = new Color(colorSource);

        ObjectAssign(self.color, {
          r, g, b, a,
        });
        self.setControlPositions();
        self.updateAppearance();
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
     * @param {number} X the X component of the offset
     * @param {number} Y the Y component of the offset
     */
    changeControl1(X, Y) {
      const self = this;
      let [offsetX, offsetY] = [0, 0];
      const { controlPositions, visuals } = self;
      const { offsetHeight, offsetWidth } = visuals[0];

      if (X > offsetWidth) offsetX = offsetWidth;
      else if (X >= 0) offsetX = X;

      if (Y > offsetHeight) offsetY = offsetHeight;
      else if (Y >= 0) offsetY = Y;

      const hue = controlPositions.c2y / offsetHeight;

      const saturation = offsetX / offsetWidth;

      const lightness = 1 - offsetY / offsetHeight;
      const alpha = 1 - controlPositions.c3y / offsetHeight;

      // new color
      const {
        r, g, b, a,
      } = new Color({
        h: hue, s: saturation, v: lightness, a: alpha,
      });

      ObjectAssign(self.color, {
        r, g, b, a,
      });

      // new positions
      self.controlPositions.c1x = offsetX;
      self.controlPositions.c1y = offsetY;

      // update color picker
      self.updateAppearance();
      self.updateInputs();
      self.updateControls();
      self.updateVisuals();
    }

    /**
     * Updates `ColorPicker` second control:
     * * `hue` for HEX/RGB/HWB;
     * * `saturation` for HSL.
     *
     * @param {number} Y the Y offset
     */
    changeControl2(Y) {
      const self = this;
      const {
        controlPositions, visuals,
      } = self;
      const { offsetHeight, offsetWidth } = visuals[0];

      let offsetY = 0;

      if (Y > offsetHeight) offsetY = offsetHeight;
      else if (Y >= 0) offsetY = Y;

      const hue = offsetY / offsetHeight;
      const saturation = controlPositions.c1x / offsetWidth;
      const lightness = 1 - controlPositions.c1y / offsetHeight;
      const alpha = 1 - controlPositions.c3y / offsetHeight;

      // new color
      const {
        r, g, b, a,
      } = new Color({
        h: hue, s: saturation, v: lightness, a: alpha,
      });

      ObjectAssign(self.color, {
        r, g, b, a,
      });

      // new position
      self.controlPositions.c2y = offsetY;
      // update color picker
      self.updateAppearance();
      self.updateInputs();
      self.updateControls();
      self.updateVisuals();
    }

    /**
     * Updates `ColorPicker` last control,
     * the `alpha` channel.
     *
     * @param {number} Y
     */
    changeAlpha(Y) {
      const self = this;
      const { visuals } = self;
      const { offsetHeight } = visuals[0];
      let offsetY = 0;

      if (Y > offsetHeight) offsetY = offsetHeight;
      else if (Y >= 0) offsetY = Y;

      // update color alpha
      const alpha = 1 - offsetY / offsetHeight;
      self.color.setAlpha(alpha);
      // update position
      self.controlPositions.c3y = offsetY;
      // update color picker
      self.updateAppearance();
      self.updateInputs();
      self.updateControls();
      self.updateVisuals();
    }

    /**
     * Updates `ColorPicker` control positions on:
     * * initialization
     * * window resize
     */
    update() {
      const self = this;
      self.updateDropdownPosition();
      self.updateAppearance();
      self.setControlPositions();
      self.updateInputs(true);
      self.updateControls();
      self.updateVisuals();
    }

    /** Updates the open dropdown position on *scroll* event. */
    updateDropdownPosition() {
      const self = this;
      const { input, colorPicker, colorMenu } = self;
      const elRect = getBoundingClientRect(input);
      const { top, bottom } = elRect;
      const { offsetHeight: elHeight } = input;
      const windowHeight = getDocumentElement(input).clientHeight;
      const isPicker = hasClass(colorPicker, 'show');
      const dropdown = isPicker ? colorPicker : colorMenu;
      if (!dropdown) return;
      const { offsetHeight: dropHeight } = dropdown;
      const distanceBottom = windowHeight - bottom;
      const distanceTop = top;
      const bottomExceed = top + dropHeight + elHeight > windowHeight; // show
      const topExceed = top - dropHeight < 0; // show-top

      if ((hasClass(dropdown, 'bottom') || !topExceed) && distanceBottom < distanceTop && bottomExceed) {
        removeClass(dropdown, 'bottom');
        addClass(dropdown, 'top');
      } else {
        removeClass(dropdown, 'top');
        addClass(dropdown, 'bottom');
      }
    }

    /** Updates control knobs' positions. */
    setControlPositions() {
      const self = this;
      const {
        visuals, color, hsv,
      } = self;
      const { offsetHeight, offsetWidth } = visuals[0];
      const alpha = color.a;
      const hue = hsv.h;

      const saturation = hsv.s;
      const lightness = hsv.v;

      self.controlPositions.c1x = saturation * offsetWidth;
      self.controlPositions.c1y = (1 - lightness) * offsetHeight;
      self.controlPositions.c2y = hue * offsetHeight;
      self.controlPositions.c3y = (1 - alpha) * offsetHeight;
    }

    /** Update the visual appearance label and control knob labels. */
    updateAppearance() {
      const self = this;
      const {
        componentLabels, color, parent,
        hsv, hex, format, controlKnobs,
      } = self;
      const {
        appearanceLabel, hexLabel, valueLabel,
      } = componentLabels;
      let { r, g, b } = color.toRgb();
      const [knob1, knob2, knob3] = controlKnobs;
      const hue = roundPart(hsv.h * 360);
      const alpha = color.a;
      const saturation = roundPart(hsv.s * 100);
      const lightness = roundPart(hsv.v * 100);
      const colorName = self.appearance;

      let colorLabel = `${hexLabel} ${hex.split('').join(' ')}`;

      if (format === 'hwb') {
        const { hwb } = self;
        const whiteness = roundPart(hwb.w * 100);
        const blackness = roundPart(hwb.b * 100);
        colorLabel = `HWB: ${hue}°, ${whiteness}%, ${blackness}%`;
        setAttribute(knob1, ariaValueText, `${whiteness}% & ${blackness}%`);
        setAttribute(knob1, ariaValueNow, `${whiteness}`);
        setAttribute(knob2, ariaDescription, `${valueLabel}: ${colorLabel}. ${appearanceLabel}: ${colorName}.`);
        setAttribute(knob2, ariaValueText, `${hue}%`);
        setAttribute(knob2, ariaValueNow, `${hue}`);
      } else {
        [r, g, b] = [r, g, b].map(roundPart);
        colorLabel = format === 'hsl' ? `HSL: ${hue}°, ${saturation}%, ${lightness}%` : colorLabel;
        colorLabel = format === 'rgb' ? `RGB: ${r}, ${g}, ${b}` : colorLabel;

        setAttribute(knob1, ariaValueText, `${lightness}% & ${saturation}%`);
        setAttribute(knob1, ariaValueNow, `${lightness}`);
        setAttribute(knob2, ariaDescription, `${valueLabel}: ${colorLabel}. ${appearanceLabel}: ${colorName}.`);
        setAttribute(knob2, ariaValueText, `${hue}°`);
        setAttribute(knob2, ariaValueNow, `${hue}`);
      }

      const alphaValue = roundPart(alpha * 100);
      setAttribute(knob3, ariaValueText, `${alphaValue}%`);
      setAttribute(knob3, ariaValueNow, `${alphaValue}`);

      // update the input backgroundColor
      const newColor = color.toString();
      setElementStyle(self.input, { backgroundColor: newColor });

      // toggle dark/light classes will also style the placeholder
      // dark sets color white, light sets color black
      // isDark ? '#000' : '#fff'
      if (!self.isDark) {
        if (hasClass(parent, 'txt-dark')) removeClass(parent, 'txt-dark');
        if (!hasClass(parent, 'txt-light')) addClass(parent, 'txt-light');
      } else {
        if (hasClass(parent, 'txt-light')) removeClass(parent, 'txt-light');
        if (!hasClass(parent, 'txt-dark')) addClass(parent, 'txt-dark');
      }
    }

    /** Updates the control knobs actual positions. */
    updateControls() {
      const { controlKnobs, controlPositions } = this;
      let {
        c1x, c1y, c2y, c3y,
      } = controlPositions;
      const [control1, control2, control3] = controlKnobs;
      // round control positions
      [c1x, c1y, c2y, c3y] = [c1x, c1y, c2y, c3y].map(roundPart);

      setElementStyle(control1, { transform: `translate3d(${c1x - 4}px,${c1y - 4}px,0)` });
      setElementStyle(control2, { transform: `translate3d(0,${c2y - 4}px,0)` });
      setElementStyle(control3, { transform: `translate3d(0,${c3y - 4}px,0)` });
    }

    /**
     * Updates all color form inputs.
     * @param {boolean=} isPrevented when `true`, the component original event is prevented
     */
    updateInputs(isPrevented) {
      const self = this;
      const {
        value: oldColor, format, inputs, color, hsl,
      } = self;
      const [i1, i2, i3, i4] = inputs;
      const alpha = roundPart(color.a * 100);
      const hue = roundPart(hsl.h * 360);
      let newColor;

      /* istanbul ignore else */
      if (format === 'hex') {
        newColor = self.color.toHexString(true);
        i1.value = self.hex;
      } else if (format === 'hsl') {
        const lightness = roundPart(hsl.l * 100);
        const saturation = roundPart(hsl.s * 100);
        newColor = self.color.toHslString();
        i1.value = `${hue}`;
        i2.value = `${saturation}`;
        i3.value = `${lightness}`;
        i4.value = `${alpha}`;
      } else if (format === 'hwb') {
        const { w, b } = self.hwb;
        const whiteness = roundPart(w * 100);
        const blackness = roundPart(b * 100);

        newColor = self.color.toHwbString();
        i1.value = `${hue}`;
        i2.value = `${whiteness}`;
        i3.value = `${blackness}`;
        i4.value = `${alpha}`;
      } else if (format === 'rgb') {
        let { r, g, b } = self.rgb;
        [r, g, b] = [r, g, b].map(roundPart);

        newColor = self.color.toRgbString();
        i1.value = `${r}`;
        i2.value = `${g}`;
        i3.value = `${b}`;
        i4.value = `${alpha}`;
      }

      // update the color value
      self.value = `${newColor}`;

      // don't trigger the custom event unless it's really changed
      if (!isPrevented && newColor !== oldColor) {
        firePickerChange(self);
      }
    }

    /**
     * Toggle the `ColorPicker` dropdown visibility.
     * @param {Event=} e
     * @this {ColorPicker}
     */
    togglePicker(e) {
      if (e) e.preventDefault();
      const self = this;
      const { colorPicker } = self;

      if (self.isOpen && hasClass(colorPicker, 'show')) {
        self.hide(true);
      } else {
        showDropdown(self, colorPicker);
      }
    }

    /** Shows the `ColorPicker` dropdown. */
    showPicker() {
      const self = this;
      const { colorPicker } = self;

      if (!['top', 'bottom'].some((c) => hasClass(colorPicker, c))) {
        showDropdown(self, colorPicker);
      }
    }

    /**
     * Toggles the visibility of the `ColorPicker` presets menu.
     * @param {Event=} e
     * @this {ColorPicker}
     */
    toggleMenu(e) {
      if (e) e.preventDefault();
      const self = this;
      const { colorMenu } = self;

      if (self.isOpen && hasClass(colorMenu, 'show')) {
        self.hide(true);
      } else {
        showDropdown(self, colorMenu);
      }
    }

    /**
     * Hides the currently open `ColorPicker` dropdown.
     * @param {boolean=} focusPrevented
     */
    hide(focusPrevented) {
      const self = this;
      if (self.isOpen) {
        const {
          pickerToggle, menuToggle, colorPicker, colorMenu, parent, input,
        } = self;
        const openPicker = hasClass(colorPicker, 'show');
        const openDropdown = openPicker ? colorPicker : colorMenu;
        const relatedBtn = openPicker ? pickerToggle : menuToggle;
        const animationDuration = openDropdown && getElementTransitionDuration(openDropdown);

        self.value = self.color.toString(true);

        /* istanbul ignore else */
        if (openDropdown) {
          removeClass(openDropdown, 'show');
          setAttribute(relatedBtn, ariaExpanded, 'false');
          setTimeout(() => {
            removePosition(openDropdown);
            /* istanbul ignore else */
            if (!querySelector('.show', parent)) {
              removeClass(parent, 'open');
              toggleEventsOnShown(self);
              self.isOpen = false;
            }
          }, animationDuration);
        }

        if (!focusPrevented) {
          focus(pickerToggle);
        }
        setAttribute(input, tabIndex, '-1');
        if (relatedBtn === menuToggle) {
          setAttribute(menuToggle, tabIndex, '-1');
        }
      }
    }

    /** Removes `ColorPicker` from target `<input>`. */
    dispose() {
      const self = this;
      const { input, parent } = self;
      self.hide(true);
      toggleEvents(self);
      [...parent.children].forEach((el) => {
        if (el !== input) el.remove();
      });

      removeAttribute(input, tabIndex);
      setElementStyle(input, { backgroundColor: '' });

      ['txt-light', 'txt-dark'].forEach((c) => removeClass(parent, c));
      Data.remove(input, colorPickerString);
    }
  }

  ObjectAssign(ColorPicker, {
    Color,
    ColorPalette,
    Version,
    getInstance: getColorPickerInstance,
    init: initColorPicker,
    selector: colorPickerSelector,
    // utils important for render
    roundPart,
    setElementStyle,
    setAttribute,
    getBoundingClientRect,
  });

  /**
   * A single import is required to add the `CP` namespace to `src` sources.
   * @typedef {import("../../types/index")}
   */

  return ColorPicker;

}));
