import { OptionsTbdcGoogleMaps } from '../utils/config';
export default function promiseLazy(loadGoogleMapsApi: any, googleMapsApi: {
    googleMapsApi: {};
}): (options: OptionsTbdcGoogleMaps) => () => any;
