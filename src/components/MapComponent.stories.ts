import type { Meta, StoryObj } from '@storybook/vue3';

import MapComponent from './MapComponent.vue';

const meta: Meta = {
  title: 'Map/MapComponent',
  component: MapComponent,
  argTypes: {
    center: {
      control: 'object'
    },
    zoom: {
      control: 'number'
    },
    heading: {
      control: 'number'
    },
    mapTypeId: {
      control: 'string'
    },
    tilt: {
      control: 'number'
    },
    options: {
      control: 'object'
    }
  }
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => ({
    components: { MapComponent },
    setup() {
      return { args };
    },
    template: '<div style="width: 100%; height: 600px"><MapComponent v-bind="args" /></div>',
    methods: {}
  }),
  args: {
    center: { lat: -14.661869, lng: -55.334561 },
    zoom: 4,
    heading: 45,
    tilt: 45,
    mapTypeId: 'hybrid',
    options: {
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      disableDefaultUi: false
    }
  }
};
