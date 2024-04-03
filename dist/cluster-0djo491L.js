import { g as c, m as p } from "./index-C4ZLyU4c.js";
function l(t, e) {
  t.getMarkerClusterer().extend(l, google.maps.OverlayView), this.cluster_ = t, this.className_ = t.getMarkerClusterer().getClusterClass(), this.styles_ = e, this.center_ = null, this.div_ = null, this.sums_ = null, this.visible_ = !1, this.setMap(t.getMap());
}
l.prototype.onAdd = function() {
  var t = this, e, i;
  this.div_ = document.createElement("div"), this.div_.className = this.className_, this.visible_ && this.show(), this.getPanes().overlayMouseTarget.appendChild(this.div_), this.boundsChangedListener_ = google.maps.event.addListener(this.getMap(), "bounds_changed", function() {
    i = e;
  }), google.maps.event.addDomListener(this.div_, "mousedown", function() {
    e = !0, i = !1;
  }), google.maps.event.addDomListener(this.div_, "click", function(r) {
    if (e = !1, !i) {
      var n, a, o = t.cluster_.getMarkerClusterer();
      google.maps.event.trigger(o, "click", t.cluster_), google.maps.event.trigger(o, "clusterclick", t.cluster_), o.getZoomOnClick() && (a = o.getMaxZoom(), n = t.cluster_.getBounds(), o.getMap().fitBounds(n), setTimeout(function() {
        o.getMap().fitBounds(n), a !== null && o.getMap().getZoom() > a && o.getMap().setZoom(a + 1);
      }, 100)), r.cancelBubble = !0, r.stopPropagation && r.stopPropagation();
    }
  }), google.maps.event.addDomListener(this.div_, "mouseover", function() {
    var r = t.cluster_.getMarkerClusterer();
    google.maps.event.trigger(r, "mouseover", t.cluster_);
  }), google.maps.event.addDomListener(this.div_, "mouseout", function() {
    var r = t.cluster_.getMarkerClusterer();
    google.maps.event.trigger(r, "mouseout", t.cluster_);
  });
};
l.prototype.onRemove = function() {
  this.div_ && this.div_.parentNode && (this.hide(), google.maps.event.removeListener(this.boundsChangedListener_), google.maps.event.clearInstanceListeners(this.div_), this.div_.parentNode.removeChild(this.div_), this.div_ = null);
};
l.prototype.draw = function() {
  if (this.visible_) {
    var t = this.getPosFromLatLng_(this.center_);
    this.div_.style.top = t.y + "px", this.div_.style.left = t.x + "px";
  }
};
l.prototype.hide = function() {
  this.div_ && (this.div_.style.display = "none"), this.visible_ = !1;
};
l.prototype.show = function() {
  if (this.div_) {
    var t = "", e = this.backgroundPosition_.split(" "), i = parseInt(e[0].replace(/^\s+|\s+$/g, ""), 10), r = parseInt(e[1].replace(/^\s+|\s+$/g, ""), 10), n = this.getPosFromLatLng_(this.center_);
    this.div_.style.cssText = this.createCss(n), t = "<img src='" + this.url_ + "' style='position: absolute; top: " + r + "px; left: " + i + "px; ", this.cluster_.getMarkerClusterer().enableRetinaIcons_ || (t += "clip: rect(" + -1 * r + "px, " + (-1 * i + this.width_) + "px, " + (-1 * r + this.height_) + "px, " + -1 * i + "px);"), t += "'>", this.div_.innerHTML = t + "<div style='position: absolute;top: " + this.anchorText_[0] + "px;left: " + this.anchorText_[1] + "px;color: " + this.textColor_ + ";font-size: " + this.textSize_ + "px;font-family: " + this.fontFamily_ + ";font-weight: " + this.fontWeight_ + ";font-style: " + this.fontStyle_ + ";text-decoration: " + this.textDecoration_ + ";text-align: center;width: " + this.width_ + "px;line-height:" + this.height_ + "px;'>" + this.sums_.text + "</div>", typeof this.sums_.title > "u" || this.sums_.title === "" ? this.div_.title = this.cluster_.getMarkerClusterer().getTitle() : this.div_.title = this.sums_.title, this.div_.style.display = "";
  }
  this.visible_ = !0;
};
l.prototype.useStyle = function(t) {
  this.sums_ = t;
  var e = Math.max(0, t.index - 1);
  e = Math.min(this.styles_.length - 1, e);
  var i = this.styles_[e];
  this.url_ = i.url, this.height_ = i.height, this.width_ = i.width, this.anchorText_ = i.anchorText || [0, 0], this.anchorIcon_ = i.anchorIcon || [parseInt(this.height_ / 2, 10), parseInt(this.width_ / 2, 10)], this.textColor_ = i.textColor || "black", this.textSize_ = i.textSize || 11, this.textDecoration_ = i.textDecoration || "none", this.fontWeight_ = i.fontWeight || "bold", this.fontStyle_ = i.fontStyle || "normal", this.fontFamily_ = i.fontFamily || "Arial,sans-serif", this.backgroundPosition_ = i.backgroundPosition || "0 0";
};
l.prototype.setCenter = function(t) {
  this.center_ = t;
};
l.prototype.createCss = function(t) {
  var e = [];
  return e.push("cursor: pointer;"), e.push("position: absolute; top: " + t.y + "px; left: " + t.x + "px;"), e.push("width: " + this.width_ + "px; height: " + this.height_ + "px;"), e.join("");
};
l.prototype.getPosFromLatLng_ = function(t) {
  var e = this.getProjection().fromLatLngToDivPixel(t);
  return e.x -= this.anchorIcon_[1], e.y -= this.anchorIcon_[0], e.x = parseInt(e.x, 10), e.y = parseInt(e.y, 10), e;
};
function h(t) {
  this.markerClusterer_ = t, this.map_ = t.getMap(), this.gridSize_ = t.getGridSize(), this.minClusterSize_ = t.getMinimumClusterSize(), this.averageCenter_ = t.getAverageCenter(), this.markers_ = [], this.center_ = null, this.bounds_ = null, this.clusterIcon_ = new l(this, t.getStyles());
}
h.prototype.getSize = function() {
  return this.markers_.length;
};
h.prototype.getMarkers = function() {
  return this.markers_;
};
h.prototype.getCenter = function() {
  return this.center_;
};
h.prototype.getMap = function() {
  return this.map_;
};
h.prototype.getMarkerClusterer = function() {
  return this.markerClusterer_;
};
h.prototype.getBounds = function() {
  var t, e = new google.maps.LatLngBounds(this.center_, this.center_), i = this.getMarkers();
  for (t = 0; t < i.length; t++)
    e.extend(i[t].getPosition());
  return e;
};
h.prototype.remove = function() {
  this.clusterIcon_.setMap(null), this.markers_ = [], delete this.markers_;
};
h.prototype.addMarker = function(t) {
  var e, i, r;
  if (this.isMarkerAlreadyAdded_(t))
    return !1;
  if (!this.center_)
    this.center_ = t.getPosition(), this.calculateBounds_();
  else if (this.averageCenter_) {
    var n = this.markers_.length + 1, a = (this.center_.lat() * (n - 1) + t.getPosition().lat()) / n, o = (this.center_.lng() * (n - 1) + t.getPosition().lng()) / n;
    this.center_ = new google.maps.LatLng(a, o), this.calculateBounds_();
  }
  if (t.isAdded = !0, this.markers_.push(t), i = this.markers_.length, r = this.markerClusterer_.getMaxZoom(), r !== null && this.map_.getZoom() > r)
    t.getMap() !== this.map_ && t.setMap(this.map_);
  else if (i < this.minClusterSize_)
    t.getMap() !== this.map_ && t.setMap(this.map_);
  else if (i === this.minClusterSize_)
    for (e = 0; e < i; e++)
      this.markers_[e].setMap(null);
  else
    t.setMap(null);
  return this.updateIcon_(), !0;
};
h.prototype.isMarkerInClusterBounds = function(t) {
  return this.bounds_.contains(t.getPosition());
};
h.prototype.calculateBounds_ = function() {
  var t = new google.maps.LatLngBounds(this.center_, this.center_);
  this.bounds_ = this.markerClusterer_.getExtendedBounds(t);
};
h.prototype.updateIcon_ = function() {
  var t = this.markers_.length, e = this.markerClusterer_.getMaxZoom();
  if (e !== null && this.map_.getZoom() > e) {
    this.clusterIcon_.hide();
    return;
  }
  if (t < this.minClusterSize_) {
    this.clusterIcon_.hide();
    return;
  }
  var i = this.markerClusterer_.getStyles().length, r = this.markerClusterer_.getCalculator()(this.markers_, i);
  this.clusterIcon_.setCenter(this.center_), this.clusterIcon_.useStyle(r), this.clusterIcon_.show();
};
h.prototype.isMarkerAlreadyAdded_ = function(t) {
  var e;
  if (this.markers_.indexOf)
    return this.markers_.indexOf(t) !== -1;
  for (e = 0; e < this.markers_.length; e++)
    if (t === this.markers_[e])
      return !0;
  return !1;
};
function s(t, e, i) {
  this.extend(s, google.maps.OverlayView), e = e || [], i = i || {}, this.markers_ = [], this.clusters_ = [], this.listeners_ = [], this.activeMap_ = null, this.ready_ = !1, this.gridSize_ = i.gridSize || 60, this.minClusterSize_ = i.minimumClusterSize || 2, this.maxZoom_ = i.maxZoom || null, this.styles_ = i.styles || [], this.title_ = i.title || "", this.zoomOnClick_ = !0, i.zoomOnClick !== void 0 && (this.zoomOnClick_ = i.zoomOnClick), this.averageCenter_ = !1, i.averageCenter !== void 0 && (this.averageCenter_ = i.averageCenter), this.ignoreHidden_ = !1, i.ignoreHidden !== void 0 && (this.ignoreHidden_ = i.ignoreHidden), this.enableRetinaIcons_ = !1, i.enableRetinaIcons !== void 0 && (this.enableRetinaIcons_ = i.enableRetinaIcons), this.imagePath_ = i.imagePath || s.IMAGE_PATH, this.imageExtension_ = i.imageExtension || s.IMAGE_EXTENSION, this.imageSizes_ = i.imageSizes || s.IMAGE_SIZES, this.calculator_ = i.calculator || s.CALCULATOR, this.batchSize_ = i.batchSize || s.BATCH_SIZE, this.batchSizeIE_ = i.batchSizeIE || s.BATCH_SIZE_IE, this.clusterClass_ = i.clusterClass || "cluster", navigator.userAgent.toLowerCase().indexOf("msie") !== -1 && (this.batchSize_ = this.batchSizeIE_), this.setupStyles_(), this.addMarkers(e, !0), this.setMap(t);
}
s.prototype.onAdd = function() {
  var t = this;
  this.activeMap_ = this.getMap(), this.ready_ = !0, this.repaint(), this.listeners_ = [
    google.maps.event.addListener(this.getMap(), "zoom_changed", function() {
      t.resetViewport_(!1), (this.getZoom() === (this.get("minZoom") || 0) || this.getZoom() === this.get("maxZoom")) && google.maps.event.trigger(this, "idle");
    }),
    google.maps.event.addListener(this.getMap(), "idle", function() {
      t.redraw_();
    })
  ];
};
s.prototype.onRemove = function() {
  var t;
  for (t = 0; t < this.markers_.length; t++)
    this.markers_[t].getMap() !== this.activeMap_ && this.markers_[t].setMap(this.activeMap_);
  for (t = 0; t < this.clusters_.length; t++)
    this.clusters_[t].remove();
  for (this.clusters_ = [], t = 0; t < this.listeners_.length; t++)
    google.maps.event.removeListener(this.listeners_[t]);
  this.listeners_ = [], this.activeMap_ = null, this.ready_ = !1;
};
s.prototype.draw = function() {
};
s.prototype.setupStyles_ = function() {
  var t, e;
  if (!(this.styles_.length > 0))
    for (t = 0; t < this.imageSizes_.length; t++)
      e = this.imageSizes_[t], this.styles_.push({
        url: this.imagePath_ + (t + 1) + "." + this.imageExtension_,
        height: e,
        width: e
      });
};
s.prototype.fitMapToMarkers = function() {
  var t, e = this.getMarkers(), i = new google.maps.LatLngBounds();
  for (t = 0; t < e.length; t++)
    i.extend(e[t].getPosition());
  this.getMap().fitBounds(i);
};
s.prototype.getGridSize = function() {
  return this.gridSize_;
};
s.prototype.setGridSize = function(t) {
  this.gridSize_ = t;
};
s.prototype.getMinimumClusterSize = function() {
  return this.minClusterSize_;
};
s.prototype.setMinimumClusterSize = function(t) {
  this.minClusterSize_ = t;
};
s.prototype.getMaxZoom = function() {
  return this.maxZoom_;
};
s.prototype.setMaxZoom = function(t) {
  this.maxZoom_ = t;
};
s.prototype.getStyles = function() {
  return this.styles_;
};
s.prototype.setStyles = function(t) {
  this.styles_ = t;
};
s.prototype.getTitle = function() {
  return this.title_;
};
s.prototype.setTitle = function(t) {
  this.title_ = t;
};
s.prototype.getZoomOnClick = function() {
  return this.zoomOnClick_;
};
s.prototype.setZoomOnClick = function(t) {
  this.zoomOnClick_ = t;
};
s.prototype.getAverageCenter = function() {
  return this.averageCenter_;
};
s.prototype.setAverageCenter = function(t) {
  this.averageCenter_ = t;
};
s.prototype.getIgnoreHidden = function() {
  return this.ignoreHidden_;
};
s.prototype.setIgnoreHidden = function(t) {
  this.ignoreHidden_ = t;
};
s.prototype.getEnableRetinaIcons = function() {
  return this.enableRetinaIcons_;
};
s.prototype.setEnableRetinaIcons = function(t) {
  this.enableRetinaIcons_ = t;
};
s.prototype.getImageExtension = function() {
  return this.imageExtension_;
};
s.prototype.setImageExtension = function(t) {
  this.imageExtension_ = t;
};
s.prototype.getImagePath = function() {
  return this.imagePath_;
};
s.prototype.setImagePath = function(t) {
  this.imagePath_ = t;
};
s.prototype.getImageSizes = function() {
  return this.imageSizes_;
};
s.prototype.setImageSizes = function(t) {
  this.imageSizes_ = t;
};
s.prototype.getCalculator = function() {
  return this.calculator_;
};
s.prototype.setCalculator = function(t) {
  this.calculator_ = t;
};
s.prototype.getBatchSizeIE = function() {
  return this.batchSizeIE_;
};
s.prototype.setBatchSizeIE = function(t) {
  this.batchSizeIE_ = t;
};
s.prototype.getClusterClass = function() {
  return this.clusterClass_;
};
s.prototype.setClusterClass = function(t) {
  this.clusterClass_ = t;
};
s.prototype.getMarkers = function() {
  return this.markers_;
};
s.prototype.getTotalMarkers = function() {
  return this.markers_.length;
};
s.prototype.getClusters = function() {
  return this.clusters_;
};
s.prototype.getTotalClusters = function() {
  return this.clusters_.length;
};
s.prototype.addMarker = function(t, e) {
  this.pushMarkerTo_(t), e || this.redraw_();
};
s.prototype.addMarkers = function(t, e) {
  var i;
  for (i in t)
    t.hasOwnProperty(i) && this.pushMarkerTo_(t[i]);
  e || this.redraw_();
};
s.prototype.pushMarkerTo_ = function(t) {
  if (t.getDraggable()) {
    var e = this;
    google.maps.event.addListener(t, "dragend", function() {
      e.ready_ && (this.isAdded = !1, e.repaint());
    });
  }
  t.isAdded = !1, this.markers_.push(t);
};
s.prototype.removeMarker = function(t, e) {
  var i = this.removeMarker_(t);
  return !e && i && this.repaint(), i;
};
s.prototype.removeMarkers = function(t, e) {
  var i, r, n = !1;
  for (i = 0; i < t.length; i++)
    r = this.removeMarker_(t[i]), n = n || r;
  return !e && n && this.repaint(), n;
};
s.prototype.removeMarker_ = function(t) {
  var e, i = -1;
  if (this.markers_.indexOf)
    i = this.markers_.indexOf(t);
  else
    for (e = 0; e < this.markers_.length; e++)
      if (t === this.markers_[e]) {
        i = e;
        break;
      }
  return i === -1 ? !1 : (t.setMap(null), this.markers_.splice(i, 1), !0);
};
s.prototype.clearMarkers = function() {
  this.resetViewport_(!0), this.markers_ = [];
};
s.prototype.repaint = function() {
  var t = this.clusters_.slice();
  this.clusters_ = [], this.resetViewport_(!1), this.redraw_(), setTimeout(function() {
    var e;
    for (e = 0; e < t.length; e++)
      t[e].remove();
  }, 0);
};
s.prototype.getExtendedBounds = function(t) {
  var e = this.getProjection(), i = new google.maps.LatLng(
    t.getNorthEast().lat(),
    t.getNorthEast().lng()
  ), r = new google.maps.LatLng(
    t.getSouthWest().lat(),
    t.getSouthWest().lng()
  ), n = e.fromLatLngToDivPixel(i);
  n.x += this.gridSize_, n.y -= this.gridSize_;
  var a = e.fromLatLngToDivPixel(r);
  a.x -= this.gridSize_, a.y += this.gridSize_;
  var o = e.fromDivPixelToLatLng(n), u = e.fromDivPixelToLatLng(a);
  return t.extend(o), t.extend(u), t;
};
s.prototype.redraw_ = function() {
  this.createClusters_(0);
};
s.prototype.resetViewport_ = function(t) {
  var e, i;
  for (e = 0; e < this.clusters_.length; e++)
    this.clusters_[e].remove();
  for (this.clusters_ = [], e = 0; e < this.markers_.length; e++)
    i = this.markers_[e], i.isAdded = !1, t && i.setMap(null);
};
s.prototype.distanceBetweenPoints_ = function(t, e) {
  var i = 6371, r = (e.lat() - t.lat()) * Math.PI / 180, n = (e.lng() - t.lng()) * Math.PI / 180, a = Math.sin(r / 2) * Math.sin(r / 2) + Math.cos(t.lat() * Math.PI / 180) * Math.cos(e.lat() * Math.PI / 180) * Math.sin(n / 2) * Math.sin(n / 2), o = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), u = i * o;
  return u;
};
s.prototype.isMarkerInBounds_ = function(t, e) {
  return e.contains(t.getPosition());
};
s.prototype.addToClosestCluster_ = function(t) {
  var e, i, r, n, a = 4e4, o = null;
  for (e = 0; e < this.clusters_.length; e++)
    r = this.clusters_[e], n = r.getCenter(), n && (i = this.distanceBetweenPoints_(n, t.getPosition()), i < a && (a = i, o = r));
  o && o.isMarkerInClusterBounds(t) ? o.addMarker(t) : (r = new h(this), r.addMarker(t), this.clusters_.push(r));
};
s.prototype.createClusters_ = function(t) {
  var e, i, r, n = this;
  if (this.ready_) {
    t === 0 && (google.maps.event.trigger(this, "clusteringbegin", this), typeof this.timerRefStatic < "u" && (clearTimeout(this.timerRefStatic), delete this.timerRefStatic)), this.getMap().getZoom() > 3 ? r = new google.maps.LatLngBounds(
      this.getMap().getBounds().getSouthWest(),
      this.getMap().getBounds().getNorthEast()
    ) : r = new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625));
    var a = this.getExtendedBounds(r), o = Math.min(t + this.batchSize_, this.markers_.length);
    for (e = t; e < o; e++)
      i = this.markers_[e], !i.isAdded && this.isMarkerInBounds_(i, a) && (!this.ignoreHidden_ || this.ignoreHidden_ && i.getVisible()) && this.addToClosestCluster_(i);
    o < this.markers_.length ? this.timerRefStatic = setTimeout(function() {
      n.createClusters_(o);
    }, 0) : (delete this.timerRefStatic, google.maps.event.trigger(this, "clusteringend", this));
  }
};
s.prototype.extend = function(t, e) {
  return (function(i) {
    var r;
    for (r in i.prototype)
      this.prototype[r] = i.prototype[r];
    return this;
  }).apply(t, [e]);
};
s.CALCULATOR = function(t, e) {
  for (var i = 0, r = "", n = t.length.toString(), a = n; a !== 0; )
    a = parseInt(a / 10, 10), i++;
  return i = Math.min(i, e), {
    text: n,
    index: i,
    title: r
  };
};
s.BATCH_SIZE = 2e3;
s.BATCH_SIZE_IE = 500;
s.IMAGE_PATH = "https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m";
s.IMAGE_EXTENSION = "png";
s.IMAGE_SIZES = [53, 56, 66, 78, 90];
var _ = s;
const g = /* @__PURE__ */ c(_), d = {
  maxZoom: {
    type: Number,
    twoWay: !1
  },
  batchSizeIE: {
    type: Number,
    twoWay: !1
  },
  calculator: {
    type: Function,
    twoWay: !1
  },
  enableRetinaIcons: {
    type: Boolean,
    twoWay: !1
  },
  gridSize: {
    type: Number,
    twoWay: !1
  },
  averageCenter: {
    type: Boolean,
    twoWay: !1
  },
  ignoreHidden: {
    type: Boolean,
    twoWay: !1
  },
  imageExtension: {
    type: String,
    twoWay: !1
  },
  imagePath: {
    type: String,
    twoWay: !1
  },
  imageSizes: {
    type: Array,
    twoWay: !1
  },
  minimumClusterSize: {
    type: Number,
    twoWay: !1
  },
  styles: {
    type: Array,
    twoWay: !1
  },
  zoomOnClick: {
    type: Boolean,
    twoWay: !1
  }
}, f = ["click", "rightclick", "dblclick", "drag", "dragstart", "dragend", "mouseup", "mousedown", "mouseover", "mouseout"], v = p({
  mappedProps: d,
  events: f,
  name: "cluster",
  ctr: () => {
    if (typeof g > "u")
      throw console.error(
        "MarkerClusterer is not installed! require() it or include it from https://cdnjs.cloudflare.com/ajax/libs/js-marker-clusterer/1.0.0/markerclusterer.js"
      ), new Error(
        "MarkerClusterer is not installed! require() it or include it from https://cdnjs.cloudflare.com/ajax/libs/js-marker-clusterer/1.0.0/markerclusterer.js"
      );
    return g;
  },
  ctrArgs: ({ map: t, ...e }) => [t, [], e],
  render(t) {
    return t("div", null, { default: this.$slots.default });
  },
  updated() {
    this.$clusterObject && this.$clusterObject.repaint();
  },
  beforeDestroy() {
    this.$children.forEach((t) => {
      t.$clusterObject === this.$clusterObject && (t.$clusterObject = null);
    }), this.$clusterObject && this.$clusterObject.clearMarkers();
  }
});
export {
  v as default
};
