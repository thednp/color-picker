import querySelectorAll from 'shorter-js/src/selectors/querySelectorAll';
import getDocument from 'shorter-js/src/get/getDocument';
import getDocumentBody from 'shorter-js/src/get/getDocumentBody';

import { addListener } from 'event-listener.js';
import ColorPicker from '../color-picker';

function initCallBack() {
  const { init, selector } = ColorPicker;
  [...querySelectorAll(selector)].forEach(init);
}

if (getDocumentBody()) initCallBack();
else addListener(getDocument(), 'DOMContentLoaded', initCallBack, { once: true });
