import type { Meta, StoryObj } from '@storybook/vue3';

import InfoWindow from './InfoWindow.vue';
import MapComponent from './MapComponent.vue';

const meta: Meta<typeof InfoWindow> = {
  title: 'Map/InfoWindow',
  component: InfoWindow,
  argTypes: {
    options: {
      control: 'object'
    },
    position: {
      control: 'object'
    },
    zIndex: {
      control: 'number'
    }
  }
};

export default meta;

type Story = StoryObj<typeof InfoWindow>;

export const Default: Story = {
  render: (args) => ({
    components: { InfoWindow, MapComponent },
    setup() {
      return { args };
    },
    template: `
    <div style="width: 100%; height: 600px">
      <MapComponent
      :center="{ lat: 25.774, lng: -80.19 }"
      :heading="45"
      :zoom="4"
      >
        <InfoWindow v-bind="args">
          <p>Info Window</p>
        </InfoWindow>
      </MapComponent>
    </div>
  `,
    methods: {}
  }),
  args: {
    position: { lat: 25.774, lng: -80.19 },
    options: {},
    zIndex: 20
  }
};
