<template>
  <div>
    <div ref="flyaway">
      <slot> </slot>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-param-reassign */
import mapElementFactory from '@/factories/mapElement';

const props = {
  options: {
    type: Object,
    required: false,
    default: () => ({})
  },
  position: {
    type: Object,
    twoWay: true
  },
  zIndex: {
    type: Number,
    twoWay: true
  }
};

const events = ['domready', 'click', 'closeclick', 'content_changed', 'position_changed', 'click-outside'];

export default mapElementFactory({
  name: 'InfoWindow',
  mappedProps: props,
  events,
  emits: [...events],
  ctr: () => typeof window !== 'undefined' && window.google.maps.InfoWindow,
  props: {
    opened: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      const el = this.$refs.flyaway;
      el.parentNode.removeChild(el);

      window.addEventListener('click', this.listener);
    }
  },

  beforeCreate(options) {
    options.content = this.$refs.flyaway;

    return undefined;
  },
  beforeUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('click', this.listener);
    }
  },
  methods: {
    _openInfoWindow() {
      if (this.opened) {
        this.$InfoWindowObject.open(this.$map);
      } else {
        this.$InfoWindowObject.close();
      }
    },
    listener(event) {
      if (this.$InfoWindowObject.content.contains(event.target)) {
        return;
      }
      this.$emit('click-outside', event);
    }
  },
  afterCreate() {
    this._openInfoWindow();
    this.$watch('opened', () => {
      this._openInfoWindow();
    });
  }
});
</script>
