/// <reference types="cypress" />

import Color from "@thednp/color";
import ColorPalette from "../../src/ts/colorPalette";

describe("ColorPalette Class Test", () => {
  it("Test init with no parameter, use all default values", () => {
    cy.wrap(new ColorPalette()).as("cpl")
      .get("@cpl").should("be.instanceOf", ColorPalette)
      .get("@cpl").its("hue").should("equal", 0)
      .get("@cpl").its("hueSteps").should("equal", 12)
      .get("@cpl").its("lightSteps").should("equal", 10)
      .get("@cpl").its("colors").its("length").should("equal", 120);
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

  // it("Test init with 1 parameter, throws error", () => {
  //   try {
  //     // @ts-ignore
  //     new ColorPalette(0, 'a');
  //   } catch (error) {
  //     expect(error).to.be.instanceOf(TypeError);
  //     expect(error).to.have.property(
  //       "message",
  //       'ColorPalette only accepts numbers.'
  //     );
  //   }
  // });

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

    cy.wrap(new ColorPalette(1, 5)).as("cpl")
      .get("@cpl").its("hue").should("equal", 0)
      .get("@cpl").its("hueSteps").should("equal", 1)
      .get("@cpl").its("lightSteps").should("equal", 5)
      .get("@cpl").its("saturation").should("equal", 100)
      .get("@cpl").its("colors").its("length").should("equal", 5)
      .get("@cpl").its("colors").then((colors) => {
        // really test every color in the palette
        colors.forEach((color: Color, i: number) => {
          cy.log(`${color.ok}`)
          expect(color).to.be.instanceOf(Color);
          // expect(color.ok).to.be.true;
          expect(color.toHexString()).to.equal(testSample[i]);
        });
      });
  });

  it("Test init with 14 lightSteps", () => {
    // generated with `new ColorPalette(1, 14)`
    const testSample = [
      "#330000", "#550000", "#770000", "#990000", "#bb0000",
      "#dd0000", "#ff0000", "#ff2222", "#ff4444", "#ff6666",
      "#ff8888", "#ffaaaa", "#ffcccc", "#ffeeee",
    ];

    cy.wrap(new ColorPalette(1, 14)).as("cpl")
      .get("@cpl").its("hue").should("equal", 0)
      .get("@cpl").its("hueSteps").should("equal", 1)
      .get("@cpl").its("lightSteps").should("equal", 14)
      .get("@cpl").its("colors").its("length").should("equal", 14)
      .get("@cpl").its("colors").then((colors) => {
        expect(colors.map((c: Color) => c.toHexString())).to.deep.equal(testSample);
      });
  });

  it("Test init with 15 lightSteps", () => {
    // generated with `new ColorPalette(1, 15)`
    const testSample = [
      "#110000", "#330000", "#550000", "#770000",
      "#990000", "#bb0000", "#dd0000", "#ff0000",
      "#ff2222", "#ff4444", "#ff6666", "#ff8888",
      "#ffaaaa", "#ffcccc", "#ffeeee",
    ];

    cy.wrap(new ColorPalette(1, 15)).as("cpl")
      .get("@cpl").its("hue").should("equal", 0)
      .get("@cpl").its("hueSteps").should("equal", 1)
      .get("@cpl").its("lightSteps").should("equal", 15)
      .get("@cpl").its("colors").its("length").should("equal", 15)
      .get("@cpl").its("colors").then((colors) => {
        expect(colors.map((c: Color) => c.toHexString())).to.deep.equal(testSample);
      });
  });

  it("Test init with 3 valid parameters", () => {
    // generated with `new ColorPalette(270, 1, 10)`
    const testSample = [
      "#240047", "#3b0075", "#5200a3", "#6900d1",
      "#8000ff", "#962eff", "#ad5cff", "#c48aff",
      "#dbb8ff", "#f2e6ff",
    ];

    cy.wrap(new ColorPalette(270, 1, 10)).as("cpl")
      .get("@cpl").its("hue").should("equal", 270)
      .get("@cpl").its("hueSteps").should("equal", 1)
      .get("@cpl").its("lightSteps").should("equal", 10)
      .get("@cpl").its("colors").its("length").should("equal", 10)
      .get("@cpl").its("colors").then((colors) => {
        expect(colors.map((c: Color) => c.toHexString())).to.deep.equal(testSample);
      });
  });
});
