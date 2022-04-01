import ColorPicker from '../src/js/color-picker';

describe('Color Picker', () => {
  // const instance = new Color();
  
  it('initialize with no parameter', () => {
    expect(new ColorPicker()).toThrowError();
  }); 
  it.todo('init with valid value');
  it.todo('init with number value');
  it.todo('init with web color value');
})