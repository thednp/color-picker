import { addListener, removeListener } from '@thednp/event-listener/src/event-listener';

import ariaDescription from 'shorter-js/src/strings/ariaDescription';
import ariaSelected from 'shorter-js/src/strings/ariaSelected';
import ariaExpanded from 'shorter-js/src/strings/ariaExpanded';
import ariaValueText from 'shorter-js/src/strings/ariaValueText';
import ariaValueNow from 'shorter-js/src/strings/ariaValueNow';
import keyArrowDown from 'shorter-js/src/strings/keyArrowDown';
import keyArrowUp from 'shorter-js/src/strings/keyArrowUp';
import keyArrowLeft from 'shorter-js/src/strings/keyArrowLeft';
import keyArrowRight from 'shorter-js/src/strings/keyArrowRight';
import keyEnter from 'shorter-js/src/strings/keyEnter';
import keySpace from 'shorter-js/src/strings/keySpace';
import keyEscape from 'shorter-js/src/strings/keyEscape';
import focusinEvent from 'shorter-js/src/strings/focusinEvent';
import mouseclickEvent from 'shorter-js/src/strings/mouseclickEvent';
import keydownEvent from 'shorter-js/src/strings/keydownEvent';
import changeEvent from 'shorter-js/src/strings/changeEvent';

import touchmoveEvent from 'shorter-js/src/strings/touchmoveEvent';
import pointerdownEvent from 'shorter-js/src/strings/pointerdownEvent';
import pointermoveEvent from 'shorter-js/src/strings/pointermoveEvent';
import pointerupEvent from 'shorter-js/src/strings/pointerupEvent';

import scrollEvent from 'shorter-js/src/strings/scrollEvent';
import keyupEvent from 'shorter-js/src/strings/keyupEvent';
import resizeEvent from 'shorter-js/src/strings/resizeEvent';
import focusoutEvent from 'shorter-js/src/strings/focusoutEvent';

import getDocument from 'shorter-js/src/get/getDocument';
import getDocumentElement from 'shorter-js/src/get/getDocumentElement';
import getElementStyle from 'shorter-js/src/get/getElementStyle';
import getUID from 'shorter-js/src/get/getUID';
import getBoundingClientRect from 'shorter-js/src/get/getBoundingClientRect';
import getElementTransitionDuration from 'shorter-js/src/get/getElementTransitionDuration';
import querySelector from 'shorter-js/src/selectors/querySelector';
import closest from 'shorter-js/src/selectors/closest';
import getElementsByClassName from 'shorter-js/src/selectors/getElementsByClassName';
import dispatchEvent from 'shorter-js/src/misc/dispatchEvent';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';
import Data, { getInstance } from 'shorter-js/src/misc/data';
import setElementStyle from 'shorter-js/src/misc/setElementStyle';
import normalizeOptions from 'shorter-js/src/misc/normalizeOptions';
import reflow from 'shorter-js/src/misc/reflow';
import focus from 'shorter-js/src/misc/focus';
import hasClass from 'shorter-js/src/class/hasClass';
import addClass from 'shorter-js/src/class/addClass';
import removeClass from 'shorter-js/src/class/removeClass';
import setAttribute from 'shorter-js/src/attr/setAttribute';
import getAttribute from 'shorter-js/src/attr/getAttribute';
import removeAttribute from 'shorter-js/src/attr/removeAttribute';

// ColorPicker Util
// ================
import Color from './color';
import ColorPalette from './color-palette';
import colorPickerLabels from './util/colorPickerLabels';
import colorNames from './util/colorNames';
import nonColors from './util/nonColors';
import tabIndex from './util/tabindex';
import isValidJSON from './util/isValidJSON';
import roundPart from './util/roundPart';
import setMarkup from './util/setMarkup';
import Version from './util/version';

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
export default class ColorPicker {
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
      colorLabel = `HWB: ${hue}??, ${whiteness}%, ${blackness}%`;
      setAttribute(knob1, ariaValueText, `${whiteness}% & ${blackness}%`);
      setAttribute(knob1, ariaValueNow, `${whiteness}`);
      setAttribute(knob2, ariaDescription, `${valueLabel}: ${colorLabel}. ${appearanceLabel}: ${colorName}.`);
      setAttribute(knob2, ariaValueText, `${hue}%`);
      setAttribute(knob2, ariaValueNow, `${hue}`);
    } else {
      [r, g, b] = [r, g, b].map(roundPart);
      colorLabel = format === 'hsl' ? `HSL: ${hue}??, ${saturation}%, ${lightness}%` : colorLabel;
      colorLabel = format === 'rgb' ? `RGB: ${r}, ${g}, ${b}` : colorLabel;

      setAttribute(knob1, ariaValueText, `${lightness}% & ${saturation}%`);
      setAttribute(knob1, ariaValueNow, `${lightness}`);
      setAttribute(knob2, ariaDescription, `${valueLabel}: ${colorLabel}. ${appearanceLabel}: ${colorName}.`);
      setAttribute(knob2, ariaValueText, `${hue}??`);
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
