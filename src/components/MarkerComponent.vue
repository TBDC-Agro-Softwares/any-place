<script>
import { h } from 'vue';
import mapElementFactory from '@/factories/mapElement';

const props = {
  animation: {
    twoWay: true,
    type: Number
  },
  attribution: {
    type: Object
  },
  clickable: {
    type: Boolean,
    twoWay: true,
    default: true
  },
  cursor: {
    type: String,
    twoWay: true
  },
  draggable: {
    type: Boolean,
    twoWay: true,
    default: false
  },
  icon: {
    twoWay: true
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
    twoWay: true
  },
  shape: {
    type: Object,
    twoWay: true
  },
  title: {
    type: String,
    twoWay: true
  },
  zIndex: {
    type: Number,
    twoWay: true
  },
  visible: {
    twoWay: true,
    default: true
  }
};

const events = ['click', 'rightclick', 'dblclick', 'drag', 'dragstart', 'dragend', 'mouseup', 'mousedown', 'mouseover', 'mouseout'];

/**
 * @class Marker
 *
 * Marker class with extra support for
 *
 * - Embedded info windows
 * - Clustered markers
 *
 * Support for clustered markers is for backward-compatability
 * reasons. Otherwise we should use a cluster-marker mixin or
 * subclass.
 */
export default mapElementFactory({
  name: 'Marker',
  mappedProps: props,
  emits: [
    ...events,
    'position_changed',
    'animation_changed',
    'clickable_changed',
    'contextmenu',
    'cursor_changed',
    'draggable_changed',
    'flat_changed',
    'icon_changed',
    'shape_changed',
    'title_changed',
    'visible_changed',
    'zindex_changed'
  ],
  events,
  ctr: () => typeof window !== 'undefined' && window.google.maps.Marker,
  inject: {
    $MarkerClusterPromise: {
      default: null
    }
  },
  render() {
    if (!this.$slots.default || this.$slots.default().length === 0) {
      return '';
    }

    if (this.$slots.default().length === 1) {
      // So that infowindows can have a marker parent
      return this.$slots.default()[0];
    }

    return h('div', null, { default: () => this.$slots.default() });
  },
  destroyed() {
    if (!this.$MarkerObject) {
      return;
    }

    if (this.$MarkerClusterObject) {
      /* Repaint will be performed in `updated()` of cluster */
      this.$MarkerClusterObject.removeMarker(this.$MarkerObject, true);
    } else {
      this.$MarkerObject.setMap(null);
    }
  },
  beforeCreate(options) {
    if (this.$MarkerClusterPromise) {
      /* eslint-disable-next-line no-param-reassign */
      options.map = null;
    }

    return this.$MarkerClusterPromise;
  },
  afterCreate(instance) {
    if (this.$MarkerClusterPromise) {
      this.$MarkerClusterPromise.then((clusterObject) => {
        clusterObject.addMarker(instance);
        this.$MarkerClusterObject = clusterObject;
      });
    }
  }
});
</script>
