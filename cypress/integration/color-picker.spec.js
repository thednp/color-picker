/// <reference types="cypress" />

// import Color from '../../src/js/color';
// import ColorPalette from '../../src/js/color-palette';
// import ColorPicker from '../../src/js/color-picker';
// import roundPart from '../../src/js/util/roundPart';

import Color from '../instrumented/color';
import ColorPicker from '../instrumented/color-picker';
import ColorPalette from '../instrumented/color-palette';
import roundPart from '../instrumented/util/roundPart';

import getRandomInt from '../fixtures/getRandomInt';
import FORMAT from '../fixtures/format';
import getMarkup from '../fixtures/getMarkup';

const colorNames = ['white', 'black', 'grey', 'red', 'orange', 'brown', 'gold', 'olive', 'yellow', 'lime', 'green', 'teal', 'cyan', 'blue', 'violet', 'magenta', 'pink'];
const colorNameValues = ['#fff', '#000', '#808080', '#f00', '#ffa500', '#653c24', '#c8af00', '#808000', '#ff0', '#0f0', '#080', '#075', '#0ff', '#05f', '#a7f', '#b0f', '#f0d'];
const colorNamesFrench = 'blanc,noir,gris,rouge,orange,brun,or,olive,jaune,citron,vert,sarcelle,cyan,bleu,violet,magenta,rose';
const colorPresets = '#330000,#990000,#ff0000,#ff6666,#ffcccc,#003333,#009999,#00ffff,#66ffff,#ccffff';

describe('ColorPicker Class Test', () => {

  beforeEach(() => {
    cy.visit('cypress/test.html')
      .get('body').then((body) => {
        cy.wrap(body[0]).as('body');
        cy.wrap(body[0].ownerDocument).as('doc');
        cy.wrap(body[0].defaultView).as('win');
      })
      .wait(200);
  });

 
  it('initialize with no parameter throws error', () => {
    const args = [];
    try {
      new ColorPicker(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error).to.have.property('message', `ColorPicker target "${args[0]}" cannot be found.`);
    }
  });

  it('inject incomplete markup and initialize, throws error', () => {
    cy.get('@body').then((body) => {
      const cp = document.createElement('div');
      const input = document.createElement('input');
      cp.append(input)
      body.append(cp);

      cy.get(`input`).then((input) => {
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

  it('inject a mock `<color-picker>` markup and initialize', () => {
    cy.get('@body')
      .then((body) => {
        const cp = document.createElement('color-picker');
        const $input = document.createElement('input');
        cp.append($input);
        body.append(cp);
      })
      .get('color-picker')
      .should('exist');

    cy.get('color-picker input')
      .should('exist')
      .get('color-picker input')
      .then((input) => {
        if (input.length) {
          const cpe = new ColorPicker(input[0]);
          cy.wrap(cpe).as('cp');
        }
        cy.get('@cp').its('isCE').should('be.true');
      });
  });

  it('inject markup and initialize with all DATA API', () => {
    const id = getRandomInt(0,999);
    const format = FORMAT[getRandomInt(0,3)];
    const { init, selector } = ColorPicker;
    let value;

    cy.get('@body').then((body) => {
      value = getMarkup(body, id, format);
    });

    cy.get(`#color-picker-${id}`).then(($input) => {
      cy.wrap($input[0]).as('input');
    });

    cy.get(`@input`).then(($input) => {
        const input = $input[0];
        input.setAttribute('data-function', "color-picker");
        input.setAttribute('data-color-presets', '{"hue": 120, "hueSteps": 6, "lightSteps": 10}');
        input.setAttribute('data-color-keywords', 'magenta, olive, yellow');
        input.setAttribute('data-color-labels', colorNamesFrench);
        input.setAttribute('data-component-labels', '{"pickerLabel": "Couleur Sélection", "appearanceLabel": "Apparence de la couleur", "valueLabel": "Valeur de couleur", "toggleLabel": "Sélectionner la couleur", "presetsLabel": "Préréglages de couleur", "defaultsLabel": "Couleur par défaut", "formatLabel": "Format", "alphaLabel": "Alpha", "hexLabel": "Hexadécimal", "hueLabel": "Nuance", "whitenessLabel": "Blancheur", "blacknessLabel": "Noirceur", "saturationLabel": "Saturation", "lightnessLabel": "Légèreté", "redLabel": "Rouge", "greenLabel": "Vert", "blueLabel": "Bleu"}');
      });
      
    cy.get('@doc').should('not.be.undefined')
      .get('@input').should('exist')
      .get('@doc').invoke('querySelectorAll', selector)
      .then((nodelist) => {
        [...nodelist].forEach(init);
      })

    cy.get('@input').then(($input) => {
      if ($input.length) {
        const cp = ColorPicker.getInstance($input[0]);
        cy.wrap(cp).as('cp');
      }
    })

    cy.get('@cp').should('exist')
      .get('@cp').then(() => {
        cy.get('@cp').its('colorLabels').then(({white,black,grey,red,orange,brown,gold,olive,yellow,lime,green,teal,cyan,blue,violet,magenta,pink}) => {
          expect([white,black,grey,red,orange,brown,gold,olive,yellow,lime,green,teal,cyan,blue,violet,magenta,pink])
            .to.deep.equal(colorNamesFrench.split(','));
        });

        cy.get('@cp').its('input').should('be.instanceOf', HTMLInputElement);
        cy.get('@cp').its('format').should('equal', format);
        cy.get('@cp').its('value').should('equal', value);
        cy.get('@cp').its('colorKeywords').should('deep.equal', ['magenta','olive','yellow']);
        cy.get('@cp').its('colorPresets').should('be.instanceOf', ColorPalette);
        cy.get('@cp').its('colorPresets').its('colors').each((c) => {
          expect(c).to.be.instanceOf(Color);
        });
        cy.get('@cp').its('colorPicker').should('be.instanceOf', HTMLDivElement);
        cy.get('@cp').its('colorMenu').should('be.instanceOf', HTMLDivElement);
      });
  });

  it('inject markup and initialize via JavaScript API', () => {
    cy.get('body').then((body) => {
      const id = getRandomInt(0,999);
      const format = FORMAT[getRandomInt(0,3)];
      const value = getMarkup(body, id, format);

      cy.get(`#color-picker-${id}`).then((input) => {
        let cp;
        
        if (input.length) {
          cp = new ColorPicker(input[0], {
            colorKeywords: 'orange, lime, darkred',
            colorPresets: '#330033, #990099, #ff00ff, #ff66ff, #ffccff',
            colorLabels: colorNamesFrench,
            componentLabels: {
              pickerLabel: "Couleur Sélection", 
              appearanceLabel: "Apparence de la couleur", 
              valueLabel: "Valeur de couleur", 
              toggleLabel: "Sélectionner la couleur", 
              presetsLabel: "Préréglages de couleur", 
              defaultsLabel: "Couleur par défaut", 
              formatLabel: "Format", 
              alphaLabel: "Alpha", 
              hexLabel: "Hexadécimal", 
              hueLabel: "Nuance", 
              whitenessLabel: "Blancheur", 
              blacknessLabel: "Noirceur", 
              saturationLabel: "Saturation", 
              lightnessLabel: "Légèreté", 
              redLabel: "Rouge", 
              greenLabel: "Vert", 
              blueLabel: "Bleu",
            }
          });
          cy.wrap(cp).as('cp');
        }

        cy.get('@cp').then(() => {
          cy.get('@cp').its('input').should('equal', input[0]);
          cy.get('@cp').its('format').should('equal', format);
          cy.get('@cp').its('value').should('equal', value);
          cy.get('@cp').its('colorPresets').should('be.instanceOf', Array);
          cy.get('@cp').its('colorLabels')
            .then(({white,black,grey,red,orange,brown,gold,olive,yellow,lime,green,teal,cyan,blue,violet,magenta,pink}) => {
              expect([white,black,grey,red,orange,brown,gold,olive,yellow,lime,green,teal,cyan,blue,violet,magenta,pink]).to.deep.equal(colorNamesFrench.split(','));
            });
          cy.get('@cp').its('colorKeywords').should('deep.equal', ['orange', 'lime', 'darkred']);
          cy.get('@cp').its('colorPicker').should('be.instanceOf', HTMLDivElement);
          cy.get('@cp').its('colorMenu').should('be.instanceOf', HTMLDivElement);
        });
      });
    });
  });


  it('Test touch event listeners', function() {
    cy.get('@body').then((body) => {
      const id = getRandomInt(0,999);
      const format = FORMAT[getRandomInt(0,3)];

      getMarkup(body, id, format);
      
      // fake touch event support
      if (body[0]) {
        body[0].ownerDocument.ontouchstart = () => {};
      }
      cy.get(`#color-picker-${id}`).then((input) => {
        cy.wrap(input[0]).as('input');
      });
    });

    cy.get('@input').then(($input) => {
      let cp;
      if ($input.length) {
        cp = new ColorPicker($input[0]);
      }
      cy.wrap(cp).as('cp');
    });

    cy.log('Testing touch event listeners on `visuals`');
    cy.get('@cp').its('input').focus().clear().type('hsl 0 100 50{enter}')
      .get('@cp').its('rgb').then((rgb) => {
        cy.get('@cp').its('visuals').eq(0).trigger('touchstart', 0, 0, { force: true, touches: [{ pageX: 0, pageY: 0 }] })
          .get('@cp').its('visuals').eq(0).trigger('touchmove', -0.5, -0.5, { force: true, touches: [{ pageX: -0.5, pageY: -0.5 }] })
          .get('@cp').its('visuals').eq(0).trigger('touchmove', -500, -500, { force: true, touches: [{ pageX: -500, pageY: -500 }] })
          .get('@cp').its('visuals').eq(0).trigger('touchmove', 500, 500, { force: true, touches: [{ pageX: 500, pageY: 500 }] })
          .get('@cp').its('visuals').eq(0).trigger('touchend', 100, 100, { force: true, touches: [{ pageX: 100, pageY: 100 }] })
          .wait(17)
          .get('@cp').its('rgb').should('not.deep.equal', rgb);
      });

    cy.get('@cp').its('input').focus().clear().type('hsl 0 100 50{enter}')
      .get('@cp').its('rgb').then((rgb) => {
        cy.get('@cp').its('visuals').eq(1).trigger('touchstart', 0, 0, { force: true, touches: [{ pageX: 0, pageY: 0 }] })
          .get('@cp').its('visuals').eq(1).trigger('touchmove', 0, -500, { force: true, touches: [{ pageX: 0, pageY: -500 }] })
          .get('@cp').its('visuals').eq(1).trigger('touchmove', 0, 500, { force: true, touches: [{ pageX: 0, pageY: 500 }] })
          .get('@cp').its('visuals').eq(1).trigger('touchmove', 0, 200, { force: true, touches: [{ pageX: 0, pageY: 200 }] })
          .get('@cp').its('visuals').eq(1).trigger('touchend', 0, 100, { force: true, touches: [{ pageX: 0, pageY: 100 }] })
          .wait(17)
          .get('@cp').its('rgb').should('not.deep.equal', rgb);
      });

    cy.get('@cp').its('input').focus().clear().type('hsl 0 100 50{enter}')
      .get('@cp').its('rgb').then((rgb) => {
      cy.get('@cp').its('visuals').eq(2).trigger('touchstart', 0, 0, { force: true, touches: [{ pageX: 0, pageY: 0 }] })
        .get('@cp').its('visuals').eq(2).trigger('touchmove', 0, -500, { force: true, touches: [{ pageX: 0, pageY: -500 }] })
        .get('@cp').its('visuals').eq(2).trigger('touchmove', 0, 500, { force: true, touches: [{ pageX: 0, pageY: 500 }] })
        .get('@cp').its('visuals').eq(2).trigger('touchmove', 0, 200, { force: true, touches: [{ pageX: 0, pageY: 200 }] })
        .get('@cp').its('visuals').eq(2).trigger('touchend', 0, 100, { force: true, touches: [{ pageX: 0, pageY: 100 }] })
        .wait(17)
        .get('@cp').its('rgb').should('not.deep.equal', rgb);
    });
  });


  it('Test event listeners', function() {
    let value;
    cy.get('@body').then((body) => {
      const id = getRandomInt(0,999);
      const format = FORMAT[getRandomInt(0,3)];

      value = getMarkup(body, id, format);

      const a = document.createElement('a');
      a.setAttribute('href', '#');
      a.innerText = 'Some link';
      body.append(a);
      cy.wrap(a).as('a');
      cy.get(`#color-picker-${id}`).then((input) => {
        cy.wrap(input[0]).as('input');
      });
    });

    cy.get('@input').then(($input) => {
      let cp;
      if ($input.length) {
        cp = new ColorPicker($input[0], {
          colorKeywords: 'olive,green,red,:empty,transparent',
          colorPresets: colorPresets,
          colorLabels: colorNamesFrench,
        });
      }
      cy.wrap(cp).as('cp');
    });

    cy.log('Testing `click` on `pickerToggle`');
    cy.get('@cp').its('pickerToggle').click()
      .get('@cp').its('colorPicker').should('have.class', 'show')
      .get('@cp').invoke('hide');

    cy.wait(350);

    cy.log('Testing `click` on `menuToggle`');
    cy.get('@cp').its('menuToggle').click()
      .get('@cp').its('colorMenu').should('have.class', 'show')
      .wait(17)
      .get('@cp').its('menuToggle').click()
      .get('@cp').its('colorMenu').should('not.have.class', 'show');

    cy.wait(17);
    
    cy.log('Testing `keydown` on `pickerToggle`');
    // trigger('keydown') won't work with <div> elements
    cy.get('@cp').its('pickerToggle').focus().type('{enter}')
      .wait(17)
      .get('@cp').its('colorPicker').should('have.class', 'show')
      .wait(17)
      .get('@cp').its('pickerToggle').type('{enter}')
      .wait(17)
      .get('@cp').its('colorPicker').should('not.have.class', 'show');

    cy.wait(17);

    cy.log('Testing `keydown` on `menuToggle`');
    // `menuToggle` is not focusable until open
    cy.get('@cp').invoke('showPicker')
      .wait(17)
      // trigger('keydown') won't work with <div> elements
      .get('@cp').its('menuToggle').focus().type('{enter}')
      .wait(17)
      .get('@cp').its('colorMenu').should('have.class', 'show')
      .wait(17)
      .get('@cp').its('menuToggle').type('{enter}')
      .wait(17)
      .get('@cp').its('colorMenu').should('not.have.class', 'show');

    cy.wait(17);

    cy.log('Testing `focusin` on `input`');
    cy.get('@cp').its('input').focus().then(() => {
      cy.get('@cp').its('colorPicker').should('have.class', 'show');
    });

    cy.wait(17);

    cy.log('Testing `focusout` on `input`');
    cy.get('@a').focus({force: true}).then(() => {
        cy.get('@cp').its('colorPicker').should('not.have.class', 'show');
      })
      .wait(350);


    cy.log('Testing `pointerup` on body while `colorPicker` open');
    cy.get('@cp').invoke('togglePicker')
      .wait(350)
      .get('@body').click('topRight').then(() => {
        cy.wait(17);
        cy.get('@cp').its('colorPicker').should('not.have.class', 'show');
      });

    cy.wait(350);
    cy.log('Type in `transparent` and press `enter`');
    cy.get('@cp').its('input').focus().clear().type('transparent{enter}')
      .get('@cp').its('rgb').then(({r,g,b,a}) => {
        expect([...[r,g,b].map(roundPart), a]).to.deep.equal([0,0,0,0]);
      });

    cy.log('type in `currentColor` and press `enter`');
    cy.get('@cp').its('input').focus().clear().type('currentColor{enter}')
      .get('@cp').its('rgb').then(({r,g,b,a}) => {
        expect([...[r,g,b].map(roundPart), a]).to.deep.equal([0,0,0,1]);
      });

    cy.log('Type in an invalid value and press `enter`, should reset value')
    cy.wait(350).get('@cp').invoke('showPicker')
      .get('@cp').its('input').focus().clear().type('wombat{enter}').then(() => {
        cy.get('@cp').its('value').should('not.equal', 'wombat');
      });


    cy.log('Type in a valid value and call `hide`, should keep previous value');
    cy.get('@cp').invoke('showPicker')
      .get('@cp').its('input').focus().clear().type('hsl 120 100 50')
      .wait(17)
      .get('@cp').invoke('hide')
      .wait(17)
      .get('@cp').its('rgb').should(({ r,g,b }) => {
        expect([r,g,b].map(roundPart)).to.not.deep.equal([0,255,0]);
      })
      .get('@cp').its('value').should('not.equal', 'hsl 120 100 50');

    cy.wait(350);

    cy.log('Type in a valid value and press `Escape`, should keep previous value');
    cy.get('@cp').invoke('showPicker')
      .get('@cp').its('input').focus().clear().type('hsl 240 100 50')
      // .wait(350)
      .get('@doc').trigger('keyup', { code: 'Escape' })
      // .wait(350)
      .get('@cp').its('rgb').should(({ r,g,b }) => {
        expect([r,g,b].map(roundPart)).to.not.deep.equal([0,0,255]);
      })
      .get('@cp').its('value').should('not.equal', 'hsl 240 100 50');


    cy.wait(350);

    cy.log('Testing `keyboard` events on `colorKeywords`');
    cy.get('@cp').invoke('toggleMenu');
    cy.wait(350);
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
    });;
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
      cy.get('.color-options li').eq(5).should('be.focused');        
    });
    cy.get('.color-options li').eq(5).trigger('keydown', { code: 'ArrowUp' }).then(() => {
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
    cy.get('@cp').its('visuals').eq(0).click().then(() => {
      cy.get('.color-options li').eq(1).should('not.have.class', 'active');
    });


    cy.log('Test dismiss on `Escape`');
    cy.get('@cp').its('input').focus().then(() => {
        cy.wait(17);
        cy.get('@cp').its('colorPicker').should('have.class', 'show');
      })
      .wait(17)
      .get('@doc').trigger('keyup', { code: 'Escape' })
      .wait(17)
      .get('@cp').its('colorPicker').should('not.have.class', 'show');

    cy.wait(350);

    cy.log('Testing `click` on `visuals`');
    cy.get('@cp').its('input').focus().clear().type('hsl 0 100 50{enter}').then(() => {
      cy.get('@cp').its('visuals').eq(0).click()
        .wait(17)
        .get('@cp').its('rgb').should(({ r,g,b }) => {
          expect([r,g,b].map(roundPart)).to.deep.equal([128,64,64]);
        });
    });

    cy.get('@cp').its('input').focus().clear().type('hsl 300 100 50{enter}').then(() => {
      cy.get('@cp').its('visuals').eq(1).click(-0.1, -0.1, { force: true })
        .wait(17)
        .get('@cp').its('rgb').should(({ r,g,b }) => {
          expect([r,g,b].map(roundPart)).to.deep.equal([255,0,0]);
        });
    })

    cy.get('@cp').its('input').focus().clear().type('hsl 120 100 50{enter}').then(() => {
      cy.get('@cp').its('visuals').eq(2).click({ force: true })
        .wait(17)
        .get('@cp').its('rgb').should(({ r,g,b,a }) => {
          expect([...[r,g,b].map(roundPart), a]).to.deep.equal([0,255,0, 0.5]);
        });
    });

    cy.log('Testing mouse event listeners on `controlKnobs`');
    cy.get('@cp').its('input').focus().clear().type('hsl 0 100 50{enter}')
      .get('@cp').its('rgb').then((rgb) => {
        cy.get('@cp').its('visuals').eq(0).then((visual) => {
          const { width, height} = visual[0].getBoundingClientRect();
          
          cy.get('@cp').its('controlKnobs').eq(0)
            .trigger('mousedown', { force: true })
            .trigger('mousemove', -width, -height, { force: true })
            .trigger('mousemove', -width - 100, -height - 100, { force: true })
            .trigger('mousemove', 300, 300, { force: true })
            .trigger('mousemove', -width + 50, -height + 50, { force: true })
            .wait(17)
            .get('@cp').its('rgb').should('not.deep.equal', rgb);
        });
      });

    cy.get('@cp').its('input').focus().clear().type('hsl 0 100 50{enter}')
      .get('@cp').its('rgb').then((rgb) => {
        cy.get('@cp').its('visuals').eq(1).then((visual) => {
          const { width, height } = visual[0].getBoundingClientRect();

          cy.get('@cp').its('controlKnobs').eq(1)
            .trigger('mousedown', { force: true })
            .trigger('mousemove', width / 2, -height - 100, { force: true })
            .trigger('mousemove', width / 2, 300, { force: true })
            .trigger('mousemove', width / 2, -height + 20, { force: true })
            .wait(17)
            .get('@cp').its('rgb').should('not.deep.equal', rgb);
          });
        });

    cy.get('@cp').its('input').focus().clear().type('hsl 0 100 50{enter}')
      .get('@cp').its('rgb').then((rgb) => {
        cy.get('@cp').its('visuals').eq(2).then((visual) => {
          const { width, height } = visual[0].getBoundingClientRect();

          cy.get('@cp').its('controlKnobs').eq(2)
            .trigger('mousedown', { force: true })
            .trigger('mousemove', width / 2, -height - 100, { force: true })
            .trigger('mousemove', width / 2, 300, { force: true })
            .trigger('mousemove', width / 2, -height + 20, { force: true })
            .wait(17)
            .get('@cp').its('rgb').should('not.deep.equal', rgb);
          });
        });


    cy.log('Testing keyboard event listeners on `controlKnobs`');
    cy.get('@cp').its('input').focus().clear().type('hsl 300 100 50{enter}').then(() => {
      const rgb = cy.get('@cp').its('rgb');
      cy.get('@cp').its('controlKnobs').eq(0).focus()
        .trigger('keydown', { code: 'ArrowDown' })
        .trigger('keydown', { code: 'ArrowDown' })
        .trigger('keydown', { code: 'a' }) // edge case
        .trigger('keydown', { code: 'ArrowUp' })
        .trigger('keydown', { code: 'ArrowRight' })
        .trigger('keydown', { code: 'ArrowRight' })
        .trigger('keydown', { code: 'ArrowLeft' })
        .wait(17)
        .get('@cp').its('rgb').should('not.deep.equal', rgb);
    });

    cy.get('@cp').its('input').focus().clear().type('hsl 180 100 50{enter}').then(() => {
      const rgb = cy.get('@cp').its('rgb');
      cy.get('@cp').its('controlKnobs').eq(1).focus()
        .trigger('keydown', { code: 'ArrowDown' })
        .trigger('keydown', { code: 'ArrowDown' })
        .trigger('keydown', { code: 'b' }) // edge case
        .trigger('keydown', { code: 'ArrowUp' })
        .trigger('keydown', { code: 'ArrowLeft' })
        .trigger('keydown', { code: 'ArrowLeft' })
        .trigger('keydown', { code: 'ArrowRight' })
        .wait(17)
        .get('@cp').its('rgb').should('not.deep.equal', rgb);
    });

    cy.get('@cp').its('input').focus().clear().type('hsl 0 100 50{enter}').then(() => {
      const rgb = cy.get('@cp').its('rgb');
      cy.get('@cp').its('controlKnobs').eq(2).focus()
        .trigger('keydown', { code: 'ArrowDown' })
        .trigger('keydown', { code: 'ArrowDown' })
        .trigger('keydown', { code: 'C' }) // edge case
        .trigger('keydown', { code: 'ArrowUp' })
        .trigger('keydown', { code: 'ArrowLeft' })
        .trigger('keydown', { code: 'ArrowLeft' })
        .trigger('keydown', { code: 'ArrowRight' })
        .wait(17)
        .get('@cp').its('rgb').should('not.deep.equal', rgb);
    });

    cy.log('Test repositioning dropdown on scroll');
    cy.get('@win').scrollTo('top')
      .get('@cp').invoke('togglePicker')
      .get('@win').scrollTo('bottom').then(() => {
        cy.get('@cp').its('colorPicker')
          .should('have.class', 'top')
          .and('not.have.class', 'bottom');
      });
  });


  it('Test private methods', function() {
    cy.get('body').then((body) => {
      const id = getRandomInt(0,999);
      const format = FORMAT[getRandomInt(0,3)];

      getMarkup(body, id, format);

      cy.get(`#color-picker-${id}`).then((input) => {
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
      cy.get('@cp').invoke('togglePicker').then(() => {
        cy.get('.color-dropdown')
        .should('have.class', 'picker')
        .and('have.class', 'show');
      });
      cy.wait(350);
      cy.get('@cp').invoke('togglePicker').then(() => {
        cy.get('.color-dropdown')
        .should('have.class', 'picker')
        .and('not.have.class', 'show');
      });
      
      cy.wait(350);

      cy.log('Testing `toggleMenu`');
      cy.get('@cp').invoke('toggleMenu').then(() => {
        cy.get('.color-dropdown')
        .should('have.class', 'menu')
        .and('have.class', 'show');
      });
      cy.wait(350);
      cy.get('@cp').invoke('toggleMenu').then(() => {
        cy.get('.color-dropdown')
        .should('have.class', 'menu')
        .and('not.have.class', 'show');
      });

      cy.wait(350);

      cy.log('Testing `showPicker`');
      cy.get('@cp').invoke('showPicker').then(() => {
        cy.get('.color-dropdown')
        .should('have.class', 'picker')
        .and('have.class', 'show');
      });

      cy.wait(350);

      cy.log('Testing `hide`');
      cy.get('@cp').invoke('hide').then(() => {
        cy.get('.color-dropdown')
        .and('not.have.class', 'show');
      });

      cy.wait(350);

      cy.log('Testing `dispose`');
      cy.get('@cp').invoke('dispose').then(() => {
        cy.get('.color-dropdown')
        .should((dropdown) => {
          expect(dropdown).to.not.exist;
        });
      });
    });
  });

  it('Test color appearance and color luminance', function() {
    cy.get('body').then((body) => {
      const id = getRandomInt(0,999);
      const format = FORMAT[getRandomInt(0,3)];
      const frenchColors = colorNamesFrench.split(',');

      getMarkup(body, id, format);

      cy.get(`#color-picker-${id}`).then((input) => {
        let cp;
        if (input.length) {
          cp = new ColorPicker(input[0], {
            colorKeywords: 'olive,green,red,transparent',
            colorPresets: colorPresets,
            colorLabels: colorNamesFrench,
          });
        }
        cy.wrap(cp).as('cp');
      });
      
      cy.wait(350);

      frenchColors.forEach((color) => {
        const webcolor = colorNameValues[frenchColors.indexOf(color)];
        cy.get('@cp').its('input').focus().clear().type(`${webcolor}`)
          .get('@cp').its('isValid').should('be.true')
          .get('@cp').its('input').type('{enter}')
          .get('@cp').its('appearance').should('be.equal', color);

        if (colorNames[frenchColors.indexOf(color)] === 'white') {
          cy.get('@cp').its('luminance').should('be.greaterThan', 0.99);
        } else {
          cy.get('@cp').its('luminance').should('be.lessThan', 0.99);
        }
        cy.wait(17);
      });      
    });
  });

  FORMAT.forEach((format) => {

    it(`Test format specific event listeners - ${format.toUpperCase()}`, function() {
      cy.get('body').then((body) => {
        const id = getRandomInt(0,999);

        // const value = 
        getMarkup(body, id, format);
  
        cy.get(`#color-picker-${id}`).then((input) => {
          let cp;
          if (input.length) {
            input[0].value = '';
            cp = new ColorPicker(input[0], {
              colorKeywords: ['green','green','red','transparent','currentColor'],
              colorPresets: colorPresets.split(','),
              colorLabels: colorNamesFrench.split(','),
            });
          }
          cy.wrap(cp).as('cp');
        });
  
        cy.log('Test typing a valid value and press `enter`');
        cy.get('@cp').its('input').focus().clear().type('hsl 0 100 50{enter}')
          .get('@cp').its('value').then((value) => {
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
    
          cy.get('@cp').its('input').focus().clear().type('hsl 300 100 50{enter}')
            .get('@cp').its('rgb').then((rgb) => {
              cy.get('@cp').its('inputs').eq(0).focus().clear().type('hsl 100 100 50{enter}')
              .wait(17)
              .then(() => {
                cy.get('@cp').its('rgb').should('not.deep.equal', rgb);
              });
            });
        } else if (format === 'rgb') {
          cy.log('test rgb');
    
          cy.get('@cp').its('input').focus().clear().type('hsl 300 100 50{enter}')
            .get('@cp').its('rgb').then((rgb) => {
              cy.get('@cp').its('inputs').eq(0).focus().clear().type('150{enter}')
                .wait(17)
                .then(() => {
                  cy.get('@cp').its('rgb').should('not.deep.equal', rgb);
                });
            });
          cy.get('@cp').its('input').focus().clear().type('hsl 100 100 50{enter}')
            .get('@cp').its('rgb').then((rgb) => {
              cy.get('@cp').its('inputs').eq(1).focus().clear().type('150{enter}')
                .wait(17)
                .then(() => {
                  cy.get('@cp').its('rgb').should('not.deep.equal', rgb);
                });
            });
          cy.get('@cp').its('input').focus().clear().type('hsl 300 100 50{enter}')
            .get('@cp').its('rgb').then((rgb) => {
              cy.get('@cp').its('inputs').eq(2).focus().clear().type('150{enter}')
                .wait(17)
                .then(() => {
                  cy.get('@cp').its('rgb').should('not.deep.equal', rgb);
                });
            });
        } else if (format === 'hsl' || format === 'hwb') {
          cy.log('test hsl / hwb');
    
          cy.get('@cp').its('input').focus().clear().type('hsl 270 100 50{enter}')
            .get('@cp').its('rgb').then((rgb) => {
              cy.get('@cp').its('inputs').eq(0).focus().clear().type('0{enter}')
                .wait(17)
                .then(() => {
                  cy.get('@cp').its('rgb').should('not.deep.equal', rgb);
                });
          });
          cy.get('@cp').its('input').focus().clear().type('hsl 330 100 50{enter}')
            .get('@cp').its('rgb').then((rgb) => {
              cy.get('@cp').its('inputs').eq(1).focus().clear().type('50{enter}')
                .wait(17)
                .then(() => {
                  cy.get('@cp').its('rgb').should('not.deep.equal', rgb);
                });
            });
          cy.get('@cp').its('input').focus().clear().type('hsl 300 100 50{enter}')
            .get('@cp').its('rgb').then((rgb) => {
              cy.get('@cp').its('inputs').eq(2).focus().clear().type('25{enter}')
                .wait(17)
                .then(() => {
                  cy.get('@cp').its('rgb').should('not.deep.equal', rgb);
                });
            });
        }

        if (format !== 'hex') {
          cy.log('test alpha chanel input');
          cy.get('@cp').its('input').focus().clear().type('hsl 240 100 50{enter}')
            .get('@cp').its('rgb').then((rgb) => {
            cy.get('@cp').its('inputs').eq(3).focus().clear().type('25{enter}')
              .wait(17)
              .then(() => {
                cy.get('@cp').its('rgb').should('not.deep.equal', rgb);
              });
          });
        }
      });
    });
  });

});