<template>
  <span v-if="$slots.input">
    <slot name="input" v-bind:attrs="$attrs" v-bind="$attrs" :ref="input"></slot>
  </span>
  <input v-else-if="!$slots.input" ref="input" v-bind="$attrs" />
</template>

<script>
import { bindProps, getPropsValues } from '@/utils/bindProps';
import downArrowSimulator from '@/utils/simulateArrowDown';
import mappedPropsToVueProps from '@/utils/mappedPropsToVueProps';

const mappedProps = {
  bounds: {
    type: Object
  },
  componentRestrictions: {
    type: Object,
    // Do not bind -- must check for undefined
    // in the property
    noBind: true
  },
  types: {
    type: Array,
    default: () => []
  }
};

const props = {
  selectFirstOnEnter: {
    required: false,
    type: Boolean,
    default: false
  },
  // the name of the ref to obtain the input (if its a child  of component in the slot)
  childRefName: {
    required: false,
    type: String,
    default: 'input'
  },
  options: {
    type: Object
  },
  fields: {
    required: false,
    type: Array,
    default: null
  }
};

export default {
  emits: ['place_changed'],
  mounted() {
    this.$googleMapsApiPromiseLazy().then(() => {
      let scopedInput = null;
      if (this.$slots.input) {
        scopedInput = this.$slots.input()[0].context.$refs.input;
        if (scopedInput && scopedInput.$refs) {
          scopedInput = scopedInput.$refs[this.childRefName || 'input'];
        }
        if (scopedInput) {
          this.$refs.input = scopedInput;
        }
      }
      if (this.selectFirstOnEnter) {
        downArrowSimulator(this.$refs.input);
      }

      if (typeof window === 'undefined' || typeof window.google.maps.places.Autocomplete !== 'function') {
        throw new Error("google.maps.places.Autocomplete is undefined. Did you add 'places' to libraries when loading Google Maps?");
      }

      /* eslint-disable no-unused-vars */
      const finalOptions = {
        ...getPropsValues(this, mappedProps),
        ...this.options
      };

      if (typeof window !== 'undefined') {
        this.$autocomplete = new window.google.maps.places.Autocomplete(this.$refs.input, finalOptions);
        bindProps(this, this.$autocomplete, mappedProps);
      }

      this.$watch('componentRestrictions', (v) => {
        if (v !== undefined) {
          this.$autocomplete.setComponentRestrictions(v);
        }
      });

      // IMPORTANT: To avoid paying for data that you don't need,
      // be sure to use Autocomplete.setFields() to specify only the place data that you will use.
      if (this.fields) {
        this.$autocomplete.setFields(this.fields);
      }

      // Not using `bindEvents` because we also want
      // to return the result of `getPlace()`
      this.$autocomplete.addListener('place_changed', () => {
        this.$emit('place_changed', this.$autocomplete.getPlace());
      });
    });
  },
  props: {
    ...mappedPropsToVueProps(mappedProps),
    ...props
  }
};
</script>
