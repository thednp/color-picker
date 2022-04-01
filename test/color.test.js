import Color from '../dist/js/color-esm';
import webColors from './webColors';

// describe('Test', () => {
//   it('no parameter', () => {
//     // const color = new Color();
//     expect(Color.isColorName('red')).toBeTruthy();
//     expect(Color.isColorName('#069')).toBeFalsy();
//     expect(Color.isColorName('rgb(25)')).toBeFalsy();
//   });
// });

describe('Color Initialization', () => {
  it('no parameter, returns default value', () => {
    const color = new Color();
    expect(color.toRgb()).toEqual({r:0, g:0, b:0, a:1});
    expect(color.ok).toBeTruthy();
  });
  it('empty string is ignored, returns default value', () => {
    const color = new Color('');
    expect(color.toRgb()).toEqual({r:0, g:0, b:0, a:1});
    expect(color.ok).toBeTruthy();
  });
  it('invalid value wombat is ignored, returns default value', () => {
    const color = new Color('wombat');
    expect(color.toRgb()).toEqual({r:0, g:0, b:0, a:1});
    expect(color.ok).toBeFalsy();
  });
  it('incomplete value is ignored, returns default value', () => {
    const color = new Color('rgb 255 0');
    expect(color.toRgb()).toEqual({r:0, g:0, b:0, a:1});
    expect(color.ok).toBeFalsy();
  });
  it('additional value is ignored, returns parsed value', () => {
    const color = new Color('rgb 255 0 0 0.5 0');
    expect(color.toRgb()).toEqual({r:255, g:0, b:0, a:0.5});
    expect(color.ok).toBeTruthy();
  });
  it('"transparent" value, returns special value', () => {
    const color = new Color('transparent');
    expect(color.toRgb()).toEqual({r:0, g:0, b:0, a:0});
    expect(color.ok).toBeTruthy();
  });
  it('implicit default value, returns default value', () => {
    const color = new Color('initial');
    expect(color.toRgb()).toEqual({r:0, g:0, b:0, a:1});
    expect(color.ok).toBeTruthy();
  });
  it('web color fake test requires browser, otherwise returns default value', () => {
    // patch JSDOM window.getComputedStyle to work with web safe colors
    // window.getComputedStyle = function(element, elt) {
    //   const computedStyle = window.getComputedStyle(element, elt);
    //   let { color } = computedStyle;
    //   if (webColors.include(color)) computedStyle.color = webColors[color];
    //   return computedStyle;
    // }
    // const webcolor = new Color('red');
    // expect(webcolor.toRgb()).toEqual({r:255, g:0, b:0, a:1});
    // expect(webcolor.ok).toBeTruthy();
    const color = new Color(webColors['red']);
    expect(color.toRgb()).toEqual({r:255, g:0, b:0, a:1});
    expect(color.ok).toBeTruthy();
    const webcolor = new Color('red');
    expect(webcolor.toRgb()).toEqual({r:0, g:0, b:0, a:1});
    expect(webcolor.ok).toBeFalsy();
  });
  it('number value is converted to HEX, returns converted value', () => {
    const color = new Color(69);
    expect(color.toRgb()).toEqual({r:0, g:102, b:153, a:1});
    expect(color.ok).toBeTruthy();
  });
});

describe('Color Object Testing', () => {
  it('any object to RGB', () => {
    // red
    expect(new Color({h:'360', s: 1, l: 0.5}).toRgb()).toEqual({r:255, g:0, b:0, a:1});
    expect(new Color({h:0, s: 1, v: 0.5}).toRgb()).toEqual({r:127.5, g:0, b:0, a:1});
    expect(new Color({h:'0deg', w: 0, b: 0}).toRgb()).toEqual({r:255, g:0, b:0, a:1});
    // green
    expect(new Color({h:'120', s:1, l:0.5}).toRgb()).toEqual({r:0, g:255, b:0, a:1});
    expect(new Color({h:'120deg', s:1, v:0.5}).toRgb()).toEqual({r:0, g:127.5, b:0, a:1});
    expect(new Color({h:'120', w:0, b:0}).toRgb()).toEqual({r:0, g:255, b:0, a:1});
    // blue
    expect(new Color({h:'240', s:1, l:0.5}).toRgb()).toEqual({r:0, g:0, b:255, a:1});
    expect(new Color({h:'240deg', s: 1, v:0.5}).toRgb()).toEqual({r:0, g:0, b:127.5, a:1});
    expect(new Color({h:'240', w: 0, b:0}).toRgb()).toEqual({r:0, g:0, b:255, a:1});
  });
  it('any object to HSL', () => {
    // red
    expect(new Color({r:'255', g:0, b:0}).toHsl()).toEqual({h:0, s:1, l:0.5, a:1});
    expect(new Color({h:0, s:1, v:0.5}).toHsl()).toEqual({h:0, s:1, l:0.25, a:1});
    expect(new Color({h:'0deg', w:0, b:0}).toHsl()).toEqual({h:0, s:1, l:0.5, a:1});
    // green
    expect(new Color({r:0, g:'255', b:0}).toHsl()).toEqual({h:12/36, s:1, l:0.5, a:1});
    expect(new Color({h:'120deg', s:1, v:0.5}).toHsl()).toEqual({h:12/36, s:1, l:0.25, a:1});
    expect(new Color({h:'120', w:0, b:0}).toHsl()).toEqual({h:12/36, s:1, l:0.5, a:1});
    // blue
    expect(new Color({r:0, g:0, b:'255'}).toHsl()).toEqual({h:24/36, s:1, l:0.5, a:1});
    expect(new Color({h:'240deg', s:1, v:0.5}).toHsl()).toEqual({h:24/36, s:1, l:0.25, a:1});
    expect(new Color({h:'240', w:0, b:0}).toHsl()).toEqual({h:24/36, s:1, l:0.5, a:1});
  });
  it('any object to HSV', () => {
    // red
    expect(new Color({r:'255', g:0, b:0}).toHsv()).toEqual({h:0, s:1, v:1, a:1});
    expect(new Color({h:0, s:1, l:0.5}).toHsv()).toEqual({h:0, s:1, v:1, a:1});
    expect(new Color({h:'0deg', w:0, b:0}).toHsv()).toEqual({h:0, s:1, v:1, a:1});
    // green
    expect(new Color({r:0, g:'255', b:0}).toHsv()).toEqual({h:12/36, s:1, v:1, a:1});
    expect(new Color({h:'120deg', s:1, l:0.5}).toHsv()).toEqual({h:12/36, s:1, v:1, a:1});
    expect(new Color({h:'120', w:0, b:0}).toHsv()).toEqual({h:12/36, s:1, v:1, a:1});
    // blue
    expect(new Color({r:0, g:0, b:'255'}).toHsv()).toEqual({h:24/36, s:1, v:1, a:1});
    expect(new Color({h:'240deg', s:1, l:0.5}).toHsv()).toEqual({h:24/36, s:1, v:1, a:1});
    expect(new Color({h:'240', w:0, b:0}).toHsv()).toEqual({h:24/36, s:1, v:1, a:1});
  });
  it('any object to HWB', () => {
    // red
    expect(new Color({r:'255', g:0, b:0}).toHwb()).toEqual({h:0, w:0, b:0, a:1});
    expect(new Color({h:0, s:1, v:1}).toHwb()).toEqual({h:0, w:0, b:0, a:1});
    expect(new Color({h:'0deg', s:1, l:0.5}).toHwb()).toEqual({h:0, w:0, b:0, a:1});
    // green
    expect(new Color({r:0, g:'255', b:0}).toHwb()).toEqual({h:12/36, w:0, b:0, a:1});
    expect(new Color({h:'120deg', s:1, v:1}).toHwb()).toEqual({h:12/36, w:0, b:0, a:1});
    expect(new Color({h:'120', s:1, l:0.5}).toHwb()).toEqual({h:12/36, w:0, b:0, a:1});
    // blue
    expect(new Color({r:0, g:0, b:'255'}).toHwb()).toEqual({h:24/36, w:0, b:0, a:1});
    expect(new Color({h:'240deg', s:1, v:1}).toHwb()).toEqual({h:24/36, w:0, b:0, a:1});
    expect(new Color({h:'240', s:1, l:0.5}).toHwb()).toEqual({h:24/36, w:0, b:0, a:1});
  });
});

describe('Color RegExp Testing', () => {
  it('CSS3 values outside boundaries', () => {
    const alpha = new Color('rgba(255,0,255,-5)');
    expect(alpha.toRgb()).toEqual({r:255, g:0, b:255, a:1});
    expect(alpha.ok).toBeTruthy();
    const rgb = new Color('rgb(256,265,-1)');
    expect(rgb.toRgb()).toEqual({r:255, g:255, b:0, a:1});
    expect(rgb.ok).toBeTruthy();
    const hsl = new Color('hsl(361,-102,101)');
    expect(hsl.toRgb()).toEqual({r:255, g:255, b:255, a:1});
    expect(rgb.ok).toBeTruthy();
    const hsv = new Color('hsv(-361,102,-101)');
    expect(hsv.toRgb()).toEqual({r:0, g:0, b:0, a:1});
    expect(hsv.ok).toBeTruthy();
    const hwb = new Color('hwb(-360,-3,-0.5)');
    expect(hwb.toRgb()).toEqual({r:255, g:0, b:0, a:1});
    expect(hwb.ok).toBeTruthy();
  });
  it('CSS3 valid RGB value', () => {
    const color = new Color('rgb(0,255,0)');
    expect(color.toRgb()).toEqual({r:0, g:255, b:0, a:1});
    expect(color.ok).toBeTruthy();
  });
  it('CSS3 valid RGB value with alpha', () => {
    const color = new Color('rgb(0,255,0,0.5)');
    expect(color.toRgb()).toEqual({r:0, g:255, b:0, a:0.5});
    expect(color.ok).toBeTruthy();
  });
  it('CSS3/CSS4 permissive RGB value', () => {
    const color = new Color('rgb 0 0 255 50');
    expect(color.toRgb()).toEqual({r:0, g:0, b:255, a:0.5});
    expect(color.ok).toBeTruthy();
  });
  it('CSS3 valid percentage RGB value', () => {
    const color = new Color('rgba(0%, 100%, 0%, 50%)');
    expect(color.toRgb()).toEqual({r:0, g:255, b:0, a:0.5});
    expect(color.ok).toBeTruthy();
  });
  it('CSS4 valid RGB value', () => {
    const color = new Color('rgb(0 255 0)');
    expect(color.toRgb()).toEqual({r:0, g:255, b:0, a:1});
    expect(color.ok).toBeTruthy();
  });
  it('CSS4 valid RGB value with alpha', () => {
    const color = new Color('rgb(0 255 0 / 50%)');
    expect(color.toRgb()).toEqual({r:0, g:255, b:0, a:0.5});
    expect(color.ok).toBeTruthy();
  });
  it('CSS3 valid HSL value', () => {
    const color = new Color('hsl(0,100,50)');
    expect(color.toRgb()).toEqual({r:255, g:0, b:0, a:1});
    expect(color.ok).toBeTruthy();
  });
  it('CSS3 valid HSL value with alpha', () => {
    const color = new Color('hsl(0,100,50,0.3)');
    expect(color.toRgb()).toEqual({r:255, g:0, b:0, a:0.3});
    expect(color.ok).toBeTruthy();
  });
  it('CSS3/CSS4 permissive HSL value', () => {
    const color = new Color('hsl 0 100 50 60');
    expect(color.toRgb()).toEqual({r:255, g:0, b:0, a:0.6});
    expect(color.ok).toBeTruthy();
  });
  it('CSS4 valid HSL value', () => {
    const color = new Color('hsl(0deg 100% 50%)');
    expect(color.toRgb()).toEqual({r:255, g:0, b:0, a:1});
    expect(color.ok).toBeTruthy();
  });
  it('CSS4 valid HSL value with alpha', () => {
    const color = new Color('hsl(0deg 100% 50% / 40%)');
    expect(color.toRgb()).toEqual({r:255, g:0, b:0, a:0.4});
    expect(color.ok).toBeTruthy();
  });
  it('CSS3 valid HSV value', () => {
    const color = new Color('hsv(0,100,50)');
    expect(color.toRgb()).toEqual({r:127.5, g:0, b:0, a:1});
    expect(color.ok).toBeTruthy();
  });
  it('CSS3 valid HSV value with alpha', () => {
    const color = new Color('hsv(0,100,50,0.3)');
    expect(color.toRgb()).toEqual({r:127.5, g:0, b:0, a:0.3});
    expect(color.ok).toBeTruthy();
  });
  it('CSS3/CSS4 permissive HSV value', () => {
    const color = new Color('hsv 0 100 50 60');
    expect(color.toRgb()).toEqual({r:127.5, g:0, b:0, a:0.6});
    expect(color.ok).toBeTruthy();
  });
  it('CSS4 valid HSV value', () => {
    const color = new Color('hsv(0deg 100% 50% / 40%)');
    expect(color.toRgb()).toEqual({r:127.5, g:0, b:0, a:0.4});
    expect(color.ok).toBeTruthy();
  });
  it('CSS4 valid HWB value', () => {
    const color = new Color('hwb(0deg 0% 50%)');
    expect(color.toRgb()).toEqual({r:127.5, g:0, b:0, a:1});
    expect(color.ok).toBeTruthy();
  });
  it('CSS4 valid HWB value with alpha', () => {
    const color1 = new Color('hwb(0deg 0% 50% / 40%)');
    expect(color1.toRgb()).toEqual({r:127.5, g:0, b:0, a:0.4});
    expect(color1.ok).toBeTruthy();
    const color2 = new Color('hwb(120deg 0% 50% / 60%)');
    expect(color2.toRgb()).toEqual({r:0, g:127.5, b:0, a:0.6});
    expect(color2.ok).toBeTruthy();
    const color3 = new Color('hwb(240deg 0% 50% / 0.35)');
    expect(color3.toRgb()).toEqual({r:0, g:0, b:127.5, a:0.35});
    expect(color3.ok).toBeTruthy();
  });
  it('CSS4 permissive HWB value with alpha', () => {
    const color = new Color('hwb 0 0 50 40');
    expect(color.toRgb()).toEqual({r:127.5, g:0, b:0, a:0.4});
    expect(color.ok).toBeTruthy();
  });
  it('CSS3 valid HEX value', () => {
    const color = new Color('#ff0000');
    expect(color.toRgb()).toEqual({r:255, g:0, b:0, a:1});
    expect(color.ok).toBeTruthy();
  });
  it('CSS4 valid HEX value with alpha', () => {
    const color = new Color('#ff000080');
    expect(color.toRgb()).toEqual({r:255, g:0, b:0, a:0.5});
    expect(color.ok).toBeTruthy();
  });
});

describe('Color Greys', () => {
  it('test grey with all formats', () => {
    const rgbcolor = new Color('rgb(51,51,51,0.8)');
    expect(rgbcolor.toHex(true)).toEqual('333c');
    expect(rgbcolor.toHsl()).toEqual({h:0, s:0, l:0.2, a:0.8});
    expect(rgbcolor.toHsv()).toEqual({h:0, s:0, v:0.2, a:0.8});
    expect(rgbcolor.toHwb()).toEqual({h:0, w:0.2, b:0.8, a:0.8});
    expect(rgbcolor.ok).toBeTruthy();

    const hexcolor = new Color('#333c');
    expect(hexcolor.toRgb()).toEqual({r:51, g:51, b:51, a:0.8});
    expect(hexcolor.toHsl()).toEqual({h:0, s:0, l:0.2, a:0.8});
    expect(hexcolor.toHsv()).toEqual({h:0, s:0, v:0.2, a:0.8});
    expect(hexcolor.toHwb()).toEqual({h:0, w:0.2, b:0.8, a:0.8});
    expect(hexcolor.ok).toBeTruthy();

    const hslcolor = new Color('hsl(0deg 0% 20% 80%)');
    expect(hslcolor.toRgb()).toEqual({r:51, g:51, b:51, a:0.8});
    expect(hslcolor.toHex(true)).toEqual('333c');
    expect(hslcolor.toHsv()).toEqual({h:0, s:0, v:0.2, a:0.8});
    expect(hslcolor.toHwb()).toEqual({h:0, w:0.2, b:0.8, a:0.8});
    expect(hslcolor.ok).toBeTruthy();

    const hsvcolor = new Color('hsva(0,0%,20%,0.8)');
    expect(hsvcolor.toRgb()).toEqual({r:51, g:51, b:51, a:0.8});
    expect(hsvcolor.toHex(true)).toEqual('333c');
    expect(hsvcolor.toHsl()).toEqual({h:0, s:0, l:0.2, a:0.8});
    expect(hsvcolor.toHwb()).toEqual({h:0, w:0.2, b:0.8, a:0.8});
    expect(hsvcolor.ok).toBeTruthy();

    const hwbcolor = new Color('hwb(0 20% 80% / 80%)');
    expect(hwbcolor.toRgb()).toEqual({r:51, g:51, b:51, a:0.8});
    expect(hwbcolor.toHex(true)).toEqual('333c');
    expect(hwbcolor.toHsl()).toEqual({h:0, s:0, l:0.2, a:0.8});
    expect(hwbcolor.toHsv()).toEqual({h:0, s:0, v:0.2, a:0.8});
    expect(hwbcolor.ok).toBeTruthy();
  });
});

describe('Color Private Methods', () => {
  const color = new Color('rgb(255,0,0)');

  it('toRgb', () => {
    expect(color.toRgb()).toEqual({r:255, g:0, b:0, a:1});
  });
  it('toHsl', () => {
    expect(color.toHsl()).toEqual({h:0, s:1, l:0.5, a:1});
  });
  it('toHsv', () => {
    expect(color.toHsv()).toEqual({h:0, s:1, v:1, a:1});
  });
  it('toHwb', () => {
    expect(color.toHwb()).toEqual({h:0, w:0, b:0, a:1});
  });
  it('toHex & toHex short', () => {
    expect(color.toHex()).toEqual('ff0000');
    expect(color.toHex(true)).toEqual('f00');
  });

  it('toString - all supported formats', () => {
    expect(color.toString()).toEqual('rgb(255, 0, 0)');
    expect(color.toRgbString()).toEqual('rgb(255, 0, 0)');
    expect(color.toRgbCSS4String()).toEqual('rgb(255 0 0)');
    expect(color.toHslString()).toEqual('hsl(0, 100%, 50%)');
    expect(color.toHslCSS4String()).toEqual('hsl(0deg 100% 50%)');
    expect(color.toHwbString()).toEqual('hwb(0deg 0% 0%)');
    expect(color.toHexString()).toEqual('#ff0000');
    expect(color.toHex8String()).toEqual('#ff0000ff');
    expect(color.toHexString(true)).toEqual('#f00');
    expect(color.toHex8String(true)).toEqual('#f00f');
    expect(color.clone().spin(120).setAlpha(0.8).toHexString()).toEqual('#00ff00cc');
    expect(color.clone().spin(240).setAlpha(0.8).toHex8String(true)).toEqual('#00fc');
  });

  it('all getters', () => {
    expect(color.isValid).toBeTruthy();
    expect(color.isDark).toBeTruthy();
    expect(Math.round(color.brightness)).toEqual(76);
    expect(new Color('rgb(100%,0%,0%)').luminance).toEqual(0.2126);
    expect(new Color('rgb(0,255,0)').luminance).toEqual(0.7152);
    expect(new Color('rgb(0,0,255)').luminance).toEqual(0.0722);
    expect(new Color('hsl(0,100%,50%)').luminance).toEqual(0.2126);
    expect(new Color('hsl(120,100%,50%)').luminance).toEqual(0.7152);
    expect(new Color('hsl(240,100%,50%)').luminance).toEqual(0.0722);
    expect(new Color('hsv(0,100%,100%)').luminance).toEqual(0.2126);
    expect(new Color('hsv(120,100%,100%)').luminance).toEqual(0.7152);
    expect(new Color('hsv(240,100%,100%)').luminance).toEqual(0.0722);
    expect(new Color('hwb(0 0% 0%)').luminance).toEqual(0.2126);
    expect(new Color('hwb(120 0% 0%)').luminance).toEqual(0.7152);
    expect(new Color('hwb(240 0% 0%)').luminance).toEqual(0.0722);
  });

  it('clone', () => {
    expect(color.clone().toRgb()).toEqual({r:255, g:0, b:0, a:1});
  });
  it('spin', () => {
    expect(color.clone().spin(120).toRgb()).toEqual({r:0, g:255, b:0, a:1});
    expect(color.clone().spin(240).toRgb()).toEqual({r:0, g:0, b:255, a:1});
    expect(color.clone().spin(360).toRgb()).toEqual({r:255, g:0, b:0, a:1});
  });
  it('setAlpha', () => {
    const alpha = color.clone().setAlpha(0.5);
    expect(alpha.toRgb()).toEqual({r:255, g:0, b:0, a:0.5});
    expect(alpha.ok).toBeTruthy();
  });
  it('lighten', () => {
    const lighten = color.clone().lighten(10);
    const {r,b,g,a} = lighten;
    expect({r: Math.round(r), g: Math.round(g), b: Math.round(b), a}).toEqual({r:255, g:51, b:51, a:1});
    expect(lighten.ok).toBeTruthy();
  });
  it('darken', () => {
    const darken = color.clone().darken(10);
    const {r,b,g,a} = darken;
    expect({r: Math.round(r), g: Math.round(g), b: Math.round(b), a}).toEqual({r:204, g:0, b:0, a:1});
    expect(darken.ok).toBeTruthy();
  });
  it('saturate', () => {
    const saturate = new Color('rgb(46, 56, 46)').saturate(10);
    const {r,b,g,a} = saturate;
    expect({r: Math.round(r), g: Math.round(g), b: Math.round(b), a}).toEqual({r:41, g:61, b:41, a:1});
    expect(saturate.ok).toBeTruthy();
  });
  it('desaturate', () => {
    const desaturate = new Color('rgb(41, 61, 41)').desaturate(10);
    const {r,b,g,a} = desaturate;
    expect({r: Math.round(r), g: Math.round(g), b: Math.round(b), a}).toEqual({r:46, g:56, b:46, a:1});
    expect(desaturate.ok).toBeTruthy();
  });
  it('greyscale', () => {
    const greyscale = new Color('rgb(41, 41, 61)').greyscale();
    const {r,b,g,a} = greyscale;
    expect({r: Math.round(r), g: Math.round(g), b: Math.round(b), a}).toEqual({r:51, g:51, b:51, a:1});
    expect(greyscale.ok).toBeTruthy();
  });
});