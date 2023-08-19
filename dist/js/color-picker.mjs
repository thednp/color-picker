const Z = {}, ue = (o) => {
  const { type: t, currentTarget: e } = o;
  [...Z[t]].forEach(([s, r]) => {
    e === s && [...r].forEach(([n, i]) => {
      n.apply(s, [o]), typeof i == "object" && i.once && jt(s, t, n, i);
    });
  });
}, be = (o, t, e, s) => {
  Z[t] || (Z[t] = /* @__PURE__ */ new Map());
  const r = Z[t];
  r.has(o) || r.set(o, /* @__PURE__ */ new Map());
  const n = r.get(o), { size: i } = n;
  n.set(e, s), i || o.addEventListener(t, ue, s);
}, jt = (o, t, e, s) => {
  const r = Z[t], n = r && r.get(o), i = n && n.get(e), a = i !== void 0 ? i : s;
  n && n.has(e) && n.delete(e), r && (!n || !n.size) && r.delete(o), (!r || !r.size) && delete Z[t], (!n || !n.size) && o.removeEventListener(t, ue, a);
}, Ut = "aria-description", Et = "aria-expanded", Te = "aria-hidden", St = "aria-selected", et = "aria-valuenow", ot = "aria-valuetext", Re = "change", Oe = "DOMContentLoaded", De = "focusin", Fe = "focusout", _t = "keydown", Ie = "keyup", Mt = "click", Ke = "pointerdown", pe = "pointermove", Ve = "pointerup", Be = "resize", je = "scroll", qe = "touchmove", j = "ArrowDown", st = "ArrowUp", gt = "ArrowLeft", G = "ArrowRight", ze = "Enter", Ge = "Escape", Wt = "Space", Ue = "transitionDuration", _e = "transitionProperty", X = "tabindex", We = navigator.userAgentData, vt = We, { userAgent: Je } = navigator, wt = Je, Jt = /iPhone|iPad|iPod|Android/i;
vt ? vt.brands.some((o) => Jt.test(o.brand)) : Jt.test(wt);
const Zt = /(iPhone|iPod|iPad)/;
vt ? vt.brands.some((o) => Zt.test(o.brand)) : (
  /* istanbul ignore next */
  Zt.test(wt)
);
wt && wt.includes("Firefox");
const { head: yt } = document;
["webkitPerspective", "perspective"].some((o) => o in yt.style);
const Ze = (o, t, e, s) => {
  const r = s || !1;
  o.addEventListener(t, e, r);
}, Xe = (o, t, e, s) => {
  const r = s || !1;
  o.removeEventListener(t, e, r);
}, Ye = (o, t, e, s) => {
  const r = (n) => {
    (n.target === o || n.currentTarget === o) && (e.apply(o, [n]), Xe(o, t, r, s));
  };
  Ze(o, t, r, s);
}, Qe = () => {
};
(() => {
  let o = !1;
  try {
    const t = Object.defineProperty({}, "passive", {
      get: () => (o = !0, o)
    });
    Ye(document, Oe, Qe, t);
  } catch {
  }
  return o;
})();
["webkitTransform", "transform"].some((o) => o in yt.style);
["webkitAnimation", "animation"].some((o) => o in yt.style);
["webkitTransition", "transition"].some((o) => o in yt.style);
const xt = (o, t) => o.getAttribute(t), m = (o, t, e) => o.setAttribute(t, e), Ct = (o, t) => o.removeAttribute(t), q = (o, ...t) => {
  o.classList.add(...t);
}, O = (o, ...t) => {
  o.classList.remove(...t);
}, T = (o, t) => o.classList.contains(t), qt = (o) => o != null && typeof o == "object" || !1, Q = (o) => qt(o) && typeof o.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((t) => o.nodeType === t) || !1, lt = (o) => Q(o) && o.nodeType === 1 || !1, W = /* @__PURE__ */ new Map(), ht = {
  data: W,
  /**
   * Sets web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @param instance the component instance
   */
  set: (o, t, e) => {
    lt(o) && (W.has(t) || W.set(t, /* @__PURE__ */ new Map()), W.get(t).set(o, e));
  },
  /**
   * Returns all instances for specified component.
   *
   * @param component the component's name or a unique key
   * @returns all the component instances
   */
  getAllFor: (o) => W.get(o) || null,
  /**
   * Returns the instance associated with the target.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @returns the instance
   */
  get: (o, t) => {
    if (!lt(o) || !t)
      return null;
    const e = ht.getAllFor(t);
    return o && e && e.get(o) || null;
  },
  /**
   * Removes web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   */
  remove: (o, t) => {
    const e = ht.getAllFor(t);
    !e || !lt(o) || (e.delete(o), e.size === 0 && W.delete(t));
  }
}, to = (o, t) => ht.get(o, t), B = (o) => typeof o == "string" || !1, eo = (o) => qt(o) && o.constructor.name === "Window" || !1, de = (o) => Q(o) && o.nodeType === 9 || !1, V = (o) => eo(o) ? o.document : de(o) ? o : Q(o) ? o.ownerDocument : window.document, K = (o, ...t) => Object.assign(o, ...t), x = (o) => {
  if (!o)
    return;
  if (B(o))
    return V().createElement(o);
  const { tagName: t } = o, e = x(t);
  if (!e)
    return;
  const s = { ...o };
  return delete s.tagName, K(e, s);
}, Tt = (o, t) => {
  if (!o || !t)
    return;
  if (B(t))
    return V().createElementNS(o, t);
  const { tagName: e } = t, s = Tt(o, e);
  if (!s)
    return;
  const r = { ...t };
  return delete r.tagName, K(s, r);
}, oo = (o, t) => o.dispatchEvent(t), Rt = (o, t) => {
  const e = getComputedStyle(o), s = t.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return e.getPropertyValue(s);
}, so = (o) => {
  const t = Rt(o, _e), e = Rt(o, Ue), s = e.includes("ms") ? (
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
}, U = (o, t) => o.focus(t), Xt = (o) => ["true", !0].includes(o) ? !0 : ["false", !1].includes(o) ? !1 : ["null", "", null, void 0].includes(o) ? null : o !== "" && !Number.isNaN(+o) ? +o : o, dt = (o) => Object.entries(o), ro = (o) => o.toLowerCase(), no = (o, t, e, s) => {
  const r = { ...e }, n = { ...o.dataset }, i = { ...t }, a = {}, l = "title";
  return dt(n).forEach(([c, h]) => {
    const b = s && typeof c == "string" && c.includes(s) ? c.replace(s, "").replace(/[A-Z]/g, (u) => ro(u)) : c;
    a[b] = Xt(h);
  }), dt(r).forEach(([c, h]) => {
    r[c] = Xt(h);
  }), dt(t).forEach(([c, h]) => {
    c in r ? i[c] = r[c] : c in a ? i[c] = a[c] : i[c] = c === l ? xt(o, l) : h;
  }), i;
}, Yt = (o) => Object.fromEntries(o), io = (o) => o.offsetHeight, D = (o, t) => {
  dt(t).forEach(([e, s]) => {
    if (s && B(e) && e.includes("--"))
      o.style.setProperty(e, s);
    else {
      const r = {};
      r[e] = s, K(o.style, r);
    }
  });
}, ao = (o) => qt(o) && o.constructor.name === "Map" || !1, fe = (o) => o.toUpperCase(), ut = (o, t) => {
  const { width: e, height: s, top: r, right: n, bottom: i, left: a } = o.getBoundingClientRect();
  let l = 1, c = 1;
  if (t && lt(o)) {
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
}, Lt = (o) => V(o).documentElement;
let Qt = 0, te = 0;
const J = /* @__PURE__ */ new Map(), me = (o, t) => {
  let e = t ? Qt : te;
  if (t) {
    const s = me(o), r = J.get(s) || /* @__PURE__ */ new Map();
    J.has(s) || J.set(s, r), ao(r) && !r.has(t) ? (r.set(t, e), Qt += 1) : e = r.get(t);
  } else {
    const s = o.id || o;
    J.has(s) ? e = J.get(s) : (J.set(s, e), te += 1);
  }
  return e;
}, lo = (o) => {
  var t;
  return o ? de(o) ? o.defaultView : Q(o) ? (t = o?.ownerDocument) == null ? void 0 : t.defaultView : o : window;
}, At = (o) => Array.isArray(o) || !1, ve = (o, t) => o ? o.closest(t) || // break out of `ShadowRoot`
ve(o.getRootNode().host, t) : null, _ = (o, t) => lt(o) ? o : (Q(t) ? t : V()).querySelector(o), rt = (o, t) => (t && Q(t) ? t : V()).getElementsByClassName(
  o
), zt = ["transparent", "currentColor", "inherit", "revert", "initial"], v = (o) => {
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
], we = "deg|rad|grad|turn", $e = "[-\\+]?\\d+%?", ke = "[-\\+]?\\d*\\.\\d+%?", ye = `[-\\+]?\\d*\\.?\\d+(?:${we})?`, ft = `(?:${ke})|(?:${$e})`, Ot = `(?:${ft})|(?:${ye}?)`, co = "(?:[\\s|\\(\\s|\\s\\(\\s]+)?", ho = "(?:[\\s|\\)\\s]+)?", ee = "(?:[,|\\s]+)", go = "(?:[,|\\/\\s]*)?", nt = `${co}(${Ot})${ee}(${ft})${ee}(${ft})${go}(${ft})?${ho}`, I = {
  CSS_UNIT: new RegExp(Ot),
  ANGLES: we,
  CSS_ANGLE: ye,
  CSS_INTEGER: $e,
  CSS_NUMBER: ke,
  CSS_UNIT2: Ot,
  PERMISSIVE_MATCH: nt,
  hwb: new RegExp(`hwb${nt}`),
  rgb: new RegExp(`rgb(?:a)?${nt}`),
  hsl: new RegExp(`hsl(?:a)?${nt}`),
  hsv: new RegExp(`hsv(?:a)?${nt}`),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
}, xe = (o) => zt.includes(o), it = (o, t) => o !== null && typeof o == "object" && Object.keys(t).every((e) => e in o), Pe = (o) => `${o}`.includes(".") && parseFloat(o) === 1, kt = (o) => typeof o == "string" && o.includes("%"), H = (o) => !!I.CSS_UNIT.exec(`${o}`), Se = ["rgb", "hex", "hsl", "hsv", "hwb"], Ce = (o) => zt.includes(o) || ["#", ...Se].some((t) => o.includes(t)) ? !1 : $t.some(([t]) => o === t), R = (o, t) => {
  let e = o;
  if (typeof o == "number" && Math.min(o, 0) === 0 && // round values to 6 decimals Math.round(N * (10 ** 6)) / 10 ** 6
  Math.max(o, 1) === 1)
    return o;
  Pe(o) && (e = "100%");
  const s = kt(e);
  return e = t === 360 ? parseFloat(e) : Math.min(t, Math.max(0, parseFloat(e))), s && (e = e * t / 100), Math.abs(e - t) < 1e-6 ? 1 : (t === 360 ? e = (e < 0 ? e % t + t : e % t) / t : e = e % t / t, e);
}, Dt = (o) => {
  let t = parseFloat(o);
  return (Number.isNaN(t) || t < 0 || t > 1) && (t = 1), t;
}, bt = (o) => Math.min(1, Math.max(0, o)), z = (o) => o.length === 1 ? `0${o}` : String(o), Le = (o) => {
  const [[, t]] = $t.filter(([e]) => e === o.toLowerCase());
  return t;
}, N = (o) => parseInt(o, 16), Ft = (o) => N(o) / 255, Ae = (o) => v(o * 255).toString(16), oe = (o, t, e) => {
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
}, mt = (o, t, e) => {
  let s = e;
  return s < 0 && (s += 1), s > 1 && (s -= 1), s < 1 / 6 ? o + (t - o) * (6 * s) : s < 1 / 2 ? t : s < 2 / 3 ? o + (t - o) * (2 / 3 - s) * 6 : o;
}, ct = (o, t, e) => {
  let s = 0, r = 0, n = 0;
  if (t === 0)
    r = e, n = e, s = e;
  else if (e) {
    const i = e < 0.5 ? e * (1 + t) : e + t - e * t, a = 2 * e - i;
    s = mt(a, i, o + 1 / 3), r = mt(a, i, o), n = mt(a, i, o - 1 / 3);
  }
  return { r: s, g: r, b: n };
}, se = (o, t, e) => {
  let s = 0, r = 0;
  const n = Math.min(o, t, e), i = Math.max(o, t, e), a = 1 - i;
  if (i === n)
    return { h: 0, w: n, b: a };
  o === n ? (s = t - e, r = 3) : (s = t === n ? e - o : o - t, r = t === n ? 5 : 1);
  const l = (r - s / (i - n)) / 6;
  return {
    h: l === 1 ? 0 : l,
    w: n,
    b: a
  };
}, He = (o, t, e) => {
  if (t + e >= 1) {
    const i = t / (t + e);
    return { r: i, g: i, b: i };
  }
  let { r: s, g: r, b: n } = ct(o, 1, 0.5);
  return [s, r, n] = [s, r, n].map((i) => i * (1 - t - e) + t), { r: s, g: r, b: n };
}, re = (o, t, e) => {
  const s = Math.max(o, t, e), r = Math.min(o, t, e);
  let n = 0;
  const i = s, a = s - r, l = s === 0 ? 0 : a / s;
  return s === r ? n = 0 : (o === s && (n = (t - e) / a + (t < e ? 6 : 0)), t === s && (n = (e - o) / a + 2), e === s && (n = (o - t) / a + 4), n /= 6), { h: n, s: l, v: i };
}, It = (o, t, e) => {
  const s = o * 6, r = t, n = e, i = Math.floor(s), a = s - i, l = n * (1 - r), c = n * (1 - a * r), h = n * (1 - (1 - a) * r), b = i % 6, u = [n, c, l, l, h, n][b], d = [h, n, n, c, l, l][b], g = [l, l, h, n, n, c][b];
  return { r: u, g: d, b: g };
}, ne = (o, t, e, s) => {
  const r = [
    z(v(o).toString(16)),
    z(v(t).toString(16)),
    z(v(e).toString(16))
  ];
  return s && r[0].charAt(0) === r[0].charAt(1) && r[1].charAt(0) === r[1].charAt(1) && r[2].charAt(0) === r[2].charAt(1) ? r[0].charAt(0) + r[1].charAt(0) + r[2].charAt(0) : r.join("");
}, Ht = (o, t, e, s, r) => {
  const n = [
    z(v(o).toString(16)),
    z(v(t).toString(16)),
    z(v(e).toString(16)),
    z(Ae(s))
  ];
  return r && n[0].charAt(0) === n[0].charAt(1) && n[1].charAt(0) === n[1].charAt(1) && n[2].charAt(0) === n[2].charAt(1) && n[3].charAt(0) === n[3].charAt(1) ? n[0].charAt(0) + n[1].charAt(0) + n[2].charAt(0) + n[3].charAt(0) : n.join("");
}, Ne = (o) => {
  const t = String(o).trim().toLowerCase();
  if (Ce(t))
    return Object.assign(Le(t), {
      a: 1,
      format: "rgb",
      ok: !0
    });
  if (xe(t))
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
    a: Ft(n),
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
    a: Ft(n + n),
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
}, ie = (o) => {
  let t = { r: 0, g: 0, b: 0 }, e = o, s = 1, r, n, i, a, l, c, h, b, u = "rgb", d = !1;
  return (!e || typeof e == "string") && (e = Ne(e), d = e.ok), it(e, t) && H(e.r) && H(e.g) && H(e.b) && ({ r: h, g: b, b: l } = e, [h, b, l] = [h, b, l].map((g) => R(g, kt(g) ? 100 : 255)), t = { r: h, g: b, b: l }, u = "format" in e ? e.format : "rgb"), it(e, { h: 0, s: 0, v: 0 }) && H(e.h) && H(e.s) && H(e.v) && ({ h: c, s: r, v: n } = e, c = R(c, 360), r = R(r, 100), n = R(n, 100), t = It(c, r, n), u = "hsv"), it(e, { h: 0, s: 0, l: 0 }) && H(e.h) && H(e.s) && H(e.l) && ({ h: c, s: r, l: i } = e, c = R(c, 360), r = R(r, 100), i = R(i, 100), t = ct(c, r, i), u = "hsl"), it(e, { h: 0, w: 0, b: 0 }) && H(e.h) && H(e.w) && H(e.b) && ({ h: c, w: a, b: l } = e, c = R(c, 360), a = R(a, 100), l = R(l, 100), t = He(c, a, l), u = "hwb"), H(e.a) && (s = e.a, s = kt(s) || parseFloat(`${s}`) > 1 ? R(s, 100) : s), {
    r: t.r,
    g: t.g,
    b: t.b,
    a: Dt(s),
    format: u,
    ok: d
  };
}, uo = "1.0.8";
class y {
  // bring main utilities to front
  static matchers = I;
  static isOnePointZero = Pe;
  static isPercentage = kt;
  static isValidCSSUnit = H;
  static isNonColor = xe;
  static isColorName = Ce;
  static isColorType = it;
  static pad2 = z;
  static clamp01 = bt;
  static bound01 = R;
  static boundAlpha = Dt;
  static getRGBFromName = Le;
  static convertHexToDecimal = Ft;
  static convertDecimalToHex = Ae;
  static rgbToHsl = oe;
  static rgbToHex = ne;
  static rgbToHsv = re;
  static rgbToHwb = se;
  static rgbaToHex = Ht;
  static hslToRgb = It;
  static hsvToRgb = It;
  static hueToRgb = mt;
  static hwbToRgb = He;
  static parseIntFromHex = N;
  static stringInputToObject = Ne;
  static inputToRGB = ie;
  static roundPart = v;
  static webColors = $t;
  static nonColors = zt;
  static version = uo;
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
    const s = e && Se.includes(e) ? e : "", { r, g: n, b: i, a, ok: l, format: c } = ie(t);
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
    return [t, e, s] = [t, e, s].map((n) => v(n * 255 * 100) / 100), r = v(r * 100) / 100, {
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
    const { r: t, g: e, b: s, a: r } = this.toRgb(), [n, i, a] = [t, e, s].map(v);
    return r === 1 ? `rgb(${n}, ${i}, ${a})` : `rgba(${n}, ${i}, ${a}, ${r})`;
  }
  /**
   * Returns the RGBA values concatenated into a CSS4 Module string format.
   * * rgb(255 255 255)
   * * rgb(255 255 255 / 50%)
   */
  toRgbCSS4String() {
    const { r: t, g: e, b: s, a: r } = this.toRgb(), [n, i, a] = [t, e, s].map(v), l = r === 1 ? "" : ` / ${v(r * 100)}%`;
    return `rgb(${n} ${i} ${a}${l})`;
  }
  /**
   * Returns the hexadecimal value of the colour. When the parameter is *true*
   * it will find a 3 characters shorthand of the decimal value.
   */
  toHex(t) {
    const { r: e, g: s, b: r, a: n } = this.toRgb();
    return n === 1 ? ne(e, s, r, t) : Ht(e, s, r, n, t);
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
    const { r: e, g: s, b: r, a: n } = this.toRgb();
    return Ht(e, s, r, n, t);
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
    const { r: t, g: e, b: s, a: r } = this, { h: n, s: i, v: a } = re(t, e, s);
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
    const { r: t, g: e, b: s, a: r } = this, { h: n, s: i, l: a } = oe(t, e, s);
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
    return t = v(t * 360), e = v(e * 100), s = v(s * 100), r = v(r * 100) / 100, r === 1 ? `hsl(${t}, ${e}%, ${s}%)` : `hsla(${t}, ${e}%, ${s}%, ${r})`;
  }
  /**
   * Returns the HSLA values concatenated into a CSS4 Module format string.
   * * `hsl(150deg 100% 50%)`
   * * `hsl(150deg 100% 50% / 50%)`
   */
  toHslCSS4String() {
    let { h: t, s: e, l: s, a: r } = this.toHsl();
    t = v(t * 360), e = v(e * 100), s = v(s * 100), r = v(r * 100);
    const n = r < 100 ? ` / ${v(r)}%` : "";
    return `hsl(${t}deg ${e}% ${s}%${n})`;
  }
  /**
   * Returns the colour as an HWBA object.
   */
  toHwb() {
    const { r: t, g: e, b: s, a: r } = this, { h: n, w: i, b: a } = se(t, e, s);
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
    t = v(t * 360), e = v(e * 100), s = v(s * 100), r = v(r * 100);
    const n = r < 100 ? ` / ${v(r)}%` : "";
    return `hwb(${t}deg ${e}% ${s}%${n})`;
  }
  /**
   * Sets the alpha value of the current colour.
   */
  setAlpha(t) {
    return typeof t != "number" ? this : (this.a = Dt(t), this);
  }
  /**
   * Saturate the colour with a given amount.
   */
  saturate(t) {
    if (typeof t != "number")
      return this;
    const { h: e, s, l: r } = this.toHsl(), { r: n, g: i, b: a } = ct(e, bt(s + t / 100), r);
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
    if (typeof t != "number")
      return this;
    const { h: e, s, l: r } = this.toHsl(), { r: n, g: i, b: a } = ct(e, s, bt(r + t / 100));
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
    if (typeof t != "number")
      return this;
    const { h: e, s, l: r } = this.toHsl(), { r: n, g: i, b: a } = ct(bt((e * 360 + t) % 360 / 360), s, r);
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
class Kt {
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
      const p = (e + g * l) % 360 / 360;
      n.forEach((f) => {
        const w = new y({ h: p, s: 1, l: f });
        a.push(i < 100 ? w.saturate(i - 100) : w);
      });
    }
    this.hue = e, this.hueSteps = s, this.lightSteps = r, this.saturation = i, this.colors = a;
  }
}
const Vt = {
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
}, at = [
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
], ae = (o) => {
  if (!B(o))
    return !1;
  try {
    JSON.parse(o);
  } catch {
    return !1;
  }
  return !0;
}, Bt = "v-hidden", bo = (o) => {
  const { format: t, id: e, componentLabels: s } = o, r = x({
    tagName: "div",
    className: `color-form ${t}`
  });
  let n = ["hex"];
  return t === "rgb" ? n = ["red", "green", "blue", "alpha"] : t === "hsl" ? n = ["hue", "saturation", "lightness", "alpha"] : t === "hwb" && (n = ["hue", "whiteness", "blackness", "alpha"]), n.forEach((i) => {
    const [a] = t === "hex" ? ["#"] : fe(i).split(""), l = `color_${t}_${i}_${e}`, c = s[`${i}Label`], h = x({ tagName: "label" });
    m(h, "for", l), h.append(
      x({
        tagName: "span",
        ariaHidden: "true",
        innerText: `${a}:`
      }),
      x({
        tagName: "span",
        className: Bt,
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
}, po = (o) => {
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
  ].forEach(($) => {
    const { i: P, c: L, l: S, min: C, max: M } = $, E = x({
      tagName: "div",
      className: "color-control",
      role: "presentation"
    });
    E.append(
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
    E.append(A), g.append(E);
  }), g;
}, le = (o, t, e) => {
  const { input: s, format: r, componentLabels: n } = o, { defaultsLabel: i, presetsLabel: a } = n, l = e === "color-options", c = t instanceof Kt, h = l ? a : i, b = c ? t.colors : t, u = b.length, { lightSteps: d } = c ? t : { lightSteps: null }, g = d || [9, 10].find((A) => u >= A * 2 && !(u % A)) || 5, p = l && u > g;
  let f = 2;
  f = p && u > g * 2 ? 3 : f, f = p && u > g * 3 ? 4 : f, f = p && u > g * 4 ? 5 : f;
  const w = f - (u <= g * 3 ? 1 : 2), $ = p && u > w * g;
  let P = e;
  P += $ ? " scrollable" : "", P += p ? " multiline" : "";
  const L = p ? "1px" : "0.25rem";
  let S = p ? 1.75 : 2;
  S = g > 5 && p ? 1.5 : S;
  const C = `${w * S}rem`, M = `calc(${f} * ${S}rem + ${f - 1} * ${L})`, E = x({
    tagName: "ul",
    className: P,
    role: "listbox",
    ariaLabel: h
  });
  return $ && D(E, {
    "--grid-item-size": `${S}rem`,
    "--grid-fit": `${g}`,
    "--grid-gap": L,
    "--grid-height": C,
    "--grid-hover-height": M
  }), b.forEach((A) => {
    let [F, tt] = typeof A == "string" ? A.trim().split(":") : [];
    A instanceof y && (F = A.toHexString(), tt = F);
    const Gt = new y(A instanceof y ? A : F, r).toString() === xt(s, "value"), Pt = x({
      tagName: "li",
      className: `color-option${Gt ? " active" : ""}`,
      innerText: `${tt || F}`,
      tabIndex: 0,
      role: "option",
      ariaSelected: Gt ? "true" : "false"
    });
    m(Pt, "data-value", `${F}`), l && D(Pt, { backgroundColor: F }), E.append(Pt);
  }), E;
}, fo = (o) => {
  const { input: t, parent: e, format: s, id: r, componentLabels: n, colorKeywords: i, colorPresets: a } = o, l = xt(t, "value") || "#fff", { nonColors: c } = y, { toggleLabel: h, pickerLabel: b, formatLabel: u, hexLabel: d } = n, g = c.includes(l) ? "#fff" : l;
  o.color = new y(g, s);
  const p = s === "hex" ? d : fe(s), f = x({
    id: `picker-btn-${r}`,
    tagName: "button",
    className: "picker-toggle btn-appearance",
    ariaExpanded: "false",
    ariaHasPopup: "true"
  });
  f.append(
    x({
      tagName: "span",
      className: Bt,
      innerText: `${b}. ${u}: ${p}`
    })
  );
  const w = x({
    tagName: "div",
    className: "color-dropdown picker",
    role: "group",
    ariaLabelledBy: `picker-btn-${r}`
  }), $ = po(o), P = bo(o);
  if (w.append($, P), t.before(f), e.append(w), i || a) {
    const L = x({
      tagName: "div",
      className: "color-dropdown scrollable menu"
    });
    a && L.append(le(o, a, "color-options")), i && i.length && L.append(le(o, i, "color-defaults"));
    const S = x({
      tagName: "button",
      className: "menu-toggle btn-appearance",
      tabIndex: -1,
      ariaExpanded: "false",
      ariaHasPopup: "true"
    }), C = encodeURI("http://www.w3.org/2000/svg"), M = Tt(C, {
      tagName: "svg"
    });
    m(M, "xmlns", C), m(M, "viewBox", "0 0 512 512"), m(M, Te, "true");
    const E = Tt(C, {
      tagName: "path"
    });
    m(E, "d", "M98,158l157,156L411,158l27,27L255,368L71,185L98,158z"), m(E, "fill", "#fff"), M.append(E), S.append(
      x({
        tagName: "span",
        className: Bt,
        innerText: `${h}`
      }),
      M
    ), e.append(S, L);
  }
  i && c.includes(l) && (o.value = l), m(t, X, "-1");
}, mo = "2.0.0-alpha9", Y = "color-picker", vo = `[data-function="${Y}"]`, ce = `.${Y}`, wo = {
  componentLabels: Vt,
  colorLabels: at,
  format: "rgb",
  colorPresets: !1,
  colorKeywords: !1
}, { roundPart: k, nonColors: pt } = y, $o = (o) => to(o, Y), ko = (o) => new yo(o), he = (o, t) => {
  const e = t ? be : jt, { input: s, pickerToggle: r, menuToggle: n } = o;
  e(s, De, o.showPicker), e(r, Mt, o.togglePicker), n && e(n, Mt, o.toggleMenu);
}, Ee = (o, t) => {
  const e = t ? be : jt, { input: s, colorMenu: r, parent: n } = o, i = V(s), a = lo(i);
  e(o.controls, Ke, o.pointerDown), o.controlKnobs.forEach((l) => e(l, _t, o.handleKnobs)), e(a, je, o.handleScroll), e(a, Be, o.update), [s, ...o.inputs].forEach((l) => e(l, Re, o.changeHandler)), r && (e(r, Mt, o.menuClickHandler), e(r, _t, o.menuKeyHandler)), e(i, pe, o.pointerMove), e(i, Ve, o.pointerUp), e(n, Fe, o.handleFocusOut), e(i, Ie, o.handleDismiss);
}, ge = (o) => {
  oo(o.input, new CustomEvent("colorpicker.change"));
}, Me = (o) => {
  o && ["bottom", "top"].forEach((t) => O(o, t));
}, Nt = (o, t) => {
  const { colorPicker: e, colorMenu: s, menuToggle: r, pickerToggle: n, parent: i } = o, a = t === e, l = a ? s : e, c = a ? r : n, h = a ? n : r;
  T(i, "open") || q(i, "open"), l && (O(l, "show"), Me(l)), q(t, "bottom"), io(t), q(t, "show"), a && o.update(), o.isOpen || (Ee(o, !0), o.updateDropdownPosition(), o.isOpen = !0, m(o.input, X, "0"), r && m(r, X, "0")), m(h, Et, "true"), c && m(c, Et, "false");
};
class yo {
  // bring utils to staic
  static Color = y;
  static ColorPalette = Kt;
  static getInstance = $o;
  static init = ko;
  static selector = vo;
  // utils important for render
  static roundPart = k;
  static setElementStyle = D;
  static setAttribute = m;
  static getBoundingClientRect = ut;
  static version = mo;
  static colorNames = at;
  static colorPickerLabels = Vt;
  id;
  input;
  color;
  format = "rgb";
  parent;
  dragElement;
  isOpen = !1;
  controlPositions;
  colorLabels = Yt(at.map((t) => [t, t]));
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
    if (typeof t > "u")
      throw new TypeError("ColorPicker target not specified.");
    if (B(t) && !s)
      throw new TypeError(`ColorPicker target "${t}" cannot be found.`);
    this.input = s;
    const r = ve(s, ce);
    if (!r)
      throw new TypeError("ColorPicker requires a specific markup to work.");
    this.parent = r, this.id = me(s, Y), this.dragElement = void 0, this.isOpen = !1, this.controlPositions = {
      c1x: 0,
      c1y: 0,
      c2y: 0,
      c3y: 0
    }, this.colorKeywords = !1, this.colorPresets = !1;
    const { format: n, componentLabels: i, colorLabels: a, colorKeywords: l, colorPresets: c } = no(
      s,
      wo,
      e || {}
    );
    let h = at;
    At(a) && a.length === 17 ? h = a : B(a) && a.split(",").length === 17 && (h = a.split(",")), K(this.colorLabels, Yt(h.map((p, f) => [at[f], p])));
    const b = B(i) && ae(i) ? JSON.parse(i) : i;
    if (this.componentLabels = K({ ...Vt }, b), this.color = new y(s.value || "#fff", n), this.format = n, At(l) && l.length ? this.colorKeywords = l : B(l) && l.length && (this.colorKeywords = l.split(",").map((p) => p.trim())), At(c) && c.length)
      this.colorPresets = c;
    else if (c && ae(c)) {
      const { hue: p, hueSteps: f, lightSteps: w, saturation: $ } = JSON.parse(c);
      this.colorPresets = new Kt(p, f, w, $);
    } else
      B(c) && (this.colorPresets = c.split(",").map((p) => p.trim()));
    fo(this);
    const [u, d] = rt("color-dropdown", r);
    this.pickerToggle = _(".picker-toggle", r), this.menuToggle = _(".menu-toggle", r), this.colorPicker = u, this.colorMenu = d, this.inputs = [...rt("color-input", r)];
    const [g] = rt("color-controls", r);
    this.controls = g, this.controlKnobs = [...rt("knob", g)], this.visuals = [...rt("visual-control", g)], this.update(), he(this, !0), ht.set(s, Y, this);
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
    return this.colorKeywords instanceof Array && this.colorKeywords.some((t) => pt.includes(t));
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
    } else
      n >= 75 && n < 155 ? h = c < 68 ? t.green : t.lime : n >= 155 && n < 175 ? h = t.teal : n >= 175 && n < 195 ? h = t.cyan : n >= 195 && n < 255 ? h = t.blue : n >= 255 && n < 270 ? h = t.violet : n >= 270 && n < 295 ? h = t.magenta : n >= 295 && n < 345 && (h = t.pink);
    return h;
  }
  /** Updates `ColorPicker` visuals. */
  updateVisuals() {
    const { controlPositions: t, visuals: e } = this, [s, r, n] = e, { offsetHeight: i } = s, a = t.c2y / i, { r: l, g: c, b: h } = new y({ h: a, s: 1, l: 0.5 }).toRgb(), b = "linear-gradient(rgb(255,255,255) 0%, rgb(255,255,255) 100%)", u = 1 - t.c3y / i, d = k(u * 100) / 100, g = new y({
      h: a,
      s: 1,
      l: 0.5,
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
    this.updateDropdownPosition(), ([pe, qe].includes(t.type) && this.dragElement || e && this.controlKnobs.includes(e)) && (t.stopPropagation(), t.preventDefault());
  };
  /**
   * The `ColorPicker` keyboard event listener for menu navigation.
   *
   * @param e
   */
  menuKeyHandler = (t) => {
    const { target: e, code: s } = t, { previousElementSibling: r, nextElementSibling: n, parentElement: i } = e, a = i && T(i, "color-options"), l = i ? [...i.children] : [], c = a && Rt(i, "grid-template-columns").split(" ").length, h = l.indexOf(e), b = h > -1 && c && l[h - c], u = h > -1 && c && l[h + c];
    [j, st, Wt].includes(s) && t.preventDefault(), a ? b && s === st ? U(b) : u && s === j ? U(u) : r && s === gt ? U(r) : n && s === G && U(n) : r && [gt, st].includes(s) ? U(r) : n && [G, j].includes(s) && U(n), [ze, Wt].includes(s) && this.menuClickHandler(t);
  };
  /**
   * The `ColorPicker` click event listener for the colour menu presets / defaults.
   *
   * @param e
   * @this {ColorPicker}
   */
  menuClickHandler = (t) => {
    const { target: e } = t, { colorMenu: s } = this, r = (xt(e, "data-value") || "").trim();
    if (!r.length)
      return;
    const n = _("li.active", s);
    let i = r;
    i = pt.includes(i) ? "white" : i, i = i === "transparent" ? "rgba(0,0,0,0)" : i;
    const { r: a, g: l, b: c, a: h } = new y(i);
    K(this.color, {
      r: a,
      g: l,
      b: c,
      a: h
    }), this.update(), n !== e && (n && (O(n, "active"), Ct(n, St)), q(e, "active"), m(e, St, "true"), pt.includes(r) && (this.value = r), ge(this));
  };
  /**
   * The `ColorPicker` *touchstart* / *mousedown* events listener for control knobs.
   *
   * @param e
   */
  pointerDown = (t) => {
    if (t.button !== 0)
      return;
    const { target: e, pageX: s, pageY: r } = t, { colorMenu: n, visuals: i, controlKnobs: a } = this, [l, c, h] = i, [b, u, d] = a, g = a.includes(e) ? e.previousElementSibling : e, p = ut(g), f = Lt(l), w = s - f.scrollLeft - p.left, $ = r - f.scrollTop - p.top;
    if (e === l || e === b ? (this.dragElement = g, this.changeControl1(w, $)) : e === c || e === u ? (this.dragElement = g, this.changeControl2($)) : (e === h || e === d) && (this.dragElement = g, this.changeAlpha($)), n) {
      const P = _("li.active", n);
      P && (O(P, "active"), Ct(P, St));
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
    const { parent: e } = this, s = V(e), r = _(`${ce}.open`, s) !== null, n = s.getSelection();
    !this.dragElement && (!n || !n.toString().length) && !e.contains(t) && this.hide(r), this.dragElement = void 0;
  };
  /**
   * The `ColorPicker` *touchmove* / *mousemove* events listener for control knobs.
   *
   * @param {PointerEvent} e
   */
  pointerMove = (t) => {
    const { dragElement: e, visuals: s } = this, [r, n, i] = s, { pageX: a, pageY: l } = t;
    if (!e)
      return;
    const c = ut(e), h = Lt(r), b = a - h.scrollLeft - c.left, u = l - h.scrollTop - c.top;
    e === r && this.changeControl1(b, u), e === n && this.changeControl2(u), e === i && this.changeAlpha(u);
  };
  /**
   * The `ColorPicker` *keydown* event listener for control knobs.
   *
   * @param e
   */
  handleKnobs = (t) => {
    const { target: e, code: s } = t;
    if (![st, j, gt, G].includes(s))
      return;
    t.preventDefault();
    const { controlKnobs: r, visuals: n } = this, { offsetWidth: i, offsetHeight: a } = n[0], [l, c, h] = r, { activeElement: b } = V(l), u = r.find((g) => g === b), d = a / 360;
    if (u) {
      let g = 0, p = 0;
      if (e === l) {
        const f = i / 100;
        [gt, G].includes(s) ? this.controlPositions.c1x += s === G ? f : -f : [st, j].includes(s) && (this.controlPositions.c1y += s === j ? d : -d), g = this.controlPositions.c1x, p = this.controlPositions.c1y, this.changeControl1(g, p);
      } else
        e === c ? (this.controlPositions.c2y += [j, G].includes(s) ? d : -d, p = this.controlPositions.c2y, this.changeControl2(p)) : e === h && (this.controlPositions.c3y += [j, G].includes(s) ? d : -d, p = this.controlPositions.c3y, this.changeAlpha(p));
      this.handleScroll(t);
    }
  };
  /** The event listener of the colour form inputs. */
  changeHandler = () => {
    let t;
    const { inputs: e, format: s, value: r, input: n, controlPositions: i, visuals: a } = this, { activeElement: l } = V(n), { offsetHeight: c } = a[0], [h, , , b] = e, [u, d, g, p] = s === "rgb" ? e.map(($) => parseFloat($.value) / ($ === b ? 100 : 1)) : e.map(($) => parseFloat($.value) / ($ !== h ? 100 : 360)), f = this.hasNonColor && pt.includes(r), w = b ? p : 1 - i.c3y / c;
    if (l === n || l && e.includes(l)) {
      l === n ? f ? t = r === "transparent" ? "rgba(0,0,0,0)" : "rgb(0,0,0)" : t = r : s === "hex" ? t = h.value : s === "hsl" ? t = {
        h: u,
        s: d,
        l: g,
        a: w
      } : s === "hwb" ? t = {
        h: u,
        w: d,
        b: g,
        a: w
      } : t = {
        r: u,
        g: d,
        b: g,
        a: w
      };
      const { r: $, g: P, b: L, a: S } = new y(t);
      K(this.color, {
        r: $,
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
      h: c,
      s: h,
      v: b,
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
      h: a,
      s: l,
      v: c,
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
    const { input: t, colorPicker: e, colorMenu: s } = this, r = ut(t), { top: n, bottom: i } = r, { offsetHeight: a } = t, l = Lt(t).clientHeight, h = T(e, "show") ? e : s;
    if (!h)
      return;
    const { offsetHeight: b } = h, u = l - i, d = n, g = n + b + a > l, p = n - b < 0;
    (T(h, "bottom") || !p) && u < d && g ? (O(h, "bottom"), q(h, "top")) : (O(h, "top"), q(h, "bottom"));
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
    const [g, p, f] = a, w = k(r.h * 360), $ = e.a, P = k(r.s * 100), L = k(r.v * 100), S = this.appearance;
    let C = `${c} ${n.split("").join(" ")}`;
    if (i === "hwb") {
      const { hwb: A } = this, F = k(A.w * 100), tt = k(A.b * 100);
      C = `HWB: ${w}°, ${F}%, ${tt}%`, m(g, ot, `${F}% & ${tt}%`), m(g, et, `${F}`), m(p, Ut, `${h}: ${C}. ${l}: ${S}.`), m(p, ot, `${w}%`), m(p, et, `${w}`);
    } else
      [b, u, d] = [b, u, d].map(k), C = i === "hsl" ? `HSL: ${w}°, ${P}%, ${L}%` : C, C = i === "rgb" ? `RGB: ${b}, ${u}, ${d}` : C, m(g, ot, `${L}% & ${P}%`), m(g, et, `${L}`), m(p, Ut, `${h}: ${C}. ${l}: ${S}.`), m(p, ot, `${w}°`), m(p, et, `${w}`);
    const M = k($ * 100);
    m(f, ot, `${M}%`), m(f, et, `${M}`);
    const E = e.toString();
    D(this.input, { backgroundColor: E }), this.isDark ? (T(s, "txt-light") && O(s, "txt-light"), T(s, "txt-dark") || q(s, "txt-dark")) : (T(s, "txt-dark") && O(s, "txt-dark"), T(s, "txt-light") || q(s, "txt-light"));
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
      const { w: g, b: p } = this.hwb, f = k(g * 100), w = k(p * 100);
      d = this.color.toHwbString(), a.value = `${u}`, l.value = `${f}`, c.value = `${w}`, h.value = `${b}`;
    } else if (s === "rgb") {
      let { r: g, g: p, b: f } = this.rgb;
      [g, p, f] = [g, p, f].map(k), d = this.color.toRgbString(), a.value = `${g}`, l.value = `${p}`, c.value = `${f}`, h.value = `${b}`;
    }
    this.value = d, !t && d !== e && ge(this);
  }
  /**
   * Toggle the `ColorPicker` dropdown visibility.
   *
   * @param e
   */
  togglePicker = (t) => {
    t && t.preventDefault();
    const { colorPicker: e } = this;
    this.isOpen && T(e, "show") ? this.hide(!0) : Nt(this, e);
  };
  /** Shows the `ColorPicker` dropdown. */
  showPicker = () => {
    const { colorPicker: t } = this;
    ["top", "bottom"].some((e) => T(t, e)) || Nt(this, t);
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
    this.isOpen && T(e, "show") ? this.hide(!0) : Nt(this, e);
  };
  /**
   * Hides the currently open `ColorPicker` dropdown.
   *
   * @param {boolean=} focusPrevented
   */
  hide(t) {
    if (this.isOpen) {
      const { pickerToggle: e, menuToggle: s, colorPicker: r, colorMenu: n, parent: i, input: a } = this, l = T(r, "show"), c = l ? r : n, h = l ? e : s, b = c && so(c);
      this.value = this.color.toString(!0), c && (O(c, "show"), m(h, Et, "false"), setTimeout(() => {
        Me(c), _(".show", i) || (O(i, "open"), Ee(this), this.isOpen = !1);
      }, b)), t || U(e), m(a, X, "-1"), h === s && m(s, X, "-1");
    }
  }
  /** Removes `ColorPicker` from target `<input>`. */
  dispose() {
    const { input: t, parent: e } = this;
    this.hide(!0), he(this), [...e.children].forEach((s) => {
      s !== t && s.remove();
    }), Ct(t, X), D(t, { backgroundColor: "" }), ["txt-light", "txt-dark"].forEach((s) => O(e, s)), ht.remove(t, Y);
  }
}
export {
  yo as default
};
//# sourceMappingURL=color-picker.mjs.map
