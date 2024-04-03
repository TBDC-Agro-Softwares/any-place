type Libraries = 'core' | 'maps' | 'places' | 'geocoding' | 'routes' | 'marker' | 'geometry' | 'elevation' | 'streetView' | 'journeySharing' | 'drawing' | 'visualization';
export type OptionsTbdcGoogleMaps = {
    installComponents: boolean;
    autoBindAllEvents: boolean;
    load?: {
        key: string;
        libraries?: Libraries;
    };
    loadCn?: boolean;
};
declare let options: OptionsTbdcGoogleMaps;
export default options;
export declare const getOptions: () => OptionsTbdcGoogleMaps;
export declare const setOptions: (newOptions: OptionsTbdcGoogleMaps) => void;
