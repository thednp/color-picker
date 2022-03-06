// ColorPickerElement v0.0.1 | thednp © 2022 | MIT-License
function e(e){return e instanceof HTMLElement?e.ownerDocument:e instanceof Window?e.document:window.document}const t=[Document,Element,HTMLElement],o=[Element,HTMLElement];function n(n,r){const a=t.some(e=>r instanceof e)?r:e();return o.some(e=>n instanceof e)?n:a.querySelector(n)}const r=(e,t)=>Object.assign(e,t);function a(t){if("string"==typeof t)return e().createElement(t);const{tagName:o}=t,n={...t},s=a(o);return delete n.tagName,r(s,n),s}const s=(e,t)=>{r(e.style,t)},i=["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","goldenrod","gold","gray","green","greenyellow","grey","honeydew","hotpink","indianred","indigo","ivory","khaki","lavenderblush","lavender","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"],l="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",c=`[\\s|\\(]+(${l})[,|\\s]+(${l})[,|\\s]+(${l})\\s*\\)?`,h=`[\\s|\\(]+(${l})[,|\\s]+(${l})[,|\\s]+(${l})[,|\\s]+(${l})\\s*\\)?`,u={CSS_UNIT:new RegExp(l),rgb:new RegExp("rgb"+c),rgba:new RegExp("rgba"+h),hsl:new RegExp("hsl"+c),hsla:new RegExp("hsla"+h),hsv:new RegExp("hsv"+c),hsva:new RegExp("hsva"+h),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function d(e){return"string"==typeof e&&e.includes(".")&&1===parseFloat(e)}function g(e){return"string"==typeof e&&e.includes("%")}function p(e){return Boolean(u.CSS_UNIT.exec(String(e)))}function m(e,t){let o=e;return d(e)&&(o="100%"),o=360===t?o:Math.min(t,Math.max(0,parseFloat(o))),g(o)&&(o=parseInt(String(o*t),10)/100),Math.abs(o-t)<1e-6?1:(o=360===t?(o<0?o%t+t:o%t)/parseFloat(String(t)):o%t/parseFloat(String(t)),o)}function f(e){let t=parseFloat(e);return(Number.isNaN(t)||t<0||t>1)&&(t=1),t}function b(e){return Math.min(1,Math.max(0,e))}function w(t){const o=e(n).head;var n;s(o,{color:t});const r=function(e,t){const o=getComputedStyle(e);return t in o?o[t]:""}(o,"color");return s(o,{color:""}),r}function v(e){return e<=1?100*Number(e)+"%":e}function k(e){return 1===e.length?"0"+e:String(e)}function x(e,t,o){return{r:255*m(e,255),g:255*m(t,255),b:255*m(o,255)}}function y(e,t,o){const n=m(e,255),r=m(t,255),a=m(o,255),s=Math.max(n,r,a),i=Math.min(n,r,a);let l=0,c=0;const h=(s+i)/2;if(s===i)c=0,l=0;else{const e=s-i;switch(c=h>.5?e/(2-s-i):e/(s+i),s){case n:l=(r-a)/e+(r<a?6:0);break;case r:l=(a-n)/e+2;break;case a:l=(n-r)/e+4}l/=6}return{h:l,s:c,l:h}}function S(e,t,o){let n=o;return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*n*(t-e):n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function M(e,t,o){let n=0,r=0,a=0;const s=m(e,360),i=m(t,100),l=m(o,100);if(0===i)r=l,a=l,n=l;else{const e=l<.5?l*(1+i):l+i-l*i,t=2*l-e;n=S(t,e,s+1/3),r=S(t,e,s),a=S(t,e,s-1/3)}return{r:255*n,g:255*r,b:255*a}}function C(e,t,o){const n=m(e,255),r=m(t,255),a=m(o,255),s=Math.max(n,r,a),i=Math.min(n,r,a);let l=0;const c=s,h=s-i,u=0===s?0:h/s;if(s===i)l=0;else{switch(s){case n:l=(r-a)/h+(r<a?6:0);break;case r:l=(a-n)/h+2;break;case a:l=(n-r)/h+4}l/=6}return{h:l,s:u,v:c}}function $(e,t,o){const n=6*m(e,360),r=m(t,100),a=m(o,100),s=Math.floor(n),i=n-s,l=a*(1-r),c=a*(1-i*r),h=a*(1-(1-i)*r),u=s%6;return{r:255*[a,c,l,l,h,a][u],g:255*[h,a,a,c,l,l][u],b:255*[l,l,h,a,a,c][u]}}function L(e,t,o){return[k(Math.round(e).toString(16)),k(Math.round(t).toString(16)),k(Math.round(o).toString(16))].join("")}function N(e){return P(e)/255}function P(e){return parseInt(e,16)}function H(e){return{r:e>>16,g:(65280&e)>>8,b:255&e}}function E(e){let t=e.trim().toLowerCase();if(0===t.length)return{r:0,g:0,b:0,a:0};let o=!1;if(i.includes(t))t=w(t),o=!0;else if("transparent"===t)return{r:0,g:0,b:0,a:0,format:"name"};let n=u.rgb.exec(t);return n?{r:n[1],g:n[2],b:n[3]}:(n=u.rgba.exec(t),n?{r:n[1],g:n[2],b:n[3],a:n[4]}:(n=u.hsl.exec(t),n?{h:n[1],s:n[2],l:n[3]}:(n=u.hsla.exec(t),n?{h:n[1],s:n[2],l:n[3],a:n[4]}:(n=u.hsv.exec(t),n?{h:n[1],s:n[2],v:n[3]}:(n=u.hsva.exec(t),n?{h:n[1],s:n[2],v:n[3],a:n[4]}:(n=u.hex8.exec(t),n?{r:P(n[1]),g:P(n[2]),b:P(n[3]),a:N(n[4]),format:o?"name":"hex8"}:(n=u.hex6.exec(t),n?{r:P(n[1]),g:P(n[2]),b:P(n[3]),format:o?"name":"hex"}:(n=u.hex4.exec(t),n?{r:P(n[1]+n[1]),g:P(n[2]+n[2]),b:P(n[3]+n[3]),a:N(n[4]+n[4]),format:o?"name":"hex8"}:(n=u.hex3.exec(t),!!n&&{r:P(n[1]+n[1]),g:P(n[2]+n[2]),b:P(n[3]+n[3]),format:o?"name":"hex"})))))))))}function A(e){let t,o={r:0,g:0,b:0},n=e,r=null,a=null,s=null,i=!1,l="hex";return"string"==typeof e&&(n=E(e),n&&(i=!0)),"object"==typeof n&&(p(n.r)&&p(n.g)&&p(n.b)?(o=x(n.r,n.g,n.b),i=!0,l="%"===(""+n.r).slice(-1)?"prgb":"rgb"):p(n.h)&&p(n.s)&&p(n.v)?(r=v(n.s),a=v(n.v),o=$(n.h,r,a),i=!0,l="hsv"):p(n.h)&&p(n.s)&&p(n.l)&&(r=v(n.s),s=v(n.l),o=M(n.h,r,s),i=!0,l="hsl"),"a"in n&&(t=n.a)),{ok:i,format:n.format||l,r:Math.min(255,Math.max(o.r,0)),g:Math.min(255,Math.max(o.g,0)),b:Math.min(255,Math.max(o.b,0)),a:f(t)}}const T={format:"hex"};class R{constructor(e,t){let o=e;const n="object"==typeof t?r(T,t):r({},T);o instanceof R&&(o=A(o)),"number"==typeof o&&(o=H(o));const{r:a,g:s,b:i,a:l,ok:c,format:h}=A(o);this.originalInput=o,this.r=a,this.g=s,this.b=i,this.a=l,this.ok=c,this.roundA=Math.round(100*this.a)/100,this.format=n.format||h,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b))}get isValid(){return this.ok}get isDark(){return this.brightness<128}get luminance(){const{r:e,g:t,b:o}=this;let n=0,r=0,a=0;const s=e/255,i=t/255,l=o/255;return n=s<=.03928?s/12.92:((s+.055)/1.055)**2.4,r=i<=.03928?i/12.92:((i+.055)/1.055)**2.4,a=l<=.03928?l/12.92:((l+.055)/1.055)**2.4,.2126*n+.7152*r+.0722*a}get brightness(){const{r:e,g:t,b:o}=this;return(299*e+587*t+114*o)/1e3}toRgb(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){const e=Math.round(this.r),t=Math.round(this.g),o=Math.round(this.b);return 1===this.a?`rgb(${e},${t},${o})`:`rgba(${e},${t},${o},${this.roundA})`}toHex(){return L(this.r,this.g,this.b)}toHexString(){return"#"+this.toHex()}toHsv(){const{h:e,s:t,v:o}=C(this.r,this.g,this.b);return{h:360*e,s:t,v:o,a:this.a}}toHsl(){const{h:e,s:t,l:o}=y(this.r,this.g,this.b);return{h:360*e,s:t,l:o,a:this.a}}toHslString(){const e=this.toHsl(),t=Math.round(e.h),o=Math.round(100*e.s),n=Math.round(100*e.l);return 1===this.a?`hsl(${t},${o}%,${n}%)`:`hsla(${t},${o}%,${n}%,${this.roundA})`}setAlpha(e){return this.a=f(e),this.roundA=Math.round(100*this.a)/100,this}saturate(e){if(!e)return this;const t=this.toHsl();return t.s+=e/100,t.s=b(t.s),new R(t)}desaturate(e){return e?this.saturate(-e):this}greyscale(){return this.desaturate(100)}clone(){return new R(this)}toString(){const{format:e}=this;return"rgb"===e?this.toRgbString():"hsl"===e?this.toHslString():this.toHexString()}}r(R,{colorNames:i,CSS_INTEGER:"[-\\+]?\\d+%?",CSS_NUMBER:"[-\\+]?\\d*\\.\\d+%?",CSS_UNIT:l,PERMISSIVE_MATCH3:c,PERMISSIVE_MATCH4:h,matchers:u,isOnePointZero:d,isPercentage:g,isValidCSSUnit:p,bound01:m,boundAlpha:f,clamp01:b,getHexFromColorName:w,convertToPercentage:v,convertHexToDecimal:N,pad2:k,rgbToRgb:x,rgbToHsl:y,rgbToHex:L,rgbToHsv:C,hslToRgb:M,hsvToRgb:$,hue2rgb:S,parseIntFromHex:P,numberInputToObject:H,stringInputToObject:E,inputToRGB:A});const F={};function D(e){const t=this,{type:o}=e;(F[o]?[...F[o]]:[]).forEach(n=>{const[r,a]=n;[...a].forEach(n=>{if(r===t){const[t,a]=n;t.apply(r,[e]),a&&a.once&&O(r,o,t,a)}})})}const I=(e,t,o,n)=>{F[t]||(F[t]=new Map);const r=F[t];r.has(e)||r.set(e,new Map);const a=r.get(e),{size:s}=a;a&&a.set(o,n),s||e.addEventListener(t,D,n)},O=(e,t,o,n)=>{const r=F[t],a=r&&r.get(e),s=a&&a.get(o),{options:i}=void 0!==s?s:{options:n};a&&a.has(o)&&a.delete(o),!r||a&&a.size||r.delete(e),r&&r.size||delete F[t],a&&a.size||e.removeEventListener(t,D,i)},q="ArrowDown",Y="ArrowUp",_="ArrowLeft",V="ArrowRight",K="Enter",G="Space",{userAgentData:U}=navigator,X=U,{userAgent:j}=navigator,B=j,z=/iPhone|iPad|iPod|Android/i;let W=!1;W=X?X.brands.some(e=>z.test(e.brand)):z.test(B);const J=W;let Z=1;const Q=new Map;function ee(e,t){const{width:o,height:n,top:r,right:a,bottom:s,left:i}=e.getBoundingClientRect();let l=1,c=1;if(t&&e instanceof HTMLElement){const{offsetWidth:t,offsetHeight:r}=e;l=t>0&&Math.round(o)/t||1,c=r>0&&Math.round(n)/r||1}return{width:o/l,height:n/c,top:r/c,right:a/l,bottom:s/c,left:i/l,x:i/l,y:r/c}}function te(o,n){return(n&&t.some(e=>n instanceof e)?n:e()).querySelectorAll(o)}function oe(t,o){if("string"==typeof o)return e().createElementNS(t,o);const{tagName:n}=o,a={...o},s=oe(t,n);return delete a.tagName,r(s,a),s}const ne=new Map,re={set:(e,t,o)=>{const r=n(e);if(!r)return;ne.has(t)||ne.set(t,new Map);ne.get(t).set(r,o)},getAllFor:e=>ne.get(e)||null,get:(e,t)=>{const o=n(e),r=re.getAllFor(t);return o&&r&&r.get(o)||null},remove:(e,t)=>{const o=n(e),r=ne.get(t);r&&o&&(r.delete(o),0===r.size&&ne.delete(t))}};function ae(e,t){return e.classList.contains(t)}function se(e,t){e.classList.add(t)}function ie(e,t){e.classList.remove(t)}const le=(e,t,o)=>e.setAttribute(t,o),ce=(e,t)=>e.getAttribute(t),he="v-hidden";function ue(e,t,o,n,r){const s=`appearance${e}_${t}`,i=1===e?"color-pointer":"color-slider",l=a({tagName:"div",className:"color-control"});le(l,"role","presentation"),l.append(a({id:s,tagName:"label",className:"color-label v-hidden",ariaLive:"polite"}),a({tagName:"canvas",className:"visual-control"+e,ariaHidden:"true",width:""+o,height:""+n}));const c=a({tagName:"div",className:i+" knob"});return le(c,"aria-labelledby",r||s),le(c,"tabindex","0"),l.append(c),l}const de=["transparent","currentColor","inherit","initial"],ge=["white","black","grey","red","orange","brown","gold","olive","yellow","lime","green","teal","cyan","blue","violet","magenta","pink"],pe={pickerLabel:"Colour Picker",toggleLabel:"Select colour",menuLabel:"Select colour preset",requiredLabel:"Required",formatLabel:"Colour Format",formatHEX:"Hexadecimal Format",formatRGB:"RGB Format",formatHSL:"HSL Format",alphaLabel:"Alpha",appearanceLabel:"Colour Appearance",hexLabel:"Hexadecimal",hueLabel:"Hue",saturationLabel:"Saturation",lightnessLabel:"Lightness",redLabel:"Red",greenLabel:"Green",blueLabel:"Blue"};function me(e,t){const o=t?I:O,{input:n,pickerToggle:r,menuToggle:a}=e;o(n,"focusin",e.showPicker),o(r,"click",e.togglePicker),o(n,"keydown",e.keyHandler),a&&o(a,"click",e.toggleMenu)}function fe(e){const{input:t,parent:o,format:n,id:s,componentLabels:i,keywords:l}=e,c=ce(t,"value")||"#fff",{toggleLabel:h,menuLabel:u,formatLabel:d,pickerLabel:g,appearanceLabel:p}=i,m=de.includes(c)?"#fff":c;e.color=new R(m,{format:n});const f=J?150:230,b=J?150:230,w=J?" mobile":"",v="hsl"===n?`appearance_${s} appearance1_${s}`:"appearance1_"+s,k="hsl"===n?"appearance2_"+s:`appearance_${s} appearance2_${s}`,x=a({tagName:"button",className:"picker-toggle button-appearance",ariaExpanded:"false",ariaHasPopup:"true",ariaLive:"polite"});le(x,"tabindex","-1"),x.append(a({tagName:"span",className:he,innerText:"Open Color Picker"}));const y=a({tagName:"div",className:"color-dropdown picker"+w});le(y,"aria-labelledby",`picker-label-${s} format-label-${s}`),le(y,"role","group"),y.append(a({tagName:"label",className:he,ariaHidden:"true",id:"picker-label-"+s,innerText:""+g}),a({tagName:"label",className:he,ariaHidden:"true",id:"format-label-"+s,innerText:""+d}),a({tagName:"label",className:"color-appearance v-hidden",ariaHidden:"true",ariaLive:"polite",id:"appearance_"+s,innerText:""+p}));const S=a({tagName:"div",className:"color-controls "+n});S.append(ue(1,s,f,b,v),ue(2,s,21,b,k)),"hex"!==n&&S.append(ue(3,s,21,b));const M=function(e){const{format:t,id:o}=e,n=a({tagName:"div",className:"color-form "+t});let s=["hex"];return"rgb"===t?s=["red","green","blue","alpha"]:"hsl"===t&&(s=["hue","saturation","lightness","alpha"]),s.forEach(e=>{const[s]="hex"===t?["#"]:(i=e,i.toUpperCase()).split("");var i;const l=`color_${t}_${e}_${o}`,c=a({tagName:"label"});le(c,"for",l),c.append(a({tagName:"span",ariaHidden:"true",innerText:s+":"}),a({tagName:"span",className:he,innerText:""+e}));const h=a({tagName:"input",id:l,type:"hex"===t?"text":"number",value:"alpha"===e?"1":"0",className:"color-input "+e,autocomplete:"off",spellcheck:"false"});if("hex"!==t){let o="1",n="0.01";"alpha"!==e&&("rgb"===t?(o="255",n="1"):"hue"===e?(o="360",n="1"):(o="100",n="1")),r(h,{min:"0",max:o,step:n})}n.append(c,h)}),n}(e);if(y.append(S,M),o.append(x,y),l){const e=l,r=a({tagName:"div",className:"color-dropdown menu"+w}),s=a({tagName:"ul",ariaLabel:""+u,className:"color-menu"});le(s,"role","listbox"),r.append(s),e.forEach(e=>{const o=e.trim(),r=new R(o,{format:n}).toString()===ce(t,"value"),i=a({tagName:"li",className:"color-option"+(r?" active":""),ariaSelected:r?"true":"false",innerText:""+e});le(i,"role","option"),le(i,"tabindex","0"),le(i,"data-value",""+o),s.append(i)});const i=a({tagName:"button",className:"menu-toggle button-appearance",ariaExpanded:"false",ariaHasPopup:"true"}),c=encodeURI("http://www.w3.org/2000/svg"),d=oe(c,{tagName:"svg"});le(d,"xmlns",c),le(d,"aria-hidden","true"),le(d,"viewBox","0 0 512 512");const g=oe(c,{tagName:"path"});le(g,"d","M98,158l157,156L411,158l27,27L255,368L71,185L98,158z"),le(g,"fill","#fff"),d.append(g),i.append(a({tagName:"span",className:he,innerText:""+h}),d),o.append(i,r)}l&&de.includes(c)&&(e.value=c)}function be(e,t){const o=t?I:O,n="ontouchstart"in document?{down:"touchstart",move:"touchmove",up:"touchend"}:{down:"mousedown",move:"mousemove",up:"mouseup"};o(e.controls,n.down,e.pointerDown),e.controlKnobs.forEach(t=>o(t,"keydown",e.handleKnobs)),o(window,"scroll",e.handleScroll),[e.input,...e.inputs].forEach(t=>o(t,"change",e.changeHandler)),e.colorMenu&&(o(e.colorMenu,"click",e.menuClickHandler),o(e.colorMenu,"keydown",e.menuKeyHandler)),o(document,n.move,e.pointerMove),o(document,n.up,e.pointerUp),o(window,"keyup",e.handleDismiss),o(e.parent,"focusout",e.handleFocusOut)}function we(e){var t,o;t=e.input,o=new CustomEvent("colorpicker.change"),t.dispatchEvent(o)}function ve(e,t){const o=t?ae:ie;return!!e&&["show","show-top"][t?"some":"forEach"](t=>o(e,t))}class ke{constructor(e){const t=this;if(t.input=n(e),!t.input)throw new TypeError(`ColorPicker target ${e} cannot be found.`);const{input:o}=t;if(t.parent=function e(t,o){return t?t.closest(o)||e(t.getRootNode().host,o):null}(o,".color-picker,color-picker"),!t.parent)throw new TypeError("ColorPicker requires a specific markup to work.");t.id=function(e,t){Z+=1;let o=Q.get(e),n=Z;if(t&&t.length)if(o){const e=o.get(t);Number.isNaN(e)?o.set(t,n):n=e}else Q.set(e,new Map),o=Q.get(e),o.set(t,n);else Number.isNaN(o)?Q.set(e,n):n=o;return n}(o,"color-picker"),t.dragElement=null,t.isOpen=!1,t.controlPositions={c1x:0,c1y:0,c2y:0,c3y:0},t.colorLabels={},t.keywords=!1,t.color=new R("white",{format:t.format}),t.componentLabels=r({},pe);const{componentLabels:a,colorLabels:s,keywords:i}=o.dataset,l=a?JSON.parse(a):{};t.componentLabels=r(t.componentLabels,l);const c=s&&17===s.split(",").length?s.split(","):ge;ge.forEach((e,o)=>{t.colorLabels[e]=c[o]}),"false"!==i&&(t.keywords=i?i.split(","):de),t.showPicker=t.showPicker.bind(t),t.togglePicker=t.togglePicker.bind(t),t.toggleMenu=t.toggleMenu.bind(t),t.menuClickHandler=t.menuClickHandler.bind(t),t.menuKeyHandler=t.menuKeyHandler.bind(t),t.pointerDown=t.pointerDown.bind(t),t.pointerMove=t.pointerMove.bind(t),t.pointerUp=t.pointerUp.bind(t),t.handleScroll=t.handleScroll.bind(t),t.handleFocusOut=t.handleFocusOut.bind(t),t.changeHandler=t.changeHandler.bind(t),t.handleDismiss=t.handleDismiss.bind(t),t.keyHandler=t.keyHandler.bind(t),t.handleKnobs=t.handleKnobs.bind(t),fe(t);const{parent:h}=t;t.pickerToggle=n(".picker-toggle",h),t.menuToggle=n(".menu-toggle",h),t.colorMenu=n(".color-dropdown.menu",h),t.colorPicker=n(".color-dropdown.picker",h),t.controls=n(".color-controls",h),t.inputs=[...te(".color-input",h)],t.controlKnobs=[...te(".knob",h)],t.visuals=[...te("canvas",t.controls)],t.knobLabels=[...te(".color-label",h)],t.appearance=n(".color-appearance",h);const[u,d,g]=t.visuals;t.width1=u.width,t.height1=u.height,t.width2=d.width,t.height2=d.height,t.ctx1=u.getContext("2d"),t.ctx2=d.getContext("2d"),t.ctx1.rect(0,0,t.width1,t.height1),t.ctx2.rect(0,0,t.width2,t.height2),t.width3=0,t.height3=0,"hex"!==t.format&&(t.width3=g.width,t.height3=g.height,this.ctx3=g.getContext("2d"),t.ctx3.rect(0,0,t.width3,t.height3)),this.setControlPositions(),this.setColorAppearence(),this.updateInputs(!0),this.updateControls(),this.updateVisuals(),me(t,!0),re.set(o,"color-picker",t)}get value(){return this.input.value}set value(e){this.input.value=e}get required(){return e=this.input,t="required",e.hasAttribute(t);var e,t}get format(){return ce(this.input,"format")||"hex"}get name(){return ce(this.input,"name")}get label(){return n(`[for="${this.input.id}"]`)}get includeNonColor(){return this.keywords instanceof Array&&this.keywords.some(e=>de.includes(e))}get hex(){return this.color.toHex()}get hsv(){return this.color.toHsv()}get hsl(){return this.color.toHsl()}get rgb(){return this.color.toRgb()}get brightness(){return this.color.brightness}get luminance(){return this.color.luminance}get isDark(){const{rgb:e,brightness:t}=this;return t<120&&e.a>.33}get isValid(){const e=this.input.value;return""!==e&&new R(e).isValid}updateVisuals(){const{color:e,format:t,controlPositions:o,width1:n,width2:r,width3:a,height1:s,height2:i,height3:l,ctx1:c,ctx2:h,ctx3:u}=this,{r:d,g:g,b:p}=e;if("hsl"!==t){const e=Math.round(o.c2y/i*360);c.fillStyle=new R(`hsl(${e},100%,50%})`).toRgbString(),c.fillRect(0,0,n,s);const t=h.createLinearGradient(0,0,n,0);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(1,"rgba(255,255,255,0)"),c.fillStyle=t,c.fillRect(0,0,n,s);const a=h.createLinearGradient(0,0,0,s);a.addColorStop(0,"rgba(0,0,0,0)"),a.addColorStop(1,"rgba(0,0,0,1)"),c.fillStyle=a,c.fillRect(0,0,n,s);const l=h.createLinearGradient(0,0,0,s);l.addColorStop(0,"rgba(255,0,0,1)"),l.addColorStop(.17,"rgba(255,255,0,1)"),l.addColorStop(.34,"rgba(0,255,0,1)"),l.addColorStop(.51,"rgba(0,255,255,1)"),l.addColorStop(.68,"rgba(0,0,255,1)"),l.addColorStop(.85,"rgba(255,0,255,1)"),l.addColorStop(1,"rgba(255,0,0,1)"),h.fillStyle=l,h.fillRect(0,0,r,i)}else{const t=c.createLinearGradient(0,0,n,0),r=Math.round(100*(1-o.c2y/i));t.addColorStop(0,new R("rgba(255,0,0,1)").desaturate(100-r).toRgbString()),t.addColorStop(.17,new R("rgba(255,255,0,1)").desaturate(100-r).toRgbString()),t.addColorStop(.34,new R("rgba(0,255,0,1)").desaturate(100-r).toRgbString()),t.addColorStop(.51,new R("rgba(0,255,255,1)").desaturate(100-r).toRgbString()),t.addColorStop(.68,new R("rgba(0,0,255,1)").desaturate(100-r).toRgbString()),t.addColorStop(.85,new R("rgba(255,0,255,1)").desaturate(100-r).toRgbString()),t.addColorStop(1,new R("rgba(255,0,0,1)").desaturate(100-r).toRgbString()),c.fillStyle=t,c.fillRect(0,0,n,s);const u=c.createLinearGradient(0,0,0,s);u.addColorStop(0,"rgba(255,255,255,1)"),u.addColorStop(.5,"rgba(255,255,255,0)"),c.fillStyle=u,c.fillRect(0,0,n,s);const m=c.createLinearGradient(0,0,0,s);m.addColorStop(.5,"rgba(0,0,0,0)"),m.addColorStop(1,"rgba(0,0,0,1)"),c.fillStyle=m,c.fillRect(0,0,n,s);const f=h.createLinearGradient(0,0,0,i),b=e.clone().greyscale().toRgb();f.addColorStop(0,`rgba(${d},${g},${p},1)`),f.addColorStop(1,`rgba(${b.r},${b.g},${b.b},1)`),h.fillStyle=f,h.fillRect(0,0,a,l)}if("hex"!==t){u.clearRect(0,0,a,l);const e=u.createLinearGradient(0,0,0,l);e.addColorStop(0,`rgba(${d},${g},${p},1)`),e.addColorStop(1,`rgba(${d},${g},${p},0)`),u.fillStyle=e,u.fillRect(0,0,a,l)}}handleFocusOut({relatedTarget:e}){e&&!this.parent.contains(e)&&this.hide(!0)}handleDismiss({code:e}){const t=this;t.isOpen&&"Escape"===e&&t.hide()}handleScroll(e){const{activeElement:t}=document;(J&&this.dragElement||t&&this.controlKnobs.includes(t))&&(e.stopPropagation(),e.preventDefault()),this.updateDropdownPosition()}menuKeyHandler(e){const{target:t,code:o}=e;[q,Y].includes(o)?e.preventDefault():[K,G].includes(o)&&this.menuClickHandler({target:t})}menuClickHandler(e){const t=this,{target:o}=e,{format:n}=t,r=(ce(o,"data-value")||"").trim(),a=t.colorMenu.querySelector("li.active"),s=de.includes(r)?"white":r;var i;t.color=new R(s,{format:n}),t.setControlPositions(),t.setColorAppearence(),t.updateInputs(!0),t.updateControls(),t.updateVisuals(),a&&(ie(a,"active"),i="aria-selected",a.removeAttribute(i)),a!==o&&(se(o,"active"),le(o,"aria-selected","true"),de.includes(r)&&(t.value=r,we(t)))}pointerDown(e){const t=this,{type:o,target:r,touches:a,pageX:s,pageY:i}=e,{visuals:l,controlKnobs:c,format:h}=t,[u,d,g]=l,[p,m,f]=c,b="canvas"===r.tagName?r:n("canvas",r.parentElement),w=ee(b),v="touchstart"===o?a[0].pageX:s,k="touchstart"===o?a[0].pageY:i,x=v-window.pageXOffset-w.left,y=k-window.pageYOffset-w.top;r===u||r===p?(t.dragElement=b,t.changeControl1({offsetX:x,offsetY:y})):r===d||r===m?(t.dragElement=b,t.changeControl2({offsetY:y})):"hex"===h||r!==g&&r!==f||(t.dragElement=b,t.changeAlpha({offsetY:y})),e.preventDefault()}pointerUp({target:e}){const t=this,o=document.getSelection();t.dragElement||o.toString().length||t.parent.contains(e)||t.hide(),t.dragElement=null}pointerMove(e){const t=this,{dragElement:o,visuals:n,format:r}=t,[a,s,i]=n,{type:l,touches:c,pageX:h,pageY:u}=e;if(!o)return;const d=ee(o),g="touchmove"===l?c[0].pageX:h,p="touchmove"===l?c[0].pageY:u,m=g-window.pageXOffset-d.left,f=p-window.pageYOffset-d.top;o===a&&t.changeControl1({offsetX:m,offsetY:f}),o===s&&t.changeControl2({offsetY:f}),o===i&&"hex"!==r&&t.changeAlpha({offsetY:f})}handleKnobs(e){const{target:t,code:o}=e,n=this;if(![Y,q,_,V].includes(o))return;e.preventDefault();const{activeElement:r}=document,{controlKnobs:a}=n,s=a.find(e=>e===r),[i,l,c]=a;if(s){let r=0,a=0;t===i?([_,V].includes(o)?n.controlPositions.c1x+=o===V?1:-1:[Y,q].includes(o)&&(n.controlPositions.c1y+=o===q?1:-1),r=n.controlPositions.c1x,a=n.controlPositions.c1y,n.changeControl1({offsetX:r,offsetY:a})):t===l?(n.controlPositions.c2y+=[q,V].includes(o)?1:-1,a=n.controlPositions.c2y,n.changeControl2({offsetY:a})):t===c&&(n.controlPositions.c3y+=[q,V].includes(o)?1:-1,a=n.controlPositions.c3y,n.changeAlpha({offsetY:a})),n.setColorAppearence(),n.updateInputs(),n.updateControls(),n.updateVisuals(),n.handleScroll(e)}}changeHandler(){const e=this;let t;const{activeElement:o}=document,{inputs:n,format:r,value:a,input:s}=e,[i,l,c,h]=n,u=e.includeNonColor&&de.includes(a);(o===s||o&&n.includes(o))&&(t=o===s?u?"white":a:"hex"===r?i.value:"hsl"===r?`hsla(${i.value},${l.value}%,${c.value}%,${h.value})`:`rgba(${n.map(e=>e.value).join(",")})`,e.color=new R(t,{format:r}),e.setControlPositions(),e.setColorAppearence(),e.updateInputs(),e.updateControls(),e.updateVisuals(),o===s&&u&&(e.value=a))}changeControl1(e){let[t,o]=[0,0];const{offsetX:n,offsetY:r}=e,{format:a,controlPositions:s,height1:i,height2:l,height3:c,width1:h}=this;n>h?t=h:n>=0&&(t=n),r>i?o=i:r>=0&&(o=r);const u="hsl"!==a?Math.round(s.c2y/l*360):Math.round(t/h*360),d="hsl"!==a?Math.round(t/h*100):Math.round(100*(1-s.c2y/l)),g=Math.round(100*(1-o/i)),p="hex"!==a?Math.round(100*(1-s.c3y/c))/100:1,m="hsl"!==a?"hsva":"hsla";this.color=new R(`${m}(${u},${d}%,${g}%,${p})`,{format:a}),this.controlPositions.c1x=t,this.controlPositions.c1y=o,this.setColorAppearence(),this.updateInputs(),this.updateControls(),this.updateVisuals()}changeControl2(e){const{offsetY:t}=e,{format:o,width1:n,height1:r,height2:a,height3:s,controlPositions:i}=this;let l=0;t>a?l=a:t>=0&&(l=t);const c="hsl"!==o?Math.round(l/a*360):Math.round(i.c1x/n*360),h="hsl"!==o?Math.round(i.c1x/n*100):Math.round(100*(1-l/a)),u=Math.round(100*(1-i.c1y/r)),d="hex"!==o?Math.round(100*(1-i.c3y/s))/100:1,g="hsl"!==o?"hsva":"hsla";this.color=new R(`${g}(${c},${h}%,${u}%,${d})`,{format:o}),this.controlPositions.c2y=l,this.setColorAppearence(),this.updateInputs(),this.updateControls(),this.updateVisuals()}changeAlpha(e){const{height3:t}=this,{offsetY:o}=e;let n=0;o>t?n=t:o>=0&&(n=o);const r=Math.round(100*(1-n/t));this.color.setAlpha(r/100),this.controlPositions.c3y=n,this.updateInputs(),this.updateControls(),this.updateVisuals()}updateDropdownPosition(){const{input:e,colorPicker:t,colorMenu:o}=this,n=ee(e),{offsetHeight:r}=e,a=document.documentElement.clientHeight,s=ve(t,!0)?t:o,{offsetHeight:i}=s,l=a-n.bottom,c=n.top,h=n.top+i+r>a,u=n.top-i<0;ae(s,"show")&&l<c&&h&&(ie(s,"show"),se(s,"show-top")),ae(s,"show-top")&&l>c&&u&&(ie(s,"show-top"),se(s,"show"))}setControlPositions(){const e=this,{hsv:t,hsl:o,format:n,height1:r,height2:a,height3:s,width1:i}=e,l=o.h,c="hsl"!==n?t.s:o.s,h="hsl"!==n?t.v:o.l,u=t.a;e.controlPositions.c1x="hsl"!==n?c*i:l/360*i,e.controlPositions.c1y=(1-h)*r,e.controlPositions.c2y="hsl"!==n?l/360*a:(1-c)*a,"hex"!==n&&(e.controlPositions.c3y=(1-u)*s)}setColorAppearence(){const e=this,{componentLabels:t,colorLabels:o,hsl:n,hsv:r,hex:a,format:s,knobLabels:i}=e,{lightnessLabel:l,saturationLabel:c,hueLabel:h,alphaLabel:u,appearanceLabel:d,hexLabel:g}=t;let{requiredLabel:p}=t;const[m,f,b]=i,w=Math.round(n.h),v=r.a,k="hsl"===s?n.s:r.s,x=Math.round(100*k),y=Math.round(100*n.l),S=100*r.v;let M;if(100===y&&0===x)M=o.white;else if(0===y)M=o.black;else if(0===x)M=o.grey;else if(w<15||w>=345)M=o.red;else if(w>=15&&w<45)M=S>80&&x>80?o.orange:o.brown;else if(w>=45&&w<75){const e=w>=54&&w<75&&S<80;M=w>46&&w<54&&S<80&&x>90?o.gold:o.yellow,M=e?o.olive:M}else w>=75&&w<155?M=S<68?o.green:o.lime:w>=155&&w<175?M=o.teal:w>=175&&w<195?M=o.cyan:w>=195&&w<255?M=o.blue:w>=255&&w<270?M=o.violet:w>=270&&w<295?M=o.magenta:w>=295&&w<345&&(M=o.pink);if("hsl"===s?(m.innerText=`${h}: ${w}°. ${l}: ${y}%`,f.innerText=`${c}: ${x}%`):(m.innerText=`${l}: ${y}%. ${c}: ${x}%`,f.innerText=`${h}: ${w}°`),"hex"!==s){const e=Math.round(100*v);b.innerText=`${u}: ${e}%`}e.appearance.innerText=`${d}: ${M}.`;const C="hex"===s?`${g} ${a.split("").join(" ")}.`:e.value.toUpperCase();if(e.label){const t=e.label.innerText.replace("*","").trim(),[o]=e.pickerToggle.children;p=e.required?" "+p:"",o.innerText=`${t}: ${C}${p}`}}updateControls(){const{format:e,controlKnobs:t,controlPositions:o}=this,[n,r,a]=t;n.style.transform=`translate3d(${o.c1x-3}px,${o.c1y-3}px,0)`,r.style.transform=`translate3d(0,${o.c2y-3}px,0)`,"hex"!==e&&(a.style.transform=`translate3d(0,${o.c3y-3}px,0)`)}updateInputs(e){const t=this,{value:o,rgb:n,hsl:a,hsv:s,format:i,parent:l,input:c,inputs:h}=t,[u,d,g,p]=h,m=a.a,f=Math.round(a.h),b=Math.round(100*a.s),w="hsl"===i?a.l:s.v,v=Math.round(100*w);let k;"hex"===i?(k=t.color.toHexString(),u.value=t.hex):"hsl"===i?(k=t.color.toHslString(),u.value=""+f,d.value=""+b,g.value=""+v,p.value=""+m):"rgb"===i&&(k=t.color.toRgbString(),u.value=""+n.r,d.value=""+n.g,g.value=""+n.b,p.value=""+m),t.value=""+k,r(c.style,{backgroundColor:k}),t.isDark?(ae(l,"light")&&ie(l,"light"),ae(l,"dark")||se(l,"dark")):(ae(l,"dark")&&ie(l,"dark"),ae(l,"light")||se(l,"light")),e||k===o||we(t)}keyHandler(e){const t=this,{menuToggle:o}=t,{activeElement:n}=document,{code:r}=e;[K,G].includes(r)&&(o&&n===o||!n)&&(e.preventDefault(),n?t.toggleMenu():t.togglePicker(e))}togglePicker(e){e.preventDefault();const t=this,o=ve(t.colorPicker,!0);t.isOpen&&o?t.hide(!0):t.showPicker()}showPicker(){ve(this.colorMenu),se(this.colorPicker,"show"),this.input.focus(),this.show(),le(this.pickerToggle,"aria-expanded","true")}toggleMenu(){const e=this,t=ve(e.colorMenu,!0);e.isOpen&&t?e.hide(!0):function(e){ve(e.colorPicker),se(e.colorMenu,"show"),e.show(),le(e.menuToggle,"aria-expanded","true")}(e)}show(){const e=this;e.isOpen||(se(e.parent,"open"),be(e,!0),e.updateDropdownPosition(),e.isOpen=!0)}hide(e){const t=this;if(t.isOpen){const{pickerToggle:o,colorMenu:n}=t;be(t),ie(t.parent,"open"),ve(t.colorPicker),le(o,"aria-expanded","false"),n&&(ve(n),le(t.menuToggle,"aria-expanded","false")),t.isValid||(t.value=t.color.toString()),t.isOpen=!1,e||o.focus()}}dispose(){const{input:e,parent:t}=this;this.hide(!0),me(this),[...t.children].forEach(t=>{t!==e&&t.remove()}),re.remove(e,"color-picker")}}r(ke,{Color:R,getInstance:e=>{return t=e,o="color-picker",re.get(t,o);var t,o},init:e=>new ke(e),selector:'[data-function="color-picker"]'});class xe extends HTMLElement{constructor(){super(),this.colorPicker=null,this.input=n("input",this),this.isDisconnected=!0,this.attachShadow({mode:"open"})}get value(){return this.input.value}get color(){return this.colorPicker&&this.colorPicker.color}connectedCallback(){this.colorPicker?this.isDisconnected&&(this.isDisconnected=!1):(this.colorPicker=new ke(this.input),this.isDisconnected=!1,this.shadowRoot&&this.shadowRoot.append(a("slot")))}disconnectedCallback(){this.colorPicker&&this.colorPicker.dispose(),this.isDisconnected=!0}}r(xe,{Color:R,ColorPicker:ke}),customElements.define("color-picker",xe);export default xe;
