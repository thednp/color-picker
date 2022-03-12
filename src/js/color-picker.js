import { addListener, removeListener } from 'event-listener.js';

import ariaDescription from 'shorter-js/src/strings/ariaDescription';
import ariaLabel from 'shorter-js/src/strings/ariaLabel';
import ariaSelected from 'shorter-js/src/strings/ariaSelected';
import ariaExpanded from 'shorter-js/src/strings/ariaExpanded';
import ariaValueText from 'shorter-js/src/strings/ariaValueText';
import ariaValueNow from 'shorter-js/src/strings/ariaValueNow';
import ariaHasPopup from 'shorter-js/src/strings/ariaHasPopup';
import ariaHidden from 'shorter-js/src/strings/ariaHidden';
import ariaLabelledBy from 'shorter-js/src/strings/ariaLabelledBy';
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
import getDocument from 'shorter-js/src/get/getDocument';
import getWindow from 'shorter-js/src/get/getWindow';
import changeEvent from 'shorter-js/src/strings/changeEvent';
import touchstartEvent from 'shorter-js/src/strings/touchstartEvent';
import touchmoveEvent from 'shorter-js/src/strings/touchmoveEvent';
import touchendEvent from 'shorter-js/src/strings/touchendEvent';
import mousedownEvent from 'shorter-js/src/strings/mousedownEvent';
import mousemoveEvent from 'shorter-js/src/strings/mousemoveEvent';
import mouseupEvent from 'shorter-js/src/strings/mouseupEvent';
import scrollEvent from 'shorter-js/src/strings/scrollEvent';
import keyupEvent from 'shorter-js/src/strings/keyupEvent';
import focusoutEvent from 'shorter-js/src/strings/focusoutEvent';

import isMobile from 'shorter-js/src/boolean/isMobile';
import getUID from 'shorter-js/src/get/getUID';
import getBoundingClientRect from 'shorter-js/src/get/getBoundingClientRect';
import getElementTransitionDuration from 'shorter-js/src/get/getElementTransitionDuration';
import querySelector from 'shorter-js/src/selectors/querySelector';
import querySelectorAll from 'shorter-js/src/selectors/querySelectorAll';
import closest from 'shorter-js/src/selectors/closest';
import getElementsByClassName from 'shorter-js/src/selectors/getElementsByClassName';
import createElement from 'shorter-js/src/misc/createElement';
import createElementNS from 'shorter-js/src/misc/createElementNS';
import dispatchEvent from 'shorter-js/src/misc/dispatchEvent';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';
import Data, { getInstance } from 'shorter-js/src/misc/data';
import setElementStyle from 'shorter-js/src/misc/setElementStyle';
import reflow from 'shorter-js/src/misc/reflow';
import hasClass from 'shorter-js/src/class/hasClass';
import addClass from 'shorter-js/src/class/addClass';
import removeClass from 'shorter-js/src/class/removeClass';
import setAttribute from 'shorter-js/src/attr/setAttribute';
import getAttribute from 'shorter-js/src/attr/getAttribute';
import removeAttribute from 'shorter-js/src/attr/removeAttribute';

// ColorPicker Util
// ================
import colorPickerLabels from './util/colorPickerLabels';
import colorNames from './util/colorNames';
import nonColors from './util/nonColors';
import getColorForm from './util/getColorForm';
import getColorControls from './util/getColorControls';
import vHidden from './util/vHidden';
import isValidJSON from './util/isValidJSON';
import Color from './color';
import Version from './version';

// ColorPicker GC
// ==============
const colorPickerString = 'color-picker';
const colorPickerSelector = `[data-function="${colorPickerString}"]`;

// ColorPicker Static Methods
// ==========================

/** @type {CP.GetInstance<ColorPicker>} */
const getColorPickerInstance = (element) => getInstance(element, colorPickerString);

/** @type {CP.InitCallback<ColorPicker>} */
const initColorPicker = (element) => new ColorPicker(element);

// ColorPicker Private Methods
// ===========================

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
    toggleLabel, menuLabel, pickerLabel, formatLabel, hexLabel,
  } = componentLabels;

  // update color
  const color = nonColors.includes(colorValue) ? '#fff' : colorValue;
  self.color = new Color(color, format);

  // set initial controls dimensions
  // make the controls smaller on mobile
  const dropClass = isMobile ? ' mobile' : '';
  const formatString = format === 'hex' ? hexLabel : format.toUpperCase();

  const pickerBtn = createElement({
    id: `picker-btn-${id}`,
    tagName: 'button',
    className: 'picker-toggle button-appearance',
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
    className: `color-dropdown picker${dropClass}`,
  });
  setAttribute(pickerDropdown, ariaLabelledBy, `picker-btn-${id}`);
  setAttribute(pickerDropdown, 'role', 'group');

  const colorControls = getColorControls(self);

  const colorForm = getColorForm(self);
  pickerDropdown.append(colorControls, colorForm);
  input.before(pickerBtn);
  parent.append(pickerDropdown);

  // set colour key menu template
  if (keywords) {
    const colorKeys = keywords;
    const presetsDropdown = createElement({
      tagName: 'div',
      className: `color-dropdown menu${dropClass}`,
    });
    const presetsMenu = createElement({
      tagName: 'ul',
      className: 'color-menu',
    });
    setAttribute(presetsMenu, 'role', 'listbox');
    setAttribute(presetsMenu, ariaLabel, `${menuLabel}`);
    presetsDropdown.append(presetsMenu);

    colorKeys.forEach((x) => {
      const xKey = x.trim();
      const xRealColor = new Color(xKey, format).toString();
      const isActive = xRealColor === getAttribute(input, 'value');
      const active = isActive ? ' active' : '';

      const keyOption = createElement({
        tagName: 'li',
        className: `color-option${active}`,
        innerText: `${x}`,
      });
      setAttribute(keyOption, 'tabindex', '0');
      setAttribute(keyOption, 'data-value', `${xKey}`);
      setAttribute(keyOption, 'role', 'option');
      setAttribute(keyOption, ariaSelected, isActive ? 'true' : 'false');
      presetsMenu.append(keyOption);
    });
    const presetsBtn = createElement({
      tagName: 'button',
      className: 'menu-toggle button-appearance',
    });
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
  if (keywords && nonColors.includes(colorValue)) {
    self.value = colorValue;
  }
  setAttribute(input, 'tabindex', '-1');
}

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

  fn(input, keydownEvent, self.keyHandler);

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
  const win = getWindow(input);
  const pointerEvents = `on${touchstartEvent}` in doc
    ? { down: touchstartEvent, move: touchmoveEvent, up: touchendEvent }
    : { down: mousedownEvent, move: mousemoveEvent, up: mouseupEvent };

  fn(self.controls, pointerEvents.down, self.pointerDown);
  self.controlKnobs.forEach((x) => fn(x, keydownEvent, self.handleKnobs));

  // @ts-ignore -- this is `Window`
  fn(win, scrollEvent, self.handleScroll);

  [input, ...self.inputs].forEach((x) => fn(x, changeEvent, self.changeHandler));

  if (colorMenu) {
    fn(colorMenu, mouseclickEvent, self.menuClickHandler);
    fn(colorMenu, keydownEvent, self.menuKeyHandler);
  }

  fn(doc, pointerEvents.move, self.pointerMove);
  fn(doc, pointerEvents.up, self.pointerUp);
  fn(parent, focusoutEvent, self.handleFocusOut);
  // @ts-ignore -- this is `Window`
  fn(win, keyupEvent, self.handleDismiss);
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
  removeClass(openDropdown, 'show');
  removePosition(openDropdown);
  addClass(dropdown, 'bottom');
  reflow(dropdown);
  addClass(dropdown, 'show');
  self.show();
  setAttribute(nextBtn, ariaExpanded, 'true');
  setAttribute(activeBtn, ariaExpanded, 'false');
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
   */
  constructor(target) {
    const self = this;
    /** @type {HTMLInputElement} */
    // @ts-ignore
    self.input = querySelector(target);
    // invalidate
    if (!self.input) throw new TypeError(`ColorPicker target ${target} cannot be found.`);
    const { input } = self;

    // prevent double initialization, this is important
    // to preventing the creation of duplicated content
    const previousInstance = getColorPickerInstance(input);
    if (previousInstance) return previousInstance;

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
    self.color = new Color('white', self.format);

    const { componentLabels, colorLabels, keywords } = input.dataset;
    const translatedColorLabels = colorLabels && colorLabels.split(',').length === 17
      ? colorLabels.split(',') : colorNames;

    // expose colour labels to all methods
    colorNames.forEach((c, i) => {
      self.colorLabels[c] = translatedColorLabels[i].trim();
    });

    // update and expose component labels
    const tempLabels = ObjectAssign({}, colorPickerLabels);
    const jsonLabels = componentLabels && isValidJSON(componentLabels)
      ? JSON.parse(componentLabels) : {};

    /** @type {Record<string, string>} */
    self.componentLabels = ObjectAssign(tempLabels, jsonLabels);

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
    const [colorPicker, colorMenu] = getElementsByClassName('color-dropdown', parent);
    // set main elements
    /** @type {HTMLElement} */
    // @ts-ignore
    self.pickerToggle = querySelector('.picker-toggle', parent);
    /** @type {HTMLElement} */
    // @ts-ignore
    self.menuToggle = querySelector('.menu-toggle', parent);
    /** @type {HTMLElement} */
    // @ts-ignore
    self.colorPicker = colorPicker;
    /** @type {HTMLElement} */
    // @ts-ignore
    self.colorMenu = colorMenu;
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

    // update colour picker controls, inputs and visuals
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

  /** Returns the current colour value */
  get value() { return this.input.value; }

  /**
   * Sets a new colour value.
   * @param {string} v new colour value
   */
  set value(v) { this.input.value = v; }

  /**
   * Returns the colour format.
   * @returns {CP.ColorFormats}
   */
  get format() {
    return this.input.dataset.format || 'rgb';
  }

  /** Check if the colour presets include any non-colour. */
  get includeNonColor() {
    return this.keywords instanceof Array
      && this.keywords.some((x) => nonColors.includes(x));
  }

  /** Check if the parent of the target is a `ColorPickerElement` instance. */
  get isCE() { return this.parent.tagName === colorPickerString; }

  /** Returns hexadecimal value of the current colour. */
  get hex() { return this.color.toHex(); }

  /** Returns the current colour value in {h,s,v,a} object format. */
  get hsv() { return this.color.toHsv(); }

  /** Returns the current colour value in {h,s,l,a} object format. */
  get hsl() { return this.color.toHsl(); }

  /** Returns the current colour value in {r,g,b,a} object format. */
  get rgb() { return this.color.toRgb(); }

  /** Returns the current colour brightness. */
  get brightness() { return this.color.brightness; }

  /** Returns the current colour luminance. */
  get luminance() { return this.color.luminance; }

  /** Checks if the current colour requires a light text colour. */
  get isDark() {
    const { rgb, brightness } = this;
    return brightness < 120 && rgb.a > 0.33;
  }

  /** Checks if the current input value is a valid colour. */
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
    self.color = new Color(newColor, format);
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
      self.changeControl1(offsetX, offsetY);
    } else if (target === v2 || target === c2) {
      self.dragElement = visual;
      self.changeControl2(offsetY);
    } else if (format !== 'hex' && (target === v3 || target === c3)) {
      self.dragElement = visual;
      self.changeAlpha(offsetY);
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
      self.changeControl1(offsetX, offsetY);
    }

    if (dragElement === v2) {
      self.changeControl2(offsetY);
    }

    if (dragElement === v3 && format !== 'hex') {
      self.changeAlpha(offsetY);
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
        self.changeControl1(offsetX, offsetY);
      } else if (target === c2) {
        self.controlPositions.c2y += [keyArrowDown, keyArrowRight].includes(code) ? +1 : -1;
        offsetY = self.controlPositions.c2y;
        self.changeControl2(offsetY);
      } else if (target === c3) {
        self.controlPositions.c3y += [keyArrowDown, keyArrowRight].includes(code) ? +1 : -1;
        offsetY = self.controlPositions.c3y;
        self.changeAlpha(offsetY);
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

      self.color = new Color(colorSource, format);
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
   * @param {number} X the X component of the offset
   * @param {number} Y the Y component of the offset
   */
  changeControl1(X, Y) {
    const self = this;
    let [offsetX, offsetY] = [0, 0];
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
    self.color = new Color(`${tempFormat}(${hue},${saturation}%,${lightness}%,${alpha})`, format);
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
   * @param {number} Y the Y offset
   */
  changeControl2(Y) {
    const self = this;
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
    self.color = new Color(`${colorFormat}(${hue},${saturation}%,${lightness}%,${alpha})`, format);
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
   * @param {number} Y
   */
  changeAlpha(Y) {
    const self = this;
    const { height3 } = self;
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
    // self.updateVisuals();
  }

  /** Update opened dropdown position on scroll. */
  updateDropdownPosition() {
    const self = this;
    const { input, colorPicker, colorMenu } = self;
    const elRect = getBoundingClientRect(input);
    const { offsetHeight: elHeight } = input;
    const windowHeight = document.documentElement.clientHeight;
    const isPicker = hasClass(colorPicker, 'show');
    const dropdown = isPicker ? colorPicker : colorMenu;
    const { offsetHeight: dropHeight } = dropdown;
    const distanceBottom = windowHeight - elRect.bottom;
    const distanceTop = elRect.top;
    const bottomExceed = elRect.top + dropHeight + elHeight > windowHeight; // show
    const topExceed = elRect.top - dropHeight < 0; // show-top

    if ((hasClass(dropdown, 'bottom') || !topExceed) && distanceBottom < distanceTop && bottomExceed) {
      removeClass(dropdown, 'bottom');
      addClass(dropdown, 'top');
    } else {
      removeClass(dropdown, 'top');
      addClass(dropdown, 'bottom');
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
      componentLabels, colorLabels, color,
      hsl, hsv, hex, format, controlKnobs,
    } = self;
    const {
      appearanceLabel, hexLabel, valueLabel,
    } = componentLabels;
    const { r, g, b } = color.toRgb();
    const [knob1, knob2, knob3] = controlKnobs;
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

    let colorLabel = `${hexLabel} ${hex.split('').join(' ')}`;

    if (format === 'hsl') {
      colorLabel = `HSL: ${hue}, ${saturation}%, ${lightness}%`;
      setAttribute(knob1, ariaDescription, `${valueLabel}: ${colorLabel}. ${appearanceLabel}: ${colorName}.`);
      setAttribute(knob1, ariaValueText, `${hue}° & ${lightness}%`);
      setAttribute(knob1, ariaValueNow, `${hue}`);
      setAttribute(knob2, ariaValueText, `${saturation}%`);
      setAttribute(knob2, ariaValueNow, `${saturation}`);
    } else {
      setAttribute(knob1, ariaValueText, `${lightness}% & ${saturation}%`);
      setAttribute(knob1, ariaValueNow, `${lightness}`);
      setAttribute(knob2, ariaValueText, `${hue}°`);
      setAttribute(knob2, ariaValueNow, `${hue}`);
      colorLabel = format === 'rgb' ? `RGB: ${r}, ${g}, ${b}` : colorLabel;
      setAttribute(knob2, ariaDescription, `${valueLabel}: ${colorLabel}. ${appearanceLabel}: ${colorName}.`);
    }

    if (format !== 'hex') {
      const alphaValue = Math.round(alpha * 100);
      setAttribute(knob3, ariaValueText, `${alphaValue}%`);
      setAttribute(knob3, ariaValueNow, `${alphaValue}`);
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
    showDropdown(self, self.colorPicker);
    removeAttribute(self.input, 'tabindex');
  }

  /** Toggles the visibility of the `ColorPicker` presets menu. */
  toggleMenu() {
    const self = this;
    const { colorMenu } = self;

    if (self.isOpen && hasClass(colorMenu, 'show')) {
      self.hide(true);
    } else {
      showDropdown(self, colorMenu);
    }
  }

  /** Show the dropdown. */
  show() {
    const self = this;
    if (!self.isOpen) {
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
      const {
        pickerToggle, menuToggle, colorPicker, colorMenu, parent, input,
      } = self;
      const openPicker = hasClass(colorPicker, 'show');
      const openDropdown = openPicker ? colorPicker : colorMenu;
      const relatedBtn = openPicker ? pickerToggle : menuToggle;
      const animationDuration = getElementTransitionDuration(openDropdown);

      if (openDropdown) {
        removeClass(openDropdown, 'show');
        setAttribute(relatedBtn, ariaExpanded, 'false');
        setTimeout(() => {
          removePosition(openDropdown);
          if (!querySelector('.show', parent)) {
            removeClass(parent, 'open');
            toggleEventsOnShown(self);
            self.isOpen = false;
          }
        }, animationDuration);
      }
      if (openPicker) {
        setAttribute(input, 'tabindex', '-1');
      }

      if (!self.isValid) {
        self.value = self.color.toString();
      }

      if (!focusPrevented) {
        pickerToggle.focus();
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
    setElementStyle(input, { backgroundColor: '' });
    ['light', 'dark'].forEach((c) => removeClass(parent, c));
    Data.remove(input, colorPickerString);
  }
}

ObjectAssign(ColorPicker, {
  Color,
  Version,
  getInstance: getColorPickerInstance,
  init: initColorPicker,
  selector: colorPickerSelector,
});
