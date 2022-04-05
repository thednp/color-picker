/// <reference types="cypress" />

// import Color from '../../src/js/color';
import Color from '../instrumented/color';

describe('Color Initialization', () => {
  it('no parameter, returns default value', () => {
    const color = new Color();
    expect(color.toRgb()).to.deep.equal({r:0, g:0, b:0, a:1});
    expect(color.ok).to.be.true;
  });
  it('empty string is ignored, returns default value', () => {
    const color = new Color('');
    expect(color.toRgb()).deep.equal({r:0, g:0, b:0, a:1});
    expect(color.ok).be.true;
  });
  it('invalid value wombat is ignored, returns default value', () => {
    const color = new Color('wombat');
    expect(color.toRgb()).deep.equal({r:0, g:0, b:0, a:1});
    expect(color.ok).to.be.false;
  });
  it('incomplete value is ignored, returns default value', () => {
    const color = new Color('rgb 255 0');
    expect(color.toRgb()).deep.equal({r:0, g:0, b:0, a:1});
    expect(color.ok).to.be.false;
  });
  it('additional value is ignored, returns parsed value', () => {
    const color = new Color('rgb 255 0 0 0.5 0');
    expect(color.toRgb()).deep.equal({r:255, g:0, b:0, a:0.5});
    expect(color.ok).to.be.true;
  });
  it('"transparent" value, returns special value', () => {
    const color = new Color('transparent');
    expect(color.toRgb()).deep.equal({r:0, g:0, b:0, a:0});
    expect(color.ok).to.be.true;
  });
  it('implicit default value, returns default value', () => {
    const color = new Color('initial');
    expect(color.toRgb()).deep.equal({r:0, g:0, b:0, a:1});
    expect(color.ok).to.be.true;
  });
  it('web color fake test requires browser, otherwise returns default value', () => {
    const webcolor = new Color('red');
    expect(webcolor.toRgb()).deep.equal({r:255, g:0, b:0, a:1});
    expect(webcolor.ok).to.be.true;
  });
  it('number value is converted to HEX, returns converted value', () => {
    const color = new Color(69);
    expect(color.toRgb()).deep.equal({r:0, g:102, b:153, a:1});
    expect(color.ok).to.be.true;
  });
});

describe('Color Object Testing', () => {
  it('any object to RGB', () => {
    // red
    expect(new Color({h:'-240', s: 1, l: 0.5}).toRgb()).to.deep.equal({r:0, g:255, b:0, a:1});
    expect(new Color({h:0, s: 1, v: 0.5}).toRgb()).to.deep.equal({r:127.5, g:0, b:0, a:1});
    expect(new Color({h:'0deg', w: 0, b: 0}).toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
    // green
    expect(new Color({h:'120', s:1, l:0.5}).toRgb()).to.deep.equal({r:0, g:255, b:0, a:1});
    expect(new Color({h:'120deg', s:1, v:0.5}).toRgb()).to.deep.equal({r:0, g:127.5, b:0, a:1});
    expect(new Color({h:'120', w:0, b:0}).toRgb()).to.deep.equal({r:0, g:255, b:0, a:1});
    // blue
    expect(new Color({h:'240', s:1, l:0.5}).toRgb()).to.deep.equal({r:0, g:0, b:255, a:1});
    expect(new Color({h:'240deg', s: 1, v:0.5}).toRgb()).to.deep.equal({r:0, g:0, b:127.5, a:1});
    expect(new Color({h:'240', w: 0, b:0}).toRgb()).to.deep.equal({r:0, g:0, b:255, a:1});
  });
  it('any object to HSL', () => {
    // red
    expect(new Color({r:'255', g:0, b:0}).toHsl()).to.deep.equal({h:0, s:1, l:0.5, a:1});
    expect(new Color({h:0, s:1, v:0.5}).toHsl()).to.deep.equal({h:0, s:1, l:0.25, a:1});
    expect(new Color({h:'0deg', w:0, b:0}).toHsl()).to.deep.equal({h:0, s:1, l:0.5, a:1});
    // green
    expect(new Color({r:0, g:'255', b:0}).toHsl()).to.deep.equal({h:12/36, s:1, l:0.5, a:1});
    expect(new Color({h:'120deg', s:1, v:0.5}).toHsl()).to.deep.equal({h:12/36, s:1, l:0.25, a:1});
    expect(new Color({h:'120', w:0, b:0}).toHsl()).to.deep.equal({h:12/36, s:1, l:0.5, a:1});
    // blue
    expect(new Color({r:0, g:0, b:'255'}).toHsl()).to.deep.equal({h:24/36, s:1, l:0.5, a:1});
    expect(new Color({h:'240deg', s:1, v:0.5}).toHsl()).to.deep.equal({h:24/36, s:1, l:0.25, a:1});
    expect(new Color({h:'240', w:0, b:0}).toHsl()).to.deep.equal({h:24/36, s:1, l:0.5, a:1});
  });
  it('any object to HSV', () => {
    // red
    expect(new Color({r:'255', g:0, b:0}).toHsv()).to.deep.equal({h:0, s:1, v:1, a:1});
    expect(new Color({h:0, s:1, l:0.5}).toHsv()).to.deep.equal({h:0, s:1, v:1, a:1});
    expect(new Color({h:'0deg', w:0, b:0}).toHsv()).to.deep.equal({h:0, s:1, v:1, a:1});
    // green
    expect(new Color({r:0, g:'255', b:0}).toHsv()).to.deep.equal({h:12/36, s:1, v:1, a:1});
    expect(new Color({h:'120deg', s:1, l:0.5}).toHsv()).to.deep.equal({h:12/36, s:1, v:1, a:1});
    expect(new Color({h:'120', w:0, b:0}).toHsv()).to.deep.equal({h:12/36, s:1, v:1, a:1});
    // blue
    expect(new Color({r:0, g:0, b:'255'}).toHsv()).to.deep.equal({h:24/36, s:1, v:1, a:1});
    expect(new Color({h:'240deg', s:1, l:0.5}).toHsv()).to.deep.equal({h:24/36, s:1, v:1, a:1});
    expect(new Color({h:'240', w:0, b:0}).toHsv()).to.deep.equal({h:24/36, s:1, v:1, a:1});
  });
  it('any object to HWB', () => {
    // red
    expect(new Color({r:'255', g:0, b:0}).toHwb()).to.deep.equal({h:0, w:0, b:0, a:1});
    expect(new Color({h:0, s:1, v:1}).toHwb()).to.deep.equal({h:0, w:0, b:0, a:1});
    expect(new Color({h:'0deg', s:1, l:0.5}).toHwb()).to.deep.equal({h:0, w:0, b:0, a:1});
    // green
    expect(new Color({r:0, g:'255', b:0}).toHwb()).to.deep.equal({h:12/36, w:0, b:0, a:1});
    expect(new Color({h:'120deg', s:1, v:1}).toHwb()).to.deep.equal({h:12/36, w:0, b:0, a:1});
    expect(new Color({h:'120', s:1, l:0.5}).toHwb()).to.deep.equal({h:12/36, w:0, b:0, a:1});
    // blue
    expect(new Color({r:0, g:0, b:'255'}).toHwb()).to.deep.equal({h:24/36, w:0, b:0, a:1});
    expect(new Color({h:'240deg', s:1, v:1}).toHwb()).to.deep.equal({h:24/36, w:0, b:0, a:1});
    expect(new Color({h:'240', s:1, l:0.5}).toHwb()).to.deep.equal({h:24/36, w:0, b:0, a:1});
  });
});

describe('Color RegExp Testing', () => {
  it('CSS3 values outside boundaries', () => {
    const alpha = new Color('rgba(255,0,255,-5)');
    expect(alpha.toRgb()).to.deep.equal({r:255, g:0, b:255, a:1});
    expect(alpha.ok).to.be.true;
    const alpha1 = new Color('rgb(255 0 255 / 110%)');
    expect(alpha1.toRgb()).to.deep.equal({r:255, g:0, b:255, a:1});
    expect(alpha1.ok).to.be.true;
    const rgb = new Color('rgb(256,265,-1)');
    expect(rgb.toRgb()).to.deep.equal({r:255, g:255, b:0, a:1});
    expect(rgb.ok).to.be.true;
    const hsl = new Color('hsl(361,-102,101)');
    expect(hsl.toRgb()).to.deep.equal({r:255, g:255, b:255, a:1});
    expect(hsl.ok).to.be.true;
    const hsl2 = new Color('hsl(361,1.0,101)');
    expect(hsl2.toRgb()).to.deep.equal({r:255, g:255, b:255, a:1});
    expect(hsl2.ok).to.be.true;
    const hsv = new Color('hsv(-361,102,-101)');
    expect(hsv.toRgb()).to.deep.equal({r:0, g:0, b:0, a:1});
    expect(hsv.ok).to.be.true;
    const hwb = new Color('hwb(-360,-3,-0.5)');
    expect(hwb.toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
    expect(hwb.ok).to.be.true;
  });
  it('CSS3/CSS4 abnormal value spacing', () => {
    expect(new Color(' rgb( 255, 0,  0,   0.5 ) ').toRgb()).to.deep.equal({r:255, g:0, b:0, a:0.5});
    expect(new Color('hsl (120,  100,50,0.6 ) ').toRgb()).to.deep.equal({r:0, g:255, b:0, a:0.6});
    expect(new Color('hsv ( 240,100,100,0.7 )').toRgb()).to.deep.equal({r:0, g:0, b:255, a:0.7});
    expect(new Color('hwb ( 360 , 0, 0 , 0. 7 )').toRgb()).to.deep.equal({r:255, g:0, b:0, a:0});
  });
  it('CSS3 valid RGB value', () => {
    expect(new Color('rgba(255,0,0,0.5)').toRgb()).to.deep.equal({r:255, g:0, b:0, a:0.5});
    expect(new Color('rgba(0,255,0,0.6)').toRgb()).to.deep.equal({r:0, g:255, b:0, a:0.6});
    expect(new Color('rgba(0,0,255,0.7)').toRgb()).to.deep.equal({r:0, g:0, b:255, a:0.7});
  });
  it('CSS3/CSS4 permissive RGB value', () => {
    expect(new Color('rgb 255 0 0 50').toRgb()).to.deep.equal({r:255, g:0, b:0, a:0.5});
    expect(new Color('rgb 0 255 0 70').toRgb()).to.deep.equal({r:0, g:255, b:0, a:0.7});
    expect(new Color('rgb 0 0 255 25').toRgb()).to.deep.equal({r:0, g:0, b:255, a:0.25});
  });
  it('CSS3 valid percentage RGB value', () => {
    expect(new Color('rgba(100%, 0%, 0%, 0.5)').toRgb()).to.deep.equal({r:255, g:0, b:0, a:0.5});
    expect(new Color('rgba(0%, 100%, 0%, 0.1)').toRgb()).to.deep.equal({r:0, g:255, b:0, a:0.1});
    expect(new Color('rgba(0%, 0%, 100%, 0.3)').toRgb()).to.deep.equal({r:0, g:0, b:255, a:0.3});
    expect(new Color('rgba(100%, 0%, 0%, 50%)').toRgb()).to.deep.equal({r:255, g:0, b:0, a:0.5});
    expect(new Color('rgba(0%, 100%, 0%, 50%)').toRgb()).to.deep.equal({r:0, g:255, b:0, a:0.5});
    expect(new Color('rgba(0%, 0%, 100%, 30%)').toRgb()).to.deep.equal({r:0, g:0, b:255, a:0.3});
  });
  it('CSS4 valid RGB value', () => {
    expect(new Color('rgb(255 0 0)').toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
    expect(new Color('rgb(0 255 0)').toRgb()).to.deep.equal({r:0, g:255, b:0, a:1});
    expect(new Color('rgb(0 0 255)').toRgb()).to.deep.equal({r:0, g:0, b:255, a:1});
    expect(new Color('rgb(255 0 0 / 50%)').toRgb()).to.deep.equal({r:255, g:0, b:0, a:0.5});
    expect(new Color('rgb(0 255 0 / 25%)').toRgb()).to.deep.equal({r:0, g:255, b:0, a:0.25});
    expect(new Color('rgb(0 0 255 / 90%)').toRgb()).to.deep.equal({r:0, g:0, b:255, a:0.9});
  });
  it('CSS3 valid HSL value', () => {
    expect(new Color('hsl(0,100,50,0.3)').toRgb()).to.deep.equal({r:255, g:0, b:0, a:0.3});
    expect(new Color('hsl(120,100,50,0.7)').toRgb()).to.deep.equal({r:0, g:255, b:0, a:0.7});
    expect(new Color('hsl(240,100,50,0.5)').toRgb()).to.deep.equal({r:0, g:0, b:255, a:0.5});
  });
  it('CSS3/CSS4 permissive HSL value', () => {
    expect(new Color('hsl 0 100 50 60').toRgb()).to.deep.equal({r:255, g:0, b:0, a:0.6});
    expect(new Color('hsl 120 100 50 25').toRgb()).to.deep.equal({r:0, g:255, b:0, a:0.25});
    expect(new Color('hsl 240 100 50 35').toRgb()).to.deep.equal({r:0, g:0, b:255, a:0.35});
  });
  it('CSS4 valid HSL value', () => {
    expect(new Color('hsl(0deg 100% 50%)').toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
    expect(new Color('hsl(120deg 100% 50%)').toRgb()).to.deep.equal({r:0, g:255, b:0, a:1});
    expect(new Color('hsl(240deg 100% 50%)').toRgb()).to.deep.equal({r:0, g:0, b:255, a:1});
  });
  it('CSS4 valid HSL value with alpha', () => {
    expect(new Color('hsl(0deg 100% 50% / 40%)').toRgb()).to.deep.equal({r:255, g:0, b:0, a:0.4});
    expect(new Color('hsl(120deg 100% 50% / 30%)').toRgb()).to.deep.equal({r:0, g:255, b:0, a:0.3});
    expect(new Color('hsl(240deg 100% 50% / 80%)').toRgb()).to.deep.equal({r:0, g:0, b:255, a:0.8});
  });
  it('CSS3 valid HSV value', () => {
    expect(new Color('hsv(0,100,50)').toRgb()).to.deep.equal({r:127.5, g:0, b:0, a:1});
    expect(new Color('hsv(120,100,50)').toRgb()).to.deep.equal({r:0, g:127.5, b:0, a:1});
    expect(new Color('hsv(240,100,50)').toRgb()).to.deep.equal({r:0, g:0, b:127.5, a:1});
  });
  it('CSS3 valid HSV value with alpha', () => {
    expect(new Color('hsv(0,100,50,0.3)').toRgb()).to.deep.equal({r:127.5, g:0, b:0, a:0.3});
    expect(new Color('hsv(120,100,50,0.4)').toRgb()).to.deep.equal({r:0, g:127.5, b:0, a:0.4});
    expect(new Color('hsv(240,100,50,0.4)').toRgb()).to.deep.equal({r:0, g:0, b:127.5, a:0.4});
  });
  it('CSS3/CSS4 permissive HSV value', () => {
    expect(new Color('hsv 0 100 50 60').toRgb()).to.deep.equal({r:255/2, g:0, b:0, a:0.6});
    expect(new Color('hsv 120 100 50 70').toRgb()).to.deep.equal({r:0, g:255/2, b:0, a:0.7});
    expect(new Color('hsv 240 100 50 20').toRgb()).to.deep.equal({r:0, g:0, b:255/2, a:0.2});
  });
  it('CSS4 valid HSV value', () => {
    const color = new Color('hsv(0deg 100% 50% / 40%)');
    expect(color.toRgb()).to.deep.equal({r:127.5, g:0, b:0, a:0.4});
    expect(color.ok).to.be.true;
  });
  it('CSS4 valid HWB value', () => {
    const color = new Color('hwb(0deg 0% 50%)');
    expect(color.toRgb()).to.deep.equal({r:127.5, g:0, b:0, a:1});
    expect(color.ok).to.be.true;
  });
  it('CSS4 valid HWB value with alpha', () => {
    const color1 = new Color('hwb(0deg 0% 50% / 40%)');
    expect(color1.toRgb()).to.deep.equal({r:127.5, g:0, b:0, a:0.4});
    expect(color1.ok).to.be.true;
    const color2 = new Color('hwb(120deg 0% 50% / 60%)');
    expect(color2.toRgb()).to.deep.equal({r:0, g:127.5, b:0, a:0.6});
    expect(color2.ok).to.be.true;
    const color3 = new Color('hwb(240deg 0% 50% / 0.35)');
    expect(color3.toRgb()).to.deep.equal({r:0, g:0, b:127.5, a:0.35});
    expect(color3.ok).to.be.true;
  });
  it('CSS4 permissive HWB value with alpha', () => {
    const color = new Color('hwb 0 0 50 40');
    expect(color.toRgb()).to.deep.equal({r:127.5, g:0, b:0, a:0.4});
    expect(color.ok).to.be.true;
  });
  it('CSS3 valid HEX value', () => {
    const color = new Color('#ff0000');
    expect(color.toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
    expect(color.ok).to.be.true;
  });
  it('CSS4 valid HEX value with alpha', () => {
    const color = new Color('#ff000080');
    expect(color.toRgb()).to.deep.equal({r:255, g:0, b:0, a:0.5});
    expect(color.ok).to.be.true;
  });
});

describe('Color Greys', () => {
  it('test grey with all formats', () => {
    const rgbcolor = new Color('rgb(51,51,51,0.8)');
    expect(rgbcolor.toHex(true)).to.equal('333c');
    expect(rgbcolor.toHsl()).to.deep.equal({h:0, s:0, l:0.2, a:0.8});
    expect(rgbcolor.toHsv()).to.deep.equal({h:0, s:0, v:0.2, a:0.8});
    expect(rgbcolor.toHwb()).to.deep.equal({h:0, w:0.2, b:0.8, a:0.8});
    expect(rgbcolor.ok).to.be.true;

    const hexcolor = new Color('#333c');
    expect(hexcolor.toRgb()).to.deep.equal({r:51, g:51, b:51, a:0.8});
    expect(hexcolor.toHsl()).to.deep.equal({h:0, s:0, l:0.2, a:0.8});
    expect(hexcolor.toHsv()).to.deep.equal({h:0, s:0, v:0.2, a:0.8});
    expect(hexcolor.toHwb()).to.deep.equal({h:0, w:0.2, b:0.8, a:0.8});
    expect(hexcolor.ok).to.be.true;

    const hslcolor = new Color('hsl(0deg 0% 20% 80%)');
    expect(hslcolor.toRgb()).to.deep.equal({r:51, g:51, b:51, a:0.8});
    expect(hslcolor.toHex(true)).to.equal('333c');
    expect(hslcolor.toHsv()).to.deep.equal({h:0, s:0, v:0.2, a:0.8});
    expect(hslcolor.toHwb()).to.deep.equal({h:0, w:0.2, b:0.8, a:0.8});
    expect(hslcolor.ok).to.be.true;

    const hsvcolor = new Color('hsva(0,0%,20%,0.8)');
    expect(hsvcolor.toRgb()).to.deep.equal({r:51, g:51, b:51, a:0.8});
    expect(hsvcolor.toHex(true)).to.equal('333c');
    expect(hsvcolor.toHsl()).to.deep.equal({h:0, s:0, l:0.2, a:0.8});
    expect(hsvcolor.toHwb()).to.deep.equal({h:0, w:0.2, b:0.8, a:0.8});
    expect(hsvcolor.ok).to.be.true;

    const hwbcolor = new Color('hwb(0 20% 80% / 80%)');
    expect(hwbcolor.toRgb()).to.deep.equal({r:51, g:51, b:51, a:0.8});
    expect(hwbcolor.toHex(true)).to.equal('333c');
    expect(hwbcolor.toHsl()).to.deep.equal({h:0, s:0, l:0.2, a:0.8});
    expect(hwbcolor.toHsv()).to.deep.equal({h:0, s:0, v:0.2, a:0.8});
    expect(hwbcolor.ok).to.be.true;
  });
});

describe('Color Private Methods', () => {
  const color = new Color('rgb(255,0,0)');

  it('toRgb', () => {
    expect(color.toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
  });
  it('toHsl', () => {
    expect(color.toHsl()).to.deep.equal({h:0, s:1, l:0.5, a:1});
  });
  it('toHsv', () => {
    expect(color.toHsv()).to.deep.equal({h:0, s:1, v:1, a:1});
  });
  it('toHwb', () => {
    expect(color.toHwb()).to.deep.equal({h:0, w:0, b:0, a:1});
  });
  it('toHex & toHex short', () => {
    expect(color.toHex()).to.equal('ff0000');
    expect(color.toHex(true)).to.equal('f00');
    expect(color.clone().setAlpha(0.8).toHex8(true)).to.equal('f00c');
  });
  
  it('toString - all supported formats', () => {
    expect(color.toString()).to.equal('rgb(255, 0, 0)');
    expect(color.toRgbString()).to.equal('rgb(255, 0, 0)');
    expect(color.toRgbCSS4String()).to.equal('rgb(255 0 0)');
    expect(color.toHslString()).to.equal('hsl(0, 100%, 50%)');
    expect(color.toHslCSS4String()).to.equal('hsl(0deg 100% 50%)');
    expect(color.toHwbString()).to.equal('hwb(0deg 0% 0%)');
    expect(color.toHexString()).to.equal('#ff0000');
    expect(color.toHex8String()).to.equal('#ff0000ff');
    expect(color.toHexString(true)).to.equal('#f00');
    expect(color.toHex8String(true)).to.equal('#f00f');
    expect(color.clone().spin(120).setAlpha(0.8).toHexString()).to.equal('#00ff00cc');
    expect(color.clone().spin(240).setAlpha(0.8).toHex8String(true)).to.equal('#00fc');
  });
  
  it('all getters', () => {
    expect(color.isValid).to.be.true;
    expect(color.isDark).to.be.true;
    expect(Color.roundPart(color.brightness)).to.equal(76);
    expect(new Color('rgb(100%,0%,0%)').luminance).to.equal(0.2126);
    expect(new Color('rgb(0,255,0)').luminance).to.equal(0.7152);
    expect(new Color('rgb(0,0,255)').luminance).to.equal(0.0722);
    expect(new Color('hsl(0,100%,50%)').luminance).to.equal(0.2126);
    expect(new Color('hsl(120,100%,50%)').luminance).to.equal(0.7152);
    expect(new Color('hsl(240,100%,50%)').luminance).to.equal(0.0722);
    expect(new Color('hsl(0,100%,70%)').luminance).to.be.greaterThan(0.2126);
    expect(new Color('hsl(120,100%,40%)').luminance).to.be.lessThan(0.7152);
    expect(new Color('hsl(240,100%,40%)').luminance).to.be.lessThan(0.0722);
    expect(new Color('hsv(0,100%,100%)').luminance).to.equal(0.2126);
    expect(new Color('hsv(120,100%,100%)').luminance).to.equal(0.7152);
    expect(new Color('hsv(240,100%,100%)').luminance).to.equal(0.0722);
    expect(new Color('hsv(0,100%,20%)').luminance).to.be.lessThan(0.2126);
    expect(new Color('hsv(120,100%,20%)').luminance).to.be.lessThan(0.7152);
    expect(new Color('hsv(240,100%,10%)').luminance).to.be.lessThan(0.0722);
    expect(new Color('hwb(0 0% 0%)').luminance).to.equal(0.2126);
    expect(new Color('hwb(120 0% 0%)').luminance).to.equal(0.7152);
    expect(new Color('hwb(240 0% 0%)').luminance).to.equal(0.0722);
    expect(new Color('hwb(0 20% 0%)').luminance).to.be.greaterThan(0.2126);
    expect(new Color('hwb(120 0% 20%)').luminance).to.be.lessThan(0.7152);
    expect(new Color('hwb(240 0% 30%)').luminance).to.be.lessThan(0.0722);
  });
  
  it('clone', () => {
    expect(color.clone().toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
  });
  it('spin', () => {
    expect(color.clone().spin(120).toRgb()).to.deep.equal({r:0, g:255, b:0, a:1});
    expect(color.clone().spin(240).toRgb()).to.deep.equal({r:0, g:0, b:255, a:1});
    expect(color.clone().spin(360).toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
  });
  it('setAlpha', () => {
    const alpha = color.clone().setAlpha(0.5);
    expect(alpha.toRgb()).to.deep.equal({r:255, g:0, b:0, a:0.5});
    expect(alpha.ok).to.be.true;
  });
  it('lighten', () => {
    const lighten = color.clone().lighten(10);
    const {r,b,g,a} = lighten;
    expect({r: Math.round(r), g: Math.round(g), b: Math.round(b), a}).to.deep.equal({r:255, g:51, b:51, a:1});
    expect(lighten.ok).to.be.true;
  });
  it('darken', () => {
    const darken = color.clone().darken(10);
    const {r,b,g,a} = darken;
    expect({r: Math.round(r), g: Math.round(g), b: Math.round(b), a}).to.deep.equal({r:204, g:0, b:0, a:1});
    expect(darken.ok).to.be.true;
  });
  it('saturate', () => {
    const saturate = new Color('rgb(46, 56, 46)').saturate(10);
    const {r,b,g,a} = saturate;
    expect({r: Math.round(r), g: Math.round(g), b: Math.round(b), a}).to.deep.equal({r:41, g:61, b:41, a:1});
    expect(saturate.ok).to.be.true;
  });
  it('desaturate', () => {
    const desaturate = new Color('rgb(41, 61, 41)').desaturate(10);
    const {r,b,g,a} = desaturate;
    expect({r: Math.round(r), g: Math.round(g), b: Math.round(b), a}).to.deep.equal({r:46, g:56, b:46, a:1});
    expect(desaturate.ok).to.be.true;
  });
  it('greyscale', () => {
    const greyscale = new Color('rgb(41, 41, 61)').greyscale();
    const {r,b,g,a} = greyscale;
    expect({r: Color.roundPart(r), g: Color.roundPart(g), b: Color.roundPart(b), a}).to.deep.equal({r:51, g:51, b:51, a:1});
    expect(greyscale.ok).to.be.true;
  });
});