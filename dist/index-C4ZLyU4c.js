import { openBlock as E, createElementBlock as L, createElementVNode as Z, renderSlot as x, h as pe, mergeProps as X, createCommentVNode as be, createApp as ee } from "vue";
const fe = (s, e, t) => {
  for (const n of t)
    (s.$googleMapsOptions.autobindAllEvents || s.$attrs[n]) && e.addListener(n, (r) => {
      s.$emit(n, r);
    });
};
function me(s, e, t, n = !1) {
  let r = !1;
  function o() {
    r || (r = !0, s.$nextTick(() => {
      r = !1, t();
    }));
  }
  for (const a of e)
    s.$watch(a, o, { immediate: n });
}
function te(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function B(s, e) {
  return Object.keys(e).reduce((t, n) => (s[n] !== void 0 && (t[n] = s[n]), t), {});
}
function V(s, e, t) {
  for (const n in t) {
    const { twoWay: r, type: o, trackProperties: a, noBind: c } = t[n];
    if (c)
      continue;
    const i = `set${te(n)}`, h = `get${te(n)}`, d = `${n.toLowerCase()}_changed`, l = s[n];
    if (typeof e[i] > "u")
      throw new Error(`${i} is not a method of (the Maps object corresponding to) ${s.$options._componentTag}`);
    o !== Object || !a ? s.$watch(
      n,
      () => {
        const u = s[n];
        e[i](u);
      },
      {
        immediate: typeof l < "u",
        deep: o === Object
      }
    ) : me(
      s,
      a.map((u) => `${n}.${u}`),
      () => {
        e[i](s[n]);
      },
      s[n] !== void 0
    ), r && (s.$googleMapsOptions.autoBindAllEvents || s.$attrs[d]) && e.addListener(d, () => {
      s.$emit(d, e[h]());
    });
  }
}
function q(s) {
  return Object.entries(s).map(([e, t]) => {
    const n = {};
    return "type" in t && (n.type = t.type), "default" in t && (n.default = t.default), "required" in t && (n.required = t.required), [e, n];
  }).reduce((e, [t, n]) => (e[t] = n, e), {});
}
const Me = {
  inject: {
    $mapPromise: { default: "abcdef" }
  },
  provide() {
    return this.$mapPromise.then((s) => {
      this.$map = s;
    }), {};
  }
};
function ke(s, e) {
  if (!s)
    throw new Error(e);
}
function z(s) {
  const { mappedProps: e, name: t, ctr: n, ctrArgs: r, emits: o, events: a, beforeCreate: c, afterCreate: i, props: h, ...d } = s, l = `$${t}Promise`, u = `$${t}Object`;
  return ke(!(d.props instanceof Array), "`props` should be an object, not Array"), {
    // ...(typeof GENERATE_DOC !== 'undefined' ? { $vgmOptions: options } : {}),
    mixins: [Me],
    emits: o ?? [],
    props: {
      ...h,
      ...q(e)
    },
    render() {
      return "";
    },
    provide() {
      const p = this.$mapPromise.then((f) => {
        this.$map = f;
        const m = {
          ...this.options,
          map: f,
          ...B(this, e)
        }, { options: g, ...y } = m;
        if (c) {
          const w = c.bind(this)(y);
          if (w instanceof Promise)
            return w.then(() => ({ options: y }));
        }
        return { options: y };
      }).then(({ options: f }) => {
        const m = n();
        return this[u] = r ? new (Function.prototype.bind.call(m, null, ...r(f, B(this, h || {}))))() : new m(f), V(this, this[u], e), fe(this, this[u], a), i && i.bind(this)(this[u]), this[u];
      });
      return this[l] = p, { [l]: p };
    },
    destroyed() {
      var p;
      (p = this[u]) != null && p.setMap && this[u].setMap(null);
    },
    ...d
  };
}
const K = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [n, r] of e)
    t[n] = r;
  return t;
}, Oe = {
  options: {
    type: Object,
    required: !1,
    default: () => ({})
  },
  position: {
    type: Object,
    twoWay: !0
  },
  zIndex: {
    type: Number,
    twoWay: !0
  }
}, se = ["domready", "click", "closeclick", "content_changed", "position_changed", "click-outside"], ve = z({
  name: "InfoWindow",
  mappedProps: Oe,
  events: se,
  emits: [...se],
  ctr: () => typeof window < "u" && window.google.maps.InfoWindow,
  props: {
    opened: {
      type: Boolean,
      default: !0
    }
  },
  mounted() {
    if (typeof window < "u") {
      const s = this.$refs.flyaway;
      s.parentNode.removeChild(s), window.addEventListener("click", this.listener);
    }
  },
  beforeCreate(s) {
    s.content = this.$refs.flyaway;
  },
  beforeUnmount() {
    typeof window < "u" && window.removeEventListener("click", this.listener);
  },
  methods: {
    _openInfoWindow() {
      this.opened ? this.$InfoWindowObject.open(this.$map) : this.$InfoWindowObject.close();
    },
    listener(s) {
      this.$InfoWindowObject.content.contains(s.target) || this.$emit("click-outside", s);
    }
  },
  afterCreate() {
    this._openInfoWindow(), this.$watch("opened", () => {
      this._openInfoWindow();
    });
  }
}), Ce = { ref: "flyaway" };
function Ae(s, e, t, n, r, o) {
  return E(), L("div", null, [
    Z("div", Ce, [
      x(s.$slots, "default")
    ], 512)
  ]);
}
const Pe = /* @__PURE__ */ K(ve, [["render", Ae]]), je = {
  props: ["resizeBus"],
  data() {
    return {
      _actualResizeBus: null
    };
  },
  created() {
    typeof this.resizeBus > "u" ? this.$data._actualResizeBus = this.$googleMapsDefaultResizeBus : this.$data._actualResizeBus = this.resizeBus;
  },
  methods: {
    _resizeCallback() {
      this.resize();
    },
    _delayedResizeCallback() {
      this.$nextTick(() => this._resizeCallback());
    }
  },
  watch: {
    resizeBus(s) {
      this.$data._actualResizeBus = s;
    },
    "$data._actualResizeBus": function(e, t) {
    }
  },
  destroyed() {
    this.$data._actualResizeBus && this.$data._actualResizeBus.$off("resize", this._delayedResizeCallback);
  }
};
function Ee(s) {
  let e = 0;
  s(
    () => {
      e += 1;
    },
    () => {
      e = Math.max(0, e - 1);
    },
    () => e === 0
  );
}
const R = {
  center: {
    type: Object,
    required: !0,
    twoWay: !0,
    noBind: !0
  },
  zoom: {
    type: Number,
    required: !1,
    twoWay: !0,
    noBind: !0
  },
  heading: {
    type: Number,
    twoWay: !0
  },
  mapTypeId: {
    type: String,
    twoWay: !0
  },
  tilt: {
    type: Number,
    twoWay: !0
  },
  options: {
    type: Object,
    default: () => ({})
  }
}, ne = [
  "bounds_changed",
  "click",
  "dblclick",
  "drag",
  "dragend",
  "dragstart",
  "idle",
  "mousemove",
  "mouseout",
  "mouseover",
  "resize",
  "rightclick",
  "tilesloaded",
  "renderingtype_changed"
], Le = ["panBy", "panTo", "panToBounds", "fitBounds"].reduce((s, e) => (s[e] = (...t) => {
  (void 0).$mapObject && (void 0).$mapObject[e].apply((void 0).$mapObject, t);
}, s), {}), xe = {
  resize() {
    typeof window < "u" && this.$mapObject && window.google.maps.event.trigger(this.$mapObject, "resize");
  },
  resizePreserveCenter() {
    if (typeof window > "u" || !this.$mapObject)
      return;
    const s = this.$mapObject.getCenter();
    window.google.maps.event.trigger(this.$mapObject, "resize"), this.$mapObject.setCenter(s);
  },
  /// Override mountableMixin::_resizeCallback
  /// because resizePreserveCenter is usually the
  /// expected behaviour
  _resizeCallback() {
    this.resizePreserveCenter();
  }
}, re = "__gmc__", Be = {
  name: "MapComponent",
  emits: [
    ...ne,
    "center_changed",
    "contextmenu",
    "heading_changed",
    "isfractionalzoomenabled_changed",
    "maptypeid_changed",
    "projection_changed",
    "renderingtype_changed",
    "tilesloaded",
    "tilt_changed",
    "zoom_changed",
    "animation_changed"
  ],
  mixins: [je],
  props: q(R),
  provide() {
    return this.$mapPromise = new Promise((s, e) => {
      this.$mapPromiseDeferred = { resolve: s, reject: e };
    }), {
      $mapPromise: this.$mapPromise
    };
  },
  computed: {
    finalLat() {
      return this.center && typeof this.center.lat == "function" ? this.center.lat() : this.center.lat;
    },
    finalLng() {
      return this.center && typeof this.center.lng == "function" ? this.center.lng() : this.center.lng;
    },
    finalLatLng() {
      return { lat: this.finalLat, lng: this.finalLng };
    }
  },
  watch: {
    zoom(s) {
      this.$mapObject && this.$mapObject.setZoom(s);
    }
  },
  beforeUnmount() {
    const s = this.getRecycleKey();
    typeof window < "u" && window[s] && this.$mapObject && (window[s].div = this.$mapObject.getDiv());
  },
  async mounted() {
    await this.$googleMapsApiPromiseLazy();
    const s = this.$refs["vue-map"], e = {
      ...this.options,
      ...B(this, R)
    }, { options: t, ...n } = e, r = this.getRecycleKey();
    return this.options.recycle && window[r] ? (s.appendChild(window[r].div), this.$mapObject = window[r].map, this.$mapObject.setOptions(n)) : (this.$mapObject = new window.google.maps.Map(s, n), window[r] = { map: this.$mapObject }), V(this, this.$mapObject, R), fe(this, this.$mapObject, ne), Ee((o, a, c) => {
      this.$mapObject.addListener("center_changed", () => {
        c() && this.$emit("center_changed", this.$mapObject.getCenter()), a();
      }), me(this, ["finalLat", "finalLng"], () => {
        o(), this.$mapObject.setCenter(this.finalLatLng);
      });
    }), this.$mapObject.addListener("zoom_changed", () => {
      this.$emit("zoom_changed", this.$mapObject.getZoom());
    }), this.$mapObject.addListener("bounds_changed", () => {
      this.$emit("bounds_changed", this.$mapObject.getBounds());
    }), this.$mapPromiseDeferred.resolve(this.$mapObject), this.$mapObject;
  },
  methods: {
    ...xe,
    ...Le,
    getRecycleKey() {
      return this.options.recycle ? re + this.options.recycle : re;
    }
  }
}, ze = { class: "vue-map-container" }, Se = {
  ref: "vue-map",
  class: "vue-map"
}, Re = { class: "vue-map-hidden" };
function Te(s, e, t, n, r, o) {
  return E(), L("div", ze, [
    Z("div", Se, null, 512),
    Z("div", Re, [
      x(s.$slots, "default")
    ]),
    x(s.$slots, "visible")
  ]);
}
const Ie = /* @__PURE__ */ K(Be, [["render", Te]]), Ne = {
  draggable: {
    type: Boolean
  },
  editable: {
    type: Boolean
  },
  options: {
    type: Object
  },
  path: {
    type: Array,
    twoWay: !0,
    noBind: !0
  },
  paths: {
    type: Array,
    twoWay: !0,
    noBind: !0
  }
}, oe = ["click", "dblclick", "drag", "dragend", "dragstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], We = z({
  name: "Polygon",
  props: {
    deepWatch: {
      type: Boolean,
      default: !1
    }
  },
  events: oe,
  emits: [...oe, "paths_changed", "path_changed"],
  mappedProps: Ne,
  ctr: () => typeof window < "u" && window.google.maps.Polygon,
  beforeCreate(s) {
    s.path || delete s.path, s.paths || delete s.paths;
  },
  afterCreate(s) {
    let e = () => {
    };
    this.$watch(
      "paths",
      (t) => {
        if (t) {
          e(), s.setPaths(t);
          const n = () => {
            this.$emit("paths_changed", s.getPaths());
          }, r = [], o = s.getPaths();
          for (let a = 0; a < o.getLength(); a += 1) {
            const c = o.getAt(a);
            r.push([c, c.addListener("insert_at", n)]), r.push([c, c.addListener("remove_at", n)]), r.push([c, c.addListener("set_at", n)]);
          }
          r.push([o, o.addListener("insert_at", n)]), r.push([o, o.addListener("remove_at", n)]), r.push([o, o.addListener("set_at", n)]), e = () => {
            r.forEach(
              ([a, c]) => window.google.maps.event.removeListener(c)
            );
          };
        }
      },
      {
        deep: this.deepWatch,
        immediate: !0
      }
    ), this.$watch(
      "path",
      (t) => {
        if (t) {
          e(), s.setPaths(t);
          const n = s.getPath(), r = [], o = () => {
            this.$emit("path_changed", s.getPath());
          };
          r.push([n, n.addListener("insert_at", o)]), r.push([n, n.addListener("remove_at", o)]), r.push([n, n.addListener("set_at", o)]), e = () => {
            r.forEach(
              ([a, c]) => window.google.maps.event.removeListener(c)
            );
          };
        }
      },
      {
        deep: this.deepWatch,
        immediate: !0
      }
    );
  }
}), Ue = {
  animation: {
    twoWay: !0,
    type: Number
  },
  attribution: {
    type: Object
  },
  clickable: {
    type: Boolean,
    twoWay: !0,
    default: !0
  },
  cursor: {
    type: String,
    twoWay: !0
  },
  draggable: {
    type: Boolean,
    twoWay: !0,
    default: !1
  },
  icon: {
    twoWay: !0
  },
  label: {},
  opacity: {
    type: Number,
    default: 1
  },
  options: {
    type: Object
  },
  place: {
    type: Object
  },
  position: {
    type: Object,
    twoWay: !0
  },
  shape: {
    type: Object,
    twoWay: !0
  },
  title: {
    type: String,
    twoWay: !0
  },
  zIndex: {
    type: Number,
    twoWay: !0
  },
  visible: {
    twoWay: !0,
    default: !0
  }
}, ie = ["click", "rightclick", "dblclick", "drag", "dragstart", "dragend", "mouseup", "mousedown", "mouseover", "mouseout"], Ze = z({
  name: "Marker",
  mappedProps: Ue,
  emits: [
    ...ie,
    "position_changed",
    "animation_changed",
    "clickable_changed",
    "contextmenu",
    "cursor_changed",
    "draggable_changed",
    "flat_changed",
    "icon_changed",
    "shape_changed",
    "title_changed",
    "visible_changed",
    "zindex_changed"
  ],
  events: ie,
  ctr: () => typeof window < "u" && window.google.maps.Marker,
  inject: {
    $MarkerClusterPromise: {
      default: null
    }
  },
  render() {
    return !this.$slots.default || this.$slots.default().length === 0 ? "" : this.$slots.default().length === 1 ? this.$slots.default()[0] : pe("div", null, { default: () => this.$slots.default() });
  },
  destroyed() {
    this.$MarkerObject && (this.$MarkerClusterObject ? this.$MarkerClusterObject.removeMarker(this.$MarkerObject, !0) : this.$MarkerObject.setMap(null));
  },
  beforeCreate(s) {
    return this.$MarkerClusterPromise && (s.map = null), this.$MarkerClusterPromise;
  },
  afterCreate(s) {
    this.$MarkerClusterPromise && this.$MarkerClusterPromise.then((e) => {
      e.addMarker(s), this.$MarkerClusterObject = e;
    });
  }
});
function De(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Fe = function s(e, t) {
  if (e === t)
    return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor)
      return !1;
    var n, r, o;
    if (Array.isArray(e)) {
      if (n = e.length, n != t.length)
        return !1;
      for (r = n; r-- !== 0; )
        if (!s(e[r], t[r]))
          return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === t.toString();
    if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, o[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      var a = o[r];
      if (!s(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
};
const ae = /* @__PURE__ */ De(Fe), ce = [
  Int8Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array
], T = 1, v = 8;
class H {
  /**
   * Creates an index from raw `ArrayBuffer` data.
   * @param {ArrayBuffer} data
   */
  static from(e) {
    if (!(e instanceof ArrayBuffer))
      throw new Error("Data must be an instance of ArrayBuffer.");
    const [t, n] = new Uint8Array(e, 0, 2);
    if (t !== 219)
      throw new Error("Data does not appear to be in a KDBush format.");
    const r = n >> 4;
    if (r !== T)
      throw new Error(`Got v${r} data when expected v${T}.`);
    const o = ce[n & 15];
    if (!o)
      throw new Error("Unrecognized array type.");
    const [a] = new Uint16Array(e, 2, 1), [c] = new Uint32Array(e, 4, 1);
    return new H(c, a, o, e);
  }
  /**
   * Creates an index that will hold a given number of items.
   * @param {number} numItems
   * @param {number} [nodeSize=64] Size of the KD-tree node (64 by default).
   * @param {TypedArrayConstructor} [ArrayType=Float64Array] The array type used for coordinates storage (`Float64Array` by default).
   * @param {ArrayBuffer} [data] (For internal use only)
   */
  constructor(e, t = 64, n = Float64Array, r) {
    if (isNaN(e) || e < 0)
      throw new Error(`Unpexpected numItems value: ${e}.`);
    this.numItems = +e, this.nodeSize = Math.min(Math.max(+t, 2), 65535), this.ArrayType = n, this.IndexArrayType = e < 65536 ? Uint16Array : Uint32Array;
    const o = ce.indexOf(this.ArrayType), a = e * 2 * this.ArrayType.BYTES_PER_ELEMENT, c = e * this.IndexArrayType.BYTES_PER_ELEMENT, i = (8 - c % 8) % 8;
    if (o < 0)
      throw new Error(`Unexpected typed array class: ${n}.`);
    r && r instanceof ArrayBuffer ? (this.data = r, this.ids = new this.IndexArrayType(this.data, v, e), this.coords = new this.ArrayType(this.data, v + c + i, e * 2), this._pos = e * 2, this._finished = !0) : (this.data = new ArrayBuffer(v + a + c + i), this.ids = new this.IndexArrayType(this.data, v, e), this.coords = new this.ArrayType(this.data, v + c + i, e * 2), this._pos = 0, this._finished = !1, new Uint8Array(this.data, 0, 2).set([219, (T << 4) + o]), new Uint16Array(this.data, 2, 1)[0] = t, new Uint32Array(this.data, 4, 1)[0] = e);
  }
  /**
   * Add a point to the index.
   * @param {number} x
   * @param {number} y
   * @returns {number} An incremental index associated with the added item (starting from `0`).
   */
  add(e, t) {
    const n = this._pos >> 1;
    return this.ids[n] = n, this.coords[this._pos++] = e, this.coords[this._pos++] = t, n;
  }
  /**
   * Perform indexing of the added points.
   */
  finish() {
    const e = this._pos >> 1;
    if (e !== this.numItems)
      throw new Error(`Added ${e} items when expected ${this.numItems}.`);
    return D(this.ids, this.coords, this.nodeSize, 0, this.numItems - 1, 0), this._finished = !0, this;
  }
  /**
   * Search the index for items within a given bounding box.
   * @param {number} minX
   * @param {number} minY
   * @param {number} maxX
   * @param {number} maxY
   * @returns {number[]} An array of indices correponding to the found items.
   */
  range(e, t, n, r) {
    if (!this._finished)
      throw new Error("Data not yet indexed - call index.finish().");
    const { ids: o, coords: a, nodeSize: c } = this, i = [0, o.length - 1, 0], h = [];
    for (; i.length; ) {
      const d = i.pop() || 0, l = i.pop() || 0, u = i.pop() || 0;
      if (l - u <= c) {
        for (let g = u; g <= l; g++) {
          const y = a[2 * g], w = a[2 * g + 1];
          y >= e && y <= n && w >= t && w <= r && h.push(o[g]);
        }
        continue;
      }
      const p = u + l >> 1, f = a[2 * p], m = a[2 * p + 1];
      f >= e && f <= n && m >= t && m <= r && h.push(o[p]), (d === 0 ? e <= f : t <= m) && (i.push(u), i.push(p - 1), i.push(1 - d)), (d === 0 ? n >= f : r >= m) && (i.push(p + 1), i.push(l), i.push(1 - d));
    }
    return h;
  }
  /**
   * Search the index for items within a given radius.
   * @param {number} qx
   * @param {number} qy
   * @param {number} r Query radius.
   * @returns {number[]} An array of indices correponding to the found items.
   */
  within(e, t, n) {
    if (!this._finished)
      throw new Error("Data not yet indexed - call index.finish().");
    const { ids: r, coords: o, nodeSize: a } = this, c = [0, r.length - 1, 0], i = [], h = n * n;
    for (; c.length; ) {
      const d = c.pop() || 0, l = c.pop() || 0, u = c.pop() || 0;
      if (l - u <= a) {
        for (let g = u; g <= l; g++)
          le(o[2 * g], o[2 * g + 1], e, t) <= h && i.push(r[g]);
        continue;
      }
      const p = u + l >> 1, f = o[2 * p], m = o[2 * p + 1];
      le(f, m, e, t) <= h && i.push(r[p]), (d === 0 ? e - n <= f : t - n <= m) && (c.push(u), c.push(p - 1), c.push(1 - d)), (d === 0 ? e + n >= f : t + n >= m) && (c.push(p + 1), c.push(l), c.push(1 - d));
    }
    return i;
  }
}
function D(s, e, t, n, r, o) {
  if (r - n <= t)
    return;
  const a = n + r >> 1;
  ge(s, e, a, n, r, o), D(s, e, t, n, a - 1, 1 - o), D(s, e, t, a + 1, r, 1 - o);
}
function ge(s, e, t, n, r, o) {
  for (; r > n; ) {
    if (r - n > 600) {
      const h = r - n + 1, d = t - n + 1, l = Math.log(h), u = 0.5 * Math.exp(2 * l / 3), p = 0.5 * Math.sqrt(l * u * (h - u) / h) * (d - h / 2 < 0 ? -1 : 1), f = Math.max(n, Math.floor(t - d * u / h + p)), m = Math.min(r, Math.floor(t + (h - d) * u / h + p));
      ge(s, e, t, f, m, o);
    }
    const a = e[2 * t + o];
    let c = n, i = r;
    for (C(s, e, n, t), e[2 * r + o] > a && C(s, e, n, r); c < i; ) {
      for (C(s, e, c, i), c++, i--; e[2 * c + o] < a; )
        c++;
      for (; e[2 * i + o] > a; )
        i--;
    }
    e[2 * n + o] === a ? C(s, e, n, i) : (i++, C(s, e, i, r)), i <= t && (n = i + 1), t <= i && (r = i - 1);
  }
}
function C(s, e, t, n) {
  I(s, t, n), I(e, 2 * t, 2 * n), I(e, 2 * t + 1, 2 * n + 1);
}
function I(s, e, t) {
  const n = s[e];
  s[e] = s[t], s[t] = n;
}
function le(s, e, t, n) {
  const r = s - t, o = e - n;
  return r * r + o * o;
}
const Ge = {
  minZoom: 0,
  // min zoom to generate clusters on
  maxZoom: 16,
  // max zoom level to cluster the points on
  minPoints: 2,
  // minimum points to form a cluster
  radius: 40,
  // cluster radius in pixels
  extent: 512,
  // tile extent (radius is calculated relative to it)
  nodeSize: 64,
  // size of the KD-tree leaf node, affects performance
  log: !1,
  // whether to log timing info
  // whether to generate numeric ids for input features (in vector tiles)
  generateId: !1,
  // a reduce function for calculating custom cluster properties
  reduce: null,
  // (accumulated, props) => { accumulated.sum += props.sum; }
  // properties to use for individual points when running the reducer
  map: (s) => s
  // props => ({sum: props.my_value})
}, he = Math.fround || /* @__PURE__ */ ((s) => (e) => (s[0] = +e, s[0]))(new Float32Array(1)), O = 2, M = 3, N = 4, b = 5, ye = 6;
class Ve {
  constructor(e) {
    this.options = Object.assign(Object.create(Ge), e), this.trees = new Array(this.options.maxZoom + 1), this.stride = this.options.reduce ? 7 : 6, this.clusterProps = [];
  }
  load(e) {
    const { log: t, minZoom: n, maxZoom: r } = this.options;
    t && console.time("total time");
    const o = `prepare ${e.length} points`;
    t && console.time(o), this.points = e;
    const a = [];
    for (let i = 0; i < e.length; i++) {
      const h = e[i];
      if (!h.geometry)
        continue;
      const [d, l] = h.geometry.coordinates, u = he(P(d)), p = he(j(l));
      a.push(
        u,
        p,
        // projected point coordinates
        1 / 0,
        // the last zoom the point was processed at
        i,
        // index of the source feature in the original input array
        -1,
        // parent cluster id
        1
        // number of points in a cluster
      ), this.options.reduce && a.push(0);
    }
    let c = this.trees[r + 1] = this._createTree(a);
    t && console.timeEnd(o);
    for (let i = r; i >= n; i--) {
      const h = +Date.now();
      c = this.trees[i] = this._createTree(this._cluster(c, i)), t && console.log("z%d: %d clusters in %dms", i, c.numItems, +Date.now() - h);
    }
    return t && console.timeEnd("total time"), this;
  }
  getClusters(e, t) {
    let n = ((e[0] + 180) % 360 + 360) % 360 - 180;
    const r = Math.max(-90, Math.min(90, e[1]));
    let o = e[2] === 180 ? 180 : ((e[2] + 180) % 360 + 360) % 360 - 180;
    const a = Math.max(-90, Math.min(90, e[3]));
    if (e[2] - e[0] >= 360)
      n = -180, o = 180;
    else if (n > o) {
      const l = this.getClusters([n, r, 180, a], t), u = this.getClusters([-180, r, o, a], t);
      return l.concat(u);
    }
    const c = this.trees[this._limitZoom(t)], i = c.range(P(n), j(a), P(o), j(r)), h = c.data, d = [];
    for (const l of i) {
      const u = this.stride * l;
      d.push(h[u + b] > 1 ? de(h, u, this.clusterProps) : this.points[h[u + M]]);
    }
    return d;
  }
  getChildren(e) {
    const t = this._getOriginId(e), n = this._getOriginZoom(e), r = "No cluster with the specified id.", o = this.trees[n];
    if (!o)
      throw new Error(r);
    const a = o.data;
    if (t * this.stride >= a.length)
      throw new Error(r);
    const c = this.options.radius / (this.options.extent * Math.pow(2, n - 1)), i = a[t * this.stride], h = a[t * this.stride + 1], d = o.within(i, h, c), l = [];
    for (const u of d) {
      const p = u * this.stride;
      a[p + N] === e && l.push(a[p + b] > 1 ? de(a, p, this.clusterProps) : this.points[a[p + M]]);
    }
    if (l.length === 0)
      throw new Error(r);
    return l;
  }
  getLeaves(e, t, n) {
    t = t || 10, n = n || 0;
    const r = [];
    return this._appendLeaves(r, e, t, n, 0), r;
  }
  getTile(e, t, n) {
    const r = this.trees[this._limitZoom(e)], o = Math.pow(2, e), { extent: a, radius: c } = this.options, i = c / a, h = (n - i) / o, d = (n + 1 + i) / o, l = {
      features: []
    };
    return this._addTileFeatures(
      r.range((t - i) / o, h, (t + 1 + i) / o, d),
      r.data,
      t,
      n,
      o,
      l
    ), t === 0 && this._addTileFeatures(
      r.range(1 - i / o, h, 1, d),
      r.data,
      o,
      n,
      o,
      l
    ), t === o - 1 && this._addTileFeatures(
      r.range(0, h, i / o, d),
      r.data,
      -1,
      n,
      o,
      l
    ), l.features.length ? l : null;
  }
  getClusterExpansionZoom(e) {
    let t = this._getOriginZoom(e) - 1;
    for (; t <= this.options.maxZoom; ) {
      const n = this.getChildren(e);
      if (t++, n.length !== 1)
        break;
      e = n[0].properties.cluster_id;
    }
    return t;
  }
  _appendLeaves(e, t, n, r, o) {
    const a = this.getChildren(t);
    for (const c of a) {
      const i = c.properties;
      if (i && i.cluster ? o + i.point_count <= r ? o += i.point_count : o = this._appendLeaves(e, i.cluster_id, n, r, o) : o < r ? o++ : e.push(c), e.length === n)
        break;
    }
    return o;
  }
  _createTree(e) {
    const t = new H(e.length / this.stride | 0, this.options.nodeSize, Float32Array);
    for (let n = 0; n < e.length; n += this.stride)
      t.add(e[n], e[n + 1]);
    return t.finish(), t.data = e, t;
  }
  _addTileFeatures(e, t, n, r, o, a) {
    for (const c of e) {
      const i = c * this.stride, h = t[i + b] > 1;
      let d, l, u;
      if (h)
        d = we(t, i, this.clusterProps), l = t[i], u = t[i + 1];
      else {
        const m = this.points[t[i + M]];
        d = m.properties;
        const [g, y] = m.geometry.coordinates;
        l = P(g), u = j(y);
      }
      const p = {
        type: 1,
        geometry: [[
          Math.round(this.options.extent * (l * o - n)),
          Math.round(this.options.extent * (u * o - r))
        ]],
        tags: d
      };
      let f;
      h || this.options.generateId ? f = t[i + M] : f = this.points[t[i + M]].id, f !== void 0 && (p.id = f), a.features.push(p);
    }
  }
  _limitZoom(e) {
    return Math.max(this.options.minZoom, Math.min(Math.floor(+e), this.options.maxZoom + 1));
  }
  _cluster(e, t) {
    const { radius: n, extent: r, reduce: o, minPoints: a } = this.options, c = n / (r * Math.pow(2, t)), i = e.data, h = [], d = this.stride;
    for (let l = 0; l < i.length; l += d) {
      if (i[l + O] <= t)
        continue;
      i[l + O] = t;
      const u = i[l], p = i[l + 1], f = e.within(i[l], i[l + 1], c), m = i[l + b];
      let g = m;
      for (const y of f) {
        const w = y * d;
        i[w + O] > t && (g += i[w + b]);
      }
      if (g > m && g >= a) {
        let y = u * m, w = p * m, _, J = -1;
        const S = ((l / d | 0) << 5) + (t + 1) + this.points.length;
        for (const _e of f) {
          const k = _e * d;
          if (i[k + O] <= t)
            continue;
          i[k + O] = t;
          const Q = i[k + b];
          y += i[k] * Q, w += i[k + 1] * Q, i[k + N] = S, o && (_ || (_ = this._map(i, l, !0), J = this.clusterProps.length, this.clusterProps.push(_)), o(_, this._map(i, k)));
        }
        i[l + N] = S, h.push(y / g, w / g, 1 / 0, S, -1, g), o && h.push(J);
      } else {
        for (let y = 0; y < d; y++)
          h.push(i[l + y]);
        if (g > 1)
          for (const y of f) {
            const w = y * d;
            if (!(i[w + O] <= t)) {
              i[w + O] = t;
              for (let _ = 0; _ < d; _++)
                h.push(i[w + _]);
            }
          }
      }
    }
    return h;
  }
  // get index of the point from which the cluster originated
  _getOriginId(e) {
    return e - this.points.length >> 5;
  }
  // get zoom of the point from which the cluster originated
  _getOriginZoom(e) {
    return (e - this.points.length) % 32;
  }
  _map(e, t, n) {
    if (e[t + b] > 1) {
      const a = this.clusterProps[e[t + ye]];
      return n ? Object.assign({}, a) : a;
    }
    const r = this.points[e[t + M]].properties, o = this.options.map(r);
    return n && o === r ? Object.assign({}, o) : o;
  }
}
function de(s, e, t) {
  return {
    type: "Feature",
    id: s[e + M],
    properties: we(s, e, t),
    geometry: {
      type: "Point",
      coordinates: [qe(s[e]), Ke(s[e + 1])]
    }
  };
}
function we(s, e, t) {
  const n = s[e + b], r = n >= 1e4 ? `${Math.round(n / 1e3)}k` : n >= 1e3 ? `${Math.round(n / 100) / 10}k` : n, o = s[e + ye], a = o === -1 ? {} : Object.assign({}, t[o]);
  return Object.assign(a, {
    cluster: !0,
    cluster_id: s[e + M],
    point_count: n,
    point_count_abbreviated: r
  });
}
function P(s) {
  return s / 360 + 0.5;
}
function j(s) {
  const e = Math.sin(s * Math.PI / 180), t = 0.5 - 0.25 * Math.log((1 + e) / (1 - e)) / Math.PI;
  return t < 0 ? 0 : t > 1 ? 1 : t;
}
function qe(s) {
  return (s - 0.5) * 360;
}
function Ke(s) {
  const e = (180 - s * 360) * Math.PI / 180;
  return 360 * Math.atan(Math.exp(e)) / Math.PI - 90;
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function He(s, e) {
  var t = {};
  for (var n in s)
    Object.prototype.hasOwnProperty.call(s, n) && e.indexOf(n) < 0 && (t[n] = s[n]);
  if (s != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, n = Object.getOwnPropertySymbols(s); r < n.length; r++)
      e.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(s, n[r]) && (t[n[r]] = s[n[r]]);
  return t;
}
class $ {
  static isAdvancedMarkerAvailable(e) {
    return google.maps.marker && e.getMapCapabilities().isAdvancedMarkersAvailable === !0;
  }
  static isAdvancedMarker(e) {
    return google.maps.marker && e instanceof google.maps.marker.AdvancedMarkerElement;
  }
  static setMap(e, t) {
    this.isAdvancedMarker(e) ? e.map = t : e.setMap(t);
  }
  static getPosition(e) {
    if (this.isAdvancedMarker(e)) {
      if (e.position) {
        if (e.position instanceof google.maps.LatLng)
          return e.position;
        if (e.position.lat && e.position.lng)
          return new google.maps.LatLng(e.position.lat, e.position.lng);
      }
      return new google.maps.LatLng(null);
    }
    return e.getPosition();
  }
  static getVisible(e) {
    return this.isAdvancedMarker(e) ? !0 : e.getVisible();
  }
}
let F = class {
  constructor({ markers: e, position: t }) {
    this.markers = e, t && (t instanceof google.maps.LatLng ? this._position = t : this._position = new google.maps.LatLng(t));
  }
  get bounds() {
    if (this.markers.length === 0 && !this._position)
      return;
    const e = new google.maps.LatLngBounds(this._position, this._position);
    for (const t of this.markers)
      e.extend($.getPosition(t));
    return e;
  }
  get position() {
    return this._position || this.bounds.getCenter();
  }
  /**
   * Get the count of **visible** markers.
   */
  get count() {
    return this.markers.filter((e) => $.getVisible(e)).length;
  }
  /**
   * Add a marker to the cluster.
   */
  push(e) {
    this.markers.push(e);
  }
  /**
   * Cleanup references and remove marker from map.
   */
  delete() {
    this.marker && ($.setMap(this.marker, null), this.marker = void 0), this.markers.length = 0;
  }
};
class Ye {
  constructor({ maxZoom: e = 16 }) {
    this.maxZoom = e;
  }
  /**
   * Helper function to bypass clustering based upon some map state such as
   * zoom, number of markers, etc.
   *
   * ```typescript
   *  cluster({markers, map}: AlgorithmInput): Cluster[] {
   *    if (shouldBypassClustering(map)) {
   *      return this.noop({markers})
   *    }
   * }
   * ```
   */
  noop({ markers: e }) {
    return Je(e);
  }
}
const Je = (s) => s.map((t) => new F({
  position: $.getPosition(t),
  markers: [t]
}));
class $e extends Ye {
  constructor(e) {
    var { maxZoom: t, radius: n = 60 } = e, r = He(e, ["maxZoom", "radius"]);
    super({ maxZoom: t }), this.state = { zoom: -1 }, this.superCluster = new Ve(Object.assign({ maxZoom: this.maxZoom, radius: n }, r));
  }
  calculate(e) {
    let t = !1;
    const n = { zoom: e.map.getZoom() };
    if (!ae(e.markers, this.markers)) {
      t = !0, this.markers = [...e.markers];
      const r = this.markers.map((o) => {
        const a = $.getPosition(o);
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [a.lng(), a.lat()]
          },
          properties: { marker: o }
        };
      });
      this.superCluster.load(r);
    }
    return t || (this.state.zoom <= this.maxZoom || n.zoom <= this.maxZoom) && (t = !ae(this.state, n)), this.state = n, t && (this.clusters = this.cluster(e)), { clusters: this.clusters, changed: t };
  }
  cluster({ map: e }) {
    return this.superCluster.getClusters([-180, -90, 180, 90], Math.round(e.getZoom())).map((t) => this.transformCluster(t));
  }
  transformCluster({ geometry: { coordinates: [e, t] }, properties: n }) {
    if (n.cluster)
      return new F({
        markers: this.superCluster.getLeaves(n.cluster_id, 1 / 0).map((o) => o.properties.marker),
        position: { lat: t, lng: e }
      });
    const r = n.marker;
    return new F({
      markers: [r],
      position: $.getPosition(r)
    });
  }
}
class Qe {
  constructor(e, t) {
    this.markers = { sum: e.length };
    const n = t.map((o) => o.count), r = n.reduce((o, a) => o + a, 0);
    this.clusters = {
      count: t.length,
      markers: {
        mean: r / t.length,
        sum: r,
        min: Math.min(...n),
        max: Math.max(...n)
      }
    };
  }
}
class Xe {
  /**
   * The default render function for the library used by {@link MarkerClusterer}.
   *
   * Currently set to use the following:
   *
   * ```typescript
   * // change color if this cluster has more markers than the mean cluster
   * const color =
   *   count > Math.max(10, stats.clusters.markers.mean)
   *     ? "#ff0000"
   *     : "#0000ff";
   *
   * // create svg url with fill color
   * const svg = window.btoa(`
   * <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
   *   <circle cx="120" cy="120" opacity=".6" r="70" />
   *   <circle cx="120" cy="120" opacity=".3" r="90" />
   *   <circle cx="120" cy="120" opacity=".2" r="110" />
   *   <circle cx="120" cy="120" opacity=".1" r="130" />
   * </svg>`);
   *
   * // create marker using svg icon
   * return new google.maps.Marker({
   *   position,
   *   icon: {
   *     url: `data:image/svg+xml;base64,${svg}`,
   *     scaledSize: new google.maps.Size(45, 45),
   *   },
   *   label: {
   *     text: String(count),
   *     color: "rgba(255,255,255,0.9)",
   *     fontSize: "12px",
   *   },
   *   // adjust zIndex to be above other markers
   *   zIndex: 1000 + count,
   * });
   * ```
   */
  render({ count: e, position: t }, n, r) {
    const a = `<svg fill="${e > Math.max(10, n.clusters.markers.mean) ? "#ff0000" : "#0000ff"}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">
<circle cx="120" cy="120" opacity=".6" r="70" />
<circle cx="120" cy="120" opacity=".3" r="90" />
<circle cx="120" cy="120" opacity=".2" r="110" />
<text x="50%" y="50%" style="fill:#fff" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">${e}</text>
</svg>`, c = `Cluster of ${e} markers`, i = Number(google.maps.Marker.MAX_ZINDEX) + e;
    if ($.isAdvancedMarkerAvailable(r)) {
      const l = new DOMParser().parseFromString(a, "image/svg+xml").documentElement;
      l.setAttribute("transform", "translate(0 25)");
      const u = {
        map: r,
        position: t,
        zIndex: i,
        title: c,
        content: l
      };
      return new google.maps.marker.AdvancedMarkerElement(u);
    }
    const h = {
      position: t,
      zIndex: i,
      title: c,
      icon: {
        url: `data:image/svg+xml;base64,${btoa(a)}`,
        anchor: new google.maps.Point(25, 25)
      }
    };
    return new google.maps.Marker(h);
  }
}
function et(s, e) {
  for (let t in e.prototype)
    s.prototype[t] = e.prototype[t];
}
class Y {
  constructor() {
    et(Y, google.maps.OverlayView);
  }
}
var A;
(function(s) {
  s.CLUSTERING_BEGIN = "clusteringbegin", s.CLUSTERING_END = "clusteringend", s.CLUSTER_CLICK = "click";
})(A || (A = {}));
const tt = (s, e, t) => {
  t.fitBounds(e.bounds);
};
class st extends Y {
  constructor({ map: e, markers: t = [], algorithmOptions: n = {}, algorithm: r = new $e(n), renderer: o = new Xe(), onClusterClick: a = tt }) {
    super(), this.markers = [...t], this.clusters = [], this.algorithm = r, this.renderer = o, this.onClusterClick = a, e && this.setMap(e);
  }
  addMarker(e, t) {
    this.markers.includes(e) || (this.markers.push(e), t || this.render());
  }
  addMarkers(e, t) {
    e.forEach((n) => {
      this.addMarker(n, !0);
    }), t || this.render();
  }
  removeMarker(e, t) {
    const n = this.markers.indexOf(e);
    return n === -1 ? !1 : ($.setMap(e, null), this.markers.splice(n, 1), t || this.render(), !0);
  }
  removeMarkers(e, t) {
    let n = !1;
    return e.forEach((r) => {
      n = this.removeMarker(r, !0) || n;
    }), n && !t && this.render(), n;
  }
  clearMarkers(e) {
    this.markers.length = 0, e || this.render();
  }
  /**
   * Recalculates and draws all the marker clusters.
   */
  render() {
    const e = this.getMap();
    if (e instanceof google.maps.Map && e.getProjection()) {
      google.maps.event.trigger(this, A.CLUSTERING_BEGIN, this);
      const { clusters: t, changed: n } = this.algorithm.calculate({
        markers: this.markers,
        map: e,
        mapCanvasProjection: this.getProjection()
      });
      if (n || n == null) {
        const r = /* @__PURE__ */ new Set();
        for (const a of t)
          a.markers.length == 1 && r.add(a.markers[0]);
        const o = [];
        for (const a of this.clusters)
          a.marker != null && (a.markers.length == 1 ? r.has(a.marker) || $.setMap(a.marker, null) : o.push(a.marker));
        this.clusters = t, this.renderClusters(), requestAnimationFrame(() => o.forEach((a) => $.setMap(a, null)));
      }
      google.maps.event.trigger(this, A.CLUSTERING_END, this);
    }
  }
  onAdd() {
    this.idleListener = this.getMap().addListener("idle", this.render.bind(this)), this.render();
  }
  onRemove() {
    google.maps.event.removeListener(this.idleListener), this.reset();
  }
  reset() {
    this.markers.forEach((e) => $.setMap(e, null)), this.clusters.forEach((e) => e.delete()), this.clusters = [];
  }
  renderClusters() {
    const e = new Qe(this.markers, this.clusters), t = this.getMap();
    this.clusters.forEach((n) => {
      n.markers.length === 1 ? n.marker = n.markers[0] : (n.marker = this.renderer.render(n, e, t), n.markers.forEach((r) => $.setMap(r, null)), this.onClusterClick && n.marker.addListener(
        "click",
        /* istanbul ignore next */
        (r) => {
          google.maps.event.trigger(this, A.CLUSTER_CLICK, n), this.onClusterClick(r, n, t);
        }
      )), $.setMap(n.marker, t);
    });
  }
}
const W = {
  maxZoom: {
    type: Number,
    twoWay: !1,
    default: 16,
    noBind: !0
  }
}, nt = z({
  mappedProps: W,
  events: ["click", "rightclick", "dblclick", "drag", "dragstart", "dragend", "mouseup", "mousedown", "mouseover", "mouseout"],
  name: "MarkerCluster",
  ctr: () => st,
  ctrArgs: ({ map: s, maxZoom: e }) => [{ map: s, markers: [], algorithm: new $e({ maxZoom: e }) }],
  render() {
    return pe("div", this.$slots.default());
  },
  afterCreate(s) {
    const e = () => {
      const t = s.getMarkers();
      s.clearMarkers(), s.addMarkers(t);
    };
    Object.keys(W).forEach((t) => {
      W[t].twoWay && this.$on(`${t.toLowerCase()}_changed`, e);
    });
  },
  updated() {
    var s, e;
    this.$MarkerClusterObject && ((e = (s = this.$MarkerClusterObject).repaint) == null || e.call(s));
  },
  beforeDestroy() {
    this.$children.forEach((s) => {
      s.$MarkerClusterObject === this.$MarkerClusterObject && (s.$MarkerClusterObject = null);
    }), this.$MarkerClusterObject && this.$MarkerClusterObject.clearMarkers();
  }
}), rt = (s) => {
  const e = s.addEventListener ? s.addEventListener : s.attachEvent;
  function t(n, r) {
    if (n === "keydown") {
      const o = r;
      r = function(c) {
        const i = document.getElementsByClassName("pac-item-selected").length > 0;
        if (c.which === 13 && !i) {
          const h = document.createEvent("Event");
          h.keyCode = 40, h.which = 40, o.apply(s, [h]);
        }
        o.apply(s, [c]);
      };
    }
    e.apply(s, [n, r]);
  }
  s.addEventListener = t, s.attachEvent = t;
}, U = {
  bounds: {
    type: Object
  },
  componentRestrictions: {
    type: Object,
    // Do not bind -- must check for undefined
    // in the property
    noBind: !0
  },
  types: {
    type: Array,
    default: () => []
  }
}, ot = {
  selectFirstOnEnter: {
    required: !1,
    type: Boolean,
    default: !1
  },
  // the name of the ref to obtain the input (if its a child  of component in the slot)
  childRefName: {
    required: !1,
    type: String,
    default: "input"
  },
  options: {
    type: Object
  },
  fields: {
    required: !1,
    type: Array,
    default: null
  }
}, it = {
  emits: ["place_changed"],
  mounted() {
    this.$googleMapsApiPromiseLazy().then(() => {
      let s = null;
      if (this.$slots.input && (s = this.$slots.input()[0].context.$refs.input, s && s.$refs && (s = s.$refs[this.childRefName || "input"]), s && (this.$refs.input = s)), this.selectFirstOnEnter && rt(this.$refs.input), typeof window > "u" || typeof window.google.maps.places.Autocomplete != "function")
        throw new Error("google.maps.places.Autocomplete is undefined. Did you add 'places' to libraries when loading Google Maps?");
      const e = {
        ...B(this, U),
        ...this.options
      };
      typeof window < "u" && (this.$autocomplete = new window.google.maps.places.Autocomplete(this.$refs.input, e), V(this, this.$autocomplete, U)), this.$watch("componentRestrictions", (t) => {
        t !== void 0 && this.$autocomplete.setComponentRestrictions(t);
      }), this.fields && this.$autocomplete.setFields(this.fields), this.$autocomplete.addListener("place_changed", () => {
        this.$emit("place_changed", this.$autocomplete.getPlace());
      });
    });
  },
  props: {
    ...q(U),
    ...ot
  }
}, at = { key: 0 };
function ct(s, e, t, n, r, o) {
  return s.$slots.input ? (E(), L("span", at, [
    x(s.$slots, "input", X({ attrs: s.$attrs }, s.$attrs, { ref: s.input }))
  ])) : s.$slots.input ? be("", !0) : (E(), L("input", X({
    key: 1,
    ref: "input"
  }, s.$attrs), null, 16));
}
const lt = /* @__PURE__ */ K(it, [["render", ct]]), ue = (s) => {
  let e = !1, t;
  return () => (e || (e = !0, t = s()), t);
};
function ht(s, e) {
  return function(n) {
    function r() {
      return e.googleMapsApi = {}, window.google;
    }
    if (n.load)
      return ue(() => typeof window > "u" ? new Promise(() => {
      }).then(r) : new Promise((a, c) => {
        try {
          typeof window.googleMapsInit == "function" && a(0), window.googleMapsInit = a, s(n.load, n.loadCn);
        } catch (i) {
          c(i);
        }
      }).then(r));
    const o = new Promise((a) => {
      typeof window > "u" || (window.googleMapsInit = a);
    }).then(r);
    return ue(() => o);
  };
}
const dt = /* @__PURE__ */ (() => {
  let s = !1;
  return (e, t) => {
    if (!(typeof document > "u") && !(window && typeof window.google == "object")) {
      if (s)
        throw new Error("You already started the loading of google maps");
      {
        s = !0;
        const n = document.createElement("SCRIPT");
        if (typeof e != "object")
          throw new Error("options should  be an object");
        Object.prototype.isPrototypeOf.call(Array.prototype, e.libraries) && (e.libraries = e.libraries.join(",")), e.callback = "googleMapsInit";
        let r = "https://maps.googleapis.com/";
        typeof t == "boolean" && t === !0 && (r = "https://maps.google.cn/");
        const o = Object.keys(e).map((c) => `${encodeURIComponent(c)}=${encodeURIComponent(e[c])}`).join("&"), a = `${r}maps/api/js?${o}`;
        n.setAttribute("src", a), n.setAttribute("async", ""), n.setAttribute("defer", ""), document.head.appendChild(n);
      }
    }
  };
})();
var ut = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const mt = ut.BUILD_DEV === "1" ? void 0 : ((s) => s.default || s)(/* @__PURE__ */ Object.assign({ "./components/cluster.ts": () => import("./cluster-0djo491L.js") }));
let G = null;
function gt(s, e = { installComponents: !1, autoBindAllEvents: !0 }) {
  G = ee({
    data() {
      return { googleMapsApi: null };
    }
  });
  const t = ee(void 0), r = ht(dt, G)(e);
  s.mixin({
    created() {
      this.$googleMapsDefaultResizeBus = t, this.$googleMapsOptions = e, this.$googleMapsApiPromiseLazy = r;
    }
  }), s.config.globalProperties.$googleMapsDefaultResizeBus = t, s.config.globalProperties.$googleMapsApiPromiseLazy = r, e.installComponents && (s.component("GoogleMapsMap", Ie), s.component("GoogleMapsMarker", Ze), s.component("MarkerCluster", nt), s.component("GoogleMapsInfoWindow", Pe), s.component("GoogleMapPolygon", We), s.component("GoogleMapsAutocomplete", lt));
}
function yt() {
  if (typeof window < "u")
    return G.googleMapsApi && window.google;
}
export {
  lt as A,
  mt as C,
  Pe as I,
  Ie as M,
  Ze as _,
  We as a,
  Me as b,
  je as c,
  yt as d,
  De as g,
  gt as i,
  dt as l,
  z as m
};
