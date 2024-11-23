import type { ColorFormats } from "@thednp/color";
import ColorPickerLabels from "./colorPickerLabels";
import ColorPalette from "../colorPalette";

export declare type ColorPickerOptions = {
  colorLabels: string | string[];
  componentLabels: ColorPickerLabels;
  format: ColorFormats;
  colorPresets: string | string[] | ColorPalette | false;
  colorKeywords: string | string[] | false;
};
