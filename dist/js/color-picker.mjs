const _t = "aria-description", Nt = "aria-expanded", Te = "aria-hidden", xt = "aria-selected", tt = "aria-valuenow", et = "aria-valuetext", Me = "change", Re = "DOMContentLoaded", Oe = "focusin", De = "focusout", zt = "keydown", Fe = "keyup", Et = "click", Ie = "pointerdown", be = "pointermove", Ke = "pointerup", Ve = "resize", Be = "scroll", je = "touchmove", j = "ArrowDown", ot = "ArrowUp", ht = "ArrowLeft", U = "ArrowRight", qe = "Enter", Ge = "Escape", Jt = "Space", Ue = "transitionDuration", We = "transitionProperty", X = "tabindex", _e = navigator.userAgentData, mt = _e, { userAgent: ze } = navigator, vt = ze, Xt = /iPhone|iPad|iPod|Android/i;
/* istanbul ignore else @preserve */
mt ? mt.brands.some((o) => Xt.test(o.brand)) : Xt.test(vt);
const Yt = /(iPhone|iPod|iPad)/;
mt ? mt.brands.some((o) => Yt.test(o.brand)) : (
  /* istanbul ignore next @preserve */
  Yt.test(vt)
);
vt && vt.includes("Firefox");
const { head: wt } = document;
["webkitPerspective", "perspective"].some((o) => o in wt.style);
const Bt = (o, t, e, s) => {
  const r = s || !1;
  o.addEventListener(t, e, r);
}, jt = (o, t, e, s) => {
  const r = s || !1;
  o.removeEventListener(t, e, r);
}, Je = (o, t, e, s) => {
  const r = (n) => {
    /* istanbul ignore else @preserve */
    (n.target === o || n.currentTarget === o) && (e.apply(o, [n]), jt(o, t, r, s));
  };
  Bt(o, t, r, s);
}, Xe = () => {
};
(() => {
  let o = !1;
  try {
    const t = Object.defineProperty({}, "passive", {
      get: () => (o = !0, o)
    });
    Je(document, Re, Xe, t);
  } catch {
  }
  return o;
})();
["webkitTransform", "transform"].some((o) => o in wt.style);
["webkitAnimation", "animation"].some((o) => o in wt.style);
["webkitTransition", "transition"].some((o) => o in wt.style);
const kt = (o, t) => o.getAttribute(t), v = (o, t, e) => o.setAttribute(t, e), Pt = (o, t) => o.removeAttribute(t), q = (o, ...t) => {
  o.classList.add(...t);
}, O = (o, ...t) => {
  o.classList.remove(...t);
}, R = (o, t) => o.classList.contains(t), qt = (o) => o != null && typeof o == "object" || !1, Z = (o) => qt(o) && typeof o.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((t) => o.nodeType === t) || !1, at = (o) => Z(o) && o.nodeType === 1 || !1, z = /* @__PURE__ */ new Map(), ct = {
  data: z,
  /**
   * Sets web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @param instance the component instance
   */
  set: (o, t, e) => {
    at(o) && (z.has(t) || z.set(t, /* @__PURE__ */ new Map()), z.get(t).set(o, e));
  },
  /**
   * Returns all instances for specified component.
   *
   * @param component the component's name or a unique key
   * @returns all the component instances
   */
  getAllFor: (o) => z.get(o) || null,
  /**
   * Returns the instance associated with the target.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @returns the instance
   */
  get: (o, t) => {
    if (!at(o) || !t) return null;
    const e = ct.getAllFor(t);
    return o && e && e.get(o) || null;
  },
  /**
   * Removes web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   */
  remove: (o, t) => {
    const e = ct.getAllFor(t);
    !e || !at(o) || (e.delete(o), e.size === 0 && z.delete(t));
  }
}, Ye = (o, t) => ct.get(o, t), B = (o) => typeof o == "string" || !1, Ze = (o) => qt(o) && o.constructor.name === "Window" || !1, pe = (o) => Z(o) && o.nodeType === 9 || !1, V = (o) => Ze(o) ? o.document : pe(o) ? o : Z(o) ? o.ownerDocument : window.document, K = (o, ...t) => Object.assign(o, ...t), x = (o) => {
  if (!o) return;
  if (B(o))
    return V().createElement(o);
  const { tagName: t } = o, e = x(t);
  if (!e) return;
  const s = { ...o };
  return delete s.tagName, K(e, s);
}, Tt = (o, t) => {
  if (!o || !t) return;
  if (B(t))
    return V().createElementNS(o, t);
  const { tagName: e } = t, s = Tt(o, e);
  if (!s) return;
  const r = { ...t };
  return delete r.tagName, K(s, r);
}, Qe = (o, t) => o.dispatchEvent(t), Mt = (o, t) => {
  const e = getComputedStyle(o), s = t.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return e.getPropertyValue(s);
}, to = (o) => {
  const t = Mt(o, We), e = Mt(o, Ue), s = e.includes("ms") ? (
    /* istanbul ignore next */
    1
  ) : 1e3, r = t && t !== "none" ? parseFloat(e) * s : (
    /* istanbul ignore next */
    0
  );
  return Number.isNaN(r) ? (
    /* istanbul ignore next */
    0
  ) : r;
}, W = (o, t) => o.focus(t), Zt = (o) => ["true", !0].includes(o) ? !0 : ["false", !1].includes(o) ? !1 : ["null", "", null, void 0].includes(o) ? null : o !== "" && !Number.isNaN(+o) ? +o : o, pt = (o) => Object.entries(o), eo = (o, t, e, s) => {
  const r = { ...e }, n = { ...o.dataset }, i = { ...t }, a = {}, l = "title";
  return pt(n).forEach(([c, h]) => {
    const b = c;
    a[b] = Zt(h);
  }), pt(r).forEach(([c, h]) => {
    r[c] = Zt(h);
  }), pt(t).forEach(([c, h]) => {
    c in r ? i[c] = r[c] : c in a ? i[c] = a[c] : i[c] = c === l ? kt(o, l) : h;
  }), i;
}, Qt = (o) => Object.fromEntries(o), oo = (o) => o.offsetHeight, D = (o, t) => {
  pt(t).forEach(([e, s]) => {
    if (s && B(e) && e.includes("--"))
      o.style.setProperty(e, s);
    else {
      const r = {};
      r[e] = s, K(o.style, r);
    }
  });
}, so = (o) => qt(o) && o.constructor.name === "Map" || !1, de = (o) => o.toUpperCase(), gt = (o, t) => {
  const { width: e, height: s, top: r, right: n, bottom: i, left: a } = o.getBoundingClientRect();
  let l = 1, c = 1;
  if (t && at(o)) {
    const { offsetWidth: h, offsetHeight: b } = o;
    l = h > 0 ? Math.round(e) / h : (
      /* istanbul ignore next */
      1
    ), c = b > 0 ? Math.round(s) / b : (
      /* istanbul ignore next */
      1
    );
  }
  return {
    width: e / l,
    height: s / c,
    top: r / c,
    right: n / l,
    bottom: i / c,
    left: a / l,
    x: a / l,
    y: r / c
  };
}, St = (o) => V(o).documentElement;
let te = 0, ee = 0;
const J = /* @__PURE__ */ new Map(), fe = (o, t) => {
  let e = t ? te : ee;
  if (t) {
    const s = fe(o), r = J.get(s) || /* @__PURE__ */ new Map();
    J.has(s) || J.set(s, r), so(r) && !r.has(t) ? (r.set(t, e), te += 1) : e = r.get(t);
  } else {
    const s = o.id || o;
    J.has(s) ? e = J.get(s) : (J.set(s, e), ee += 1);
  }
  return e;
}, ro = (o) => {
  var t;
  return o ? pe(o) ? o.defaultView : Z(o) ? (t = o?.ownerDocument) == null ? void 0 : t.defaultView : o : window;
}, Ct = (o) => Array.isArray(o) || !1, me = (o, t) => o ? o.closest(t) || // break out of `ShadowRoot`
me(o.getRootNode().host, t) : null, _ = (o, t) => at(o) ? o : (Z(t) ? t : V()).querySelector(o), st = (o, t) => (t && Z(t) ? t : V()).getElementsByClassName(
  o
), Gt = ["transparent", "currentColor", "inherit", "revert", "initial"], m = (o) => {
  const t = Math.floor(o);
  return o - t < 0.5 ? t : Math.round(o);
}, $t = [
  [
    "aliceblue",
    {
      r: 240,
      g: 248,
      b: 255
    }
  ],
  [
    "antiquewhite",
    {
      r: 250,
      g: 235,
      b: 215
    }
  ],
  [
    "aqua",
    {
      r: 0,
      g: 255,
      b: 255
    }
  ],
  [
    "aquamarine",
    {
      r: 127,
      g: 255,
      b: 212
    }
  ],
  [
    "azure",
    {
      r: 240,
      g: 255,
      b: 255
    }
  ],
  [
    "beige",
    {
      r: 245,
      g: 245,
      b: 220
    }
  ],
  [
    "bisque",
    {
      r: 255,
      g: 228,
      b: 196
    }
  ],
  [
    "black",
    {
      r: 0,
      g: 0,
      b: 0
    }
  ],
  [
    "blanchedalmond",
    {
      r: 255,
      g: 235,
      b: 205
    }
  ],
  [
    "blue",
    {
      r: 0,
      g: 0,
      b: 255
    }
  ],
  [
    "blueviolet",
    {
      r: 138,
      g: 43,
      b: 226
    }
  ],
  [
    "brown",
    {
      r: 165,
      g: 42,
      b: 42
    }
  ],
  [
    "burlywood",
    {
      r: 222,
      g: 184,
      b: 135
    }
  ],
  [
    "cadetblue",
    {
      r: 95,
      g: 158,
      b: 160
    }
  ],
  [
    "chartreuse",
    {
      r: 127,
      g: 255,
      b: 0
    }
  ],
  [
    "chocolate",
    {
      r: 210,
      g: 105,
      b: 30
    }
  ],
  [
    "coral",
    {
      r: 255,
      g: 127,
      b: 80
    }
  ],
  [
    "cornflowerblue",
    {
      r: 100,
      g: 149,
      b: 237
    }
  ],
  [
    "cornsilk",
    {
      r: 255,
      g: 248,
      b: 220
    }
  ],
  [
    "crimson",
    {
      r: 220,
      g: 20,
      b: 60
    }
  ],
  [
    "cyan",
    {
      r: 0,
      g: 255,
      b: 255
    }
  ],
  [
    "darkblue",
    {
      r: 0,
      g: 0,
      b: 139
    }
  ],
  [
    "darkcyan",
    {
      r: 0,
      g: 139,
      b: 139
    }
  ],
  [
    "darkgoldenrod",
    {
      r: 184,
      g: 134,
      b: 11
    }
  ],
  [
    "darkgray",
    {
      r: 169,
      g: 169,
      b: 169
    }
  ],
  [
    "darkgreen",
    {
      r: 0,
      g: 100,
      b: 0
    }
  ],
  [
    "darkgrey",
    {
      r: 169,
      g: 169,
      b: 169
    }
  ],
  [
    "darkkhaki",
    {
      r: 189,
      g: 183,
      b: 107
    }
  ],
  [
    "darkmagenta",
    {
      r: 139,
      g: 0,
      b: 139
    }
  ],
  [
    "darkolivegreen",
    {
      r: 85,
      g: 107,
      b: 47
    }
  ],
  [
    "darkorange",
    {
      r: 255,
      g: 140,
      b: 0
    }
  ],
  [
    "darkorchid",
    {
      r: 153,
      g: 50,
      b: 204
    }
  ],
  [
    "darkred",
    {
      r: 139,
      g: 0,
      b: 0
    }
  ],
  [
    "darksalmon",
    {
      r: 233,
      g: 150,
      b: 122
    }
  ],
  [
    "darkseagreen",
    {
      r: 143,
      g: 188,
      b: 143
    }
  ],
  [
    "darkslateblue",
    {
      r: 72,
      g: 61,
      b: 139
    }
  ],
  [
    "darkslategray",
    {
      r: 47,
      g: 79,
      b: 79
    }
  ],
  [
    "darkslategrey",
    {
      r: 47,
      g: 79,
      b: 79
    }
  ],
  [
    "darkturquoise",
    {
      r: 0,
      g: 206,
      b: 209
    }
  ],
  [
    "darkviolet",
    {
      r: 148,
      g: 0,
      b: 211
    }
  ],
  [
    "deeppink",
    {
      r: 255,
      g: 20,
      b: 147
    }
  ],
  [
    "deepskyblue",
    {
      r: 0,
      g: 191,
      b: 255
    }
  ],
  [
    "dimgray",
    {
      r: 105,
      g: 105,
      b: 105
    }
  ],
  [
    "dimgrey",
    {
      r: 105,
      g: 105,
      b: 105
    }
  ],
  [
    "dodgerblue",
    {
      r: 30,
      g: 144,
      b: 255
    }
  ],
  [
    "firebrick",
    {
      r: 178,
      g: 34,
      b: 34
    }
  ],
  [
    "floralwhite",
    {
      r: 255,
      g: 250,
      b: 240
    }
  ],
  [
    "forestgreen",
    {
      r: 34,
      g: 139,
      b: 34
    }
  ],
  [
    "fuchsia",
    {
      r: 255,
      g: 0,
      b: 255
    }
  ],
  [
    "gainsboro",
    {
      r: 220,
      g: 220,
      b: 220
    }
  ],
  [
    "ghostwhite",
    {
      r: 248,
      g: 248,
      b: 255
    }
  ],
  [
    "goldenrod",
    {
      r: 218,
      g: 165,
      b: 32
    }
  ],
  [
    "gold",
    {
      r: 255,
      g: 215,
      b: 0
    }
  ],
  [
    "gray",
    {
      r: 128,
      g: 128,
      b: 128
    }
  ],
  [
    "green",
    {
      r: 0,
      g: 128,
      b: 0
    }
  ],
  [
    "greenyellow",
    {
      r: 173,
      g: 255,
      b: 47
    }
  ],
  [
    "grey",
    {
      r: 128,
      g: 128,
      b: 128
    }
  ],
  [
    "honeydew",
    {
      r: 240,
      g: 255,
      b: 240
    }
  ],
  [
    "hotpink",
    {
      r: 255,
      g: 105,
      b: 180
    }
  ],
  [
    "indianred",
    {
      r: 205,
      g: 92,
      b: 92
    }
  ],
  [
    "indigo",
    {
      r: 75,
      g: 0,
      b: 130
    }
  ],
  [
    "ivory",
    {
      r: 255,
      g: 255,
      b: 240
    }
  ],
  [
    "khaki",
    {
      r: 240,
      g: 230,
      b: 140
    }
  ],
  [
    "lavenderblush",
    {
      r: 255,
      g: 240,
      b: 245
    }
  ],
  [
    "lavender",
    {
      r: 230,
      g: 230,
      b: 250
    }
  ],
  [
    "lawngreen",
    {
      r: 124,
      g: 252,
      b: 0
    }
  ],
  [
    "lemonchiffon",
    {
      r: 255,
      g: 250,
      b: 205
    }
  ],
  [
    "lightblue",
    {
      r: 173,
      g: 216,
      b: 230
    }
  ],
  [
    "lightcoral",
    {
      r: 240,
      g: 128,
      b: 128
    }
  ],
  [
    "lightcyan",
    {
      r: 224,
      g: 255,
      b: 255
    }
  ],
  [
    "lightgoldenrodyellow",
    {
      r: 250,
      g: 250,
      b: 210
    }
  ],
  [
    "lightgray",
    {
      r: 211,
      g: 211,
      b: 211
    }
  ],
  [
    "lightgreen",
    {
      r: 144,
      g: 238,
      b: 144
    }
  ],
  [
    "lightgrey",
    {
      r: 211,
      g: 211,
      b: 211
    }
  ],
  [
    "lightpink",
    {
      r: 255,
      g: 182,
      b: 193
    }
  ],
  [
    "lightsalmon",
    {
      r: 255,
      g: 160,
      b: 122
    }
  ],
  [
    "lightseagreen",
    {
      r: 32,
      g: 178,
      b: 170
    }
  ],
  [
    "lightskyblue",
    {
      r: 135,
      g: 206,
      b: 250
    }
  ],
  [
    "lightslategray",
    {
      r: 119,
      g: 136,
      b: 153
    }
  ],
  [
    "lightslategrey",
    {
      r: 119,
      g: 136,
      b: 153
    }
  ],
  [
    "lightsteelblue",
    {
      r: 176,
      g: 196,
      b: 222
    }
  ],
  [
    "lightyellow",
    {
      r: 255,
      g: 255,
      b: 224
    }
  ],
  [
    "lime",
    {
      r: 0,
      g: 255,
      b: 0
    }
  ],
  [
    "limegreen",
    {
      r: 50,
      g: 205,
      b: 50
    }
  ],
  [
    "linen",
    {
      r: 250,
      g: 240,
      b: 230
    }
  ],
  [
    "magenta",
    {
      r: 255,
      g: 0,
      b: 255
    }
  ],
  [
    "maroon",
    {
      r: 128,
      g: 0,
      b: 0
    }
  ],
  [
    "mediumaquamarine",
    {
      r: 102,
      g: 205,
      b: 170
    }
  ],
  [
    "mediumblue",
    {
      r: 0,
      g: 0,
      b: 205
    }
  ],
  [
    "mediumorchid",
    {
      r: 186,
      g: 85,
      b: 211
    }
  ],
  [
    "mediumpurple",
    {
      r: 147,
      g: 112,
      b: 219
    }
  ],
  [
    "mediumseagreen",
    {
      r: 60,
      g: 179,
      b: 113
    }
  ],
  [
    "mediumslateblue",
    {
      r: 123,
      g: 104,
      b: 238
    }
  ],
  [
    "mediumspringgreen",
    {
      r: 0,
      g: 250,
      b: 154
    }
  ],
  [
    "mediumturquoise",
    {
      r: 72,
      g: 209,
      b: 204
    }
  ],
  [
    "mediumvioletred",
    {
      r: 199,
      g: 21,
      b: 133
    }
  ],
  [
    "midnightblue",
    {
      r: 25,
      g: 25,
      b: 112
    }
  ],
  [
    "mintcream",
    {
      r: 245,
      g: 255,
      b: 250
    }
  ],
  [
    "mistyrose",
    {
      r: 255,
      g: 228,
      b: 225
    }
  ],
  [
    "moccasin",
    {
      r: 255,
      g: 228,
      b: 181
    }
  ],
  [
    "navajowhite",
    {
      r: 255,
      g: 222,
      b: 173
    }
  ],
  [
    "navy",
    {
      r: 0,
      g: 0,
      b: 128
    }
  ],
  [
    "oldlace",
    {
      r: 253,
      g: 245,
      b: 230
    }
  ],
  [
    "olive",
    {
      r: 128,
      g: 128,
      b: 0
    }
  ],
  [
    "olivedrab",
    {
      r: 107,
      g: 142,
      b: 35
    }
  ],
  [
    "orange",
    {
      r: 255,
      g: 165,
      b: 0
    }
  ],
  [
    "orangered",
    {
      r: 255,
      g: 69,
      b: 0
    }
  ],
  [
    "orchid",
    {
      r: 218,
      g: 112,
      b: 214
    }
  ],
  [
    "palegoldenrod",
    {
      r: 238,
      g: 232,
      b: 170
    }
  ],
  [
    "palegreen",
    {
      r: 152,
      g: 251,
      b: 152
    }
  ],
  [
    "paleturquoise",
    {
      r: 175,
      g: 238,
      b: 238
    }
  ],
  [
    "palevioletred",
    {
      r: 219,
      g: 112,
      b: 147
    }
  ],
  [
    "papayawhip",
    {
      r: 255,
      g: 239,
      b: 213
    }
  ],
  [
    "peachpuff",
    {
      r: 255,
      g: 218,
      b: 185
    }
  ],
  [
    "peru",
    {
      r: 205,
      g: 133,
      b: 63
    }
  ],
  [
    "pink",
    {
      r: 255,
      g: 192,
      b: 203
    }
  ],
  [
    "plum",
    {
      r: 221,
      g: 160,
      b: 221
    }
  ],
  [
    "powderblue",
    {
      r: 176,
      g: 224,
      b: 230
    }
  ],
  [
    "purple",
    {
      r: 128,
      g: 0,
      b: 128
    }
  ],
  [
    "rebeccapurple",
    {
      r: 102,
      g: 51,
      b: 153
    }
  ],
  [
    "red",
    {
      r: 255,
      g: 0,
      b: 0
    }
  ],
  [
    "rosybrown",
    {
      r: 188,
      g: 143,
      b: 143
    }
  ],
  [
    "royalblue",
    {
      r: 65,
      g: 105,
      b: 225
    }
  ],
  [
    "saddlebrown",
    {
      r: 139,
      g: 69,
      b: 19
    }
  ],
  [
    "salmon",
    {
      r: 250,
      g: 128,
      b: 114
    }
  ],
  [
    "sandybrown",
    {
      r: 244,
      g: 164,
      b: 96
    }
  ],
  [
    "seagreen",
    {
      r: 46,
      g: 139,
      b: 87
    }
  ],
  [
    "seashell",
    {
      r: 255,
      g: 245,
      b: 238
    }
  ],
  [
    "sienna",
    {
      r: 160,
      g: 82,
      b: 45
    }
  ],
  [
    "silver",
    {
      r: 192,
      g: 192,
      b: 192
    }
  ],
  [
    "skyblue",
    {
      r: 135,
      g: 206,
      b: 235
    }
  ],
  [
    "slateblue",
    {
      r: 106,
      g: 90,
      b: 205
    }
  ],
  [
    "slategray",
    {
      r: 112,
      g: 128,
      b: 144
    }
  ],
  [
    "slategrey",
    {
      r: 112,
      g: 128,
      b: 144
    }
  ],
  [
    "snow",
    {
      r: 255,
      g: 250,
      b: 250
    }
  ],
  [
    "springgreen",
    {
      r: 0,
      g: 255,
      b: 127
    }
  ],
  [
    "steelblue",
    {
      r: 70,
      g: 130,
      b: 180
    }
  ],
  [
    "tan",
    {
      r: 210,
      g: 180,
      b: 140
    }
  ],
  [
    "teal",
    {
      r: 0,
      g: 128,
      b: 128
    }
  ],
  [
    "thistle",
    {
      r: 216,
      g: 191,
      b: 216
    }
  ],
  [
    "tomato",
    {
      r: 255,
      g: 99,
      b: 71
    }
  ],
  [
    "turquoise",
    {
      r: 64,
      g: 224,
      b: 208
    }
  ],
  [
    "violet",
    {
      r: 238,
      g: 130,
      b: 238
    }
  ],
  [
    "wheat",
    {
      r: 245,
      g: 222,
      b: 179
    }
  ],
  [
    "white",
    {
      r: 255,
      g: 255,
      b: 255
    }
  ],
  [
    "whitesmoke",
    {
      r: 245,
      g: 245,
      b: 245
    }
  ],
  [
    "yellow",
    {
      r: 255,
      g: 255,
      b: 0
    }
  ],
  [
    "yellowgreen",
    {
      r: 154,
      g: 205,
      b: 50
    }
  ]
], ve = "deg|rad|grad|turn", $e = "[-\\+]?\\d+%?", we = "[-\\+]?\\d*\\.\\d+%?", ke = `[-\\+]?\\d*\\.?\\d+(?:${ve})?`, dt = `(?:${we})|(?:${$e})`, Rt = `(?:${dt})|(?:${ke}?)`, no = "(?:[\\s|\\(\\s|\\s\\(\\s]+)?", io = "(?:[\\s|\\)\\s]+)?", oe = "(?:[,|\\s]+)", ao = "(?:[,|\\/\\s]*)?", rt = `${no}(${Rt})${oe}(${dt})${oe}(${dt})${ao}(${dt})?${io}`, I = {
  CSS_UNIT: new RegExp(Rt),
  ANGLES: ve,
  CSS_ANGLE: ke,
  CSS_INTEGER: $e,
  CSS_NUMBER: we,
  CSS_UNIT2: Rt,
  PERMISSIVE_MATCH: rt,
  hwb: new RegExp(`hwb${rt}`),
  rgb: new RegExp(`rgb(?:a)?${rt}`),
  hsl: new RegExp(`hsl(?:a)?${rt}`),
  hsv: new RegExp(`hsv(?:a)?${rt}`),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
}, ye = (o) => Gt.includes(o), nt = (o, t) => o !== null && typeof o == "object" && Object.keys(t).every((e) => e in o), xe = (o) => `${o}`.includes(".") && parseFloat(o) === 1, Ut = (o) => typeof o == "string" && o.includes("%"), H = (o) => !!I.CSS_UNIT.exec(`${o}`), Pe = ["rgb", "hex", "hsl", "hsv", "hwb"], Se = (o) => Gt.includes(o) || ["#", ...Pe].some((t) => o.includes(t)) ? !1 : $t.some(([t]) => o === t), se = 1e-6, lo = (o, t) => Math.abs(o * t - t) < se ? 1 : o < se ? 0 : o, E = (o, t) => {
  let e = o;
  return xe(o) && (e = "100%"), Ut(e) ? Number.parseFloat(e) / 100 : (e = typeof e != "number" ? Number.parseFloat(e) : e, t === 360 ? e = (e < 0 ? e % t + t : e > 360 ? e % t : e) / t : (e = Math.min(t, Math.max(0, e)), e = e / t), lo(e, t));
}, Ot = (o) => {
  let t = parseFloat(o);
  return (Number.isNaN(t) || t < 0 || t > 1) && (t = 1), t;
}, ut = (o) => Math.min(1, Math.max(0, o)), G = (o) => o.length === 1 ? `0${o}` : String(o), Ce = (o) => {
  const [[, t]] = $t.filter(([e]) => e === o.toLowerCase());
  return t;
}, N = (o) => parseInt(o, 16), Dt = (o) => N(o) / 255, Le = (o) => m(o * 255).toString(16), re = (o, t, e) => {
  const s = Math.max(o, t, e), r = Math.min(o, t, e);
  let n = 0, i = 0;
  const a = (s + r) / 2;
  if (s === r)
    i = 0, n = 0;
  else {
    const l = s - r;
    i = a > 0.5 ? l / (2 - s - r) : l / (s + r), s === o && (n = (t - e) / l + (t < e ? 6 : 0)), s === t && (n = (e - o) / l + 2), s === e && (n = (o - t) / l + 4), n /= 6;
  }
  return { h: n, s: i, l: a };
}, ft = (o, t, e) => {
  let s = e;
  return s < 0 && (s += 1), s > 1 && (s -= 1), s < 1 / 6 ? o + (t - o) * (6 * s) : s < 1 / 2 ? t : s < 2 / 3 ? o + (t - o) * (2 / 3 - s) * 6 : o;
}, lt = (o, t, e) => {
  let s = 0, r = 0, n = 0;
  if (t === 0)
    r = e, n = e, s = e;
  else {
    const i = e < 0.5 ? e * (1 + t) : e + t - e * t, a = 2 * e - i;
    s = ft(a, i, o + 1 / 3), r = ft(a, i, o), n = ft(a, i, o - 1 / 3);
  }
  return { r: s, g: r, b: n };
}, ne = (o, t, e) => {
  let s = 0, r = 0;
  const n = Math.min(o, t, e), i = Math.max(o, t, e), a = 1 - i;
  if (i === n) return { h: 0, w: n, b: a };
  o === n ? (s = t - e, r = 3) : (s = t === n ? e - o : o - t, r = t === n ? 5 : 1);
  const l = (r - s / (i - n)) / 6;
  return {
    h: l === 1 ? 0 : l,
    w: n,
    b: a
  };
}, Ae = (o, t, e) => {
  if (t + e >= 1) {
    const i = t / (t + e);
    return { r: i, g: i, b: i };
  }
  let { r: s, g: r, b: n } = lt(o, 1, 0.5);
  return [s, r, n] = [s, r, n].map((i) => i * (1 - t - e) + t), { r: s, g: r, b: n };
}, ie = (o, t, e) => {
  const s = Math.max(o, t, e), r = Math.min(o, t, e);
  let n = 0;
  const i = s, a = s - r, l = s === 0 ? 0 : a / s;
  return s === r ? n = 0 : (o === s && (n = (t - e) / a + (t < e ? 6 : 0)), t === s && (n = (e - o) / a + 2), e === s && (n = (o - t) / a + 4), n /= 6), { h: n, s: l, v: i };
}, Ft = (o, t, e) => {
  const s = o * 6, r = t, n = e, i = Math.floor(s), a = s - i, l = n * (1 - r), c = n * (1 - a * r), h = n * (1 - (1 - a) * r), b = i % 6, u = [n, c, l, l, h, n][b], d = [h, n, n, c, l, l][b], g = [l, l, h, n, n, c][b];
  return { r: u, g: d, b: g };
}, Lt = (o, t, e, s) => {
  const r = [
    G(m(o).toString(16)),
    G(m(t).toString(16)),
    G(m(e).toString(16))
  ];
  return s && r[0].charAt(0) === r[0].charAt(1) && r[1].charAt(0) === r[1].charAt(1) && r[2].charAt(0) === r[2].charAt(1) ? r[0].charAt(0) + r[1].charAt(0) + r[2].charAt(0) : r.join("");
}, At = (o, t, e, s, r) => {
  const n = [
    G(m(o).toString(16)),
    G(m(t).toString(16)),
    G(m(e).toString(16)),
    G(Le(s))
  ];
  return r && n[0].charAt(0) === n[0].charAt(1) && n[1].charAt(0) === n[1].charAt(1) && n[2].charAt(0) === n[2].charAt(1) && n[3].charAt(0) === n[3].charAt(1) ? n[0].charAt(0) + n[1].charAt(0) + n[2].charAt(0) + n[3].charAt(0) : n.join("");
}, He = (o) => {
  const t = String(o).trim().toLowerCase();
  if (Se(t))
    return Object.assign(Ce(t), {
      a: 1,
      format: "rgb",
      ok: !0
    });
  if (ye(t))
    return {
      r: 0,
      g: 0,
      b: 0,
      a: t === "transparent" ? 0 : 1,
      format: "rgb",
      ok: !0
    };
  let [, e, s, r, n] = I.rgb.exec(t) || [];
  return e && s && r ? {
    r: e,
    g: s,
    b: r,
    a: n !== void 0 ? n : 1,
    format: "rgb",
    ok: !0
  } : ([, e, s, r, n] = I.hsl.exec(t) || [], e && s && r ? {
    h: e,
    s,
    l: r,
    a: n !== void 0 ? n : 1,
    format: "hsl",
    ok: !0
  } : ([, e, s, r, n] = I.hsv.exec(t) || [], e && s && r ? {
    h: e,
    s,
    v: r,
    a: n !== void 0 ? n : 1,
    format: "hsv",
    ok: !0
  } : ([, e, s, r, n] = I.hwb.exec(t) || [], e && s && r ? {
    h: e,
    w: s,
    b: r,
    a: n !== void 0 ? n : 1,
    format: "hwb",
    ok: !0
  } : ([, e, s, r, n] = I.hex8.exec(t) || [], e && s && r && n ? {
    r: N(e),
    g: N(s),
    b: N(r),
    a: Dt(n),
    format: "hex",
    ok: !0
  } : ([, e, s, r] = I.hex6.exec(t) || [], e && s && r ? {
    r: N(e),
    g: N(s),
    b: N(r),
    a: 1,
    format: "hex",
    ok: !0
  } : ([, e, s, r, n] = I.hex4.exec(t) || [], e && s && r && n ? {
    r: N(e + e),
    g: N(s + s),
    b: N(r + r),
    a: Dt(n + n),
    format: "hex",
    ok: !0
  } : ([, e, s, r] = I.hex3.exec(t) || [], e && s && r ? {
    r: N(e + e),
    g: N(s + s),
    b: N(r + r),
    a: 1,
    format: "hex",
    ok: !0
  } : {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
    format: "rgb",
    ok: !o
  })))))));
}, co = (o, t, e) => ({
  r: E(o, 255),
  g: E(t, 255),
  b: E(e, 255)
}), ae = (o) => {
  let t = { r: 0, g: 0, b: 0 }, e = o, s = 1, r, n, i, a, l, c, h, b, u = "rgb", d = !1;
  if ((!e || typeof e == "string") && (e = He(e), d = e.ok || d), nt(e, t) && H(e.r) && H(e.g) && H(e.b)) {
    if (["format", "ok", "originalInput"].every((g) => g in e))
      return { ...e };
    ({ r: h, g: b, b: l } = e), t = co(h, b, l), u = "format" in e ? e.format : "rgb";
  }
  return nt(e, { h: 0, s: 0, v: 0 }) && H(e.h) && H(e.s) && H(e.v) && ({ h: c, s: r, v: n } = e, c = E(c, 360), r = E(r, 100), n = E(n, 100), t = Ft(c, r, n), u = "hsv"), nt(e, { h: 0, s: 0, l: 0 }) && H(e.h) && H(e.s) && H(e.l) && ({ h: c, s: r, l: i } = e, c = E(c, 360), r = E(r, 100), i = E(i, 100), t = lt(c, r, i), u = "hsl"), nt(e, { h: 0, w: 0, b: 0 }) && H(e.h) && H(e.w) && H(e.b) && ({ h: c, w: a, b: l } = e, c = E(c, 360), a = E(a, 100), l = E(l, 100), t = Ae(c, a, l), u = "hwb"), H(e.a) && (s = e.a, s = Ut(s) || parseFloat(`${s}`) > 1 ? E(s, 100) : s), {
    ...t,
    a: Ot(s),
    format: u,
    ok: d
  };
}, ho = "1.0.11";
class y {
  // bring main utilities to front
  static matchers = I;
  static isOnePointZero = xe;
  static isPercentage = Ut;
  static isValidCSSUnit = H;
  static isNonColor = ye;
  static isColorName = Se;
  static isColorType = nt;
  static pad2 = G;
  static clamp01 = ut;
  static bound01 = E;
  static boundAlpha = Ot;
  static getRGBFromName = Ce;
  static convertHexToDecimal = Dt;
  static convertDecimalToHex = Le;
  static rgbToHsl = re;
  static rgbToHex = Lt;
  static rgbToHsv = ie;
  static rgbToHwb = ne;
  static rgbaToHex = At;
  static hslToRgb = Ft;
  static hsvToRgb = Ft;
  static hueToRgb = ft;
  static hwbToRgb = Ae;
  static parseIntFromHex = N;
  static stringInputToObject = He;
  static inputToRGB = ae;
  static roundPart = m;
  static webColors = $t;
  static nonColors = Gt;
  static version = ho;
  // main public properties
  r;
  g;
  b;
  a;
  format;
  ok;
  originalInput;
  // main public methods
  constructor(t, e) {
    const s = e && Pe.includes(e) ? e : "", { r, g: n, b: i, a, ok: l, format: c } = ae(t);
    this.originalInput = t, this.r = r, this.g = n, this.b = i, this.a = a, this.ok = l, this.format = s || c;
  }
  /**
   * Checks if the current input value is a valid colour.
   */
  get isValid() {
    return this.ok;
  }
  /**
   * Checks if the current colour requires a light text colour.
   */
  get isDark() {
    return this.brightness < 120;
  }
  /**
   * Returns the perceived luminance of a colour.
   *
   * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   */
  get luminance() {
    const { r: t, g: e, b: s } = this;
    let r = 0, n = 0, i = 0;
    return t <= 0.03928 ? r = t / 12.92 : r = ((t + 0.055) / 1.055) ** 2.4, e <= 0.03928 ? n = e / 12.92 : n = ((e + 0.055) / 1.055) ** 2.4, s <= 0.03928 ? i = s / 12.92 : i = ((s + 0.055) / 1.055) ** 2.4, 0.2126 * r + 0.7152 * n + 0.0722 * i;
  }
  /**
   * Returns the perceived brightness of the colour.
   */
  get brightness() {
    const { r: t, g: e, b: s } = this.toRgb();
    return (t * 299 + e * 587 + s * 114) / 1e3;
  }
  /**
   * Returns the web colour name closest to the current colour.
   */
  get name() {
    const { r: t, g: e, b: s } = this.toRgb(), [r] = $t.map(([n, i]) => {
      const a = (
        // ((rgb.r - r) ** 2 + (rgb.g - g) ** 2 + (rgb.b - b) ** 2) ** 0.5; // standard
        (((i.r - t) * 0.3) ** 2 + ((i.g - e) * 0.6) ** 2 + ((i.b - s) * 0.1) ** 2) ** 0.5
      );
      return [n, a];
    }).find(([, n], i, a) => n === Math.min(...a.map(([, l]) => l)));
    return r;
  }
  /**
   * Returns the colour as an RGBA object.
   */
  toRgb() {
    let { r: t, g: e, b: s, a: r } = this;
    return [t, e, s] = [t, e, s].map((n) => m(n * 255 * 100) / 100), r = m(r * 100) / 100, {
      r: t,
      g: e,
      b: s,
      a: r
    };
  }
  /**
   * Returns the RGBA values concatenated into a CSS3 Module string format.
   * * rgb(255,255,255)
   * * rgba(255,255,255,0.5)
   */
  toRgbString() {
    const { r: t, g: e, b: s, a: r } = this.toRgb(), [n, i, a] = [t, e, s].map(m);
    return r === 1 ? `rgb(${n}, ${i}, ${a})` : `rgba(${n}, ${i}, ${a}, ${r})`;
  }
  /**
   * Returns the RGBA values concatenated into a CSS4 Module string format.
   * * rgb(255 255 255)
   * * rgb(255 255 255 / 50%)
   */
  toRgbCSS4String() {
    const { r: t, g: e, b: s, a: r } = this.toRgb(), [n, i, a] = [t, e, s].map(m), l = r === 1 ? "" : ` / ${m(r * 100)}%`;
    return `rgb(${n} ${i} ${a}${l})`;
  }
  /**
   * Returns the hexadecimal value of the colour. When the parameter is *true*
   * it will find a 3 characters shorthand of the decimal value.
   */
  toHex(t) {
    let { r: e, g: s, b: r, a: n } = this;
    return [e, s, r] = [e, s, r].map((i) => m(i * 255)), n = m(n * 100) / 100, n === 1 ? Lt(e, s, r, t) : At(e, s, r, n, t);
  }
  /**
   * Returns the CSS valid hexadecimal vaue of the colour. When the parameter is *true*
   * it will find a 3 characters shorthand of the value.
   */
  toHexString(t) {
    return `#${this.toHex(t)}`;
  }
  /**
   * Returns the HEX8 value of the colour.
   */
  toHex8(t) {
    let { r: e, g: s, b: r, a: n } = this;
    return [e, s, r] = [e, s, r].map((i) => m(i * 255)), n = m(n * 100) / 100, n === 1 ? Lt(e, s, r, t) : At(e, s, r, n, t);
  }
  /**
   * Returns the HEX8 value of the colour.
   */
  toHex8String(t) {
    return `#${this.toHex8(t)}`;
  }
  /**
   * Returns the colour as a HSVA object.
   */
  toHsv() {
    const { r: t, g: e, b: s, a: r } = this, { h: n, s: i, v: a } = ie(t, e, s);
    return {
      h: n,
      s: i,
      v: a,
      a: r
    };
  }
  /**
   * Returns the colour as an HSLA object.
   */
  toHsl() {
    const { r: t, g: e, b: s, a: r } = this, { h: n, s: i, l: a } = re(t, e, s);
    return {
      h: n,
      s: i,
      l: a,
      a: r
    };
  }
  /**
   * Returns the HSLA values concatenated into a CSS3 Module format string.
   * * `hsl(150, 100%, 50%)`
   * * `hsla(150, 100%, 50%, 0.5)`
   */
  toHslString() {
    let { h: t, s: e, l: s, a: r } = this.toHsl();
    return t = m(t * 360), e = m(e * 100), s = m(s * 100), r = m(r * 100) / 100, r === 1 ? `hsl(${t}, ${e}%, ${s}%)` : `hsla(${t}, ${e}%, ${s}%, ${r})`;
  }
  /**
   * Returns the HSLA values concatenated into a CSS4 Module format string.
   * * `hsl(150deg 100% 50%)`
   * * `hsl(150deg 100% 50% / 50%)`
   */
  toHslCSS4String() {
    let { h: t, s: e, l: s, a: r } = this.toHsl();
    t = m(t * 360), e = m(e * 100), s = m(s * 100), r = m(r * 100);
    const n = r < 100 ? ` / ${m(r)}%` : "";
    return `hsl(${t}deg ${e}% ${s}%${n})`;
  }
  /**
   * Returns the colour as an HWBA object.
   */
  toHwb() {
    const { r: t, g: e, b: s, a: r } = this, { h: n, w: i, b: a } = ne(t, e, s);
    return {
      h: n,
      w: i,
      b: a,
      a: r
    };
  }
  /**
   * Returns the HWBA values concatenated into a string.
   */
  toHwbString() {
    let { h: t, w: e, b: s, a: r } = this.toHwb();
    t = m(t * 360), e = m(e * 100), s = m(s * 100), r = m(r * 100);
    const n = r < 100 ? ` / ${m(r)}%` : "";
    return `hwb(${t}deg ${e}% ${s}%${n})`;
  }
  /**
   * Sets the alpha value of the current colour.
   */
  setAlpha(t) {
    return typeof t != "number" ? this : (this.a = Ot(t), this);
  }
  /**
   * Saturate the colour with a given amount.
   */
  saturate(t) {
    if (typeof t != "number") return this;
    const { h: e, s, l: r } = this.toHsl(), { r: n, g: i, b: a } = lt(e, ut(s + t / 100), r);
    return Object.assign(this, { r: n, g: i, b: a }), this;
  }
  /**
   * Desaturate the colour with a given amount.
   */
  desaturate(t) {
    return typeof t == "number" ? this.saturate(-t) : this;
  }
  /**
   * Completely desaturates a colour into greyscale.
   * Same as calling `desaturate(100)`
   */
  greyscale() {
    return this.saturate(-100);
  }
  /**
   * Increase the colour lightness with a given amount.
   */
  lighten(t) {
    if (typeof t != "number") return this;
    const { h: e, s, l: r } = this.toHsl(), { r: n, g: i, b: a } = lt(e, s, ut(r + t / 100));
    return Object.assign(this, { r: n, g: i, b: a }), this;
  }
  /**
   * Decrease the colour lightness with a given amount.
   */
  darken(t) {
    return typeof t == "number" ? this.lighten(-t) : this;
  }
  /**
   * Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
   * Values outside of this range will be wrapped into this range.
   */
  spin(t) {
    if (typeof t != "number") return this;
    const { h: e, s, l: r } = this.toHsl(), { r: n, g: i, b: a } = lt(ut((e * 360 + t) % 360 / 360), s, r);
    return Object.assign(this, { r: n, g: i, b: a }), this;
  }
  /** Returns a clone of the current `Color` instance. */
  clone() {
    return new y(this);
  }
  /**
   * Returns the colour value in CSS valid string format.
   */
  toString(t) {
    const { format: e } = this;
    return e === "hex" ? this.toHexString(t) : e === "hsl" ? this.toHslString() : e === "hwb" ? this.toHwbString() : this.toRgbString();
  }
}
class It {
  static Color = y;
  hue;
  hueSteps;
  lightSteps;
  saturation;
  colors;
  /**
   * The `hue` parameter is optional, which would be set to 0.
   * * `args.hue` the starting Hue [0, 360]
   * * `args.hueSteps` Hue Steps Count [5, 24]
   * * `args.lightSteps` Lightness Steps Count [5, 12]
   * * `args.saturation` Saturation [0, 100]
   */
  constructor(...t) {
    let e = 0, s = 12, r = 10, n = [0.5], i = 100;
    if (t.length === 4)
      [e, s, r, i] = t;
    else if (t.length === 3)
      [e, s, r] = t;
    else if (t.length === 2 && ([s, r] = t, [s, r].some((g) => g < 1)))
      throw TypeError("ColorPalette: the two minimum arguments must be numbers higher than 0.");
    const a = [], l = 360 / s, c = y.roundPart((r - (r % 2 ? 1 : 0)) / 2), h = [0.25, 0.2, 0.15, 0.11, 0.09, 0.075], b = [
      [1, 2, 3],
      [4, 5],
      [6, 7],
      [8, 9],
      [10, 11],
      [12, 13]
    ], u = b.find((g) => g.includes(r)), d = u ? h[b.indexOf(u)] : 100 / (r + (r % 2 ? 0 : 1)) / 100;
    for (let g = 1; g < c + 1; g += 1)
      n = [...n, 0.5 + d * g];
    for (let g = 1; g < r - c; g += 1)
      n = [0.5 - d * g, ...n];
    for (let g = 0; g < s; g += 1) {
      const p = (e + g * l) % 360;
      n.forEach((f) => {
        const $ = new y({ h: p, s: 100, l: f * 100 });
        a.push(i < 100 ? $.saturate(i - 100) : $);
      });
    }
    this.hue = e, this.hueSteps = s, this.lightSteps = r, this.saturation = i, this.colors = a;
  }
}
const Kt = {
  pickerLabel: "Colour Picker",
  appearanceLabel: "Colour Appearance",
  valueLabel: "Colour Value",
  toggleLabel: "Select Colour",
  presetsLabel: "Colour Presets",
  defaultsLabel: "Colour Defaults",
  formatLabel: "Format",
  alphaLabel: "Alpha",
  hexLabel: "Hexadecimal",
  hueLabel: "Hue",
  whitenessLabel: "Whiteness",
  blacknessLabel: "Blackness",
  saturationLabel: "Saturation",
  lightnessLabel: "Lightness",
  redLabel: "Red",
  greenLabel: "Green",
  blueLabel: "Blue"
}, it = [
  "white",
  "black",
  "grey",
  "red",
  "orange",
  "brown",
  "gold",
  "olive",
  "yellow",
  "lime",
  "green",
  "teal",
  "cyan",
  "blue",
  "violet",
  "magenta",
  "pink"
], le = (o) => {
  if (!B(o)) return !1;
  try {
    JSON.parse(o);
  } catch {
    return !1;
  }
  return !0;
}, Vt = "v-hidden", go = (o) => {
  const { format: t, id: e, componentLabels: s } = o, r = x({
    tagName: "div",
    className: `color-form ${t}`
  });
  let n = ["hex"];
  return t === "rgb" ? n = ["red", "green", "blue", "alpha"] : t === "hsl" ? n = ["hue", "saturation", "lightness", "alpha"] : t === "hwb" && (n = ["hue", "whiteness", "blackness", "alpha"]), n.forEach((i) => {
    const [a] = t === "hex" ? ["#"] : de(i).split(""), l = `color_${t}_${i}_${e}`, c = s[`${i}Label`], h = x({ tagName: "label" });
    v(h, "for", l), h.append(
      x({
        tagName: "span",
        ariaHidden: "true",
        innerText: `${a}:`
      }),
      x({
        tagName: "span",
        className: Vt,
        innerText: c
      })
    );
    const b = x({
      tagName: "input",
      id: l,
      // name: cID, - prevent saving the value to a form
      type: t === "hex" ? "text" : "number",
      value: i === "alpha" ? "100" : "0",
      className: `color-input ${i}`,
      autocomplete: "off",
      spellcheck: !1
    });
    let u = "100", d = "1";
    i !== "alpha" && (t === "rgb" ? (u = "255", d = "1") : i === "hue" && (u = "360", d = "1")), K(b, {
      min: "0",
      max: u,
      step: d
    }), r.append(h, b);
  }), r;
}, uo = (o) => {
  const { format: t, componentLabels: e } = o, { hueLabel: s, alphaLabel: r, lightnessLabel: n, saturationLabel: i, whitenessLabel: a, blacknessLabel: l } = e, c = t === "hsl" ? 360 : 100, h = t === "hsl" ? 100 : 360, b = 100;
  let u = t === "hsl" ? `${s} & ${n}` : `${n} & ${i}`;
  u = t === "hwb" ? `${a} & ${l}` : u;
  const d = t === "hsl" ? `${i}` : `${s}`, g = x({
    tagName: "div",
    className: `color-controls ${t}`
  }), p = "color-pointer", f = "color-slider";
  return [
    {
      i: 1,
      c: p,
      l: u,
      min: 0,
      max: c
    },
    {
      i: 2,
      c: f,
      l: d,
      min: 0,
      max: h
    },
    {
      i: 3,
      c: f,
      l: r,
      min: 0,
      max: b
    }
  ].forEach((w) => {
    const { i: P, c: L, l: S, min: C, max: M } = w, T = x({
      tagName: "div",
      className: "color-control",
      role: "presentation"
    });
    T.append(
      x({
        tagName: "div",
        className: `visual-control visual-control${P}`
      })
    );
    const A = x({
      tagName: "div",
      className: `${L} knob`,
      ariaLive: "polite",
      ariaLabel: S,
      role: "slider",
      tabIndex: 0,
      ariaValueMin: `${C}`,
      ariaValueMax: `${M}`
    });
    T.append(A), g.append(T);
  }), g;
}, ce = (o, t, e) => {
  const { input: s, format: r, componentLabels: n } = o, { defaultsLabel: i, presetsLabel: a } = n, l = e === "color-options", c = t instanceof It, h = l ? a : i, b = c ? t.colors : t, u = b.length, { lightSteps: d } = c ? t : { lightSteps: null }, g = d || [9, 10].find((A) => u >= A * 2 && !(u % A)) || 5, p = l && u > g;
  let f = 2;
  f = p && u > g * 2 ? 3 : f, f = p && u > g * 3 ? 4 : f, f = p && u > g * 4 ? 5 : f;
  const $ = f - (u <= g * 3 ? 1 : 2), w = p && u > $ * g;
  let P = e;
  P += w ? " scrollable" : "", P += p ? " multiline" : "";
  const L = p ? "1px" : "0.25rem";
  let S = p ? 1.75 : 2;
  S = g > 5 && p ? 1.5 : S;
  const C = `${$ * S}rem`, M = `calc(${f} * ${S}rem + ${f - 1} * ${L})`, T = x({
    tagName: "ul",
    className: P,
    role: "listbox",
    ariaLabel: h
  });
  return w && D(T, {
    "--grid-item-size": `${S}rem`,
    "--grid-fit": `${g}`,
    "--grid-gap": L,
    "--grid-height": C,
    "--grid-hover-height": M
  }), b.forEach((A) => {
    let [F, Q] = typeof A == "string" ? A.trim().split(":") : [];
    A instanceof y && (F = A.toHexString(), Q = F);
    const Wt = new y(A instanceof y ? A : F, r).toString() === kt(s, "value"), yt = x({
      tagName: "li",
      className: `color-option${Wt ? " active" : ""}`,
      innerText: `${Q || F}`,
      tabIndex: 0,
      role: "option",
      ariaSelected: Wt ? "true" : "false"
    });
    v(yt, "data-value", `${F}`), l && D(yt, { backgroundColor: F }), T.append(yt);
  }), T;
}, bo = (o) => {
  const { input: t, parent: e, format: s, id: r, componentLabels: n, colorKeywords: i, colorPresets: a } = o, l = kt(t, "value") || "#fff", { nonColors: c } = y, { toggleLabel: h, pickerLabel: b, formatLabel: u, hexLabel: d } = n, g = c.includes(l) ? "#fff" : l;
  o.color = new y(g, s);
  const p = s === "hex" ? d : de(s), f = x({
    id: `picker-btn-${r}`,
    tagName: "button",
    type: "button",
    className: "picker-toggle btn-appearance",
    ariaExpanded: "false",
    ariaHasPopup: "true"
  });
  f.append(
    x({
      tagName: "span",
      className: Vt,
      innerText: `${b}. ${u}: ${p}`
    })
  );
  const $ = x({
    tagName: "div",
    className: "color-dropdown picker",
    role: "group",
    ariaLabelledBy: `picker-btn-${r}`
  }), w = uo(o), P = go(o);
  if ($.append(w, P), t.before(f), e.append($), i || a) {
    const L = x({
      tagName: "div",
      className: "color-dropdown scrollable menu"
    });
    a && L.append(ce(o, a, "color-options")), i && i.length && L.append(ce(o, i, "color-defaults"));
    const S = x({
      tagName: "button",
      type: "button",
      className: "menu-toggle btn-appearance",
      tabIndex: -1,
      ariaExpanded: "false",
      ariaHasPopup: "true"
    }), C = encodeURI("http://www.w3.org/2000/svg"), M = Tt(C, {
      tagName: "svg"
    });
    v(M, "xmlns", C), v(M, "viewBox", "0 0 512 512"), v(M, Te, "true");
    const T = Tt(C, {
      tagName: "path"
    });
    v(T, "d", "M98,158l157,156L411,158l27,27L255,368L71,185L98,158z"), v(T, "fill", "#fff"), M.append(T), S.append(
      x({
        tagName: "span",
        className: Vt,
        innerText: `${h}`
      }),
      M
    ), e.append(S, L);
  }
  i && c.includes(l) && (o.value = l), v(t, X, "-1");
}, po = "2.0.2", Y = "color-picker", fo = `[data-function="${Y}"]`, he = `.${Y}`, mo = {
  componentLabels: Kt,
  colorLabels: it,
  format: "rgb",
  colorPresets: !1,
  colorKeywords: !1
}, { roundPart: k, nonColors: bt } = y, vo = (o) => Ye(o, Y), $o = (o) => new wo(o), ge = (o, t) => {
  const e = t ? Bt : jt, { input: s, pickerToggle: r, menuToggle: n } = o;
  e(s, Oe, o.showPicker), e(r, Et, o.togglePicker), n && e(n, Et, o.toggleMenu);
}, Ne = (o, t) => {
  const e = t ? Bt : jt, { input: s, colorMenu: r, parent: n } = o, i = V(s), a = ro(i);
  e(o.controls, Ie, o.pointerDown), o.controlKnobs.forEach((l) => e(l, zt, o.handleKnobs)), e(a, Be, o.handleScroll), e(a, Ve, o.update), [s, ...o.inputs].forEach((l) => e(l, Me, o.changeHandler)), r && (e(r, Et, o.menuClickHandler), e(r, zt, o.menuKeyHandler)), e(i, be, o.pointerMove), e(i, Ke, o.pointerUp), e(n, De, o.handleFocusOut), e(i, Fe, o.handleDismiss);
}, ue = (o) => {
  Qe(o.input, new CustomEvent("colorpicker.change"));
}, Ee = (o) => {
  o && ["bottom", "top"].forEach((t) => O(o, t));
}, Ht = (o, t) => {
  const { colorPicker: e, colorMenu: s, menuToggle: r, pickerToggle: n, parent: i } = o, a = t === e, l = a ? s : e, c = a ? r : n, h = a ? n : r;
  R(i, "open") || q(i, "open"), l && (O(l, "show"), Ee(l)), q(t, "bottom"), oo(t), q(t, "show"), a && o.update(), o.isOpen || (Ne(o, !0), o.updateDropdownPosition(), o.isOpen = !0, v(o.input, X, "0"), r && v(r, X, "0")), v(h, Nt, "true"), c && v(c, Nt, "false");
};
class wo {
  // bring utils to staic
  static Color = y;
  static ColorPalette = It;
  static getInstance = vo;
  static init = $o;
  static selector = fo;
  // utils important for render
  static roundPart = k;
  static setElementStyle = D;
  static setAttribute = v;
  static getBoundingClientRect = gt;
  static version = po;
  static colorNames = it;
  static colorPickerLabels = Kt;
  id;
  input;
  color;
  format = "rgb";
  parent;
  dragElement;
  isOpen = !1;
  controlPositions;
  colorLabels = Qt(it.map((t) => [t, t]));
  colorKeywords;
  colorPresets;
  componentLabels;
  pickerToggle;
  menuToggle;
  colorPicker;
  colorMenu;
  controls;
  inputs;
  controlKnobs;
  visuals;
  /**
   * Returns a new `ColorPicker` instance. The target of this constructor
   * must be an `HTMLInputElement`.
   *
   * @param target the target `<input>` element
   * @param config instance options
   */
  constructor(t, e) {
    const s = _(t);
    if (typeof t > "u") throw new TypeError("ColorPicker target not specified.");
    if (B(t) && !s) throw new TypeError(`ColorPicker target "${t}" cannot be found.`);
    this.input = s;
    const r = me(s, he);
    if (!r) throw new TypeError("ColorPicker requires a specific markup to work.");
    this.parent = r, this.id = fe(s, Y), this.dragElement = void 0, this.isOpen = !1, this.controlPositions = {
      c1x: 0,
      c1y: 0,
      c2y: 0,
      c3y: 0
    }, this.colorKeywords = !1, this.colorPresets = !1;
    const { format: n, componentLabels: i, colorLabels: a, colorKeywords: l, colorPresets: c } = eo(
      s,
      mo,
      e || {}
    );
    let h = it;
    Ct(a) && a.length === 17 ? h = a : B(a) && a.split(",").length === 17 && (h = a.split(",")), K(this.colorLabels, Qt(h.map((p, f) => [it[f], p])));
    const b = B(i) && le(i) ? JSON.parse(i) : i;
    if (this.componentLabels = K({ ...Kt }, b), this.color = new y(s.value || "#fff", n), this.format = n, Ct(l) && l.length ? this.colorKeywords = l : B(l) && l.length && (this.colorKeywords = l.split(",").map((p) => p.trim())), Ct(c) && c.length)
      this.colorPresets = c;
    else if (c && le(c)) {
      const { hue: p, hueSteps: f, lightSteps: $, saturation: w } = JSON.parse(c);
      this.colorPresets = new It(p, f, $, w);
    } else B(c) && (this.colorPresets = c.split(",").map((p) => p.trim()));
    bo(this);
    const [u, d] = st("color-dropdown", r);
    this.pickerToggle = _(".picker-toggle", r), this.menuToggle = _(".menu-toggle", r), this.colorPicker = u, this.colorMenu = d, this.inputs = [...st("color-input", r)];
    const [g] = st("color-controls", r);
    this.controls = g, this.controlKnobs = [...st("knob", g)], this.visuals = [...st("visual-control", g)], this.update(), ge(this, !0), ct.set(s, Y, this);
  }
  /** Returns the current colour value */
  get value() {
    return this.input.value;
  }
  /**
   * Sets a new colour value.
   *
   * @param {string} v new colour value
   */
  set value(t) {
    this.input.value = t;
  }
  /** Check if the colour presets include any non-colour. */
  get hasNonColor() {
    return this.colorKeywords instanceof Array && this.colorKeywords.some((t) => bt.includes(t));
  }
  /** Returns hexadecimal value of the current colour. */
  get hex() {
    return this.color.toHex(!0);
  }
  /** Returns the current colour value in {h,s,v,a} object format. */
  get hsv() {
    return this.color.toHsv();
  }
  /** Returns the current colour value in {h,s,l,a} object format. */
  get hsl() {
    return this.color.toHsl();
  }
  /** Returns the current colour value in {h,w,b,a} object format. */
  get hwb() {
    return this.color.toHwb();
  }
  /** Returns the current colour value in {r,g,b,a} object format. */
  get rgb() {
    return this.color.toRgb();
  }
  /** Returns the current colour brightness. */
  get brightness() {
    return this.color.brightness;
  }
  /** Returns the current colour luminance. */
  get luminance() {
    return this.color.luminance;
  }
  /** Checks if the current colour requires a light text colour. */
  get isDark() {
    const { color: t, brightness: e } = this;
    return e < 120 && t.a > 0.33;
  }
  /** Checks if the current input value is a valid colour. */
  get isValid() {
    const t = this.input.value;
    return t !== "" && new y(t).isValid;
  }
  /** Returns the colour appearance, usually the closest colour name for the current value. */
  get appearance() {
    const { colorLabels: t, hsl: e, hsv: s, format: r } = this, n = k(e.h * 360), i = r === "hsl" ? e.s : s.s, a = k(i * 100), l = k(e.l * 100), c = s.v * 100;
    let h = "black";
    if (l === 100 && a === 0)
      h = t.white;
    else if (l === 0)
      h = t.black;
    else if (a === 0)
      h = t.grey;
    else if (n < 15 || n >= 345)
      h = t.red;
    else if (n >= 15 && n < 45)
      h = c > 80 && a > 80 ? t.orange : t.brown;
    else if (n >= 45 && n < 75) {
      const b = n > 46 && n < 54 && c < 80 && a > 90, u = n >= 54 && n < 75 && c < 80;
      h = b ? t.gold : t.yellow, h = u ? t.olive : h;
    } else n >= 75 && n < 155 ? h = c < 68 ? t.green : t.lime : n >= 155 && n < 175 ? h = t.teal : n >= 175 && n < 195 ? h = t.cyan : n >= 195 && n < 255 ? h = t.blue : n >= 255 && n < 270 ? h = t.violet : n >= 270 && n < 295 ? h = t.magenta : n >= 295 && n < 345 && (h = t.pink);
    return h;
  }
  /** Updates `ColorPicker` visuals. */
  updateVisuals() {
    const { controlPositions: t, visuals: e } = this, [s, r, n] = e, { offsetHeight: i } = s, a = t.c2y / i, { r: l, g: c, b: h } = new y({ h: a * 360, s: 100, l: 50 }).toRgb(), b = "linear-gradient(rgb(255,255,255) 0%, rgb(255,255,255) 100%)", u = 1 - t.c3y / i, d = k(u * 100) / 100, g = new y({
      h: a * 360,
      s: 100,
      l: 50,
      a: u
    }).toRgbString(), p = `linear-gradient(
      rgb(255,0,0) 0%, rgb(255,255,0) 16.67%,
      rgb(0,255,0) 33.33%, rgb(0,255,255) 50%,
      rgb(0,0,255) 66.67%, rgb(255,0,255) 83.33%,
      rgb(255,0,0) 100%)`;
    D(s, {
      background: `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,${d}) 100%),
      linear-gradient(to right, rgba(255,255,255,${d}) 0%, ${g} 100%),
      ${b}`
    }), D(r, { background: p }), D(n, {
      background: `linear-gradient(rgba(${l},${c},${h},1) 0%,rgba(${l},${c},${h},0) 100%)`
    });
  }
  /**
   * The `ColorPicker` *focusout* event listener when open.
   *
   * @param e
   * @this {ColorPicker}
   */
  handleFocusOut = ({ relatedTarget: t }) => {
    t && !this.parent.contains(t) && this.hide(!0);
  };
  /**
   * The `ColorPicker` *keyup* event listener when open.
   *
   * @param e
   * @this {ColorPicker}
   */
  handleDismiss = ({ code: t }) => {
    this.isOpen && t === Ge && this.hide();
  };
  /**
   * The `ColorPicker` *scroll* event listener when open.
   *
   * @param e
   */
  handleScroll = (t) => {
    const { activeElement: e } = V(this.input);
    this.updateDropdownPosition(), ([be, je].includes(t.type) && this.dragElement || e && this.controlKnobs.includes(e)) && (t.stopPropagation(), t.preventDefault());
  };
  /**
   * The `ColorPicker` keyboard event listener for menu navigation.
   *
   * @param e
   */
  menuKeyHandler = (t) => {
    const { target: e, code: s } = t, { previousElementSibling: r, nextElementSibling: n, parentElement: i } = e, a = i && R(i, "color-options"), l = i ? [...i.children] : [], c = a && Number(Mt(i, "--grid-fit")), h = l.indexOf(e), b = h > -1 && c && l[h - c], u = h > -1 && c && l[h + c];
    [j, ot, Jt].includes(s) && t.preventDefault(), a ? b && s === ot ? W(b) : u && s === j ? W(u) : r && s === ht ? W(r) : n && s === U && W(n) : r && [ht, ot].includes(s) ? W(r) : n && [U, j].includes(s) && W(n), [qe, Jt].includes(s) && this.menuClickHandler(t);
  };
  /**
   * The `ColorPicker` click event listener for the colour menu presets / defaults.
   *
   * @param e
   * @this {ColorPicker}
   */
  menuClickHandler = (t) => {
    const { target: e } = t, { colorMenu: s } = this, r = (kt(e, "data-value") || "").trim();
    if (!r.length) return;
    const n = _("li.active", s);
    let i = r;
    i = bt.includes(i) ? "white" : i, i = i === "transparent" ? "rgba(0,0,0,0)" : i;
    const { r: a, g: l, b: c, a: h } = new y(i);
    K(this.color, {
      r: a,
      g: l,
      b: c,
      a: h
    }), this.update(), n !== e && (n && (O(n, "active"), Pt(n, xt)), q(e, "active"), v(e, xt, "true"), bt.includes(r) && (this.value = r), ue(this));
  };
  /**
   * The `ColorPicker` *touchstart* / *mousedown* events listener for control knobs.
   *
   * @param e
   */
  pointerDown = (t) => {
    if (t.button !== 0) return;
    const { target: e, pageX: s, pageY: r } = t, { colorMenu: n, visuals: i, controlKnobs: a } = this, [l, c, h] = i, [b, u, d] = a, g = a.includes(e) ? e.previousElementSibling : e, p = gt(g), f = St(l), $ = s - f.scrollLeft - p.left, w = r - f.scrollTop - p.top;
    if (e === l || e === b ? (this.dragElement = g, this.changeControl1($, w)) : e === c || e === u ? (this.dragElement = g, this.changeControl2(w)) : (e === h || e === d) && (this.dragElement = g, this.changeAlpha(w)), n) {
      const P = _("li.active", n);
      P && (O(P, "active"), Pt(P, xt));
    }
    t.preventDefault();
  };
  /**
   * The `ColorPicker` *touchend* / *mouseup* events listener for control knobs.
   *
   * @param e
   * @this
   */
  pointerUp = ({ target: t }) => {
    const { parent: e } = this, s = V(e), r = _(`${he}.open`, s) !== null, n = s.getSelection();
    !this.dragElement && (!n || !n.toString().length) && !e.contains(t) && this.hide(r), this.dragElement = void 0;
  };
  /**
   * The `ColorPicker` *touchmove* / *mousemove* events listener for control knobs.
   *
   * @param {PointerEvent} e
   */
  pointerMove = (t) => {
    const { dragElement: e, visuals: s } = this, [r, n, i] = s, { pageX: a, pageY: l } = t;
    if (!e) return;
    const c = gt(e), h = St(r), b = a - h.scrollLeft - c.left, u = l - h.scrollTop - c.top;
    e === r && this.changeControl1(b, u), e === n && this.changeControl2(u), e === i && this.changeAlpha(u);
  };
  /**
   * The `ColorPicker` *keydown* event listener for control knobs.
   *
   * @param e
   */
  handleKnobs = (t) => {
    const { target: e, code: s } = t;
    if (![ot, j, ht, U].includes(s)) return;
    t.preventDefault();
    const { controlKnobs: r, visuals: n } = this, { offsetWidth: i, offsetHeight: a } = n[0], [l, c, h] = r, { activeElement: b } = V(l), u = r.find((g) => g === b), d = a / 360;
    if (u) {
      let g = 0, p = 0;
      if (e === l) {
        const f = i / 100;
        [ht, U].includes(s) ? this.controlPositions.c1x += s === U ? f : -f : [ot, j].includes(s) && (this.controlPositions.c1y += s === j ? d : -d), g = this.controlPositions.c1x, p = this.controlPositions.c1y, this.changeControl1(g, p);
      } else e === c ? (this.controlPositions.c2y += [j, U].includes(s) ? d : -d, p = this.controlPositions.c2y, this.changeControl2(p)) : e === h && (this.controlPositions.c3y += [j, U].includes(s) ? d : -d, p = this.controlPositions.c3y, this.changeAlpha(p));
      this.handleScroll(t);
    }
  };
  /** The event listener of the colour form inputs. */
  changeHandler = () => {
    let t;
    const { inputs: e, format: s, value: r, input: n, controlPositions: i, visuals: a } = this, { activeElement: l } = V(n), { offsetHeight: c } = a[0], [h, , , b] = e, [u, d, g, p] = s === "rgb" ? e.map((w) => parseFloat(w.value) / (w === b ? 100 : 1)) : e.map((w) => parseFloat(w.value) / (w !== h ? 100 : 360)), f = this.hasNonColor && bt.includes(r), $ = b ? p : 1 - i.c3y / c;
    if (l === n || l && e.includes(l)) {
      l === n ? f ? t = r === "transparent" ? "rgba(0,0,0,0)" : "rgb(0,0,0)" : t = r : s === "hex" ? t = h.value : s === "hsl" ? t = {
        h: u,
        s: d,
        l: g,
        a: $
      } : s === "hwb" ? t = {
        h: u,
        w: d,
        b: g,
        a: $
      } : t = {
        r: u,
        g: d,
        b: g,
        a: $
      };
      const { r: w, g: P, b: L, a: S } = new y(t);
      K(this.color, {
        r: w,
        g: P,
        b: L,
        a: S
      }), this.setControlPositions(), this.updateAppearance(), this.updateInputs(), this.updateControls(), this.updateVisuals(), l === n && f && (this.value = r);
    }
  };
  /**
   * Updates `ColorPicker` first control:
   * * `lightness` and `saturation` for HEX/RGB;
   * * `lightness` and `hue` for HSL.
   *
   * @param X the X component of the offset
   * @param Y the Y component of the offset
   */
  changeControl1(t, e) {
    let [s, r] = [0, 0];
    const { controlPositions: n, visuals: i } = this, { offsetHeight: a, offsetWidth: l } = i[0];
    t > l ? s = l : t >= 0 && (s = t), e > a ? r = a : e >= 0 && (r = e);
    const c = n.c2y / a, h = s / l, b = 1 - r / a, u = 1 - n.c3y / a, { r: d, g, b: p, a: f } = new y({
      h: c * 360,
      s: h * 100,
      v: b * 100,
      a: u
    });
    K(this.color, {
      r: d,
      g,
      b: p,
      a: f
    }), this.controlPositions.c1x = s, this.controlPositions.c1y = r, this.updateAppearance(), this.updateInputs(), this.updateControls(), this.updateVisuals();
  }
  /**
   * Updates `ColorPicker` second control:
   * * `hue` for HEX/RGB/HWB;
   * * `saturation` for HSL.
   *
   * @param Y the Y offset
   */
  changeControl2(t) {
    const { controlPositions: e, visuals: s } = this, { offsetHeight: r, offsetWidth: n } = s[0];
    let i = 0;
    t > r ? i = r : t >= 0 && (i = t);
    const a = i / r, l = e.c1x / n, c = 1 - e.c1y / r, h = 1 - e.c3y / r, { r: b, g: u, b: d, a: g } = new y({
      h: a * 360,
      s: l * 100,
      v: c * 100,
      a: h
    });
    K(this.color, {
      r: b,
      g: u,
      b: d,
      a: g
    }), this.controlPositions.c2y = i, this.updateAppearance(), this.updateInputs(), this.updateControls(), this.updateVisuals();
  }
  /**
   * Updates `ColorPicker` last control,
   * the `alpha` channel.
   *
   * @param Y
   */
  changeAlpha(t) {
    const { visuals: e } = this, { offsetHeight: s } = e[0];
    let r = 0;
    t > s ? r = s : t >= 0 && (r = t);
    const n = 1 - r / s;
    this.color.setAlpha(n), this.controlPositions.c3y = r, this.updateAppearance(), this.updateInputs(), this.updateControls(), this.updateVisuals();
  }
  /**
   * Updates `ColorPicker` control positions on:
   * * initialization
   * * window resize
   */
  update = () => {
    this.updateDropdownPosition(), this.updateAppearance(), this.setControlPositions(), this.updateInputs(!0), this.updateControls(), this.updateVisuals();
  };
  /** Updates the open dropdown position on *scroll* event. */
  updateDropdownPosition() {
    const { input: t, colorPicker: e, colorMenu: s } = this, r = gt(t), { top: n, bottom: i } = r, { offsetHeight: a } = t, l = St(t).clientHeight, h = R(e, "show") ? e : s;
    if (!h) return;
    const { offsetHeight: b } = h, u = l - i, d = n, g = n + b + a > l, p = n - b < 0;
    (R(h, "bottom") || !p) && u < d && g ? (O(h, "bottom"), q(h, "top")) : (O(h, "top"), q(h, "bottom"));
  }
  /** Updates control knobs' positions. */
  setControlPositions() {
    const { visuals: t, color: e, hsv: s } = this, { offsetHeight: r, offsetWidth: n } = t[0], i = e.a, a = s.h, l = s.s, c = s.v;
    this.controlPositions.c1x = l * n, this.controlPositions.c1y = (1 - c) * r, this.controlPositions.c2y = a * r, this.controlPositions.c3y = (1 - i) * r;
  }
  /** Update the visual appearance label and control knob labels. */
  updateAppearance() {
    const { componentLabels: t, color: e, parent: s, hsv: r, hex: n, format: i, controlKnobs: a } = this, { appearanceLabel: l, hexLabel: c, valueLabel: h } = t;
    let { r: b, g: u, b: d } = e.toRgb();
    const [g, p, f] = a, $ = k(r.h * 360), w = e.a, P = k(r.s * 100), L = k(r.v * 100), S = this.appearance;
    let C = `${c} ${n.split("").join(" ")}`;
    if (i === "hwb") {
      const { hwb: A } = this, F = k(A.w * 100), Q = k(A.b * 100);
      C = `HWB: ${$}°, ${F}%, ${Q}%`, v(g, et, `${F}% & ${Q}%`), v(g, tt, `${F}`), v(p, _t, `${h}: ${C}. ${l}: ${S}.`), v(p, et, `${$}%`), v(p, tt, `${$}`);
    } else
      [b, u, d] = [b, u, d].map(k), C = i === "hsl" ? `HSL: ${$}°, ${P}%, ${L}%` : C, C = i === "rgb" ? `RGB: ${b}, ${u}, ${d}` : C, v(g, et, `${L}% & ${P}%`), v(g, tt, `${L}`), v(p, _t, `${h}: ${C}. ${l}: ${S}.`), v(p, et, `${$}°`), v(p, tt, `${$}`);
    const M = k(w * 100);
    v(f, et, `${M}%`), v(f, tt, `${M}`);
    const T = e.toString();
    D(this.input, { backgroundColor: T }), this.isDark ? (R(s, "txt-light") && O(s, "txt-light"), R(s, "txt-dark") || q(s, "txt-dark")) : (R(s, "txt-dark") && O(s, "txt-dark"), R(s, "txt-light") || q(s, "txt-light"));
  }
  /** Updates the control knobs actual positions. */
  updateControls() {
    const { controlKnobs: t, controlPositions: e } = this;
    let { c1x: s, c1y: r, c2y: n, c3y: i } = e;
    const [a, l, c] = t;
    [s, r, n, i] = [s, r, n, i].map(k), D(a, {
      transform: `translate3d(${s - 4}px,${r - 4}px,0)`
    }), D(l, { transform: `translate3d(0,${n - 4}px,0)` }), D(c, { transform: `translate3d(0,${i - 4}px,0)` });
  }
  /**
   * Updates all color form inputs.
   *
   * @param isPrevented when `true`, the component original event is prevented
   */
  updateInputs(t) {
    const { value: e, format: s, inputs: r, color: n, hsl: i } = this, [a, l, c, h] = r, b = k(n.a * 100), u = k(i.h * 360);
    let d = n.toString();
    if (s === "hex")
      d = this.color.toHexString(!0), a.value = this.hex;
    else if (s === "hsl") {
      const g = k(i.l * 100), p = k(i.s * 100);
      d = this.color.toHslString(), a.value = `${u}`, l.value = `${p}`, c.value = `${g}`, h.value = `${b}`;
    } else if (s === "hwb") {
      const { w: g, b: p } = this.hwb, f = k(g * 100), $ = k(p * 100);
      d = this.color.toHwbString(), a.value = `${u}`, l.value = `${f}`, c.value = `${$}`, h.value = `${b}`;
    } else if (s === "rgb") {
      let { r: g, g: p, b: f } = this.rgb;
      [g, p, f] = [g, p, f].map(k), d = this.color.toRgbString(), a.value = `${g}`, l.value = `${p}`, c.value = `${f}`, h.value = `${b}`;
    }
    this.value = d, !t && d !== e && ue(this);
  }
  /**
   * Toggle the `ColorPicker` dropdown visibility.
   *
   * @param e
   */
  togglePicker = (t) => {
    t && t.preventDefault();
    const { colorPicker: e } = this;
    this.isOpen && R(e, "show") ? this.hide(!0) : Ht(this, e);
  };
  /** Shows the `ColorPicker` dropdown. */
  showPicker = () => {
    const { colorPicker: t } = this;
    ["top", "bottom"].some((e) => R(t, e)) || Ht(this, t);
  };
  /**
   * Toggles the visibility of the `ColorPicker` presets menu.
   *
   * @param e
   * @this {ColorPicker}
   */
  toggleMenu = (t) => {
    t && t.preventDefault();
    const { colorMenu: e } = this;
    this.isOpen && R(e, "show") ? this.hide(!0) : Ht(this, e);
  };
  /**
   * Hides the currently open `ColorPicker` dropdown.
   *
   * @param {boolean=} focusPrevented
   */
  hide(t) {
    if (this.isOpen) {
      const { pickerToggle: e, menuToggle: s, colorPicker: r, colorMenu: n, parent: i, input: a } = this, l = R(r, "show"), c = l ? r : n, h = l ? e : s, b = c && to(c);
      this.value = this.color.toString(!0), c && (O(c, "show"), v(h, Nt, "false"), setTimeout(() => {
        Ee(c), _(".show", i) || (O(i, "open"), Ne(this), this.isOpen = !1);
      }, b)), t || W(e), v(a, X, "-1"), h === s && v(s, X, "-1");
    }
  }
  /** Removes `ColorPicker` from target `<input>`. */
  dispose() {
    const { input: t, parent: e } = this;
    this.hide(!0), ge(this), [...e.children].forEach((s) => {
      s !== t && s.remove();
    }), Pt(t, X), D(t, { backgroundColor: "" }), ["txt-light", "txt-dark"].forEach((s) => O(e, s)), ct.remove(t, Y);
  }
}
export {
  wo as default
};
//# sourceMappingURL=color-picker.mjs.map
