export as namespace CP;
export {Color, ColorPicker, ColorPalette, ColorPickerElement};

export {
  HSL,
  HSLA,
  RGB,
  RGBA,
  HSV,
  HSVA,
  HWB,
  HWBA,
  ColorPickerOptions,
  ColorObject,
  ColorFormats,
  ColorInput,
  GetInstance,
  InitCallback,
} from './source/types';

import './cp';
import { default as Color } from "color-picker/src/js/color";
import { default as ColorPalette } from "color-picker/src/js/color-palette";
import { default as ColorPicker } from "color-picker/src/js/color-picker";
import { default as ColorPickerElement } from "color-picker/src/js/color-picker-element";

declare module "@thednp/color-picker" {
  export default ColorPicker;
}

declare module "@thednp/color-picker/src/js/color" {
  export default Color;
}

declare module "@thednp/color-picker/src/js/color-palette" {
  export default ColorPalette;
}

declare module "@thednp/color-picker/src/js/color-picker" {
  export default ColorPicker;
}

declare module "@thednp/color-picker/src/js/color-picker-element" {
  export default ColorPickerElement;
}

export * as SHORTER from "shorter-js";
export * as EventListener from "event-listener.js";
