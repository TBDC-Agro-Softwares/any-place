/* eslint-disable no-restricted-syntax */
export default (vueInst: any, googleMapsInst: any, events: any) => {
  for (const eventName of events) {
    if (vueInst.$googleMapsOptions.autobindAllEvents || vueInst.$attrs[eventName]) {
      googleMapsInst.addListener(eventName, (ev: any) => {
        vueInst.$emit(eventName, ev);
      });
    }
  }
};
