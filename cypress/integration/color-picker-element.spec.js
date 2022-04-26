/// <reference types="cypress" />

import ColorPicker from '../../src/js/color-picker';
import ColorPalette from '../../src/js/color-palette';
import ColorPickerElement from '../../src/js/color-picker-element';

import getCEMarkup from '../fixtures/getCEMarkup';

describe('ColorPickerElement Class Test', () => {

  beforeEach(() => {
    cy.visit('cypress/test.html')
      .get('body').then((body) => {
        cy.wrap(body.get()[0]).as('body');
      })
      .wait(200);
  });

  it('Test init via `new ColorPickerElement()`', () => {
    const cpe = new ColorPickerElement();
    expect(cpe.isConnected).to.be.false;
    cy.get('@body').invoke('append', cpe)
      .get('color-picker').then((cp) => {
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
        cy.log(value, id, format)
          .get(`[data-id="cpe-${format}-${id}"]`).then(($cpe) => {
            const [cpe] = $cpe.get(); 
            cy.wrap(cpe).as('cp');
          })
      })

      .get('@cp').then(($cp) => {
        const [cpe] = $cp.get();
        cpe.connectedCallback();
        expect(cpe.isConnected).to.be.true;
        expect(cpe.input).to.be.instanceOf(HTMLInputElement);
        expect(cpe.colorPicker).to.be.instanceOf(ColorPicker);
        expect(cpe.colorPicker.colorPresets).to.be.instanceOf(Array);
        expect(cpe.shadowRoot).to.be.instanceOf(ShadowRoot);
        expect(cpe.shadowRoot.innerHTML).to.equal('<slot></slot>');
        expect(cpe.value).to.equal(value);
        expect(cpe.getAttribute('data-color-labels')).to.be.null;
        expect(cpe.getAttribute('data-component-labels')).to.be.null;
        expect(cpe.getAttribute('data-color-keywords')).to.be.null;
        expect(cpe.getAttribute('data-color-presets')).to.be.null;

        cpe.disconnectedCallback();
        cpe.remove();

        expect(cpe.getAttribute('data-component-labels')).to.not.be.null;
        expect(cpe.getAttribute('data-color-labels')).to.not.be.null;
        expect(cpe.getAttribute('data-color-presets')).to.not.be.null;
        expect(cpe.getAttribute('data-color-keywords')).to.not.be.null;
        setTimeout(() => {
          expect(cpe.input).to.be.undefined;
          expect(cpe.colorPicker).to.be.undefined;
          expect(cpe.isConnected).to.be.false;
          expect(cpe.shadowRoot.innerHTML).to.equal('');
        }, 0)
      });
  });

  it('Test adding markup and component specific methods', () => {
    const cpe = document.createElement('color-picker');
    cpe.setAttribute('data-id', 'my-cp');
    cpe.setAttribute('data-value', 'fuchsia');
    cpe.setAttribute('data-color-presets', `{"hue": 120, "hueSteps": 6, "lightSteps": 10}`);

    cy.get('@body').invoke('append', cpe)
      .get('color-picker').then((el) => {
        cy.wrap(el.get()).as('cp')
      })
      .get('@cp').invoke('prop', 'isConnected').should('be.true')
      .get('@cp').invoke('prop', 'input').should('be.instanceOf', HTMLInputElement)
      .get('@cp').invoke('prop', 'colorPicker').should('be.instanceOf', ColorPicker)
      .get('@cp').invoke('prop', 'colorPicker').its('colorPresets').should('be.instanceOf', ColorPalette)
      .get('@cp').invoke('prop', 'shadowRoot').should('be.instanceOf', ShadowRoot)
      .get('@cp').invoke('prop', 'shadowRoot').its('innerHTML').should('be.equal', '<slot></slot>')
      .get('@cp').should(($cp) => { 
        const [cp] = $cp.get();
        cp.disconnectedCallback()
        cp.remove();
        return cp;
      })
      .wait(34)
      .then(($cpe) => {
        const [cp] = $cpe.get();
        expect(cp.input).to.be.undefined;
        expect(cp.colorPicker).to.be.undefined;
        expect(cp.shadowRoot.innerHTML).to.equal('');
        expect(cp.isConnected).to.be.false;
      })
      .get('@body').then((body) => {
        body.append(cpe);
      })
      .get('@cp').then((cp) => { cp.get()[0].connectedCallback() })
      .get('@cp').invoke('prop', 'isConnected').should('be.true')
      .get('@cp').invoke('prop', 'input').should('be.instanceOf', HTMLInputElement)
      .get('@cp').invoke('prop', 'colorPicker').should('be.instanceOf', ColorPicker)
      .get('@cp').invoke('prop', 'shadowRoot').its('innerHTML').should('be.equal', '<slot></slot>')
  });

});