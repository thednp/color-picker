/// <reference types="cypress" />

// import Color from '../../src/js/color';
// import ColorPalette from '../../src/js/color-palette';
import Color from '../instrumented/color';
import ColorPalette from '../instrumented/color-palette';

describe('ColorPalette', () => {
 
  it('initialize with no parameter', () => {
    try {
      new ColorPalette();
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error).to.have.property('message', 'ColorPalette requires minimum 2 arguments');
    }
  });
  it('initialize with 1 parameter', () => {
    try {
      new ColorPalette(0);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error).to.have.property('message', 'ColorPalette requires minimum 2 arguments');
    }
  });
  it('initialize with 2 invalid parameters', () => {
    try {
      new ColorPalette(0,5);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error).to.have.property('message', 'ColorPalette: when 2 arguments used, both must be larger than 0.');
    }
  });
  it('init with 2 valid parameters', () => {
    const palette = new ColorPalette(1,5);
    const testSample = ['#330000','#990000','#ff0000','#ff6666','#ffcccc'];
    expect(palette.hue).to.equal(0);
    expect(palette.hueSteps).to.equal(1);
    expect(palette.lightSteps).to.equal(5);
    expect(palette.colors.length).to.equal(5);

    palette.colors.forEach((color, i) => {
      expect(color).to.be.instanceOf(Color);
      expect(color.ok).to.be.true;
      // really test every color in the palette
      expect(color.toHexString()).to.equal(testSample[i]);
      expect(color.luminance).to.be.lessThan(1);
      expect(color.luminance).to.be.greaterThan(0);
      expect(color.toHsl().h).to.be.lessThan(1);
      expect(color.toHsl().h).to.be.at.least(0);
    })
  });
  it('init with 3 valid parameters', () => {
    const palette = new ColorPalette(270, 1, 10);
    const testSample = ['#240047', '#3b0075', '#5200a3', '#6900d1', '#7f00ff', '#962eff', '#ad5cff', '#c48aff', '#dbb8ff', '#f2e5ff'];
    expect(palette.hue).to.equal(270);
    expect(palette.hueSteps).to.equal(1);
    expect(palette.lightSteps).to.equal(10);
    expect(palette.colors.length).to.equal(10);
    palette.colors.forEach((color, i) => {
      expect(color.ok).to.be.true;
      // really test every color in the palette
      if (i >= 0 && i < 10) {
        expect(color.toHexString()).to.equal(testSample[i]);
      }
      expect(color.luminance).to.be.lessThan(1);
      expect(color.luminance).to.be.greaterThan(0);
      expect(color.toHsl().h).to.be.lessThan(1);
      expect(color.toHsl().h).to.be.at.least(0);
    })
  });
});