/// <reference types="cypress" />

// import ColorPicker from '../../src/js/color-picker';
// import ColorPickerElement from '../../src/js/color-picker-element';

import ColorPicker from '../instrumented/color-picker';
import ColorPickerElement from '../instrumented/color-picker-element';

import getCEMarkup from '../fixtures/getCEMarkup';

describe('ColorPickerElement Class Test', () => {

  beforeEach(() => {
    cy.visit('docs/test.html')
      .get('body').then((body) => {
        cy.wrap(body.get()[0]).as('body');
      })
      .wait(200);
  });

  it('Test init via `new ColorPickerElement()`', () => {
    const cpe = new ColorPickerElement();
    expect(cpe.isConnected).to.be.false;
    cy.get('@body').invoke('append', cpe)
      .get('color-picker').should('exist').and((cp) => {
          const [CP] = cp.get();
          expect(CP.isConnected).to.be.true;
          expect(CP.input).to.be.instanceOf(HTMLInputElement);
        });
  });

  it('Test init with parameters', () => {
    let value;
    let id;
    let format;
    cy.get('@body').then((body) => {
      ({value, id, format} = getCEMarkup(body));
      cy.get(`[data-id="cpe-${format}-${id}"]`).then((cpe) => {
        cy.wrap(cpe.get()).as('cp')
      })
    });
      
    cy.get('@cp').should(($cp) => {
      const [cpe] = $cp.get();
      cpe.connectedCallback();
      expect(cpe.isConnected).to.be.true;
      expect(cpe.input).to.be.instanceOf(HTMLInputElement);
      expect(cpe.colorPicker).to.be.instanceOf(ColorPicker);
      expect(cpe.value).to.equal(value);
    });

    cy.get('@cp').should(($cp) => {
      const [cpe] = $cp.get();
      cpe.disconnectedCallback();
      cpe.remove();
      
      expect(cpe.isConnected).to.be.false;
      expect(cpe.input).to.be.undefined;
      expect(cpe.colorPicker).to.be.undefined;
    });
  });

  it('Test adding markup and component specific methods', () => {
    const input = document.createElement('input');
    const cpe = document.createElement('color-picker');
    input.setAttribute('id', 'my-cp');
    input.setAttribute('value', 'fuchsia');
    cpe.append(input);

    cy.get('@body').invoke('append', cpe)
      .get('color-picker').then((el) => {
        cy.wrap(el.get()).as('cp')
      })
      .get('@cp').invoke('prop', 'isConnected').should('be.true')
      .get('@cp').invoke('prop', 'input').should('be.instanceOf', HTMLInputElement)
      .get('@cp').invoke('prop', 'colorPicker').should('be.instanceOf', ColorPicker)
      .get('@cp').should(($cp) => { 
        const [cp] = $cp.get();
        cp.disconnectedCallback()
        cp.remove();
        expect(cp.isConnected).to.be.false;
        expect(cp.input).to.be.undefined;
        expect(cp.colorPicker).to.be.undefined;
      })
      .get('@body').then((body) => {
        body.append(cpe);
      })
      .get('@cp').then((cp) => { cp.get()[0].connectedCallback() })
      .get('@cp').invoke('prop', 'isConnected').should('be.true')
      .get('@cp').invoke('prop', 'input').should('be.instanceOf', HTMLInputElement)
      .get('@cp').invoke('prop', 'colorPicker').should('be.instanceOf', ColorPicker)
  });

});