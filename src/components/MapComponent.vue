<template>
  <div class="vue-map-container">
    <div ref="vue-map" class="vue-map"></div>
    <div class="vue-map-hidden">
      <slot></slot>
    </div>
    <slot name="visible"></slot>
  </div>
</template>

<script>
import mountableMixin from '@/mixins/mountable.js';
import bindEvents from '@/utils/bindEvents';
import { bindProps, getPropsValues } from '@/utils/bindProps';
import twoWayBindingWrapper from '@/utils/twoWayBindingWrapper';
import watchPrimitiveProperties from '@/utils/watchPrimitiveProperties';
import mappedPropsToVueProps from '@/utils/mappedPropsToVueProps';

const props = {
  center: {
    type: Object,
    required: true,
    twoWay: true,
    noBind: true
  },
  zoom: {
    type: Number,
    required: false,
    twoWay: true,
    noBind: true
  },
  heading: {
    type: Number,
    twoWay: true
  },
  mapTypeId: {
    type: String,
    twoWay: true
  },
  tilt: {
    type: Number,
    twoWay: true
  },
  options: {
    type: Object,
    default: () => ({})
  }
};

const events = [
  'bounds_changed',
  'click',
  'dblclick',
  'drag',
  'dragend',
  'dragstart',
  'idle',
  'mousemove',
  'mouseout',
  'mouseover',
  'resize',
  'rightclick',
  'tilesloaded',
  'renderingtype_changed'
];

// Plain Google Maps methods exposed here for convenience
const linkedMethods = ['panBy', 'panTo', 'panToBounds', 'fitBounds'].reduce((all, methodName) => {
  // eslint-disable-next-line no-param-reassign
  all[methodName] = (...args) => {
    if (this.$mapObject) {
      // eslint-disable-next-line prefer-spread
      this.$mapObject[methodName].apply(this.$mapObject, args);
    }
  };
  return all;
}, {});

// Other convenience methods exposed by Vue Google Maps
const customMethods = {
  resize() {
    if (typeof window !== 'undefined' && this.$mapObject) {
      window.google.maps.event.trigger(this.$mapObject, 'resize');
    }
  },
  resizePreserveCenter() {
    if (typeof window === 'undefined' || !this.$mapObject) {
      return;
    }

    const oldCenter = this.$mapObject.getCenter();
    window.google.maps.event.trigger(this.$mapObject, 'resize');
    this.$mapObject.setCenter(oldCenter);
  },

  /// Override mountableMixin::_resizeCallback
  /// because resizePreserveCenter is usually the
  /// expected behaviour
  _resizeCallback() {
    this.resizePreserveCenter();
  }
};

const recyclePrefix = '__gmc__';

export default {
  name: 'MapComponent',
  emits: [
    ...events,
    'center_changed',
    'contextmenu',
    'heading_changed',
    'isfractionalzoomenabled_changed',
    'maptypeid_changed',
    'projection_changed',
    'renderingtype_changed',
    'tilesloaded',
    'tilt_changed',
    'zoom_changed',
    'animation_changed'
  ],
  mixins: [mountableMixin],
  props: mappedPropsToVueProps(props),

  provide() {
    this.$mapPromise = new Promise((resolve, reject) => {
      this.$mapPromiseDeferred = { resolve, reject };
    });

    return {
      $mapPromise: this.$mapPromise
    };
  },
  computed: {
    finalLat() {
      return this.center && typeof this.center.lat === 'function' ? this.center.lat() : this.center.lat;
    },
    finalLng() {
      return this.center && typeof this.center.lng === 'function' ? this.center.lng() : this.center.lng;
    },
    finalLatLng() {
      return { lat: this.finalLat, lng: this.finalLng };
    }
  },
  watch: {
    zoom(zoom) {
      if (this.$mapObject) {
        this.$mapObject.setZoom(zoom);
      }
    }
  },
  beforeUnmount() {
    const recycleKey = this.getRecycleKey();
    if (typeof window !== 'undefined' && window[recycleKey] && this.$mapObject) {
      window[recycleKey].div = this.$mapObject.getDiv();
    }
  },
  async mounted() {
    await this.$googleMapsApiPromiseLazy();
    // getting the DOM element where to create the map
    const element = this.$refs['vue-map'];

    // creating the map
    const initialOptions = {
      ...this.options,
      ...getPropsValues(this, props)
    };

    // don't use delete keyword in order to create a more predictable code for the engine
    const { options, ...finalOptions } = initialOptions;

    const recycleKey = this.getRecycleKey();
    if (this.options.recycle && window[recycleKey]) {
      element.appendChild(window[recycleKey].div);
      this.$mapObject = window[recycleKey].map;
      this.$mapObject.setOptions(finalOptions);
    } else {
      this.$mapObject = new window.google.maps.Map(element, finalOptions);
      window[recycleKey] = { map: this.$mapObject };
    }

    // binding properties (two and one way)
    bindProps(this, this.$mapObject, props);
    // binding events
    bindEvents(this, this.$mapObject, events);

    // manually trigger center and zoom
    twoWayBindingWrapper((increment, decrement, shouldUpdate) => {
      this.$mapObject.addListener('center_changed', () => {
        if (shouldUpdate()) {
          this.$emit('center_changed', this.$mapObject.getCenter());
        }
        decrement();
      });

      const updateCenter = () => {
        increment();
        this.$mapObject.setCenter(this.finalLatLng);
      };

      watchPrimitiveProperties(this, ['finalLat', 'finalLng'], updateCenter);
    });
    this.$mapObject.addListener('zoom_changed', () => {
      this.$emit('zoom_changed', this.$mapObject.getZoom());
    });
    this.$mapObject.addListener('bounds_changed', () => {
      this.$emit('bounds_changed', this.$mapObject.getBounds());
    });

    this.$mapPromiseDeferred.resolve(this.$mapObject);

    return this.$mapObject;
  },
  methods: {
    ...customMethods,
    ...linkedMethods,
    getRecycleKey() {
      return this.options.recycle ? recyclePrefix + this.options.recycle : recyclePrefix;
    }
  }
};
</script>

<style lang="scss">
.vue-map-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.vue-map {
  border-radius: 12px;
}
.vue-map-container .vue-map {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
}
.vue-map-hidden {
  display: none;
}

a[href^="http://maps.google.com/maps"],
  a[href^="https://maps.google.com/maps"],
  a[title='Report problems with Street View imagery to Google'] .gmnoprint a,
  .gmnoprint span,
  .gm-style-cc {
  display: none !important;
}
</style>
