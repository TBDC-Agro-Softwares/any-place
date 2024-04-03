import { getOptions } from '@/utils/config';

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
export function mountSatelliteImageUrl(lat: number | string | Function, lng: number | string | Function) {
  const { apiKey } = getOptions();

  if (!apiKey) return undefined;

  const latitude = lat instanceof Function ? lat() : lat;
  const longitude = lng instanceof Function ? lng() : lng;

  return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude}%2c%20${longitude}&zoom=13&size=400x300&scale=2&maptype=satellite&key=${apiKey}`;
}

/**
 * Retrieve bounds based on a paths list of latitude and longitude
 * @param {Coordinates[]} paths
 * @returns Object containing bonds on the Google Maps API format
 */
export function getBoundsFromPaths(paths: Coordinates[]) {
  if (typeof window === 'undefined') return undefined;

  const bounds = new window.google.maps.LatLngBounds();

  paths.map((p: any) => {
    const coordinate = new window.google.maps.LatLng(p.lat, p.lng);
    bounds.extend(coordinate);
    return coordinate;
  });

  return bounds;
}

/**
 * Get center of a list of coordinates.
 * @param {Coordinates[]} paths
 * @returns Object containing lat and lng
 */
export function getPathsCenter(paths: Coordinates[]) {
  const bounds = getBoundsFromPaths(paths);

  const center = bounds!.getCenter();

  return {
    lat: center.lat(),
    lng: center.lng()
  };
}
