/// <reference types="cypress" />

import Color from '../../src/js/color';

describe('Color Class Tests', () => {
  
  it('-- Color Initialization -- ', () => {});

  it('no parameter, returns default value', () => {
    const color = new Color();
    expect(color.toRgb()).to.deep.equal({r:0, g:0, b:0, a:1});
    expect(color.ok).to.be.true;
  });
  it('empty string is ignored, returns default value', () => {
    const color = new Color('');
    expect(color.toRgb()).to.deep.equal({r:0, g:0, b:0, a:1});
    expect(color.ok).be.true;
  });
  it('invalid value wombat is ignored, returns default value', () => {
    const color = new Color('wombat');
    expect(color.toRgb()).to.deep.equal({r:0, g:0, b:0, a:1});
    expect(color.ok).to.be.false;
  });
  it('incomplete value is ignored, returns default value', () => {
    const color = new Color('rgb 255 0');
    expect(color.toRgb()).to.deep.equal({r:0, g:0, b:0, a:1});
    expect(color.ok).to.be.false;
  });
  it('additional value is ignored, returns parsed value', () => {
    const color = new Color('rgb 255 0 0 0.5 0');
    expect(color.toRgb()).to.deep.equal({r:255, g:0, b:0, a:0.5});
    expect(color.ok).to.be.true;
  });
  it('"transparent" value, returns special value', () => {
    const color = new Color('transparent');
    expect(color.toRgb()).to.deep.equal({r:0, g:0, b:0, a:0});
    expect(color.ok).to.be.true;
  });
  it('implicit default value, returns default value', () => {
    const color = new Color('initial');
    expect(color.toRgb()).to.deep.equal({r:0, g:0, b:0, a:1});
    expect(color.ok).to.be.true;
  });
  it('web safe color, returns computed style value', () => {
    const red = new Color('red');
    expect(red.toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
    const white = new Color('white');
    expect(white.toRgb()).to.deep.equal({r:255, g:255, b:255, a:1});
    const black = new Color('black');
    expect(black.toRgb()).to.deep.equal({r:0, g:0, b:0, a:1});
  });
  it('"number" value is converted to HEX, returns converted value', () => {
    const color = new Color('069');
    expect(color.toRgb()).deep.equal({r:0, g:102, b:153, a:1});
    expect(color.ok).to.be.true;
  });
  it('HEX value without the "#" character, returns converted value', () => {
    const color = new Color('f00');
    expect(color.toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
    expect(color.ok).to.be.true;
  });
  it('set specific format', () => {
    expect(new Color('f00', 'hex').toString()).to.equal('#ff0000');
    expect(new Color('0f0', 'rgb').toString()).to.equal('rgb(0, 255, 0)');
    expect(new Color('00f', 'hwb').toString()).to.equal('hwb(240deg 0% 0%)');
    expect(new Color('f0f', 'hsl').toString()).to.equal('hsl(300, 100%, 50%)');
    expect(new Color('f0f', 'hsv').toString()).to.equal('rgb(255, 0, 255)'); // hsv is not supported, use rgb
  });

  it('-- Color Object to Object Testing --', () => {});

  it('any object to RGB, covers everything RGB', () => {
    // red
    expect(new Color({h:'-240', s: 1, l: 0.5}).toRgb()).to.deep.equal({r:0, g:255, b:0, a:1});
    expect(new Color({h:0, s: 1, v: 0.5}).toRgb()).to.deep.equal({r:255/2, g:0, b:0, a:1});
    expect(new Color({h:'0deg', w: 0, b: 0}).toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
    // green
    expect(new Color({h:'120', s:1, l:0.5}).toRgb()).to.deep.equal({r:0, g:255, b:0, a:1});
    expect(new Color({h:'120deg', s:1, v:0.5}).toRgb()).to.deep.equal({r:0, g:255/2, b:0, a:1});
    expect(new Color({h:'120', w:0, b:0}).toRgb()).to.deep.equal({r:0, g:255, b:0, a:1});
    // blue
    expect(new Color({h:'240', s:1, l:0.5}).toRgb()).to.deep.equal({r:0, g:0, b:255, a:1});
    expect(new Color({h:'240deg', s: 1, v:0.5}).toRgb()).to.deep.equal({r:0, g:0, b:255/2, a:1});
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

  it('-- Color RegExp Testing -- ', () => {});

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
    expect(new Color('hsv(0,100,50)').toRgb()).to.deep.equal({r:255/2, g:0, b:0, a:1});
    expect(new Color('hsv(120,100,50)').toRgb()).to.deep.equal({r:0, g:255/2, b:0, a:1});
    expect(new Color('hsv(240,100,50)').toRgb()).to.deep.equal({r:0, g:0, b:255/2, a:1});
    expect(new Color('hsv(0,100,50,0.3)').toRgb()).to.deep.equal({r:255/2, g:0, b:0, a:0.3});
    expect(new Color('hsv(120,100,50,0.4)').toRgb()).to.deep.equal({r:0, g:255/2, b:0, a:0.4});
    expect(new Color('hsv(240,100,50,0.4)').toRgb()).to.deep.equal({r:0, g:0, b:255/2, a:0.4});
  });
  it('CSS3/CSS4 permissive HSV value', () => {
    expect(new Color('hsv 0 100 50 60').toRgb()).to.deep.equal({r:255/2, g:0, b:0, a:0.6});
    expect(new Color('hsv 120 100 50 70').toRgb()).to.deep.equal({r:0, g:255/2, b:0, a:0.7});
    expect(new Color('hsv 240 100 50 20').toRgb()).to.deep.equal({r:0, g:0, b:255/2, a:0.2});
  });
  it('CSS4 valid HSV value', () => {
    expect(new Color('hsv(0deg 100% 50% / 40%)').toRgb()).to.deep.equal({r:255/2, g:0, b:0, a:0.4});
    expect(new Color('hsv(120deg 100% 50% / 20%)').toRgb()).to.deep.equal({r:0, g:255/2, b:0, a:0.2});
    expect(new Color('hsv(240deg 100% 50% / 10%)').toRgb()).to.deep.equal({r:0, g:0, b:255/2, a:0.1});
  });
  it('CSS4 valid HWB values', () => {
    expect(new Color('hwb(0deg 0% 50%)').toRgb()).to.deep.equal({r:255/2, g:0, b:0, a:1});
    expect(new Color('hwb(120deg 0% 50%)').toRgb()).to.deep.equal({r:0, g:255/2, b:0, a:1});
    expect(new Color('hwb(240deg 0% 50%)').toRgb()).to.deep.equal({r:0, g:0, b:255/2, a:1});
    expect(new Color('hwb(0deg 0% 50% / 40%)').toRgb()).to.deep.equal({r:255/2, g:0, b:0, a:0.4});
    expect(new Color('hwb(120deg 0% 50% / 60%)').toRgb()).to.deep.equal({r:0, g:255/2, b:0, a:0.6});
    expect(new Color('hwb(240deg 0% 50% / 0.35)').toRgb()).to.deep.equal({r:0, g:0, b:255/2, a:0.35});
  });
  it('CSS4 permissive HWB value with alpha', () => {
    expect(new Color('hwb 0 0 50 40').toRgb()).to.deep.equal({r:255/2, g:0, b:0, a:0.4});
    expect(new Color('hwb 120 0 50 10').toRgb()).to.deep.equal({r:0, g:255/2, b:0, a:0.1});
    expect(new Color('hwb 240 0 50 03').toRgb()).to.deep.equal({r:0, g:0, b:255/2, a:0.03});
  });
  it('CSS3 valid HEX value', () => {
    expect(new Color('#ff0000').toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
    expect(new Color('#00ff00').toRgb()).to.deep.equal({r:0, g:255, b:0, a:1});
    expect(new Color('#0000ff').toRgb()).to.deep.equal({r:0, g:0, b:255, a:1});
    expect(new Color('#ff000080').toRgb()).to.deep.equal({r:255, g:0, b:0, a:0.5});
    expect(new Color('#00ff0080').toRgb()).to.deep.equal({r:0, g:255, b:0, a:0.5});
    expect(new Color('#0000ff80').toRgb()).to.deep.equal({r:0, g:0, b:255, a:0.5});
  });

  it('-- Color Web Colors -- ', () => {
    cy.log('hand picked from https://en.wikipedia.org/wiki/Web_colors');
  });

  const sampleSet = [
    {name:"white",rgb:"rgb(255, 255, 255)",hex:"#ffffff",hsl:"hsl(0, 0%, 100%)",hsl4:"hsl(0deg 0% 100%)",hwb:"hwb(0deg 100% 0%)",hsv:{h:0,s:0,v:1,a:1}},
    {name:"black",rgb:"rgb(0, 0, 0)",hex:"#000000",hsl:"hsl(0, 0%, 0%)",hsl4:"hsl(0deg 0% 0%)",hwb:"hwb(0deg 0% 100%)",hsv:{h:0,s:0,v:0,a:1}},
    {name:"yellow",rgb:"rgb(255, 255, 0)",hex:"#ffff00",hsl:"hsl(60, 100%, 50%)",hsl4:"hsl(60deg 100% 50%)",hwb:"hwb(60deg 0% 0%)",hsv: {h: 0.167, s: 1, v: 1, a: 1}},
    {name:"green",rgb:"rgb(0, 128, 0)",hex:"#008000",hsl:"hsl(120, 100%, 25%)",hsl4:"hsl(120deg 100% 25%)",hwb:"hwb(120deg 0% 50%)",hsv: {h: 0.333, s: 1, v: 0.502, a: 1}},
    {name:"red",rgb:"rgb(255, 0, 0)",hex:"#ff0000",hsl:"hsl(0, 100%, 50%)",hsl4:"hsl(0deg 100% 50%)",hwb:"hwb(0deg 0% 0%)",hsv:{h:0,s:1,v:1,a:1}},
    {name:"pink",rgb:"rgb(255, 192, 203)",hex:"#ffc0cb",hsl:"hsl(350, 100%, 88%)",hsl4:"hsl(350deg 100% 88%)",hwb:"hwb(350deg 75% 0%)",hsv:{h:0.971,s:0.247,v:1,a:1}},
    {name:"brown",rgb:"rgb(165, 42, 42)",hex:"#a52a2a",hsl:"hsl(0, 59%, 41%)",hsl4:"hsl(0deg 59% 41%)",hwb:"hwb(0deg 16% 35%)",hsv:{h:0,s:0.745,v:0.647,a:1}},
    {name:"orange",rgb:"rgb(255, 165, 0)",hex:"#ffa500",hsl:"hsl(39, 100%, 50%)",hsl4:"hsl(39deg 100% 50%)",hwb:"hwb(39deg 0% 0%)",hsv:{h:0.108,s:1,v:1,a:1}},
    {name:"darkorange",rgb:"rgb(255, 140, 0)",hex:"#ff8c00",hsl:"hsl(33, 100%, 50%)",hsl4:"hsl(33deg 100% 50%)",hwb:"hwb(33deg 0% 0%)",hsv:{h:0.092,s:1,v:1,a:1}},
    {name:"cyan",rgb:"rgb(0, 255, 255)",hex:"#00ffff",hsl:"hsl(180, 100%, 50%)",hsl4:"hsl(180deg 100% 50%)",hwb:"hwb(180deg 0% 0%)",hsv:{h:0.5,s:1,v:1,a:1}},
    {name:"yellow",rgb:"rgb(255, 255, 0)",hex:"#ffff00",hsl:"hsl(60, 100%, 50%)",hsl4:"hsl(60deg 100% 50%)",hwb:"hwb(60deg 0% 0%)",hsv:{h:0.167,s:1,v:1,a:1}},
    {name:"navy",rgb:"rgb(0, 0, 128)",hex:"#000080",hsl:"hsl(240, 100%, 25%)",hsl4:"hsl(240deg 100% 25%)",hwb:"hwb(240deg 0% 50%)",hsv:{h:0.667,s:1,v:0.502,a:1}},
    {name:"orchid",rgb:"rgb(218, 112, 214)",hex:"#da70d6",hsl:"hsl(302, 59%, 65%)",hsl4:"hsl(302deg 59% 65%)",hwb:"hwb(302deg 44% 15%)",hsv:{h: 0.84, s: 0.486, v: 0.855, a: 1}},
    {name:"indigo",rgb:"rgb(75, 0, 130)",hex:"#4b0082",hsl:"hsl(275, 100%, 25%)",hsl4:"hsl(275deg 100% 25%)",hwb:"hwb(275deg 0% 49%)",hsv:{h: 0.763, s: 1, v: 0.51, a: 1}},
  ];
  
  it('checking some web colors', () => {
    sampleSet.forEach((c) => {
      const color = new Color(c.name);
      const {h,s,v} = color.toHsv();
      expect(color.ok).to.be.true;
      expect(color.luminance).to.be.finite;
      expect(color.brightness).to.be.finite;
      expect(color.toRgbString()).to.equal(c.rgb);
      expect(color.toHexString()).to.equal(c.hex);
      expect(color.toHwbString()).to.equal(c.hwb);
      expect(color.toHslString()).to.equal(c.hsl);
      expect(color.toHslCSS4String()).to.equal(c.hsl4);
      expect([h,s,v].map(x=>Math.round(x*10 ** 3) / 10 ** 3)).to.deep.equal([c.hsv.h, c.hsv.s, c.hsv.v]);
    });
  });

  it('-- Non Saturated Colors -- ', () => {});

  it('black and white', () => {
    const white = new Color('white');
    expect(white.toHexString(true)).to.equal('#fff');
    expect(white.toRgbString()).to.equal('rgb(255, 255, 255)');
    expect(white.toHslString()).to.equal('hsl(0, 0%, 100%)');
    expect(white.toHsv()).to.deep.equal({h:0, s:0, v:1, a:1});
    expect(white.toHwbString()).to.equal('hwb(0deg 100% 0%)');
    const black = new Color('black');
    expect(black.toHexString(true)).to.equal('#000');
    expect(black.toRgbString()).to.equal('rgb(0, 0, 0)');
    expect(black.toHslString()).to.equal('hsl(0, 0%, 0%)');
    expect(black.toHsv()).to.deep.equal({h:0, s:0, v:0, a:1});
    expect(black.toHwbString()).to.equal('hwb(0deg 0% 100%)');
  });
  it('test grey tints with all formats', () => {
    // darkish grey
    const rgbcolor = new Color('rgba(51,51,51,0.8)');
    expect(rgbcolor.toHexString(true)).to.equal('#333c');
    expect(rgbcolor.toHslString()).to.equal('hsla(0, 0%, 20%, 0.8)');
    expect(rgbcolor.toHsv()).to.deep.equal({h:0, s:0, v:0.2, a:0.8}); // hsv is not supported in current browsers
    expect(rgbcolor.toHwbString()).to.equal('hwb(0deg 20% 80% / 80%)');
    expect(rgbcolor.format).to.equal('rgb');

    const hslcolor = new Color('hsla(0, 0%, 33%, 0.4)');
    expect(hslcolor.toRgbString()).to.equal('rgba(84, 84, 84, 0.4)');
    expect(hslcolor.toHexString()).to.equal('#54545466');
    expect(hslcolor.toHsv()).to.deep.equal({h: 0, s: 0, v: 0.33, a: 0.4}); // hsv is not supported in current browsers
    expect(hslcolor.toHwbString()).to.equal('hwb(0deg 33% 67% / 40%)');
    expect(hslcolor.format).to.equal('hsl');
    
    const hsvcolor = new Color('hsva(0,0%,46.66%,0.2)');
    expect(hsvcolor.toRgbCSS4String()).to.equal('rgb(119 119 119 / 20%)');
    expect(hsvcolor.toHexString(true)).to.equal('#7773');
    expect(hsvcolor.toHslString()).to.equal('hsla(0, 0%, 47%, 0.2)');
    expect(hsvcolor.toHwbString()).to.equal('hwb(0deg 47% 53% / 20%)');
    expect(hsvcolor.format).to.equal('hsv');
    
    // lightish grey
    const hwbcolor = new Color('hwb(0 60% 40% / 80%)');
    expect(hwbcolor.toRgbString()).to.equal('rgba(153, 153, 153, 0.8)');
    expect(hwbcolor.toHexString(true)).to.equal('#999c');
    expect(hwbcolor.toHslCSS4String()).to.equal('hsl(0deg 0% 60% / 80%)');
    expect(hwbcolor.toHsv()).to.deep.equal({h: 0, s: 0, v: 0.6, a: 0.8});
    expect(hwbcolor.format).to.equal('hwb');

    const hexcolor = new Color('#bbbc');
    expect(hexcolor.toRgbString()).to.equal('rgba(187, 187, 187, 0.8)');
    expect(hexcolor.toHslString()).to.equal('hsla(0, 0%, 73%, 0.8)');
    // 0.2666666666666667 !== 0.26666666666666666 !== 11/15
    const { h: h1, s: s1, v: v1 } = hexcolor.toHsv();
    expect([h1, s1, v1].map(x => Math.round(x * 10 ** 6) / 10 ** 6)).to.deep.equal([0, 0, 0.733333]);
    expect(hexcolor.toHwbString()).to.equal('hwb(0deg 73% 27% / 80%)');
    expect(hexcolor.format).to.equal('hex');
  });

  const color = new Color('rgb(255,0,0)');
  it('-- Color Getters --', () => {
  
    expect(color.isValid).to.be.true;
    expect(color.isDark).to.be.true;
    expect(Color.roundPart(color.brightness)).to.equal(76);
    expect(color.luminance).to.equal(0.2126);
  });

  it('-- Color Export to String --', () => {});

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

  it('-- Color Manipulation --', () => {});

  it('clone', () => {
    expect(color.clone().toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
  });
  it('spin', () => {
    expect(color.clone().spin().toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
    expect(color.clone().spin(0).toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
    expect(color.clone().spin(120).toRgb()).to.deep.equal({r:0, g:255, b:0, a:1});
    expect(color.clone().spin(240).toRgb()).to.deep.equal({r:0, g:0, b:255, a:1});
    expect(color.clone().spin(360).toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
  });
  it('setAlpha', () => {
    expect(color.clone().setAlpha().toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
    expect(color.clone().setAlpha(0).toRgb()).to.deep.equal({r:255, g:0, b:0, a:0});
    expect(color.clone().setAlpha(1).toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
    expect(color.clone().setAlpha(0.5).toRgb()).to.deep.equal({r:255, g:0, b:0, a:0.5});
  });
  it('lighten', () => {
    expect(color.clone().lighten().toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
    let {r,b,g} = color.clone().lighten(10).toRgb();
    expect([r,g,b].map(Color.roundPart)).to.deep.equal([255, 51, 51]);
  });
  it('darken', () => {
    expect(color.clone().darken().toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
    const {r,b,g} = color.clone().darken(10).toRgb();
    expect([r,g,b].map(Color.roundPart)).to.deep.equal([204, 0, 0]);
  });
  it('saturate', () => {
    expect(color.clone().saturate().toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
    const {r,b,g} = new Color('rgb(46, 56, 46)').saturate(10).toRgb();
    expect([r,g,b].map(Color.roundPart)).to.deep.equal([41, 61, 41]);
  });
  it('desaturate', () => {
    expect(color.clone().desaturate().toRgb()).to.deep.equal({r:255, g:0, b:0, a:1});
    const {r,b,g} = new Color('rgb(41, 61, 41)').desaturate(10).toRgb();
    expect([r,g,b].map(Color.roundPart)).to.deep.equal([46, 56, 46]);
  });
  it('greyscale', () => {
    const {r,b,g} = new Color('rgb(41, 41, 61)').greyscale().toRgb();
    expect([r,g,b].map(Color.roundPart)).to.deep.equal([51, 51, 51]);
  });
});