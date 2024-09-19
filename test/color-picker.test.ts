import { expect, it, describe, beforeEach, vi } from 'vitest';
import Color from '@thednp/color';
import ColorPalette from '~/ts/colorPalette';
import ColorPicker from '~/ts/index';
import getRandomInt from './fixtures/getRandomInt';
import FORMAT from './fixtures/format';
import getMarkup from './fixtures/getMarkup';
import componentLabelsFrench from './fixtures/componentLabelsFrench';
import colorNamesFrench from './fixtures/colorNamesFrench';
import write from './fixtures/write';
import swipe from './fixtures/swipe';
import "~/scss/color-picker.scss";

const colorNames = ['white', 'black', 'grey', 'red', 'orange', 'brown', 'gold', 'olive', 'yellow', 'lime', 'green', 'teal', 'cyan', 'blue', 'violet', 'magenta', 'pink'];
const colorNameValues = ['#fff', '#000', '#808080', '#f00', '#ffa500', '#653c24', '#c8af00', '#808000', '#ff0', '#0f0', '#080', '#075', '#0ff', '#05f', '#a7f', '#b0f', '#f0d'];
const colorPresets = '#470000,#750000,#a30000,#d10000,#ff0000,#ff2e2e,#ff5c5c,#ff8a8a,#ffb8b8,#ffe6e6,#004700,#007500,#00a300,#00d100,#00ff00,#2eff2e,#5cff5c,#8aff8a,#b8ffb8,#e6ffe6,#000047,#000075,#0000a3,#0000d1,#0000ff,#2e2eff,#5c5cff,#8a8aff,#b8b8ff,#e6e6ff';

describe('ColorPicker Class Test', () => {
  const wrapper = document.createElement('div');
  document.body.append(wrapper);

  beforeEach(async () => {
    wrapper.innerHTML = '';
  });

  it('initialize with no parameter throws error', () => {
    try {
      // @ts-expect-error
      new ColorPicker();
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error).to.have.property('message', `ColorPicker target not specified.`);
    }
  });
  it('inject incomplete markup and initialize, throws error', () => {
    const cp = document.createElement('div');
    const input = document.createElement('input');
    cp.append(input)
    document.body.append(cp);

    try {
      new ColorPicker(input);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error).to.have.property('message', 'ColorPicker requires a specific markup to work.');
    }
  });
  it('inject markup and initialize with all DATA API', async () => {
    const id = getRandomInt(0, 999);
    const format = FORMAT[getRandomInt(0, 3)];
    const { init, selector } = ColorPicker;
    const { container, value } = await vi.waitFor(() => getMarkup(id, format), { timeout: 150 });
    wrapper.append(container);
    const input = await vi.waitFor(() => document.querySelector(selector) as HTMLInputElement, { timeout: 200 });

    if (!input) return;
    input.setAttribute('value', value);
    input.setAttribute('data-function', "color-picker");
    input.setAttribute('data-color-presets', '{"hue": 120, "hueSteps": 6, "lightSteps": 10}');
    input.setAttribute('data-color-keywords', 'magenta, olive, yellow, red:default, currentColor:textColor');
    input.setAttribute('data-color-labels', colorNamesFrench);
    input.setAttribute('data-component-labels', '{"pickerLabel": "Couleur Sélection", "appearanceLabel": "Apparence de la couleur", "valueLabel": "Valeur de couleur", "toggleLabel": "Sélectionner la couleur", "presetsLabel": "Préréglages de couleur", "defaultsLabel": "Couleur par défaut", "formatLabel": "Format", "alphaLabel": "Alpha", "hexLabel": "Hexadécimal", "hueLabel": "Nuance", "whitenessLabel": "Blancheur", "blacknessLabel": "Noirceur", "saturationLabel": "Saturation", "lightnessLabel": "Légèreté", "redLabel": "Rouge", "greenLabel": "Vert", "blueLabel": "Bleu"}');

    init(input);

    const cp = ColorPicker.getInstance(input as HTMLInputElement);
    expect(Object.values(cp?.colorLabels!)).to.deep.equal(colorNamesFrench.split(','));
    expect(cp?.format).to.equal(format);
    expect(cp?.value).to.equal(value);
    expect(cp?.value).to.equal(new Color(value, format).toString(true));
    expect(cp?.colorKeywords).to.deep.equal(['magenta', 'olive', 'yellow', 'red:default', 'currentColor:textColor']);
    expect(cp?.colorPresets).to.be.instanceOf(ColorPalette);
    (cp?.colorPresets as ColorPalette).colors.forEach(c => expect(c).to.be.instanceOf(Color));
    expect(cp?.colorPicker).to.be.instanceOf(HTMLDivElement);
    expect(cp?.colorMenu).to.be.instanceOf(HTMLDivElement);
  });
  it('inject markup and initialize via JavaScript API', async () => {
    const id = getRandomInt(0, 999);
    const format = FORMAT[getRandomInt(0, 3)];
    const { container, value } = await vi.waitFor(() => getMarkup(id, format), { timeout: 150 });
    wrapper.append(container); const input = await vi.waitFor(() => document.querySelector('input') as HTMLInputElement, { timeout: 200 });
    if (!input) return;

    const cp = new ColorPicker(input, {
      colorKeywords: ['orange', 'lime', 'darkred'],
      colorPresets: '#330033, #990099, #ff00ff, #ff66ff, #ffccff',
      colorLabels: colorNamesFrench,
      componentLabels: componentLabelsFrench,
    });
    expect(cp.input).to.be.eq(input);
    expect(cp.format).to.be.eq(format);
    expect(cp?.value).to.equal(value);
    expect(cp?.colorPresets).to.be.instanceOf(Array);
    expect(cp?.colorPresets as string[]).to.deep.equal('#330033,#990099,#ff00ff,#ff66ff,#ffccff'.split(','));
    expect(cp?.colorPicker).to.be.instanceOf(HTMLDivElement);
    expect(Object.values(cp?.colorLabels)).to.deep.equal(colorNamesFrench.split(','));
    expect(cp?.colorKeywords).to.deep.equal(['orange', 'lime', 'darkred']);
  });
  it('inject markup and initialize with `colorKeywords`', async () => {
    const id = getRandomInt(0, 999);
    const format = FORMAT[getRandomInt(0, 3)];

    const { container } = await vi.waitFor(() => getMarkup(id, format), { timeout: 150 });
    wrapper.append(container); const input = await vi.waitFor(() => document.querySelector('input') as HTMLInputElement, { timeout: 200 });
    if (!input) return;

    const cp = new ColorPicker(input, {
      colorKeywords: 'orange, lime, darkred',
    });
    expect(cp.colorKeywords).to.deep.equal('orange,lime,darkred'.split(','))
  });
  it('inject markup and initialize with `colorPresets`', async () => {
    const id = getRandomInt(0, 999);
    const format = FORMAT[getRandomInt(0, 3)];
    const { container } = await vi.waitFor(() => getMarkup(id, format), { timeout: 150 });
    wrapper.append(container);
    const input = await vi.waitFor(() => document.querySelector('input') as HTMLInputElement, { timeout: 200 });
    if (!input) return;

    const cp = new ColorPicker(input, {
      colorPresets: '#330033, #990099, #ff00ff, #ff66ff, #ffccff'.split(',').map(x => x.trim()),
    });
    expect(cp.colorPresets).to.deep.equal('#330033,#990099,#ff00ff,#ff66ff,#ffccff'.split(',').map(x => x.trim()));
  });
  it('Test showing & hiding `colorPicker` / `presetsMenu`', async function () {
    vi.useFakeTimers();
    const id = getRandomInt(0, 999);
    const format = FORMAT[getRandomInt(0, 3)];

    const { container } = await vi.waitUntil(() => getMarkup(id, format), { timeout: 150 });
    wrapper.append(container);
    const mylink = await vi.waitUntil(() => container.getElementsByClassName('my-link')[0] as HTMLAnchorElement, { timeout: 17 });
    const input = await vi.waitUntil(() => container.querySelector('input') as HTMLInputElement, { timeout: 200 });
    if (!input) return;

    const cp = new ColorPicker(input, {
      colorKeywords: 'olive,green,red,:empty,transparent',
      colorPresets: colorPresets,
      colorLabels: colorNamesFrench,
    });

    cp.pickerToggle.click();
    vi.advanceTimersByTime(350);
    expect(cp.colorPicker.className).to.contain('show');

    cp.hide();
    vi.advanceTimersByTime(350);
    expect(cp.colorPicker.className).to.not.contain('show');

    cp.menuToggle.click();
    vi.advanceTimersByTime(350);
    expect(cp.colorPicker.className).to.not.contain('show');
    expect(cp.colorMenu.className).to.contain('show');

    cp.hide();
    vi.advanceTimersByTime(350);

    write(cp.pickerToggle, "Space");
    vi.advanceTimersByTime(50);
    expect(cp.colorPicker.className).to.contain('show');
    expect(cp.colorMenu.className).to.not.contain('show');

    write(cp.menuToggle, 'Enter');
    vi.advanceTimersByTime(350);
    expect(cp.colorMenu.className).to.contain('show');

    write(cp.menuToggle, 'Space');
    vi.advanceTimersByTime(350);
    expect(cp.colorMenu.className).to.not.contain('show');

    cp.togglePicker();
    vi.advanceTimersByTime(350);
    expect(cp.colorPicker.className).to.contain('show');

    if (!mylink) return;
    // mylink.click();
    mylink.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }))

    vi.advanceTimersByTime(350);
    expect(cp.colorPicker.className).to.not.contain('show');

    vi.advanceTimersByTime(350);
    cp.togglePicker();
    vi.advanceTimersByTime(350);
    expect(cp.colorPicker.className).to.contain('show');
    document.body.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientX: 200, clientY: 550 }))
    vi.advanceTimersByTime(350);
    expect(cp.colorPicker.className).to.not.contain('show');

    cp.showPicker();
    vi.advanceTimersByTime(350);
    expect(cp.colorPicker.className).to.contain('show');
    vi.advanceTimersByTime(350);

    write(cp.input, 'transparentEnter');
    vi.advanceTimersByTime(350);
    expect(cp.rgb).to.deep.equal({ r: 0, g: 0, b: 0, a: 0 });

    write(cp.input, 'currentColorEnter');
    vi.advanceTimersByTime(350);
    expect(cp.rgb).to.deep.equal({ r: 0, g: 0, b: 0, a: 1 });

    write(cp.input, 'wombatEnter');
    vi.advanceTimersByTime(350);
    expect(cp.value).to.not.equal('wombat');

    write(cp.input, 'hsl 0 0 100');
    vi.advanceTimersByTime(350);
    cp.hide();
    vi.advanceTimersByTime(350);
    expect(cp.rgb).to.not.deep.equal({ r: 255, g: 255, b: 255, a: 1 });
    expect(cp.value).to.not.equal('hsl 0 0 100');
  });
  it('Test `pointer` event listeners', async () => {
    vi.useFakeTimers();
    const id = getRandomInt(0, 999);
    const format = FORMAT[getRandomInt(0, 3)];

    const { container } = await vi.waitFor(() => getMarkup(id, format), { timeout: 150 });
    wrapper.append(container)
    const input = await vi.waitFor(() => container.querySelector('input') as HTMLInputElement, { timeout: 200 });
    if (!input) return;

    const cp = new ColorPicker(input);
    let lastRgb = cp.rgb;

    cp.showPicker();
    vi.advanceTimersByTime(350);
    write(input, 'hsl 0 100 50 Enter');
    vi.advanceTimersByTime(350);
    expect(cp.colorPicker.className, 'dropdown is open').to.include('show');
    expect(input.value, 'write check').to.equal(cp.value);
    lastRgb = cp.rgb;

    vi.advanceTimersByTime(350);
    swipe(cp.visuals[0], [[5, 5], [-5, -5], [500, 500], [100, 100], [100, 100]]);
    vi.advanceTimersByTime(350);
    expect(cp.rgb, 'swipe check').to.not.deep.equal(lastRgb);
    vi.advanceTimersByTime(350);
    lastRgb = cp.rgb;

    vi.advanceTimersByTime(550);
    swipe(cp.visuals[1], [[5, 5], [5, 0], [5, -5], [5, 500], [5, 100], [5, 100]]);
    vi.advanceTimersByTime(350);
    expect(cp.rgb, 'swipe check').to.not.deep.equal(lastRgb);
    vi.advanceTimersByTime(350);
    lastRgb = cp.rgb;

    vi.advanceTimersByTime(550);
    swipe(cp.visuals[2], [[5, 5], [5, -5], [5, 200], [5, 500], [5, 100], [5, 100]]);
    vi.advanceTimersByTime(350);
    expect(cp.rgb, 'swipe check').to.not.deep.equal(lastRgb);
    vi.advanceTimersByTime(350);
    lastRgb = cp.rgb;
    vi.advanceTimersByTime(350);
  });
  it('Test `keyboard` event listeners', async () => {
    vi.useFakeTimers();
    const id = getRandomInt(0, 999);
    const format = FORMAT[getRandomInt(0, 3)];
    const { container } = getMarkup(id, format);
    wrapper.append(container);
    const input = container.querySelector('input');
    if (!input) return;

    const cp = new ColorPicker(input, {
      colorKeywords: 'olive,green,red,:empty,transparent',
      colorPresets: colorPresets,
      colorLabels: colorNamesFrench,
    });

    cp.togglePicker();
    vi.advanceTimersByTime(350);

    input.focus();
    input.select();
    write(input, "hsl 0 0 100");
    vi.advanceTimersByTime(350);
    // input.addEventListener('keyup', (e) => console.log(e));
    input.dispatchEvent(new KeyboardEvent('keyup', { code: "Escape", key: "Escape", bubbles: true }));
    vi.advanceTimersByTime(350);
    expect(cp.rgb).to.not.deep.equal({ r: 255, g: 255, b: 255 });
    expect(cp.value).to.not.equal("hsl 0 0 100");

    cp.toggleMenu();
    vi.advanceTimersByTime(350);
    const defaults = cp.colorMenu.children[1].getElementsByTagName('LI') as HTMLCollectionOf<HTMLLIElement>;
    defaults[0].focus();
    defaults[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight', code: 'ArrowRight' }));
    vi.advanceTimersByTime(350);
    // console.log(document.activeElement);
    expect(defaults[1]).to.equal(document.activeElement);

    vi.advanceTimersByTime(350);
    defaults[1].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowLeft', code: 'ArrowLeft' }));
    vi.advanceTimersByTime(350);
    expect(defaults[0]).to.equal(document.activeElement);

    vi.advanceTimersByTime(350);
    defaults[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown', code: 'ArrowDown' }));
    vi.advanceTimersByTime(350);
    expect(defaults[1]).to.equal(document.activeElement);

    vi.advanceTimersByTime(350);
    defaults[1].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowUp', code: 'ArrowUp' }));
    vi.advanceTimersByTime(350);
    expect(defaults[0]).to.equal(document.activeElement);

    let prevValue = cp.value;
    vi.advanceTimersByTime(350);
    defaults[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter', code: 'Enter' }));
    vi.advanceTimersByTime(350);
    expect(defaults[0].className).to.contain('active');
    expect(cp.value).to.not.equal(prevValue);

    vi.advanceTimersByTime(350);
    const transparent = cp.colorMenu.querySelector<HTMLLIElement>('[data-value="transparent"]');
    if (transparent) {
      transparent.click();
      vi.advanceTimersByTime(350);
      prevValue = cp.value;

      expect(transparent.className).to.contain('active');
      expect(cp.value).to.equal('transparent');
    }

    vi.advanceTimersByTime(350);
    const empty = cp.colorMenu.querySelector<HTMLLIElement>('[data-value="empty"]');
    if (empty) {
      empty.click();
      vi.advanceTimersByTime(350);
      prevValue = cp.value;

      expect(empty.className).to.contain('active');
      expect(cp.value).to.not.equal('empty');
    }

    vi.advanceTimersByTime(350);
    const options = cp.colorMenu.children[0].getElementsByTagName('LI') as HTMLCollectionOf<HTMLLIElement>;
    options[0].focus();
    // options[0].addEventListener('keydown', e => console.log(e))
    options[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight', code: 'ArrowRight' }));
    vi.advanceTimersByTime(350);
    expect(options[1]).to.equal(document.activeElement);

    vi.advanceTimersByTime(350);
    options[1].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowLeft', code: 'ArrowLeft' }));
    vi.advanceTimersByTime(350);
    expect(options[0]).to.equal(document.activeElement);

    vi.advanceTimersByTime(350);
    options[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown', code: 'ArrowDown' }));
    vi.advanceTimersByTime(350);
    // console.log(document.activeElement);
    expect(options[10]).to.equal(document.activeElement);

    vi.advanceTimersByTime(350);
    options[10].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowUp', code: 'ArrowUp' }));
    vi.advanceTimersByTime(350);
    expect(options[0]).to.equal(document.activeElement);

    prevValue = cp.value;
    options[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter', code: 'Enter' }));
    vi.advanceTimersByTime(350);
    expect(options[0].className).to.contain('active');
    expect(cp.value).to.not.equal(prevValue);

    prevValue = cp.value;
    options[1].click();
    vi.advanceTimersByTime(350);
    expect(options[1].className).to.contain('active');
    expect(cp.value).to.not.equal(prevValue);

    document.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, code: 'Escape' }))
    vi.advanceTimersByTime(350);
    expect(cp.colorMenu.className).to.not.contain('show');
  });
  it('Test `scroll` event listeners', async () => {
    vi.useFakeTimers();
    const id = getRandomInt(0, 999);
    const format = FORMAT[getRandomInt(0, 3)];
    const { container } = getMarkup(id, format);
    Object.assign(container.style, { margin: '750px 0' });
    wrapper.append(container);
    const input = container.querySelector('input');
    if (!input) return;

    const win = input.ownerDocument.defaultView!;
    const cp = new ColorPicker(input, {
      colorKeywords: 'olive,green,red,:empty,transparent',
      colorPresets: colorPresets,
      colorLabels: colorNamesFrench,
    });

    cp.showPicker();
    vi.advanceTimersByTime(350);
    expect(cp.colorPicker.className).to.contain('show');

    vi.advanceTimersByTime(350);
    win.scrollTo({ left: 0, top: 10, behavior: "smooth" });
    win.dispatchEvent(new Event('scroll'));
    await Promise.resolve(() =>
      new Promise((resolve) => {
        setTimeout(() => {
          expect(cp.colorPicker.className).to.contain('top');
          resolve('done')
        }, 550)
        vi.advanceTimersByTime(550);
      })
    );

    win.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    win.dispatchEvent(new Event('scroll'));
    await Promise.resolve(() =>
      new Promise((resolve) => {
        setTimeout(() => {
          expect(cp.colorPicker.className).to.not.contain('top');
          resolve('done')
        }, 550)
        vi.advanceTimersByTime(550);
      })
    );
  });
  it('Test controls mouse & keyboard events', async () => {
    vi.useFakeTimers();
    const id = getRandomInt(0, 999);
    const format = FORMAT[getRandomInt(0, 3)];
    const { container } = getMarkup(id, format);
    wrapper.append(container);
    const input = container.querySelector('input');
    if (!input) return;

    const cp = new ColorPicker(input, {
      colorKeywords: 'green,green,red,transparent',
      colorPresets: colorPresets,
    });

    cp.togglePicker();
    vi.advanceTimersByTime(350);
    write(input, "hsl 0 100 50 Enter");
    vi.advanceTimersByTime(350);

    // test visuals click, but we're using pointerdown more reliably
    const v0rect = cp.visuals[0].getBoundingClientRect();
    cp.visuals[0].dispatchEvent(new PointerEvent('pointerdown', {
      bubbles: true, cancelable: true,
      clientX: v0rect.left + v0rect.width / 2,
      clientY: v0rect.top + v0rect.height / 2,
    }));
    vi.advanceTimersByTime(350);
    expect(cp.rgb).to.not.deep.equal({ r: 255, g: 0, b: 0, a: 1 });

    write(input, "hsl 300 100 50 Enter");
    vi.advanceTimersByTime(350);
    const v1rect = cp.visuals[1].getBoundingClientRect();
    cp.visuals[1].dispatchEvent(new PointerEvent('pointerdown', {
      bubbles: true, cancelable: true,
      clientX: v1rect.left + v1rect.width / 2,
      clientY: v1rect.top + v1rect.height / 2,
    }));
    vi.advanceTimersByTime(350);
    expect(cp.rgb).to.not.deep.equal({ r: 255, g: 0, b: 255, a: 1 });

    write(input, "hsl 120 100 50 Enter");
    vi.advanceTimersByTime(350);
    const v2rect = cp.visuals[2].getBoundingClientRect();
    cp.visuals[2].dispatchEvent(new PointerEvent('pointerdown', {
      bubbles: true, cancelable: true,
      clientX: v2rect.left + v2rect.width / 2,
      clientY: v2rect.top + v2rect.height / 2,
    }));
    vi.advanceTimersByTime(350);
    expect(cp.rgb).to.deep.equal({ r: 0, g: 255, b: 0, a: 0.5 });

    // test control knobs pointer events
    write(input, "hsl 0 100 100 Enter");
    vi.advanceTimersByTime(350);
    swipe(cp.controlKnobs[0], [[2, 2], [-v0rect.left, -v0rect.top], [300, 300], [v0rect.width / 2, v0rect.height / 2]], { x: v0rect.left, y: v0rect.top });
    vi.advanceTimersByTime(350);
    expect(cp.rgb).to.not.deep.equal({ r: 255, g: 0, b: 0, a: 1 });

    write(input, "hsl 0 100 100 Enter");
    vi.advanceTimersByTime(350);
    swipe(cp.controlKnobs[1], [[2, 2], [-v1rect.left, -v1rect.top], [2, 300], [v1rect.width / 2, v1rect.height / 2]], { x: v1rect.left, y: v1rect.top });
    vi.advanceTimersByTime(350);
    expect(cp.rgb).to.not.deep.equal({ r: 255, g: 0, b: 0, a: 1 });

    write(input, "hsl 0 100 100 Enter");
    vi.advanceTimersByTime(350);
    swipe(cp.controlKnobs[2], [[2, 2], [-v2rect.left, -v2rect.top], [2, 300], [v2rect.width / 2, v2rect.height / 2]], { x: v2rect.left, y: v2rect.top });
    vi.advanceTimersByTime(350);
    expect(cp.rgb).to.not.deep.equal({ r: 255, g: 0, b: 0, a: 1 });

    // test control knobs keyboard events
    write(input, 'hsl 300 100 50 Enter');
    vi.advanceTimersByTime(350);
    let currentRgb = cp.rgb;
    cp.controlKnobs[0].focus();
    cp.controlKnobs[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowDown", code: 'ArrowDown' }));
    cp.controlKnobs[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowDown", code: 'ArrowDown' }));
    cp.controlKnobs[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "a", code: 'a' })); // adge case, produces no effect
    cp.controlKnobs[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowRight", code: 'ArrowRight' }));
    cp.controlKnobs[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowRight", code: 'ArrowRight' }));
    cp.controlKnobs[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowLeft", code: 'ArrowLeft' }));
    vi.advanceTimersByTime(350);
    expect(cp.rgb).to.not.deep.equal(currentRgb);

    write(input, 'hsl 180 100 50 Enter');
    vi.advanceTimersByTime(350);
    currentRgb = cp.rgb;
    cp.controlKnobs[1].focus();
    cp.controlKnobs[1].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowDown", code: 'ArrowDown' }));
    cp.controlKnobs[1].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowDown", code: 'ArrowDown' }));
    cp.controlKnobs[1].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "b", code: 'b' }));
    cp.controlKnobs[1].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowRight", code: 'ArrowRight' }));
    cp.controlKnobs[1].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowRight", code: 'ArrowRight' }));
    cp.controlKnobs[1].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowLeft", code: 'ArrowLeft' }));
    vi.advanceTimersByTime(350);
    expect(cp.rgb).to.not.deep.equal(currentRgb);

    write(input, 'hsl 0 100 50');
    vi.advanceTimersByTime(350);
    currentRgb = cp.rgb;
    cp.controlKnobs[2].focus();
    cp.controlKnobs[2].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowDown", code: 'ArrowDown' }));
    cp.controlKnobs[2].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowDown", code: 'ArrowDown' }));
    cp.controlKnobs[2].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "b", code: 'c' }));
    cp.controlKnobs[2].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowRight", code: 'ArrowRight' }));
    cp.controlKnobs[2].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowRight", code: 'ArrowRight' }));
    cp.controlKnobs[2].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowLeft", code: 'ArrowLeft' }));
    vi.advanceTimersByTime(350);
    expect(cp.rgb).to.not.deep.equal(currentRgb);
  });
  it('Test private methods', function () {
    vi.useFakeTimers();
    const id = getRandomInt(0, 999);
    const format = FORMAT[getRandomInt(0, 3)];
    const { container } = getMarkup(id, format);
    wrapper.append(container);
    const input = container.querySelector('input');
    if (!input) return;

    const cp = new ColorPicker(input, {
      colorKeywords: 'green,green,red,transparent',
      colorPresets: colorPresets,
    });

    cp.togglePicker();
    vi.advanceTimersByTime(350);
    expect(cp.colorPicker.className).to.contain('show');

    cp.togglePicker();
    vi.advanceTimersByTime(350);
    expect(cp.colorPicker.className).to.not.contain('show');

    cp.toggleMenu();
    vi.advanceTimersByTime(350);
    expect(cp.colorMenu.className).to.contain('show');

    cp.toggleMenu();
    vi.advanceTimersByTime(350);
    expect(cp.colorMenu.className).to.not.contain('show');

    cp.showPicker();
    vi.advanceTimersByTime(350);
    expect(cp.colorPicker.className).to.contain('show');

    cp.hide();
    vi.advanceTimersByTime(350);
    expect(cp.colorPicker.className).to.not.contain('show');

    cp.dispose();
    vi.advanceTimersByTime(350);
    expect(cp.colorPicker).to.not.undefined;
  });

  const frenchColors = colorNamesFrench.split(',');
  frenchColors.forEach((color) => {
    it(`Test color appearance and color luminance ${color}`, () => {
      vi.useFakeTimers();
      const id = getRandomInt(0, 999);
      const format = FORMAT[getRandomInt(0, 3)];
      const { container } = getMarkup(id, format);
      wrapper.append(container);
      const input = container.querySelector('input');
      if (!input) return;

      const cp = new ColorPicker(input, {
        colorKeywords: 'olive,green,red,transparent',
        colorPresets: colorPresets,
        colorLabels: colorNamesFrench,
      });

      const webcolor = colorNameValues[frenchColors.indexOf(color)];

      vi.advanceTimersByTime(350);
      write(input, webcolor + "Enter");
      vi.advanceTimersByTime(50);
      expect(cp.isValid).to.be.true;
      expect(cp.appearance).to.equal(color);

      if (colorNames[frenchColors.indexOf(color)] === 'white') {
        expect(cp.luminance).to.be.greaterThan(0.99);
      } else {
        expect(cp.luminance).to.be.lessThan(0.99);
      }
      vi.advanceTimersByTime(350);

    });
  });

  FORMAT.forEach((format) => {
    it(`Test format specific event listeners - ${format.toUpperCase()}`, async () => {
      vi.useFakeTimers();
      const id = getRandomInt(0, 999);
      const { container } = getMarkup(id, format);
      wrapper.append(container);
      const input = container.querySelector('input');
      if (!input) return;

      const cp = new ColorPicker(input, {
        colorKeywords: ['green', 'green', 'red', 'transparent', 'currentColor'],
        colorPresets: colorPresets.split(','),
        colorLabels: colorNamesFrench.split(','),
      });
      cp.showPicker();
      vi.advanceTimersByTime(350);

      // Test typing a valid value and press `Enter`
      write(input, 'hsl 0 100 50 Enter');
      vi.advanceTimersByTime(350);
      if (format === 'hsl') {
        expect(cp.value).to.be.equal('hsl(0, 100%, 50%)');
      } else if (format === 'rgb') {
        expect(cp.value).to.be.equal('rgb(255, 0, 0)');
      } else if (format === 'hex') {
        expect(cp.value).to.be.equal('#f00');
      } else if (format === 'hwb') {
        expect(cp.value).to.be.equal('hwb(0deg 0% 0%)');
      }

      // Test keyboard event listeners on `inputs`
      if (format === 'hex') {
        write(input, "hsl 300 100 50 Enter");
        vi.advanceTimersByTime(350);
        const rgb = cp.rgb;
        write(cp.inputs[0], 'hsl 100 100 50 Enter');
        vi.advanceTimersByTime(350);
        expect(cp.rgb).to.not.deep.equal(rgb);
      } else if (format === 'rgb') {
        write(input, "hsl 300 100 50 Enter");
        vi.advanceTimersByTime(350);
        let rgb = cp.rgb;
        write(cp.inputs[0], '150Enter');
        vi.advanceTimersByTime(350);
        expect(cp.rgb).to.not.deep.equal(rgb);

        write(input, "hsl 100 100 50 Enter");
        vi.advanceTimersByTime(350);
        rgb = cp.rgb;
        write(cp.inputs[1], '150Enter');
        vi.advanceTimersByTime(350);
        expect(cp.rgb).to.not.deep.equal(rgb);

        write(input, "hsl 300 100 50 Enter");
        vi.advanceTimersByTime(350);
        rgb = cp.rgb;
        write(cp.inputs[2], '150Enter');
        vi.advanceTimersByTime(350);
        expect(cp.rgb).to.not.deep.equal(rgb);

      } else if (format === 'hsl' || format === 'hwb') {
        write(input, "hsl 270 100 50 Enter");
        vi.advanceTimersByTime(350);
        let rgb = cp.rgb;
        write(cp.inputs[0], '0Enter');
        vi.advanceTimersByTime(350);
        expect(cp.rgb).to.not.deep.equal(rgb);

        write(input, "hsl 330 100 50 Enter");
        vi.advanceTimersByTime(350);
        rgb = cp.rgb;
        write(cp.inputs[1], '50Enter');
        vi.advanceTimersByTime(350);
        expect(cp.rgb).to.not.deep.equal(rgb);

        write(input, "hsl 300 100 50 Enter");
        vi.advanceTimersByTime(350);
        rgb = cp.rgb;
        write(cp.inputs[2], '25Enter');
        vi.advanceTimersByTime(350);
        expect(cp.rgb).to.not.deep.equal(rgb);
      }

      if (format !== 'hex') {
        write(input, "hsl 240 100 50 Enter");
        vi.advanceTimersByTime(350);
        const rgb = cp.rgb;
        write(cp.inputs[3], '25Enter');
        vi.advanceTimersByTime(350);
        expect(cp.rgb).to.not.deep.equal(rgb);
      }
    });
  });
});
