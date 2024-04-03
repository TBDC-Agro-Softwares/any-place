/* eslint-disable no-param-reassign */
import { createApp, App } from 'vue';

import InfoWindow from '@/components/InfoWindow.vue';
import Map from '@/components/MapComponent.vue';
import Polygon from '@/components/PolygonComponent.vue';
import Marker from '@/components/MarkerComponent.vue';
import MarkerCluster from '@/components/MarkerCluster.vue';
import Autocomplete from '@/components/MapAutocompleteComponent.vue';
import promiseLazyFactory from '@/factories/promiseLazy';
import loadGoogleMapsApi from '@/manager/initializer';

import MapElementMixin from '@/mixins/mapElement';
import MapElementFactory from '@/factories/mapElement';
import MountableMixin from '@/mixins/mountable';

import { OptionsTbdcGoogleMaps, setOptions } from '@/utils/config';

// HACK: Cluster should be loaded conditionally
// However in the web version, it's not possible to write
// `import 'vue2-google-maps/src/components/cluster'`, so we need to
// import it anyway (but we don't have to register it)
// Therefore we use babel-plugin-transform-inline-environment-variables to
// set BUILD_DEV to truthy / falsy
const Cluster = import.meta.env.BUILD_DEV === '1' ? undefined : ((s) => s.default || s)(import.meta.glob('./components/cluster.ts'));

let GoogleMapsApi: any = null;

/* export everything */
export { loadGoogleMapsApi, Marker, Polygon, Cluster, InfoWindow, Map, MapElementMixin, MapElementFactory, Autocomplete, MountableMixin };

export default function install(app: App, options: OptionsTbdcGoogleMaps = { installComponents: false, autoBindAllEvents: true }) {
  setOptions(options);

  /* Update the global `googleMapsApi`. This will allow
   * components to use the `google` global reactively
   * via:
   *   import { googleMapsApi } from '@tbdc-agro-softwares/google-maps'
   *   export default { computed: { google: googleMapsApi } }
   * */
  GoogleMapsApi = createApp({
    data() {
      return { googleMapsApi: null };
    }
  });

  const defaultResizeBus = createApp((<any>undefined) as Element);

  /* Use a lazy to only load the API when a VGM component is loaded */
  const promiseLazyCreator = promiseLazyFactory(loadGoogleMapsApi, GoogleMapsApi);
  const googleMapsApiPromiseLazy = promiseLazyCreator(options);

  app.mixin({
    created() {
      this.$googleMapsDefaultResizeBus = defaultResizeBus;
      this.$googleMapsOptions = options;
      this.$googleMapsApiPromiseLazy = googleMapsApiPromiseLazy;
    }
  });

  app.config.globalProperties.$googleMapsDefaultResizeBus = defaultResizeBus;
  app.config.globalProperties.$googleMapsApiPromiseLazy = googleMapsApiPromiseLazy;

  if (options.installComponents) {
    app.component('GoogleMapsMap', Map);
    app.component('GoogleMapsMarker', Marker);
    app.component('MarkerCluster', MarkerCluster);
    app.component('GoogleMapsInfoWindow', InfoWindow);
    app.component('GoogleMapPolygon', Polygon);
    app.component('GoogleMapsAutocomplete', Autocomplete);
  }
}

export function googleMapsApi() {
  if (typeof window !== 'undefined') {
    return GoogleMapsApi.googleMapsApi && window.google;
  }

  return undefined;
}
