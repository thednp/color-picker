import querySelectorAll from 'shorter-js/src/selectors/querySelectorAll';
import ColorPicker from './color-picker';

function initCallBack() {
  const { init, selector } = ColorPicker;
  [...querySelectorAll(selector)].forEach(init);
}

if (document.body) initCallBack();
else document.addEventListener('DOMContentLoaded', initCallBack, { once: true });

export default ColorPicker;
