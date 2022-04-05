/// <reference types="cypress" />

// import ColorPicker from '../../src/js/color-picker';
import ColorPicker from '../instrumented/color-picker';

describe('ColorPicker', () => {
 
  it('initialize with no parameter', () => {
    const args = [];
    try {
      new ColorPicker(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error).to.have.property('message', `ColorPicker target ${args[0]} cannot be found.`);
    }
  });
  // it.todo('init with valid value');
  // it.todo('init with number value');
  // it.todo('init with web color value');
});