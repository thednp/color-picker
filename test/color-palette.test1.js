import ColorPalette from '../src/js/color-palette';

describe('Color', () => {
 
  it('initialize with no parameter', () => {
    expect(new ColorPalette()).toThrowError();
  });
  it.todo('init with valid value');
  it.todo('init with number value');
  it.todo('init with web color value');
})