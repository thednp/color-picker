import {
  ariaDescription,
  ariaSelected,
  ariaValueNow,
  ariaValueText,
  ariaExpanded,
  keyArrowDown,
  keyArrowUp,
  keyArrowLeft,
  keyArrowRight,
  keyEnter,
  keySpace,
  keyEscape,
  focusinEvent,
  mouseclickEvent,
  keydownEvent,
  changeEvent,
  touchmoveEvent,
  pointerdownEvent,
  pointermoveEvent,
  pointerupEvent,
  tabindex,
  focusoutEvent,
  resizeEvent,
  keyupEvent,
  scrollEvent,
  dispatchEvent,
  getElementsByClassName,
  closest,
  querySelector,
  getElementTransitionDuration,
  getBoundingClientRect,
  getUID,
  getElementStyle,
  getDocumentElement,
  getDocument,
  ObjectAssign,
  ObjectFromEntries,
  Data,
  getInstance,
  setElementStyle,
  normalizeOptions,
  reflow,
  focus,
  hasClass,
  addClass,
  removeClass,
  setAttribute,
  getAttribute,
  removeAttribute,
  isArray,
  isString,
  getWindow,
  on,
  off,
} from '@thednp/shorty';

// ColorPicker Util
// ================
import Color from '@thednp/color';
import type { RGBA, HWBA, HSLA, HSVA } from '@thednp/color';

import ColorPalette from './colorPalette';
import colorPickerLabels from './util/colorPickerLabels';
import colorNames from './util/colorNames';
import isValidJSON from './util/isValidJSON';
import setMarkup from './util/setMarkup';

import ColorPickerOptions from './interface/colorPickerOptions';
import ColorPickerLabels from './interface/colorPickerLabels';
import type ColorNames from './interface/ColorNames';
import { version } from '../../package.json';

// ColorPicker GC
// ==============
const colorPickerString = 'color-picker';
const colorPickerSelector = `[data-function="${colorPickerString}"]`;
const colorPickerParentSelector = `.${colorPickerString}`;
const colorPickerDefaults: ColorPickerOptions = {
  componentLabels: colorPickerLabels,
  colorLabels: colorNames,
  format: 'rgb',
  colorPresets: false,
  colorKeywords: false,
};
const { roundPart, nonColors } = Color;

// ColorPicker Static Methods
// ==========================
const getColorPickerInstance = (element: HTMLInputElement) => getInstance<ColorPicker>(element, colorPickerString);
const initColorPicker = (element: HTMLInputElement) => new ColorPicker(element);

// ColorPicker Private Methods
// ===========================

/**
 * Add / remove `ColorPicker` main event listeners.
 */
const toggleEvents = (self: ColorPicker, action?: boolean) => {
  const fn = action ? on : off;
  const { input, pickerToggle, menuToggle } = self;

  fn(input, focusinEvent, self.showPicker);
  fn(pickerToggle, mouseclickEvent, self.togglePicker);

  if (menuToggle) {
    fn(menuToggle, mouseclickEvent, self.toggleMenu);
  }
};

/**
 * Add / remove `ColorPicker` event listeners active only when open.
 */
const toggleEventsOnShown = (self: ColorPicker, action?: boolean) => {
  const fn = action ? on : off;
  const { input, colorMenu, parent } = self;
  const doc = getDocument(input);
  const win = getWindow(doc);

  fn(self.controls, pointerdownEvent, self.pointerDown as EventListener);
  self.controlKnobs.forEach(x => fn(x, keydownEvent, self.handleKnobs as EventListener));

  fn(win, scrollEvent, self.handleScroll);
  fn(win, resizeEvent, self.update);

  [input, ...self.inputs].forEach(x => fn(x, changeEvent, self.changeHandler));

  if (colorMenu) {
    fn(colorMenu, mouseclickEvent, self.menuClickHandler);
    fn(colorMenu, keydownEvent, self.menuKeyHandler as EventListener);
  }

  fn(doc, pointermoveEvent, self.pointerMove as EventListener);
  fn(doc, pointerupEvent, self.pointerUp as EventListener);
  fn(parent, focusoutEvent, self.handleFocusOut as EventListener);
  fn(doc, keyupEvent, self.handleDismiss as EventListener);
};

/**
 * Triggers the `ColorPicker` original event.
 */
const firePickerChange = (self: ColorPicker) => {
  dispatchEvent(self.input, new CustomEvent('colorpicker.change'));
};

/**
 * Hides a visible dropdown.
 */
const removePosition = (element: HTMLElement) => {
  /* istanbul ignore else */
  if (element) {
    ['bottom', 'top'].forEach(x => removeClass(element, x));
  }
};

/**
 * Shows a `ColorPicker` dropdown and close the curent open dropdown.
 */
const showDropdown = (self: ColorPicker, dropdown: HTMLElement) => {
  const { colorPicker, colorMenu, menuToggle, pickerToggle, parent } = self;
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
    setAttribute(self.input, tabindex, '0');
    if (menuToggle) {
      setAttribute(menuToggle, tabindex, '0');
    }
  }

  setAttribute(nextBtn, ariaExpanded, 'true');
  if (activeBtn) {
    setAttribute(activeBtn, ariaExpanded, 'false');
  }
};

/**
 * Color Picker Web Component
 *
 * @see http://thednp.github.io/color-picker
 */
export default class ColorPicker {
  // bring utils to staic
  public static Color = Color;
  public static ColorPalette = ColorPalette;
  public static getInstance = getColorPickerInstance;
  public static init = initColorPicker;
  public static selector = colorPickerSelector;
  // utils important for render
  public static roundPart = roundPart;
  public static setElementStyle = setElementStyle;
  public static setAttribute = setAttribute;
  public static getBoundingClientRect = getBoundingClientRect;
  public static version = version;
  public static colorNames = colorNames;
  public static colorPickerLabels = colorPickerLabels;

  id: number;
  input: HTMLInputElement;
  color: Color;
  format = 'rgb';
  parent: HTMLElement;
  dragElement: HTMLElement | undefined;
  isOpen = false;
  controlPositions: {
    c1x: number;
    c1y: number;
    c2y: number;
    c3y: number;
  };
  colorLabels: ColorNames = ObjectFromEntries(colorNames.map(c => [c, c])) as ColorNames;
  colorKeywords: string[] | false;
  colorPresets: ColorPalette | string[] | false;
  componentLabels: ColorPickerLabels;
  pickerToggle: HTMLElement;
  menuToggle: HTMLElement;
  colorPicker: HTMLElement;
  colorMenu: HTMLElement;
  controls: HTMLElement;
  inputs: HTMLInputElement[];
  controlKnobs: HTMLElement[];
  visuals: HTMLElement[];

  /**
   * Returns a new `ColorPicker` instance. The target of this constructor
   * must be an `HTMLInputElement`.
   *
   * @param target the target `<input>` element
   * @param config instance options
   */
  constructor(target: (HTMLElement & HTMLInputElement) | string, config?: Partial<ColorPickerOptions>) {
    const input = querySelector(target) as HTMLInputElement;

    // invalidate
    if (typeof target === 'undefined') throw new TypeError(`ColorPicker target not specified.`);
    if (isString(target) && !input) throw new TypeError(`ColorPicker target "${target}" cannot be found.`);
    this.input = input;

    const parent = closest(input, colorPickerParentSelector);
    if (!parent) throw new TypeError('ColorPicker requires a specific markup to work.');

    this.parent = parent;
    this.id = getUID(input, colorPickerString);
    this.dragElement = undefined;
    this.isOpen = false;
    this.controlPositions = {
      c1x: 0,
      c1y: 0,
      c2y: 0,
      c3y: 0,
    };
    // this.colorLabels = {};
    this.colorKeywords = false;
    this.colorPresets = false;

    // process options
    const { format, componentLabels, colorLabels, colorKeywords, colorPresets } = normalizeOptions(
      input,
      colorPickerDefaults,
      config || {},
    );

    let translatedColorLabels = colorNames;
    /* istanbul ignore else */
    if (isArray(colorLabels) && colorLabels.length === 17) {
      translatedColorLabels = colorLabels;
    } else if (isString(colorLabels) && colorLabels.split(',').length === 17) {
      translatedColorLabels = colorLabels.split(',');
    }

    // expose colour labels to all methods
    ObjectAssign(this.colorLabels, ObjectFromEntries(translatedColorLabels.map((c, i) => [colorNames[i], c])));

    // update and expose component labels
    const tempComponentLabels =
      isString(componentLabels) && isValidJSON(componentLabels)
        ? (JSON.parse(componentLabels) as ColorPickerLabels)
        : componentLabels;
    this.componentLabels = ObjectAssign({ ...colorPickerLabels }, tempComponentLabels);
    this.color = new Color(input.value || '#fff', format);
    this.format = format;

    // set colour defaults
    if (isArray(colorKeywords) && colorKeywords.length) {
      this.colorKeywords = colorKeywords;
    } else if (isString(colorKeywords) && colorKeywords.length) {
      this.colorKeywords = colorKeywords.split(',').map(x => x.trim());
    }

    // set colour presets
    if (isArray(colorPresets) && colorPresets.length) {
      this.colorPresets = colorPresets;
    } else if (colorPresets && isValidJSON(colorPresets)) {
      const { hue, hueSteps, lightSteps, saturation } = JSON.parse(colorPresets) as {
        hue: number;
        hueSteps: number;
        lightSteps: number;
        saturation: number;
      };
      this.colorPresets = new ColorPalette(hue, hueSteps, lightSteps, saturation);
    } else if (isString(colorPresets)) {
      this.colorPresets = colorPresets.split(',').map((x: string) => x.trim());
    }

    // generate markup
    setMarkup(this);

    const [colorPicker, colorMenu] = getElementsByClassName('color-dropdown', parent);
    // set main elements
    this.pickerToggle = querySelector('.picker-toggle', parent) as HTMLElement;
    this.menuToggle = querySelector('.menu-toggle', parent) as HTMLElement;
    this.colorPicker = colorPicker;
    this.colorMenu = colorMenu;
    this.inputs = [...getElementsByClassName('color-input', parent)] as HTMLInputElement[];
    const [controls] = getElementsByClassName('color-controls', parent);
    this.controls = controls;
    this.controlKnobs = [...getElementsByClassName('knob', controls)];
    this.visuals = [...getElementsByClassName('visual-control', controls)];

    // update colour picker controls, inputs and visuals
    this.update();
    // console.log(this)

    // add main events listeners
    toggleEvents(this, true);

    // set component data
    Data.set(input, colorPickerString, this);
  }

  /** Returns the current colour value */
  get value(): string {
    return this.input.value;
  }

  /**
   * Sets a new colour value.
   *
   * @param {string} v new colour value
   */
  set value(v: string) {
    this.input.value = v;
  }

  /** Check if the colour presets include any non-colour. */
  get hasNonColor(): boolean {
    return this.colorKeywords instanceof Array && this.colorKeywords.some(x => nonColors.includes(x));
  }

  /** Returns hexadecimal value of the current colour. */
  get hex(): string {
    return this.color.toHex(true);
  }

  /** Returns the current colour value in {h,s,v,a} object format. */
  get hsv(): HSVA {
    return this.color.toHsv();
  }

  /** Returns the current colour value in {h,s,l,a} object format. */
  get hsl(): HSLA {
    return this.color.toHsl();
  }

  /** Returns the current colour value in {h,w,b,a} object format. */
  get hwb(): HWBA {
    return this.color.toHwb();
  }

  /** Returns the current colour value in {r,g,b,a} object format. */
  get rgb(): RGBA {
    return this.color.toRgb();
  }

  /** Returns the current colour brightness. */
  get brightness(): number {
    return this.color.brightness;
  }

  /** Returns the current colour luminance. */
  get luminance(): number {
    return this.color.luminance;
  }

  /** Checks if the current colour requires a light text colour. */
  get isDark(): boolean {
    const { color, brightness } = this;
    return brightness < 120 && color.a > 0.33;
  }

  /** Checks if the current input value is a valid colour. */
  get isValid(): boolean {
    const inputValue = this.input.value;
    return inputValue !== '' && new Color(inputValue).isValid;
  }

  /** Returns the colour appearance, usually the closest colour name for the current value. */
  get appearance(): string {
    const { colorLabels, hsl, hsv, format } = this;

    const hue = roundPart(hsl.h * 360);
    const saturationSource = format === 'hsl' ? hsl.s : hsv.s;
    const saturation = roundPart(saturationSource * 100);
    const lightness = roundPart(hsl.l * 100);
    const hsvl = hsv.v * 100;

    let colorName = 'black';

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
  updateVisuals(): void {
    const { controlPositions, visuals } = this;
    const [v1, v2, v3] = visuals;
    const { offsetHeight } = v1;
    const hue = controlPositions.c2y / offsetHeight;
    const { r, g, b } = new Color({ h: hue, s: 1, l: 0.5 }).toRgb();
    const whiteGrad = 'linear-gradient(rgb(255,255,255) 0%, rgb(255,255,255) 100%)';
    const alpha = 1 - controlPositions.c3y / offsetHeight;
    const roundA = roundPart(alpha * 100) / 100;

    const fill = new Color({
      h: hue,
      s: 1,
      l: 0.5,
      a: alpha,
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
   *
   * @param e
   * @this {ColorPicker}
   */
  handleFocusOut = ({ relatedTarget }: FocusEvent & { relatedTarget: HTMLElement }): void => {
    if (relatedTarget && !this.parent.contains(relatedTarget)) {
      this.hide(true);
    }
  };

  /**
   * The `ColorPicker` *keyup* event listener when open.
   *
   * @param e
   * @this {ColorPicker}
   */
  handleDismiss = ({ code }: KeyboardEvent): void => {
    if (this.isOpen && code === keyEscape) {
      this.hide();
    }
  };

  /**
   * The `ColorPicker` *scroll* event listener when open.
   *
   * @param e
   */
  handleScroll = (e: Event) => {
    const { activeElement } = getDocument(this.input);

    this.updateDropdownPosition();

    /* istanbul ignore next */
    if (
      ([pointermoveEvent, touchmoveEvent].includes(e.type) && this.dragElement) ||
      (activeElement && this.controlKnobs.includes(activeElement as HTMLElement))
    ) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  /**
   * The `ColorPicker` keyboard event listener for menu navigation.
   *
   * @param e
   */
  menuKeyHandler = (e: KeyboardEvent & { target: HTMLElement }) => {
    const { target, code } = e;
    const { previousElementSibling, nextElementSibling, parentElement } = target;
    const isColorOptionsMenu = parentElement && hasClass(parentElement, 'color-options');
    const allSiblings = parentElement ? [...parentElement.children] : [];
    const columnsCount =
      isColorOptionsMenu && getElementStyle(parentElement, 'grid-template-columns').split(' ').length;
    const currentIndex = allSiblings.indexOf(target);
    const previousElement = currentIndex > -1 && columnsCount && allSiblings[currentIndex - columnsCount];
    const nextElement = currentIndex > -1 && columnsCount && allSiblings[currentIndex + columnsCount];

    if ([keyArrowDown, keyArrowUp, keySpace].includes(code)) {
      // prevent scroll when navigating the menu via arrow keys / Space
      e.preventDefault();
    }
    if (isColorOptionsMenu) {
      if (previousElement && code === keyArrowUp) {
        focus(previousElement as HTMLElement);
      } else if (nextElement && code === keyArrowDown) {
        focus(nextElement as HTMLElement);
      } else if (previousElementSibling && code === keyArrowLeft) {
        focus(previousElementSibling as HTMLElement);
      } else if (nextElementSibling && code === keyArrowRight) {
        focus(nextElementSibling as HTMLElement);
      }
    } else if (previousElementSibling && [keyArrowLeft, keyArrowUp].includes(code)) {
      focus(previousElementSibling as HTMLElement);
    } else if (nextElementSibling && [keyArrowRight, keyArrowDown].includes(code)) {
      focus(nextElementSibling as HTMLElement);
    }

    if ([keyEnter, keySpace].includes(code)) {
      this.menuClickHandler(e);
    }
  };

  /**
   * The `ColorPicker` click event listener for the colour menu presets / defaults.
   *
   * @param e
   * @this {ColorPicker}
   */
  menuClickHandler = (e: Event) => {
    const { target } = e;
    const { colorMenu } = this;
    const newOption = (getAttribute(target as HTMLElement, 'data-value') || '').trim();
    // invalidate for targets other than color options
    if (!newOption.length) return;
    const currentActive = querySelector('li.active', colorMenu);
    let newColor = newOption;
    newColor = nonColors.includes(newColor) ? 'white' : newColor;
    newColor = newColor === 'transparent' ? 'rgba(0,0,0,0)' : newColor;

    const { r, g, b, a } = new Color(newColor);

    ObjectAssign(this.color, {
      r,
      g,
      b,
      a,
    });

    this.update();

    /* istanbul ignore else */
    if (currentActive !== target) {
      /* istanbul ignore else */
      if (currentActive) {
        removeClass(currentActive, 'active');
        removeAttribute(currentActive, ariaSelected);
      }

      addClass(target as HTMLElement, 'active');
      setAttribute(target as HTMLElement, ariaSelected, 'true');

      if (nonColors.includes(newOption)) {
        this.value = newOption;
      }
      firePickerChange(this);
    }
  };

  /**
   * The `ColorPicker` *touchstart* / *mousedown* events listener for control knobs.
   *
   * @param e
   */
  pointerDown = (e: PointerEvent & { target: HTMLElement }) => {
    if (e.button !== 0) return;
    const { target, pageX, pageY } = e;
    const { colorMenu, visuals, controlKnobs } = this;
    const [v1, v2, v3] = visuals;
    const [c1, c2, c3] = controlKnobs;
    const visual = controlKnobs.includes(target) ? (target.previousElementSibling as HTMLElement) : target;
    const visualRect = getBoundingClientRect(visual);
    const html = getDocumentElement(v1);
    const offsetX = pageX - html.scrollLeft - visualRect.left;
    const offsetY = pageY - html.scrollTop - visualRect.top;

    /* istanbul ignore else */
    if (target === v1 || target === c1) {
      this.dragElement = visual;
      this.changeControl1(offsetX, offsetY);
    } else if (target === v2 || target === c2) {
      this.dragElement = visual;
      this.changeControl2(offsetY);
    } else if (target === v3 || target === c3) {
      this.dragElement = visual;
      this.changeAlpha(offsetY);
    }

    if (colorMenu) {
      const currentActive = querySelector('li.active', colorMenu);
      if (currentActive) {
        removeClass(currentActive, 'active');
        removeAttribute(currentActive, ariaSelected);
      }
    }
    e.preventDefault();
  };

  /**
   * The `ColorPicker` *touchend* / *mouseup* events listener for control knobs.
   *
   * @param e
   * @this
   */
  pointerUp = ({ target }: PointerEvent & { target: HTMLElement }) => {
    const { parent } = this;
    const doc = getDocument(parent);
    const currentOpen = querySelector(`${colorPickerParentSelector}.open`, doc) !== null;
    const selection = doc.getSelection();

    if (!this.dragElement && (!selection || !selection.toString().length) && !parent.contains(target)) {
      this.hide(currentOpen);
    }

    this.dragElement = undefined;
  };

  /**
   * The `ColorPicker` *touchmove* / *mousemove* events listener for control knobs.
   *
   * @param {PointerEvent} e
   */
  pointerMove = (e: PointerEvent) => {
    const { dragElement, visuals } = this;
    const [v1, v2, v3] = visuals;
    const { pageX, pageY } = e;

    if (!dragElement) return;

    const controlRect = getBoundingClientRect(dragElement);
    const win = getDocumentElement(v1);
    const offsetX = pageX - win.scrollLeft - controlRect.left;
    const offsetY = pageY - win.scrollTop - controlRect.top;

    if (dragElement === v1) {
      this.changeControl1(offsetX, offsetY);
    }

    if (dragElement === v2) {
      this.changeControl2(offsetY);
    }

    if (dragElement === v3) {
      this.changeAlpha(offsetY);
    }
  };

  /**
   * The `ColorPicker` *keydown* event listener for control knobs.
   *
   * @param e
   */
  handleKnobs = (e: Event & { code: string }) => {
    const { target, code } = e;

    // only react to arrow buttons
    if (![keyArrowUp, keyArrowDown, keyArrowLeft, keyArrowRight].includes(code)) return;
    e.preventDefault();

    const { controlKnobs, visuals } = this;
    const { offsetWidth, offsetHeight } = visuals[0];
    const [c1, c2, c3] = controlKnobs;
    const { activeElement } = getDocument(c1);
    const currentKnob = controlKnobs.find(x => x === activeElement);
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
          this.controlPositions.c1x += code === keyArrowRight ? xRatio : -xRatio;
        } else if ([keyArrowUp, keyArrowDown].includes(code)) {
          this.controlPositions.c1y += code === keyArrowDown ? yRatio : -yRatio;
        }

        offsetX = this.controlPositions.c1x;
        offsetY = this.controlPositions.c1y;
        this.changeControl1(offsetX, offsetY);
      } else if (target === c2) {
        this.controlPositions.c2y += [keyArrowDown, keyArrowRight].includes(code) ? yRatio : -yRatio;

        offsetY = this.controlPositions.c2y;
        this.changeControl2(offsetY);
      } else if (target === c3) {
        this.controlPositions.c3y += [keyArrowDown, keyArrowRight].includes(code) ? yRatio : -yRatio;

        offsetY = this.controlPositions.c3y;
        this.changeAlpha(offsetY);
      }
      this.handleScroll(e);
    }
  };

  /** The event listener of the colour form inputs. */
  changeHandler = (): void => {
    let colorSource;
    const { inputs, format, value: currentValue, input, controlPositions, visuals } = this;
    const { activeElement } = getDocument(input);
    const { offsetHeight } = visuals[0];
    const [i1, , , i4] = inputs;
    const [v1, v2, v3, v4] =
      format === 'rgb'
        ? inputs.map(i => parseFloat(i.value) / (i === i4 ? 100 : 1))
        : inputs.map(i => parseFloat(i.value) / (i !== i1 ? 100 : 360));
    const isNonColorValue = this.hasNonColor && nonColors.includes(currentValue);
    const alpha = i4 ? v4 : 1 - controlPositions.c3y / offsetHeight;

    /* istanbul ignore else */
    if (activeElement === input || (activeElement && inputs.includes(activeElement as HTMLInputElement))) {
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
          h: v1,
          s: v2,
          l: v3,
          a: alpha,
        };
      } else if (format === 'hwb') {
        colorSource = {
          h: v1,
          w: v2,
          b: v3,
          a: alpha,
        };
      } else {
        colorSource = {
          r: v1,
          g: v2,
          b: v3,
          a: alpha,
        };
      }

      const { r, g, b, a } = new Color(colorSource);

      ObjectAssign(this.color, {
        r,
        g,
        b,
        a,
      });
      this.setControlPositions();
      this.updateAppearance();
      this.updateInputs();
      this.updateControls();
      this.updateVisuals();

      // set non-color keyword
      if (activeElement === input && isNonColorValue) {
        this.value = currentValue;
      }
    }
  };

  /**
   * Updates `ColorPicker` first control:
   * * `lightness` and `saturation` for HEX/RGB;
   * * `lightness` and `hue` for HSL.
   *
   * @param X the X component of the offset
   * @param Y the Y component of the offset
   */
  changeControl1(X: number, Y: number): void {
    let [offsetX, offsetY] = [0, 0];
    const { controlPositions, visuals } = this;
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
    const { r, g, b, a } = new Color({
      h: hue,
      s: saturation,
      v: lightness,
      a: alpha,
    });

    ObjectAssign(this.color, {
      r,
      g,
      b,
      a,
    });

    // new positions
    this.controlPositions.c1x = offsetX;
    this.controlPositions.c1y = offsetY;

    // update color picker
    this.updateAppearance();
    this.updateInputs();
    this.updateControls();
    this.updateVisuals();
  }

  /**
   * Updates `ColorPicker` second control:
   * * `hue` for HEX/RGB/HWB;
   * * `saturation` for HSL.
   *
   * @param Y the Y offset
   */
  changeControl2(Y: number) {
    const { controlPositions, visuals } = this;
    const { offsetHeight, offsetWidth } = visuals[0];

    let offsetY = 0;

    if (Y > offsetHeight) offsetY = offsetHeight;
    else if (Y >= 0) offsetY = Y;

    const hue = offsetY / offsetHeight;
    const saturation = controlPositions.c1x / offsetWidth;
    const lightness = 1 - controlPositions.c1y / offsetHeight;
    const alpha = 1 - controlPositions.c3y / offsetHeight;

    // new color
    const { r, g, b, a } = new Color({
      h: hue,
      s: saturation,
      v: lightness,
      a: alpha,
    });

    ObjectAssign(this.color, {
      r,
      g,
      b,
      a,
    });

    // new position
    this.controlPositions.c2y = offsetY;
    // update color picker
    this.updateAppearance();
    this.updateInputs();
    this.updateControls();
    this.updateVisuals();
  }

  /**
   * Updates `ColorPicker` last control,
   * the `alpha` channel.
   *
   * @param Y
   */
  changeAlpha(Y: number) {
    const { visuals } = this;
    const { offsetHeight } = visuals[0];
    let offsetY = 0;

    if (Y > offsetHeight) offsetY = offsetHeight;
    else if (Y >= 0) offsetY = Y;

    // update color alpha
    const alpha = 1 - offsetY / offsetHeight;
    this.color.setAlpha(alpha);
    // update position
    this.controlPositions.c3y = offsetY;
    // update color picker
    this.updateAppearance();
    this.updateInputs();
    this.updateControls();
    this.updateVisuals();
  }

  /**
   * Updates `ColorPicker` control positions on:
   * * initialization
   * * window resize
   */
  update = () => {
    this.updateDropdownPosition();
    this.updateAppearance();
    this.setControlPositions();
    this.updateInputs(true);
    this.updateControls();
    this.updateVisuals();
  };

  /** Updates the open dropdown position on *scroll* event. */
  updateDropdownPosition() {
    const { input, colorPicker, colorMenu } = this;
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
    const { visuals, color, hsv } = this;
    const { offsetHeight, offsetWidth } = visuals[0];
    const alpha = color.a;
    const hue = hsv.h;

    const saturation = hsv.s;
    const lightness = hsv.v;

    this.controlPositions.c1x = saturation * offsetWidth;
    this.controlPositions.c1y = (1 - lightness) * offsetHeight;
    this.controlPositions.c2y = hue * offsetHeight;
    this.controlPositions.c3y = (1 - alpha) * offsetHeight;
  }

  /** Update the visual appearance label and control knob labels. */
  updateAppearance() {
    const { componentLabels, color, parent, hsv, hex, format, controlKnobs } = this;
    const { appearanceLabel, hexLabel, valueLabel } = componentLabels;
    let { r, g, b } = color.toRgb();
    const [knob1, knob2, knob3] = controlKnobs;
    const hue = roundPart(hsv.h * 360);
    const alpha = color.a;
    const saturation = roundPart(hsv.s * 100);
    const lightness = roundPart(hsv.v * 100);
    const colorName = this.appearance;

    let colorLabel = `${hexLabel} ${hex.split('').join(' ')}`;

    if (format === 'hwb') {
      const { hwb } = this;
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
    setElementStyle(this.input, { backgroundColor: newColor });

    // toggle dark/light classes will also style the placeholder
    // dark sets color white, light sets color black
    // isDark ? '#000' : '#fff'
    if (!this.isDark) {
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
    let { c1x, c1y, c2y, c3y } = controlPositions;
    const [control1, control2, control3] = controlKnobs;
    // round control positions
    [c1x, c1y, c2y, c3y] = [c1x, c1y, c2y, c3y].map(roundPart);

    setElementStyle(control1, {
      transform: `translate3d(${c1x - 4}px,${c1y - 4}px,0)`,
    });
    setElementStyle(control2, { transform: `translate3d(0,${c2y - 4}px,0)` });
    setElementStyle(control3, { transform: `translate3d(0,${c3y - 4}px,0)` });
  }

  /**
   * Updates all color form inputs.
   *
   * @param isPrevented when `true`, the component original event is prevented
   */
  updateInputs(isPrevented?: boolean) {
    const { value: oldColor, format, inputs, color, hsl } = this;
    const [i1, i2, i3, i4] = inputs;
    const alpha = roundPart(color.a * 100);
    const hue = roundPart(hsl.h * 360);
    let newColor = color.toString();

    /* istanbul ignore else */
    if (format === 'hex') {
      newColor = this.color.toHexString(true);
      i1.value = this.hex;
    } else if (format === 'hsl') {
      const lightness = roundPart(hsl.l * 100);
      const saturation = roundPart(hsl.s * 100);
      newColor = this.color.toHslString();
      i1.value = `${hue}`;
      i2.value = `${saturation}`;
      i3.value = `${lightness}`;
      i4.value = `${alpha}`;
    } else if (format === 'hwb') {
      const { w, b } = this.hwb;
      const whiteness = roundPart(w * 100);
      const blackness = roundPart(b * 100);

      newColor = this.color.toHwbString();
      i1.value = `${hue}`;
      i2.value = `${whiteness}`;
      i3.value = `${blackness}`;
      i4.value = `${alpha}`;
    } else if (format === 'rgb') {
      let { r, g, b } = this.rgb;
      [r, g, b] = [r, g, b].map(roundPart);

      newColor = this.color.toRgbString();
      i1.value = `${r}`;
      i2.value = `${g}`;
      i3.value = `${b}`;
      i4.value = `${alpha}`;
    }

    // update the color value
    this.value = newColor;

    // don't trigger the custom event unless it's really changed
    if (!isPrevented && newColor !== oldColor) {
      firePickerChange(this);
    }
  }

  /**
   * Toggle the `ColorPicker` dropdown visibility.
   *
   * @param e
   */
  togglePicker = (e?: Event) => {
    if (e) e.preventDefault();
    const { colorPicker } = this;

    if (this.isOpen && hasClass(colorPicker, 'show')) {
      this.hide(true);
    } else {
      showDropdown(this, colorPicker);
    }
  };

  /** Shows the `ColorPicker` dropdown. */
  showPicker = () => {
    const { colorPicker } = this;

    if (!['top', 'bottom'].some(c => hasClass(colorPicker, c))) {
      showDropdown(this, colorPicker);
    }
  };

  /**
   * Toggles the visibility of the `ColorPicker` presets menu.
   *
   * @param e
   * @this {ColorPicker}
   */
  toggleMenu = (e?: Event) => {
    if (e) e.preventDefault();
    const { colorMenu } = this;

    if (this.isOpen && hasClass(colorMenu, 'show')) {
      this.hide(true);
    } else {
      showDropdown(this, colorMenu);
    }
  };

  /**
   * Hides the currently open `ColorPicker` dropdown.
   *
   * @param {boolean=} focusPrevented
   */
  hide(focusPrevented?: boolean) {
    if (this.isOpen) {
      const { pickerToggle, menuToggle, colorPicker, colorMenu, parent, input } = this;
      const openPicker = hasClass(colorPicker, 'show');
      const openDropdown = openPicker ? colorPicker : colorMenu;
      const relatedBtn = openPicker ? pickerToggle : menuToggle;
      const animationDuration = openDropdown && getElementTransitionDuration(openDropdown);

      this.value = this.color.toString(true);

      /* istanbul ignore else */
      if (openDropdown) {
        removeClass(openDropdown, 'show');
        setAttribute(relatedBtn, ariaExpanded, 'false');
        setTimeout(() => {
          removePosition(openDropdown);
          /* istanbul ignore else */
          if (!querySelector('.show', parent)) {
            removeClass(parent, 'open');
            toggleEventsOnShown(this);
            this.isOpen = false;
          }
        }, animationDuration);
      }

      if (!focusPrevented) {
        focus(pickerToggle);
      }
      setAttribute(input, tabindex, '-1');
      if (relatedBtn === menuToggle) {
        setAttribute(menuToggle, tabindex, '-1');
      }
    }
  }

  /** Removes `ColorPicker` from target `<input>`. */
  dispose() {
    const { input, parent } = this;
    this.hide(true);
    toggleEvents(this);
    [...parent.children].forEach(el => {
      if (el !== input) el.remove();
    });

    removeAttribute(input, tabindex);
    setElementStyle(input, { backgroundColor: '' });

    ['txt-light', 'txt-dark'].forEach(c => removeClass(parent, c));
    Data.remove(input, colorPickerString);
  }
}
