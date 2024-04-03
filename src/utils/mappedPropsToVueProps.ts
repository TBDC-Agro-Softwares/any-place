/**
 * Strips out the extraneous properties we have in our
 * props definitions
 * @param {Object} props
 */
export default function mappedPropsToVueProps(mappedProps: any) {
  return Object.entries(mappedProps)
    .map(([key, prop]: any) => {
      const value: any = {};

      if ('type' in prop) value.type = prop.type;
      if ('default' in prop) value.default = prop.default;
      if ('required' in prop) value.required = prop.required;

      return [key, value];
    })
    .reduce((acc: any, [key, val]) => {
      acc[key] = val;
      return acc;
    }, {});
}
