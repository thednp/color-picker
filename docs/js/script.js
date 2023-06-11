const [picker31, picker0, picker1, picker2, picker3] = document.querySelectorAll('input');
const [picker4, picker5, picker6, picker7] = [...document.querySelectorAll('color-picker')].map(c => c.querySelector('input'));

const picker31Instance = new ColorPicker(picker31, {
  // colorPresets: bootstrapColors,
  colorKeywords: ['initial', 'revert', 'inherit']
});

const picker1Instance = new ColorPicker(picker1, {
  colorPresets: bootstrapColors,
  colorKeywords: ['initial', 'revert', 'inherit']
});

const picker2Instance = new ColorPicker(picker2, {
  format: 'hwb',
  colorPresets: tailwindColors,
  colorKeywords: '#c2400de6:default,#0d8fc2e6:complementary',
  componentLabels: {
    pickerLabel: "Panel de culori",
    appearanceLabel: "Aparența vizuală",
    valueLabel:"Valoarea actuală",
    toggleLabel: "Selectează culoare", 
    presetsLabel: "Culori prestabilite",
    defaultsLabel: "Valori implicite",
    alphaLabel: "Alfa", hexLabel: "Hexazecimal",
    whitenessLabel: 'Alb', blacknessLabel: 'Negru',
    hueLabel: "Nuanță", saturationLabel: "Saturație", lightnessLabel: "Luminozitate",
    redLabel: "Roșu", greenLabel: "Verde", blueLabel: "Albastru",
  },
  colorLabels:"alb, negru, gri, roșu, portocaliu, maro, auriu, măsliniu, galben, lămâi, verde, albastru verzui, aqua, albastru, violet, magenta, roz"  
});

const picker3Instance = new ColorPicker(picker3, {
  colorPresets: materialColors,
  colorKeywords: ['transparent', 'currentColor']
});

const { init, selector } = ColorPicker;
[...document.querySelectorAll(selector)].forEach(init);

const favicon = document.getElementById('favicon');
const CPs = [...document.querySelectorAll('input')]
  .filter(x=>ColorPicker.getInstance(x) || ColorPicker.getInstance(x));

let changed = 0;

CPs.forEach((input, i) => {
  input.addEventListener('colorpicker.change', (e) => {
    const { target } = e;
    let cp = target.parentNode.localName === 'color-picker'
      ? ColorPickerElement.getInstance(target)
      : ColorPicker.getInstance(target);
    const {color} = cp;

    if (target === picker0) {
      const {h, s, l, a} = cp.hsl;
      [picker1, picker2, picker3].forEach((p, i) => {
        const pickerInstance = ColorPicker.getInstance(p);
        const { r, g, b, a: al } = new ColorPicker.Color({ h, s, l, a }).spin((i + 1) * 90);
        Object.assign(pickerInstance.color, { r, g, b, a: al });

        pickerInstance.update();
      })
    }
    if (target === picker3 && !changed) {
      changed = 1;
      console.log(`The "colorpicker.change" event has fired for <color-picker id="picker3"> with new value: ${target.value}\nThis listener is set to fire *only* once for performance reasons.`);
    }

    if (target === picker4) {
      if (target.value === 'revert') {
        document.body.style.setProperty('--body-bg', '');
        document.body.style.setProperty('--color', '');
        document.body.style.setProperty('--heading-color', '');
      } else if (target.value === 'transparent') {
        document.body.style.setProperty('--body-bg', 'transparent');
        document.body.style.setProperty('--color', '');
        document.body.style.setProperty('--heading-color', '');
      } else {
        const lightModifier = cp.isDark ? 35 : -35;
        const [cp5, cp6] = [picker5, picker6].map(ColorPickerElement.getInstance);
        cp5.color = color.clone().setAlpha(1).lighten(lightModifier);
        cp6.color = color.clone().setAlpha(1).spin(60).lighten(1.2 * lightModifier);
        cp5.update(); cp6.update();
        document.body.style.setProperty('--body-bg', color.toString());
        document.body.style.setProperty('--color', cp5.color.toString());
        document.body.style.setProperty('--heading-color', cp6.color.toString());
      }
    }
    if (target === picker5) {
      document.body.style.setProperty('--color', color.toString());
    }
    if (target === picker6) {
      document.body.style.setProperty('--heading-color', color.toString());
    }
    if (target === picker7) {
      document.body.style.setProperty('--btn-bg-color', color.toString());
      if (color.isDark) {
        document.body.style.setProperty('--btn-color', 'rgb(255 255 255 / 70%)');
      } else {
        document.body.style.setProperty('--btn-color', 'rgb(0 0 0 / 70%)');
      }
    }
    const favColor = new ColorPicker.Color({ r: color.r, g: color.g, b: color.b}).toString();
    favicon.setAttribute('href', `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="${favColor}"><path d="M0 32a32 32 0 1 0 64 0a32 32 0 1 0 -64 0M21.83 47.18v-30.3q0 -4.65 2.66 -6.79T33 7.96c2.78 -0.15 5.55 0.42 8.04 1.67c0.23 0.13 0.45 0.28 0.66 0.43q2.85 2.1 2.85 6.9v9.97l-6.37 0.82v-9.22q0 -2.55 -0.98 -3.94t-4.05 -1.39q-2.93 0 -3.86 1.46t-0.94 3.79v27.23q0 1.95 1.05 3.23t3.75 1.27q2.77 0 3.9 -1.27t1.13 -3.23v-8.7l6.38 -0.75v10.95q0 3.98 -2.92 6.15t-8.4 2.17c-2.79 0.17 -5.57 -0.45 -8.03 -1.79C25.01 53.6 24.82 53.47 24.64 53.33q-2.81 -2.17 -2.81 -6.15z"></path></svg>`)
  })
})

const styles = document.getElementById('styles');
const rtlSwitch = document.getElementById('rtlSwitch');
const html = document.documentElement;

rtlSwitch.addEventListener('click', (e) => {
  e.preventDefault();
  const isRTL = html.dir === 'rtl';
  const href = styles.getAttribute('href');
  const href1 = isRTL ? href.replace('.rtl', '') : href.replace('.css', '.rtl.css');
  rtlSwitch.innerText = isRTL ? 'RTL' : 'LTR';
  styles.setAttribute('href', href1);
  html.setAttribute('dir', isRTL ? '' : 'rtl');
});


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min) + min);
}
