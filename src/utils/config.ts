type Libraries =
  | 'core'
  | 'maps'
  | 'places'
  | 'geocoding'
  | 'routes'
  | 'marker'
  | 'geometry'
  | 'elevation'
  | 'streetView'
  | 'journeySharing'
  | 'drawing'
  | 'visualization';

export type OptionsTbdcGoogleMaps = {
  installComponents: boolean;
  autoBindAllEvents: boolean;
  load?: { key: string; libraries?: Libraries };
  loadCn?: boolean;
};

/* eslint-disable-next-line import/no-mutable-exports */
let options: OptionsTbdcGoogleMaps = { installComponents: false, autoBindAllEvents: true };

export default options;

export const getOptions = () => options;

export const setOptions = (newOptions: OptionsTbdcGoogleMaps) => {
  options = newOptions;
};
