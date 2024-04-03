export declare function getPropsValues(vueInst: any, props: any): any;
/**
 * Binds the properties defined in props to the google maps instance.
 * If the prop is an Object type, and we wish to track the properties
 * of the object (e.g. the lat and lng of a LatLng), then we do a deep
 * watch. For deep watch, we also prevent the _changed event from being
 * emitted if the data source was external.
 */
export declare function bindProps(vueInst: any, googleMapsInst: any, props: any): void;
