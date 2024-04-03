/**
 * Watch the individual properties of a PoD object, instead of the object
 * per se. This is different from a deep watch where both the reference
 * and the individual values are watched.
 *
 * In effect, it throttles the multiple $watch to execute at most once per tick.
 */
export default function watchPrimitiveProperties(vueInst: any, propertiesToTrack: any, handler: any, immediate?: boolean): void;
