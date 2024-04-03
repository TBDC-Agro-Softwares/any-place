/* eslint-disable no-param-reassign */
import { OptionsTbdcGoogleMaps } from '@/utils/config';
import lazy from '@/utils/lazyValue';

export default function promiseLazy(loadGoogleMapsApi: any, googleMapsApi: { googleMapsApi: {} }) {
  return function promiseLazyCreator(options: OptionsTbdcGoogleMaps) {
    // Things to do once the API is loaded
    function onApiLoaded() {
      googleMapsApi.googleMapsApi = {};
      return window.google;
    }

    if (options.load) {
      /* If library should load the API */
      return lazy(() => {
        /* This will only be evaluated once */
        if (typeof window === 'undefined') {
          /* Do nothing if run from server-side */
          return new Promise(() => {}).then(onApiLoaded);
        }
        return new Promise((resolve, reject) => {
          try {
            if (typeof window.googleMapsInit === 'function') resolve(0);
            window.googleMapsInit = resolve;
            loadGoogleMapsApi(options.load, options.loadCn);
          } catch (err) {
            reject(err);
          }
        }).then(onApiLoaded);
      });
    }

    /* If library should not handle API, provide
      end-users with the global `googleMapsInit: () => undefined`
      when the Google Maps API has been loaded */
    const promise = new Promise((resolve) => {
      if (typeof window === 'undefined') {
        /* Do nothing if run from server-side */
        return;
      }
      window.googleMapsInit = resolve;
    }).then(onApiLoaded);

    return lazy(() => promise);
  };
}
