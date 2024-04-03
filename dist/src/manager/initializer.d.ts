/**
 * @param apiKey    API Key, or object with the URL parameters. For example
 *                  to use Google Maps Premium API, pass
 *                    `{ client: <YOUR-CLIENT-ID> }`.
 *                  You may pass the libraries and/or version (as `v`) parameter into
 *                  this parameter and skip the next two parameters
 * @param version   Google Maps version
 * @param libraries Libraries to load (@see
 *                  https://developers.google.com/maps/documentation/javascript/libraries)
 * @param loadCn    Boolean. If set to true, the map will be loaded from google maps China
 *                  (@see https://developers.google.com/maps/documentation/javascript/basics#GoogleMapsChina)
 *
 * Example:
 * ```
 * import { load } from '@tbdc-agro-software/google-maps'
 *
 * load(<YOUR-API-KEY>)
 *
 * load({ key: <YOUR-API-KEY> })
 *
 * load({ client: <YOUR-CLIENT-ID>, channel: <YOUR CHANNEL> })
 * ```
 */
declare const _default: (options: any, loadCn: any) => void;
export default _default;
