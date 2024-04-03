/// <reference types="google.maps" />
type Coordinates = {
    lat: number | google.maps.LatLng | google.maps.LatLngLiteral;
    lng: number | google.maps.LatLng | google.maps.LatLngLiteral;
};
/**
 * Generate satellite image based on passed coordinates
 * @param {number | string | Function} lat
 * @param {number | string | Function} lng
 * @returns Url
 */
export declare function mountSatelliteImageUrl(lat: number | string | Function, lng: number | string | Function): string | undefined;
/**
 * Retrieve bounds based on a paths list of latitude and longitude
 * @param {Coordinates[]} paths
 * @returns Object containing bonds on the Google Maps API format
 */
export declare function getBoundsFromPaths(paths: Coordinates[]): google.maps.LatLngBounds | undefined;
/**
 * Get center of a list of coordinates.
 * @param {Coordinates[]} paths
 * @returns Object containing lat and lng
 */
export declare function getPathsCenter(paths: Coordinates[]): {
    lat: number;
    lng: number;
};
export {};
