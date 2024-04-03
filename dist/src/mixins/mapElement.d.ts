/**
 * @class MapElementMixin
 *
 * Extends components to include the following fields:
 *
 * @property $map        The Google map (valid only after the promise returns)
 *
 *
 * */
declare const _default: {
    inject: {
        $mapPromise: {
            default: string;
        };
    };
    provide(): {};
};
export default _default;
