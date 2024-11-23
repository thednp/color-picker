import { expect, it, describe } from 'vitest';
import Color from "@thednp/color";
import ColorPalette from "~/ts/colorPalette";

describe("ColorPalette Class Test", () => {
  it("Test init with no parameter, use all default values", () => {
    const cpl = new ColorPalette();
    expect(cpl).to.be.instanceOf(ColorPalette);
    expect(cpl.hue).to.equal(0);
    expect(cpl.hueSteps).to.equal(12);
    expect(cpl.lightSteps).to.equal(10);
    expect(cpl.colors.length).to.equal(120);
  });

  it("Test init with 1 parameter, throws error", () => {
    try {
      new ColorPalette(0, undefined);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error).to.have.property(
        "message",
        'ColorPalette: the two minimum arguments must be numbers higher than 0.'
      );
    }
  });

  it("Test init with 2 invalid parameters, throws error", () => {
    try {
      new ColorPalette(0, 5);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error).to.have.property(
        "message",
        'ColorPalette: the two minimum arguments must be numbers higher than 0.'
      );
    }
  });

  it("Test init with 2 valid parameters", () => {
    // generated with new `ColorPalette(1, 5)`
    const testSample = ["#330000", "#990000", "#ff0000", "#ff6666", "#ffcccc"];
    const cpl = new ColorPalette(1, 5);

    expect(cpl).to.be.instanceOf(ColorPalette);
    expect(cpl.hue).to.equal(0);
    expect(cpl.hueSteps).to.equal(1);
    expect(cpl.lightSteps).to.equal(5);
    expect(cpl.saturation).to.equal(100);
    expect(cpl.colors.length).to.equal(5);

    cpl.colors.forEach((color, i) => {
      expect(color).to.be.instanceOf(Color);
      expect(color.toHexString()).to.equal(testSample[i]);
    })
  });

  it("Test init with 14 lightSteps", () => {
    // generated with `new ColorPalette(1, 14)`
    const testSample = [
      "#330000", "#550000", "#770000", "#990000", "#bb0000",
      "#dd0000", "#ff0000", "#ff2222", "#ff4444", "#ff6666",
      "#ff8888", "#ffaaaa", "#ffcccc", "#ffeeee",
    ];
    const cpl = new ColorPalette(1, 14);

    expect(cpl).to.be.instanceOf(ColorPalette);
    expect(cpl.hue).to.equal(0);
    expect(cpl.hueSteps).to.equal(1);
    expect(cpl.lightSteps).to.equal(14);
    expect(cpl.colors.length).to.equal(14);

    cpl.colors.forEach((color, i) => {
      expect(color).to.be.instanceOf(Color);
      // expect(color.ok).to.be.true;
      expect(color.toHexString()).to.equal(testSample[i]);
    })
  });

  it("Test init with 15 lightSteps", () => {
    // generated with `new ColorPalette(1, 15)`
    const testSample = [
      "#110000", "#330000", "#550000", "#770000",
      "#990000", "#bb0000", "#dd0000", "#ff0000",
      "#ff2222", "#ff4444", "#ff6666", "#ff8888",
      "#ffaaaa", "#ffcccc", "#ffeeee",
    ];
    const cpl = new ColorPalette(1, 15);

    expect(cpl).to.be.instanceOf(ColorPalette);
    expect(cpl.hue).to.equal(0);
    expect(cpl.hueSteps).to.equal(1);
    expect(cpl.lightSteps).to.equal(15);
    expect(cpl.colors.length).to.equal(15);

    cpl.colors.forEach((color, i) => {
      expect(color).to.be.instanceOf(Color);
      // expect(color.ok).to.be.true;
      expect(color.toHexString()).to.equal(testSample[i]);
    })
  });

  it("Test init with 3 valid parameters", () => {
    // generated with `new ColorPalette(270, 1, 10)`
    const testSample = [
      "#240047", "#3b0075", "#5200a3", "#6900d1",
      "#7f00ff", "#962eff", "#ad5cff", "#c48aff",
      "#dbb8ff", "#f2e5ff",
    ];
    const cpl = new ColorPalette(270, 1, 10);

    expect(cpl).to.be.instanceOf(ColorPalette);
    expect(cpl.hue).to.equal(270);
    expect(cpl.hueSteps).to.equal(1);
    expect(cpl.lightSteps).to.equal(10);
    expect(cpl.saturation).to.equal(100);
    expect(cpl.colors.length).to.equal(10);
    expect(cpl.colors.map(c => c.toHexString())).to.deep.equal(testSample);
  });

  it("Test init with 4 valid parameters", () => {
    // generated with `new ColorPalette(270, 1, 10)`
    const testSample = [
      "#240740", "#3b0c6a", "#521093", "#6915bc",
      "#7f19e6", "#9643ea", "#ad6cef", "#c495f3",
      "#dbbff8", "#f2e8fc",
    ];
    const cpl = new ColorPalette(270, 1, 10, 80);

    expect(cpl).to.be.instanceOf(ColorPalette);
    expect(cpl.hue).to.equal(270);
    expect(cpl.hueSteps).to.equal(1);
    expect(cpl.lightSteps).to.equal(10);
    expect(cpl.saturation).to.equal(80);
    expect(cpl.colors.length).to.equal(10);
    expect(cpl.colors.map(c => c.toHexString())).to.deep.equal(testSample);
  });
});
