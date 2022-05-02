# ColorPicker [![Coverage Status](https://coveralls.io/repos/github/thednp/color-picker/badge.svg?branch=main)](https://coveralls.io/github/thednp/color-picker?branch=main) ![cypress version](https://img.shields.io/badge/cypress-9.6.0-brightgreen) [![ci](https://github.com/thednp/color-picker/actions/workflows/ci.yml/badge.svg)](https://github.com/thednp/color-picker/actions/workflows/ci.yml) ![typescript version](https://img.shields.io/badge/typescript-4.5.2-brightgreen)
The feature rich **ColorPicker** component for the modern web built with TypeScript definitions, WAI-ARIA compliant and lots of goodies. In addition, it features its own version of [TinyColor](https://github.com/bgrins/TinyColor) called simply `Color`.

[![image](./docs/img/color-picker.png)](http://thednp.github.io/color-picker)


[![NPM Version](https://img.shields.io/npm/v/@thednp/color-picker.svg?style=flat-square)](https://www.npmjs.com/package/@thednp/color-picker)
[![NPM Downloads](https://img.shields.io/npm/dm/@thednp/color-picker.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@thednp/color-picker)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@thednp/color-picker?style=flat-square)](https://bundlephobia.com/package/@thednp/color-picker)
[![jsDeliver](https://data.jsdelivr.com/v1/package/npm/@thednp/color-picker/badge)](https://www.jsdelivr.com/package/npm/@thednp/color-picker)

**ColorPicker** can use existing colour palettes or generate custom ones via DATA API configuration. If you want to play, check out [this codepen](https://codepen.io/thednp/pen/WNdRWPN) I've setup for you. Have fun!


# Highlights
* Accessibility Focus for WAI-ARIA compliance
* ES6+ sources with TypeScript definitions
* Framework agnostic and flexible design
* Supporting HEX(a), RGB(a), HSL(a) and HWB, the last three also in CSS4 Color Module flavours
* Supports keyboard and touch events
* Automatic repositioning of the popup dropdown on show / window scroll
* SCSS sources with minimal style required
* Right To Left Languages Supported
* light footprint, `10kb` in size when minified and gZipped

# Wiki
For an in depth guide on all things **ColorPicker**, check out the wiki pages:
* [Home](https://github.com/thednp/color-picker/wiki) - the **ColorPicker** wiki home.
* [NPM](https://github.com/thednp/color-picker/wiki/NPM) - quick installation guide.
* [CDN Link](https://github.com/thednp/color-picker/wiki/CDN) - quick implementation guide.
* [Usage](https://github.com/thednp/color-picker/wiki/Usage) - an in-depth browser usage.
* [ES6+](https://github.com/thednp/color-picker/wiki/ES6) - your usual quick ES6+ guide.
* [Node.js](https://github.com/thednp/color-picker/wiki/Node.js) - is this a thing?

**Note** - the wiki pages are still under construction.

# NPM
You can install **ColorPicker** through NPM:

```
$ npm install @thednp/color-picker
```

# Browser Usage
Download the [latest package](https://github.com/thednp/color-picker/archive/master.zip). unpack and inspect the contents. You need to copy the `color-picker.js` and `color-picker.css` or their minified variations to your app `assets` folders as follows.
Link the required CSS in your document `<head>` tag
```html
<link href="../assets/css/color-picker.css" rel="stylesheet">
```

Link the required JS in your document  `<body>` tag, though it should work in the `<head>` as well
```html
<script src="../assets/js/color-picker.js"></script>
```
OR use the `ColorPickerElement` custom element:
```html
<script src="../assets/js/color-picker-element.js"></script>
```
OR use the `ColorPickerElement` custom element ESM module:
```html
<script type="module" src="../assets/js/color-picker-element-esm.js"></script>
```

If you don't want to use the custom element, you can initialize the function for your elements at the end of your `<body>` tag
```html
<script>
var myPicker = new ColorPicker('input.SELECTOR');
</script>
```

To use the DATA-API, you can provide for instance the `data-format="hex"`, and other specific attributes like so:
```html
<label for="myPicker">Color Label</label>
<div class="color-picker">
  <input id="myPicker" name="myPicker" data-function="color-picker" data-format="hex" data-color-presets="red,green,blue" class="color-preview" value="#069">
</div>
```
The `data-function="color-picker"` attribute is useful for mass initialization, [check this usage section of the wiki](https://github.com/thednp/color-picker/wiki/Usage#initialize-multiple-targets). 

Alternatively you can use the `ColorPickerElement` custom element, the `data-function="color-picker"` attribute is no longer required:
```html
<label for="myPicker">Colour Field Label</label>
<color-picker data-format="rgb" data-color-keywords="#069:default,#111:revert">
  <input id="myPicker" name="myPicker" class="color-preview" value="#069">
</color-picker>

<script type="module" src="../path-to/color-picker-element-esm.js"></script>
```
As shown in the above example, all DATA API attributes for instance configuration are to be used on your **custom element**.


# Initialize INPUT
```javascript
import ColorPicker from '@thednp/color-picker';

let myPicker = new ColorPicker('#myPicker');
```

# Initialize Custom Element
```javascript
import ColorPickerElement from '@thednp/color-picker/src/color-picker-element';

// initialize the CustomElement
const myPicker = new ColorPickerElement();
// set DATA API
myPicker.setAttribute('data-format', 'hsl');
myPicker.setAttribute('data-id', 'ADD_YOUR_UNIQUE_ID');
myPicker.setAttribute('data-value', 'rgb(150 0 150 / 0.8)');
myPicker.setAttribute('data-label', 'Color Picker Element Label');
myPicker.setAttribute('data-color-keywords', 'false');

// append, connectedCallback() is triggered
document.body.append(myPicker);
```
Other configuration options apply, see [the API Guide](https://github.com/thednp/color-picker/wiki/API).


# Thanks
* Dimitris Grammatikogiannis for his [initial project](https://codepen.io/dgrammatiko/pen/zLvXwR) as well as testing and contributions
* Serhii Kulykov for his [Vanilla Colorful](https://github.com/web-padawan/vanilla-colorful)
* Brian Grinstead for his [TinyColor](https://github.com/bgrins/TinyColor)
* Jonathan Neal for his [convert-colors](https://github.com/jonathantneal/convert-colors)
* Peter Dematté  for his [colorPicker](http://www.dematte.at/colorPicker/)
* Ștefan Petre at eyecon for his [colorPicker](https://www.eyecon.ro/colorpicker/)
* Brian Teeman for his [patience](https://github.com/joomla/joomla-cms/pull/35639)

# License
**ColorPicker** is released under the [MIT License](https://github.com/thednp/color-picker/blob/master/LICENSE).
