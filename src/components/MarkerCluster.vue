<script>
import { h } from 'vue';
import { MarkerClusterer, SuperClusterAlgorithm } from '@googlemaps/markerclusterer';
import mapElementFactory from '@/factories/mapElement';

const props = {
  maxZoom: {
    type: Number,
    twoWay: false,
    default: 16,
    noBind: true
  }
};

export default mapElementFactory({
  mappedProps: props,
  events: ['click', 'rightclick', 'dblclick', 'drag', 'dragstart', 'dragend', 'mouseup', 'mousedown', 'mouseover', 'mouseout'],
  name: 'MarkerCluster',
  ctr: () => MarkerClusterer,
  ctrArgs: ({ map, maxZoom }) => [{ map, markers: [], algorithm: new SuperClusterAlgorithm({ maxZoom }) }],
  render() {
    return h('div', this.$slots.default());
  },
  afterCreate(instance) {
    const reinsertMarkers = () => {
      const oldMarkers = instance.getMarkers();
      instance.clearMarkers();
      instance.addMarkers(oldMarkers);
    };

    Object.keys(props).forEach((prop) => {
      if (props[prop].twoWay) {
        this.$on(`${prop.toLowerCase()}_changed`, reinsertMarkers);
      }
    });
  },
  updated() {
    if (this.$MarkerClusterObject) {
      this.$MarkerClusterObject.repaint?.();
    }
  },
  beforeDestroy() {
    /* Performance optimization when destroying a large number of markers */
    this.$children.forEach((marker) => {
      if (marker.$MarkerClusterObject === this.$MarkerClusterObject) {
        /* eslint-disable-next-line no-param-reassign */
        marker.$MarkerClusterObject = null;
      }
    });

    if (this.$MarkerClusterObject) {
      this.$MarkerClusterObject.clearMarkers();
    }
  }
});
</script>
