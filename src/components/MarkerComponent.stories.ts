import type { Meta, StoryObj } from '@storybook/vue3';

import MapComponent from './MapComponent.vue';
import MarkerComponent from './MarkerComponent.vue';

const meta: Meta<typeof MarkerComponent> = {
  title: 'Map/MarkerComponent',
  component: MarkerComponent,
  argTypes: {
    animation: {
      control: 'number'
    },
    attribution: {
      control: 'object'
    },
    clickable: {
      control: 'boolean'
    },
    cursor: {
      control: 'string'
    },
    draggable: {
      control: 'boolean'
    },
    icon: {
      control: 'string'
    },
    label: {},
    opacity: {
      control: 'number'
    },
    options: {
      control: 'object'
    },
    place: {
      control: 'object'
    },
    position: {
      control: 'object'
    },
    shape: {
      control: 'object'
    },
    title: {
      control: 'string'
    },
    zIndex: {
      control: 'number'
    },
    visible: {
      control: 'boolean'
    }
  }
};

export default meta;

type Story = StoryObj<typeof MarkerComponent>;

export const Default: Story = {
  render: (args) => ({
    components: { MapComponent, MarkerComponent },
    setup() {
      return { args };
    },
    template: `
    <div style="width: 100%; height: 600px">
      <MapComponent
        :center="{ lat: -14.661869, lng: -55.334561 }"
        :heading="45"
        :zoom="4"
      >
        <MarkerComponent v-bind="args" />
      </MapComponent>
    </div>
    `,
    methods: {}
  }),
  args: {
    position: { lat: -14.661869, lng: -55.334561 }
  }
};
