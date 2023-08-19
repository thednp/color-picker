/// <reference types="cypress" />

import Color from '@thednp/color';
import ColorPalette from '../../src/ts/colorPalette';
import ColorPicker from '../../src/ts/index';
// import roundPart from '@thednp/color/src/util/roundPart';

import getRandomInt from '../fixtures/getRandomInt';
import FORMAT from '../fixtures/format';
import getMarkup from '../fixtures/getMarkup';
import componentLabelsFrench from '../fixtures/componentLabelsFrench';
import colorNamesFrench from '../fixtures/colorNamesFrench';

const colorNames = ['white', 'black', 'grey', 'red', 'orange', 'brown', 'gold', 'olive', 'yellow', 'lime', 'green', 'teal', 'cyan', 'blue', 'violet', 'magenta', 'pink'];
const colorNameValues = ['#fff', '#000', '#808080', '#f00', '#ffa500', '#653c24', '#c8af00', '#808000', '#ff0', '#0f0', '#080', '#075', '#0ff', '#05f', '#a7f', '#b0f', '#f0d'];
const colorPresets = '#470000,#750000,#a30000,#d10000,#ff0000,#ff2e2e,#ff5c5c,#ff8a8a,#ffb8b8,#ffe6e6,#004700,#007500,#00a300,#00d100,#00ff00,#2eff2e,#5cff5c,#8aff8a,#b8ffb8,#e6ffe6,#000047,#000075,#0000a3,#0000d1,#0000ff,#2e2eff,#5c5cff,#8a8aff,#b8b8ff,#e6e6ff';
const { roundPart } = Color;

describe('ColorPicker Class Test', () => {

  beforeEach(() => {
    cy.visit('cypress/test.html')
      .wait(200)
  });
 
  it('initialize with no parameter throws error', () => {
    // const args = [];
    try {
      // @ts-ignore
      new ColorPicker();
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error).to.have.property('message', `ColorPicker target not specified.`);
    }
  });

  it('inject incomplete markup and initialize, throws error', () => {
    cy.document().its('body').then((body) => {
      const cp = document.createElement('div');
      const input = document.createElement('input');
      cp.append(input)
      body.append(cp);

      cy.get('input').then((input) => {
        if (input.length) {
          try {
            new ColorPicker(input[0]);
          } catch (error) {
            expect(error).to.be.instanceOf(TypeError);
            expect(error).to.have.property('message', 'ColorPicker requires a specific markup to work.');
          }
        }
      })
    })
  });

  it('inject markup and initialize with all DATA API', () => {
    const id = getRandomInt(0,999);
    const format = FORMAT[getRandomInt(0,3)];
    const { init, selector } = ColorPicker;
    let value;

    cy.document().its('body').then((body) => {
      ({value} = getMarkup(body, id, format));
    });

    // cy.get(`#color-picker-${id}`).then(($input) => {
    cy.get('input').then(($input) => {
      cy.wrap($input[0]).as('input');
    });

    cy.get(`@input`).then(($input) => {
        const input = $input[0];
        input.setAttribute('value', "currentColor");
        input.setAttribute('data-function', "color-picker");
        input.setAttribute('data-color-presets', '{"hue": 120, "hueSteps": 6, "lightSteps": 10}');
        input.setAttribute('data-color-keywords', 'magenta, olive, yellow, red:default, currentColor:textColor');
        input.setAttribute('data-color-labels', colorNamesFrench);
        input.setAttribute('data-component-labels', '{"pickerLabel": "Couleur Sélection", "appearanceLabel": "Apparence de la couleur", "valueLabel": "Valeur de couleur", "toggleLabel": "Sélectionner la couleur", "presetsLabel": "Préréglages de couleur", "defaultsLabel": "Couleur par défaut", "formatLabel": "Format", "alphaLabel": "Alpha", "hexLabel": "Hexadécimal", "hueLabel": "Nuance", "whitenessLabel": "Blancheur", "blacknessLabel": "Noirceur", "saturationLabel": "Saturation", "lightnessLabel": "Légèreté", "redLabel": "Rouge", "greenLabel": "Vert", "blueLabel": "Bleu"}');
      });
      
    cy.document().should('not.be.undefined')
    cy.get('@input').should('exist')
    cy.document().invoke('querySelectorAll', selector).then((nodelist ) => {
      [...nodelist as NodeListOf<HTMLInputElement>].forEach(init);
    })

    cy.get('@input').then(($input) => {
      if ($input.length) {
        const cp = ColorPicker.getInstance($input[0] as HTMLInputElement);
        cy.wrap(cp).as('cp');
      }
    })

    cy.get('@cp').should('exist')
      .get('@cp').then(() => {
        cy.get('@cp').its('colorLabels').then((lbls) => {
          // console.log(lbls)
          expect(Object.values(lbls))
            .to.deep.equal(colorNamesFrench.split(','));
        })

        // .get('@input').should('be.instanceOf', HTMLInputElement)
        .get('@cp').its('format').should('equal', format)
        .get('@cp').its('value').should('not.equal', value) // not `value`
        .get('@cp').its('value').should('equal', new Color('#fff', format).toString(true)) // <- currentColor
        .get('@cp').its('colorKeywords').should('deep.equal', ['magenta', 'olive', 'yellow', 'red:default', 'currentColor:textColor'])
        .get('@cp').its('colorPresets').should('be.instanceOf', ColorPalette)
        .get('@cp').its('colorPresets').its('colors').each((c) => {
          expect(c).to.be.instanceOf(Color);
        })
        .get('@cp').its('colorPicker').should('be.instanceOf', HTMLDivElement)
        .get('@cp').its('colorMenu').should('be.instanceOf', HTMLDivElement);
      });
  });

  it('inject markup and initialize via JavaScript API', () => {
    cy.get('body').then((body) => {
      const id = getRandomInt(0,999);
      const format = FORMAT[getRandomInt(0,3)];
      const {value} = getMarkup(body, id, format);

      // cy.get(`#color-picker-${id}`).then((input) => {
      cy.get('input').then((input) => {
        
        if (input.length) {
          const cp = new ColorPicker(input[0], {
            colorKeywords: ['orange', 'lime', 'darkred'],
            colorPresets: '#330033, #990099, #ff00ff, #ff66ff, #ffccff',
            colorLabels: colorNamesFrench,
            componentLabels: componentLabelsFrench,
          });
          // console.log(cp)
          cy.wrap(cp).as('cp');
          cy.get('@cp').then(() => {
            cy.get('@cp').its('input').should('equal', input[0]);
            cy.get('@cp').its('format').should('equal', format);
            cy.get('@cp').its('value').should('equal', value);
            cy.get('@cp').its('colorPresets').should('be.instanceOf', Array);
            cy.get('@cp').its('colorLabels').then((lbls) => {
              // console.log(lbls)
              expect(Object.values(lbls))
                .to.deep.equal(colorNamesFrench.split(','));
            })
            cy.get('@cp').its('colorKeywords').should('deep.equal', ['orange', 'lime', 'darkred']);
            cy.get('@cp').its('colorPicker').should('be.instanceOf', HTMLDivElement);
            cy.get('@cp').its('colorMenu').should('be.instanceOf', HTMLDivElement);
          });
        }

      });
    });
  });

  it('inject markup and initialize with `colorKeywords`', () => {
    cy.get('body').then((body) => {
      const id = getRandomInt(0,999);
      const format = FORMAT[getRandomInt(0,3)];
      getMarkup(body, id, format);
      cy.get('input').then((input) => {
        if (input.length) {
          cy.wrap(new ColorPicker(input[0], {
            colorKeywords: 'orange, lime, darkred',
          })).as('cp');
          cy.get('@cp').then(() => {
            cy.get('@cp').its('colorKeywords').should('be.instanceOf', Array);
          });
        }
      });
    });
  });

  it('inject markup and initialize with `colorPresets`', () => {
    cy.get('body').then((body) => {
      const id = getRandomInt(0,999);
      const format = FORMAT[getRandomInt(0,3)];
      getMarkup(body, id, format);

      cy.get('input').then((input) => {
        if (input.length) {
          cy.wrap(new ColorPicker(input[0], {
            colorPresets: '#330033, #990099, #ff00ff, #ff66ff, #ffccff'.split(','),
          })).as('cp');
          cy.get('@cp').its('colorPresets').should('be.instanceOf', Array);
        }
      });
    });
  });  

  it('Test `pointer` event listeners', function() {
    cy.document().its('body').then((body) => {
      const id = getRandomInt(0,999);
      const format = FORMAT[getRandomInt(0,3)];
      getMarkup(body, id, format);

      cy.get(`input`).then((input) => {
          if (input.length) {
            cy.wrap(new ColorPicker(input[0])).as('cp');

            cy.log('Testing touch event listeners on `visuals`');
            cy.wrap(input[0]).focus().clear().type('hsl 0 100 50{enter}')
            cy.wait(50)
            cy.get('@cp').its('rgb').then((rgb) => {
                // cy.wait(17)

              cy.get('.visual-control').eq(0)
                .trigger('pointerdown', 0, 0, { eventConstructor: 'PointerEvent', force: true, pointerType: 'touch' })
                .trigger('pointermove', -5, -5, { eventConstructor: 'PointerEvent', force: true, pointerType: 'touch' })
                .trigger('pointermove', 500, 500, { eventConstructor: 'PointerEvent', force: true, pointerType: 'touch' })
                .trigger('pointermove', 100, 100, {eventConstructor: 'PointerEvent', force: true, pointerType: 'touch' })
                .trigger('pointerup', 100, 100, {eventConstructor: 'PointerEvent', force: true, pointerType: 'touch' })
                .then(() => {
                  cy.get('@cp').its('rgb').should('not.deep.equal', rgb);
                })
            });
          
            cy.wrap(input[0]).focus().clear().type('hsl 0 100 50{enter}')
              .get('@cp').its('rgb').then((rgb) => {
                cy.get('.visual-control').eq(1)
                  .trigger('pointerdown', 3, 0, { eventConstructor: 'PointerEvent', force: true, pointerType: 'touch' })
                  .trigger('pointermove', 0, -5, { eventConstructor: 'PointerEvent', force: true, pointerType: 'touch' })
                  .trigger('pointermove', 3, 500, { eventConstructor: 'PointerEvent', force: true, pointerType: 'touch' })
                  .trigger('pointermove', 3, 100, { eventConstructor: 'PointerEvent', force: true, pointerType: 'touch' })
                  .trigger('pointerup', 3, 100, { eventConstructor: 'PointerEvent', force: true, pointerType: 'touch' })
                  .then(() => {
                    cy.get('@cp').its('rgb').should('not.deep.equal', rgb);
                  })
              });
        
              cy.wrap(input[0]).focus().clear().type('hsl 0 100 50{enter}')
              cy.get('@cp').its('rgb').then((rgb) => {
                cy.get('.visual-control').eq(2)
                  .trigger('pointerdown', 3, 0, { eventConstructor: 'PointerEvent', force: true, pointerType: 'touch' })
                  .trigger('pointermove', 3, -5, { eventConstructor: 'PointerEvent', force: true, pointerType: 'touch' })
                  .trigger('pointermove', 3, 200, { eventConstructor: 'PointerEvent', force: true, pointerType: 'touch' })
                  .trigger('pointermove', 3, 500, { eventConstructor: 'PointerEvent', force: true, pointerType: 'touch' })
                  .trigger('pointermove', 3, 100, { eventConstructor: 'PointerEvent', force: true, pointerType: 'touch' })
                  .trigger('pointerup', 3, 100, { eventConstructor: 'PointerEvent', force: true, pointerType: 'touch' })
                  .then(() => {
                    cy.wait(17)
                    .get('@cp').its('rgb').should('not.deep.equal', rgb);
                  })
              });
          }
        });
    });

  });

  it('Test showing & hiding `colorPicker` / `presetsMenu`', function() {
    cy.document().its('body').then((body) => {
      const id = getRandomInt(0,999);
      const format = FORMAT[getRandomInt(0,3)];
      getMarkup(body, id, format);

      // cy.wrap(a).as('a');
      // cy.get(`#color-picker-${id}`).then((input) => {
      cy.get('input').then((input) => {
        cy.wrap(input[0]).as('input');
      });
    });

    cy.wait(200)
    cy.get('@input').then(($input) => {
        let cp;
        if ($input.length) {
          cp = new ColorPicker($input[0] as HTMLInputElement, {
            colorKeywords: 'olive,green,red,:empty,transparent',
            colorPresets: colorPresets,
            colorLabels: colorNamesFrench,
          });
        }
        cy.wrap(cp).as('cp');
      })
    cy.wait(200);

    cy.log('Testing `click` on `pickerToggle`');
    cy.get('.picker-toggle').click()
    cy.get('.color-dropdown.picker').should('have.class', 'show')
    cy.get('@cp').invoke('hide');

    cy.wait(17);

    cy.log('Testing `click` on `menuToggle`');
    cy.get('.menu-toggle').click()
    cy.get('.color-dropdown.menu').should('have.class', 'show')
    cy.wait(17)
    cy.get('.menu-toggle').click()
    cy.get('.color-dropdown.menu').should('not.have.class', 'show');

    cy.wait(17);
    
    cy.log('Testing `keydown` on `pickerToggle`');
    // trigger('keydown') won't work with <div> elements
    cy.get('.picker-toggle').focus().type('{enter}')
    cy.wait(17)
    cy.get('.color-dropdown.picker').should('have.class', 'show')
    cy.wait(17)
    cy.get('.picker-toggle').type('{enter}')
    cy.wait(17)
    cy.get('.color-dropdown.picker').should('not.have.class', 'show');

    cy.wait(17);

    cy.log('Testing `keydown` on `menuToggle`');
    // `menuToggle` is not focusable until open
    cy.get('@cp').invoke('showPicker')
    cy.wait(17)
      // trigger('keydown') won't work with <div> elements
    cy.get('.menu-toggle').focus().type('{enter}')
    cy.wait(17)
    cy.get('.color-dropdown.menu').should('have.class', 'show')
    cy.wait(17)
    cy.get('.menu-toggle').type('{enter}')
    cy.wait(17)
    cy.get('.color-dropdown.menu').should('not.have.class', 'show');

    cy.wait(17);

    cy.log('Testing `focusin` on `input`');
    cy.get('@input').focus().then(() => {
      cy.get('.color-dropdown.picker').should('have.class', 'show');
    });

    cy.wait(17);

    cy.log('Testing `focusout` on `input`');

    cy.get('a.my-link').eq(0).click({force: true})
    cy.get('.color-dropdown.picker').should('not.have.class', 'show')

    cy.wait(17);

    cy.log('Testing `pointerup` on body while `colorPicker` is open');
    cy.get('@cp').invoke('togglePicker')
      cy.wait(17)
      cy.get('body').click('topRight').then(() => {
        cy.wait(17);
        cy.get('.color-dropdown.picker').should('not.have.class', 'show');
      });

    cy.wait(17);
    cy.log('Type in `transparent` and press `enter`');
    cy.get('@input').focus().clear().type('transparent{enter}')
    cy.get('@cp').its('rgb').then(({r,g,b,a}) => {
        expect([...[r,g,b].map(roundPart), a]).to.deep.equal([0,0,0,0]);
      });

    cy.log('type in `currentColor` and press `enter`');
    cy.get('@input').focus().clear().type('currentColor{enter}')
    cy.get('@cp').its('rgb').then(({r,g,b,a}) => {
        expect([...[r,g,b].map(roundPart), a]).to.deep.equal([0,0,0,1]);
      });

    cy.log('Type in an invalid value and press `enter`, should reset value')
    cy.wait(17)
    cy.get('@cp').invoke('showPicker')
    cy.get('@input').focus().clear().type('wombat{enter}').then(() => {
        cy.get('@cp').its('value').should('not.equal', 'wombat');
      });

    cy.log('Type in a valid value and call `hide`, should keep previous value');
    cy.get('@cp').invoke('showPicker')
    cy.get('@input').focus().clear().type('hsl 0 0 100')
    cy.wait(17)
    cy.get('@cp').invoke('hide')
    cy.wait(17)
    cy.get('@cp').its('rgb').should(({ r,g,b }) => {
        expect([r,g,b].map(roundPart)).to.not.deep.equal([255,255,255]);
      })
      cy.get('@cp').its('value').should('not.equal', 'hsl 0 0 100');
  });


  it('Test `keyboard` event listeners', function() {
    let value: unknown;
    cy.document().its('body').then((body) => {
      const id = getRandomInt(0,999);
      const format = FORMAT[getRandomInt(0,3)];

      ({value} = getMarkup(body, id, format));

      cy.get(`#color-picker-${id}`).then((input) => {
      // cy.get('input').then((input) => {
        cy.wrap(input[0]).as('input');
      });
    });

    cy.get('@input').then(($input) => {
      let cp;
      if ($input.length) {
        cp = new ColorPicker($input[0] as HTMLInputElement, {
          colorKeywords: 'olive,green,red,:empty,transparent',
          colorPresets: colorPresets,
          colorLabels: colorNamesFrench,
        });
      }
      cy.wrap(cp).as('cp');
    });

    cy.log('Type in a valid value and press `Escape`, should keep previous value');
    cy.get('@cp').invoke('showPicker')
      .get('@input').focus().clear().type('hsl 0 0 100')
      .wait(17)
      .get('@input').trigger('keyup', { code: 'Escape' })
      .wait(17)
      .get('@cp').its('rgb').should(({ r,g,b }) => {
        expect([r,g,b].map(roundPart)).to.not.deep.equal([255,255,255]);
      })
      .get('@cp').its('value').should('not.equal', 'hsl 0 0 100');

    cy.wait(17);

    cy.log('Testing `keyboard` events on `colorKeywords`');
    cy.get('@cp').invoke('toggleMenu');
    cy.wait(17);
    cy.get('.color-defaults li').eq(0).focus().trigger('keydown', { code: 'ArrowRight' }).then(() => {
      cy.get('.color-defaults li').eq(1).should('be.focused');        
    });
    
    cy.get('.color-defaults li').eq(1).trigger('keydown', { code: 'ArrowLeft' }).then(() => {
      cy.get('.color-defaults li').eq(0).should('be.focused');        
    });;
    cy.get('.color-defaults li').eq(0).focus().trigger('keydown', { code: 'ArrowDown' }).then(() => {
      cy.get('.color-defaults li').eq(1).should('be.focused');        
    });
    cy.get('.color-defaults li').eq(1).trigger('keydown', { code: 'ArrowUp' }).then(() => {
      cy.get('.color-defaults li').eq(0).should('be.focused');        
    });
    cy.log('set a color keyword as active');
    cy.get('@cp').its('value').then((value) => {
      cy.get('.color-defaults li').eq(0).trigger('keydown', { code: 'Enter' }).then(() => {
        cy.get('.color-defaults li').eq(0).should('have.class', 'active');
        cy.get('@cp').its('value').should('not.equal', value);
      });
    });
    cy.contains('transparent').click().then(() => {
      cy.get('.color-defaults li').eq(0).should('not.have.class', 'active');
      cy.contains('transparent').should('have.class', 'active');
      cy.get('@cp').its('value').should('equal', 'transparent');
    });
    cy.contains('empty').click().then(() => {
      cy.contains('transparent').should('have.class', 'active');
      cy.get('@cp').its('value').should('not.equal', 'empty');
    });

    cy.log('Testing `keyboard` events on `colorOptions`');
    cy.get('.color-options li').eq(0).focus().trigger('keydown', { code: 'ArrowRight' }).then(() => {
      cy.get('.color-options li').eq(1).should('be.focused');        
    });
    
    cy.get('.color-options li').eq(1).trigger('keydown', { code: 'ArrowLeft' }).then(() => {
      cy.get('.color-options li').eq(0).should('be.focused');        
    });;
    cy.get('.color-options li').eq(0).focus().trigger('keydown', { code: 'ArrowDown' }).then(() => {
      cy.get('.color-options li').eq(10).should('be.focused');        
    });
    cy.get('.color-options li').eq(10).trigger('keydown', { code: 'ArrowUp' }).then(() => {
      cy.get('.color-options li').eq(0).should('be.focused');        
    });;

    cy.log('Test setting a color option as active');
    cy.get('.color-options li').eq(0).trigger('keydown', { code: 'Enter' }).then(() => {
      cy.get('.color-options li').eq(0).should('have.class', 'active');
      cy.get('@cp').its('value').should('not.equal', value);
    });
    cy.get('.color-options li').eq(1).click().then(() => {
      cy.get('.color-options li').eq(0).should('not.have.class', 'active');
      cy.get('.color-options li').eq(1).should('have.class', 'active');
      cy.get('@cp').its('value').should('not.equal', value);
    });

    cy.log('Test removing active class from color option');
    cy.get('@cp').invoke('togglePicker');
    cy.wait(17);
    cy.get('.visual-control').eq(0).click().then(() => {
      cy.get('.color-options li').eq(1).should('not.have.class', 'active');
    });


    cy.log('Test dismiss on `Escape`');
    cy.get('@input').focus().then(() => {
        cy.wait(17);
        cy.get('@cp').its('colorPicker').should('have.class', 'show');
      })
      .wait(17)
      .document().trigger('keyup', { code: 'Escape' })
      .wait(17)
      .get('@cp').its('colorPicker').should('not.have.class', 'show');
  });


  it('Test `scroll` event listeners', function() {
    const id = getRandomInt(0,999);
    const format = FORMAT[getRandomInt(0,3)];

    cy.get('body').should('exist').then((body) => {
      // const win = body[0].ownerDocument.defaultView;
      cy.log('Test repositioning dropdown on scroll');
      if (body) {
        getMarkup(body, id, format);
      }
    })
    cy.get(`input`).should('exist').then((input) => {
      if (!input.length || !input[0]) return;
      const cp = new ColorPicker(input[0] as HTMLInputElement, {
        colorKeywords: 'olive,green,red,:empty,transparent',
        colorPresets: colorPresets,
        colorLabels: colorNamesFrench,
      });

      cp.togglePicker();

      cy.scrollTo('top')
        .wait(100)
        .then(() => {
          cy.log(`html.scrollY is expected to be 0`)
          expect(input[0].ownerDocument.defaultView?.scrollY).to.equal(0)
    
          expect(cp.colorPicker).to.not.have.class('bottom');
          expect(cp.colorPicker).to.have.class('top');
        })

      // TO DO - validate a switch
      // cy.scrollTo('bottom')
      //   .wait(100)
      //   .then((win) => {
      //     cy.log(`html.scrollY is expected to not be 0`)
      //     // cy.wait(200);
      //     expect(win.scrollY).to.not.equal(0)

      //     expect(cp.colorPicker).to.have.class('bottom');
      //     expect(cp.colorPicker).to.not.have.class('top');
      //   })
    })
  });


  it('Test controls mouse & keyboard events', function() {
    cy.get('body').then((body) => {
      const id = getRandomInt(0,999);
      const format = FORMAT[getRandomInt(0,3)];

      getMarkup(body, id, format);

      // cy.get(`#color-picker-${id}`).then((input) => {
      cy.get('input').then((input) => {
        let cp;
        if (input.length) {
          cp = new ColorPicker(input[0], {
            colorKeywords: 'green,green,red,transparent',
            colorPresets: colorPresets,
          });
        }
        cy.wrap(input[0]).as('input');
        cy.wrap(cp).as('cp');
      });

      cy.log('Testing `click` on `visuals`');
      cy.get('@input').focus().clear().type('hsl 0 100 50{enter}').then(() => {
        cy.get('.visual-control').eq(0).click()
          .wait(17)
          .get('@cp').its('rgb').should(({ r,g,b }) => {
            expect([r,g,b].map(roundPart)).to.not.deep.equal([255, 0, 0]);
          });
      });
  
      cy.get('@input').focus().clear().type('hsl 300 100 50{enter}').then(() => {
        // cy.get('@cp').its('rgb').then(rgb => console.log(rgb))

        cy.get('.visual-control').eq(1).click(0, -0.6, { force: true })
          .wait(17)
          .get('@cp').its('rgb').should(({ r,g,b }) => {
            expect([r,g,b].map(roundPart)).to.not.deep.equal([255,0,255]);
          });
      })
  
      cy.get('@input').focus().clear().type('hsl 120 100 50{enter}').then(() => {
        cy.get('.visual-control').eq(2).click({ force: true })
          .wait(17)
          .get('@cp').its('rgb').should(({ r,g,b,a }) => {
            expect([...[r,g,b].map(roundPart), a]).to.deep.equal([0,255,0, 0.5]);
          });
      });
  
      cy.log('Testing mouse event listeners on `controlKnobs`');
      cy.get('@input').focus().clear().type('hsl 0 100 50{enter}')
      cy.get('@cp').its('rgb').then((rgb) => {
          cy.get('.visual-control').eq(0).then((visual) => {
            const { width, height} = visual[0].getBoundingClientRect();
            
            cy.get('.knob').eq(0)
              .trigger('pointerdown', { eventConstructor: 'PointerEvent', force: true })
              .trigger('pointermove', -width, -height, { eventConstructor: 'PointerEvent', force: true })
              .trigger('pointermove', -width - 100, -height - 100, { eventConstructor: 'PointerEvent', force: true })
              .trigger('pointermove', 300, 300, { eventConstructor: 'PointerEvent', force: true })
              .trigger('pointermove', -width + 50, -height + 50, { eventConstructor: 'PointerEvent', force: true })
              // .wait(17)
              .get('@cp').its('rgb').should('not.deep.equal', rgb);
          });
        });
  
      cy.get('@input').focus().clear().type('hsl 0 100 50{enter}')
        .get('@cp').its('rgb').then((rgb) => {
          cy.get('.visual-control').eq(1).then((visual) => {
            const { width, height } = visual[0].getBoundingClientRect();
  
            cy.get('.knob').eq(1)
              .trigger('pointerdown', { eventConstructor: 'PointerEvent', force: true })
              .trigger('pointermove', width / 2, -height - 100, { eventConstructor: 'PointerEvent', force: true })
              .trigger('pointermove', width / 2, 300, { eventConstructor: 'PointerEvent', force: true })
              .trigger('pointermove', width / 2, -height + 20, { eventConstructor: 'PointerEvent', force: true })
              // .wait(17)
              .get('@cp').its('rgb').should('not.deep.equal', rgb);
            });
          });
  
      cy.get('@input').focus().clear().type('hsl 0 100 50{enter}')
        .get('@cp').its('rgb').then((rgb) => {
          cy.get('.visual-control').eq(2).then((visual) => {
            const { width, height } = visual[0].getBoundingClientRect();
  
            cy.get('.knob').eq(2)
              .trigger('pointerdown', { eventConstructor: 'PointerEvent', force: true })
              .trigger('pointermove', width / 2, -height - 100, { eventConstructor: 'PointerEvent', force: true })
              .trigger('pointermove', width / 2, 300, { eventConstructor: 'PointerEvent', force: true })
              .trigger('pointermove', width / 2, -height + 20, { eventConstructor: 'PointerEvent', force: true })
              // .wait(17)
              .get('@cp').its('rgb').should('not.deep.equal', rgb);
            });
          });
  
  
      cy.log('Testing keyboard event listeners on `controlKnobs`');
      cy.get('@input').focus().clear().type('hsl 300 100 50{enter}').then(() => {
        const rgb = cy.get('@cp').its('rgb');
        cy.get('.knob').eq(0).focus()
          .trigger('keydown', { code: 'ArrowDown' })
          .trigger('keydown', { code: 'ArrowDown' })
          .trigger('keydown', { code: 'a' }) // edge case
          .trigger('keydown', { code: 'ArrowUp' })
          .trigger('keydown', { code: 'ArrowRight' })
          .trigger('keydown', { code: 'ArrowRight' })
          .trigger('keydown', { code: 'ArrowLeft' })
          // .wait(17)
          .get('@cp').its('rgb').should('not.deep.equal', rgb);
      });
  
      cy.get('@input').focus().clear().type('hsl 180 100 50{enter}').then(() => {
        const rgb = cy.get('@cp').its('rgb');
        cy.get('.knob').eq(1).focus()
          .trigger('keydown', { code: 'ArrowDown' })
          .trigger('keydown', { code: 'ArrowDown' })
          .trigger('keydown', { code: 'b' }) // edge case
          .trigger('keydown', { code: 'ArrowUp' })
          .trigger('keydown', { code: 'ArrowLeft' })
          .trigger('keydown', { code: 'ArrowLeft' })
          .trigger('keydown', { code: 'ArrowRight' })
          // .wait(17)
          .get('@cp').its('rgb').should('not.deep.equal', rgb);
      });
  
      cy.get('@input').focus().clear().type('hsl 0 100 50{enter}').then(() => {
        const rgb = cy.get('@cp').its('rgb');
        cy.get('.knob').eq(2).focus()
          .trigger('keydown', { code: 'ArrowDown' })
          .trigger('keydown', { code: 'ArrowDown' })
          .trigger('keydown', { code: 'C' }) // edge case
          .trigger('keydown', { code: 'ArrowUp' })
          .trigger('keydown', { code: 'ArrowLeft' })
          .trigger('keydown', { code: 'ArrowLeft' })
          .trigger('keydown', { code: 'ArrowRight' })
          // .wait(17)
          .get('@cp').its('rgb').should('not.deep.equal', rgb);
      });      
    });
  });


  it('Test private methods', function() {
    cy.get('body').then((body) => {
      const id = getRandomInt(0,999);
      const format = FORMAT[getRandomInt(0,3)];

      getMarkup(body, id, format);

      // cy.get(`#color-picker-${id}`).then((input) => {
      cy.get('input').then((input) => {
        let cp;
        if (input.length) {
          cp = new ColorPicker(input[0], {
            colorKeywords: 'green,green,red,transparent',
            colorPresets: colorPresets,
          });
        }
        cy.wrap(cp).as('cp');
      });

      cy.log('Testing `togglePicker`');
      cy.get('@cp').invoke('togglePicker')
      // .then(() => {
        cy.get('.color-dropdown')
        .should('have.class', 'picker')
        .and('have.class', 'show');
      // });
      // cy.wait(17);
      cy.get('@cp').invoke('togglePicker')
      // .then(() => {
        cy.get('.color-dropdown')
        .should('have.class', 'picker')
        .and('not.have.class', 'show');
      // });
      
      // cy.wait(17);

      cy.log('Testing `toggleMenu`');
      cy.get('@cp').invoke('toggleMenu')
      // .then(() => {
        cy.get('.color-dropdown')
        .should('have.class', 'menu')
        .and('have.class', 'show');
      // });
      // cy.wait(17);
      cy.get('@cp').invoke('toggleMenu')
      // .then(() => {
        cy.get('.color-dropdown')
        .should('have.class', 'menu')
        .and('not.have.class', 'show');
      // });

      // cy.wait(17);

      cy.log('Testing `showPicker`');
      cy.get('@cp').invoke('showPicker')
      // .then(() => {
        cy.get('.color-dropdown')
        .should('have.class', 'picker')
        .and('have.class', 'show');
      // });

      // cy.wait(17);

      cy.log('Testing `hide`');
      cy.get('@cp').invoke('hide')
      // .then(() => {
        cy.get('.color-dropdown')
        .and('not.have.class', 'show');
      // });

      // cy.wait(17);

      cy.log('Testing `dispose`');
      cy.get('@cp').invoke('dispose')
      // .then(() => {
        cy.get('.color-dropdown')
        .should((dropdown) => {
          expect(dropdown).to.not.exist;
        });
      // });
    });
  });

  it('Test color appearance and color luminance', () => {
    const frenchColors = colorNamesFrench.split(',');

    cy.document().its('body').then((body) => {
      const id = getRandomInt(0,999);
      const format = FORMAT[getRandomInt(0,3)];

      getMarkup(body, id, format);

      cy.get(`input`).then(($input) => {
        let cp;
        
        if ($input.length) {
          cp = new ColorPicker($input[0] as HTMLInputElement, {
            colorKeywords: 'olive,green,red,transparent',
            colorPresets: colorPresets,
            colorLabels: colorNamesFrench,
          });
        }
        cy.wrap(cp).as('cp');
      })
    });

    frenchColors.forEach((color) => {
      const webcolor = colorNameValues[frenchColors.indexOf(color)];
      cy.get('input').eq(0).focus().clear().type(`${webcolor}`)
        .get('@cp').its('isValid').should('be.true')
        .get('input').eq(0).type('{enter}')
        .get('@cp').its('appearance').should('be.equal', color);

      if (colorNames[frenchColors.indexOf(color)] === 'white') {
        cy.get('@cp').its('luminance').should('be.greaterThan', 0.99);
      } else {
        cy.get('@cp').its('luminance').should('be.lessThan', 0.99);
      }
      cy.wait(17);
    });      
  });

  FORMAT.forEach((format) => {
    it(`Test format specific event listeners - ${format.toUpperCase()}`, function() {
      cy.get('body').then((body) => {
        const id = getRandomInt(0,999);

        getMarkup(body, id, format);
  
        cy.get('input').then(($input) => {
          let cp: unknown | ColorPicker;
          if ($input.length) {
            const [input] = $input;
            input.value = '';
            cp = new ColorPicker(input, {
              colorKeywords: ['green','green','red','transparent','currentColor'],
              colorPresets: colorPresets.split(','),
              colorLabels: colorNamesFrench.split(','),
            });
          }
          cy.wrap(cp).as('cp');
        });
  
        cy.log('Test typing a valid value and press `enter`');
        cy.get('input').eq(0).focus().clear().type('hsl 0 100 50{enter}')
        cy.get('@cp').its('value').then((value) => {
            if (format === 'hsl') {
              expect(value).to.be.equal('hsl(0, 100%, 50%)');
            } else if (format === 'rgb') {
              expect(value).to.be.equal('rgb(255, 0, 0)');
            } else if (format === 'hex') {
              expect(value).to.be.equal('#f00');
            } else if (format === 'hwb') {
              expect(value).to.be.equal('hwb(0deg 0% 0%)');
            }
          });

        cy.log('Test keyboard event listeners on `inputs`');
        if (format === 'hex') {
          cy.log('test hex');
    
          cy.get('input').eq(0).focus().clear().type('hsl 300 100 50{enter}')
          cy.get('@cp').its('rgb').then((rgb) => {
            cy.get('.color-input').eq(0).focus().clear().type('hsl 100 100 50{enter}')
            cy.get('@cp').its('rgb').should('not.deep.equal', rgb);
          });
        } else if (format === 'rgb') {
          cy.log('test rgb');
    
          cy.get('input').eq(0).focus().clear().type('hsl 300 100 50{enter}')
          cy.get('@cp').its('rgb').then((rgb) => {
            cy.get('.color-input').eq(0).focus().clear().type('150{enter}')
            cy.get('@cp').its('rgb').should('not.deep.equal', rgb);
          });
          cy.get('input').eq(0).focus().clear().type('hsl 100 100 50{enter}')
          cy.get('@cp').its('rgb').then((rgb) => {
            cy.get('.color-input').eq(1).focus().clear().type('150{enter}')
            cy.get('@cp').its('rgb').should('not.deep.equal', rgb);
          });
          cy.get('input').eq(0).focus().clear().type('hsl 300 100 50{enter}')
            .get('@cp').its('rgb').then((rgb) => {
              cy.get('.color-input').eq(2).focus().clear().type('150{enter}')
                  cy.get('@cp').its('rgb').should('not.deep.equal', rgb);
                // });
            });
        } else if (format === 'hsl' || format === 'hwb') {
          cy.log('test hsl / hwb');
    
          cy.get('input').eq(0).focus().clear().type('hsl 270 100 50{enter}')
            .get('@cp').its('rgb').then((rgb) => {
              cy.get('.color-input').eq(0).focus().clear().type('0{enter}')
                // .wait(17)
                // .then(() => {
                  cy.get('@cp').its('rgb').should('not.deep.equal', rgb);
                // });
          });
          cy.get('input').eq(0).focus().clear().type('hsl 330 100 50{enter}')
            .get('@cp').its('rgb').then((rgb) => {
              cy.get('.color-input').eq(1).focus().clear().type('50{enter}')
                // .wait(17)
                // .then(() => {
                  cy.get('@cp').its('rgb').should('not.deep.equal', rgb);
                // });
            });
          cy.get('input').eq(0).focus().clear().type('hsl 300 100 50{enter}')
            .get('@cp').its('rgb').then((rgb) => {
              cy.get('.color-input').eq(2).focus().clear().type('25{enter}')
                // .wait(17)
                // .then(() => {
                  cy.get('@cp').its('rgb').should('not.deep.equal', rgb);
                // });
            });
        }

        if (format !== 'hex') {
          cy.log('test alpha chanel input');
          cy.get('input').eq(0).focus().clear().type('hsl 240 100 50{enter}')
            .get('@cp').its('rgb').then((rgb) => {
            cy.get('.color-input').eq(3).focus().clear().type('25{enter}')
              // .wait(17)
              // .then(() => {
                cy.get('@cp').its('rgb').should('not.deep.equal', rgb);
              // });
          });
        }
      });
    });
  });

});