# ColorPicker Web Component
The feature rich color picker component for the modern web built with TypeScript definition, WAI-ARIA compliant.

[![NPM Version](https://img.shields.io/npm/v/@thednp/color-picker.svg?style=flat-square)](https://www.npmjs.com/package/@thednp/color-picker)
[![NPM Downloads](https://img.shields.io/npm/dm/@thednp/color-picker.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@thednp/color-picker)
[![jsDeliver](https://data.jsdelivr.com/v1/package/npm/@thednp/color-picker/badge)](https://www.jsdelivr.com/package/npm/@thednp/color-picker)

# Demo
Download the package and check the demo folder, or check it online [here](http://thednp.github.io/color-picker).

# Highlights
* Accessibility Focus
* ES6+ sources with TypeScript definitions
* SCSS sources
* very light footprint, `5kb` in size when minified
* 3 sets of positions top (main), left or right
* provides a set of options for JavaScript initialization
* DATA API allows you to automatically initiate without JS invocation
* modern browsers supported and semi-modern alike with a special polyfill for IE10+ provided


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

If you don't want to use the custom element, you can initialize the function for your elements at the end of your `<body>` tag
```html
<script>
var myPicker = new ColorPicker('input.SELECTOR');
</script>
```

To use the DATA-API, you need to provide the `data-function="color-picker"` attribute to your target, like so:
```html
<label for="myPicker">Color Label</label>
<div class="color-picker">
  <input id="myPicker" name="myPicker" class="color-preview" value="#069" data-function="color-picker">
</div>
```

Alternatively you can use the `ColorPickerElement` custom element:
```html
<label for="myPicker">Color Label</label>
<color-picker>
  <input id="myPicker" name="myPicker" class="color-preview" value="#069">
</color-picker>

<script type="module" src="../path-to/color-picker-element.js"></script>
```

Other initialization and markup options apply, explained in [the demo](http://thednp.github.io/color-picker/).


# ES6+
```javascript
import ColorPicker from '@thednp/color-picker'

let myPicker = new ColorPicker('#myPicker')
```


# Thanks
* Dimitris Grammatikogiannis for his [initial project](https://codepen.io/dgrammatiko/pen/zLvXwR) as well as testing and contributions
* Serhii Kulykov for his [Vanilla Colorful](https://github.com/web-padawan/vanilla-colorful)
* @see https://www.eyecon.ro/colorpicker/
* @see http://www.dematte.at/colorPicker/

# License
[MIT License](https://github.com/thednp/color-picker/blob/master/LICENSE)
