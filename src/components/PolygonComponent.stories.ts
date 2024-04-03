import type { Meta, StoryObj } from '@storybook/vue3';

import MapComponent from './MapComponent.vue';
import PolygonComponent from './PolygonComponent.vue';

const meta: Meta<typeof PolygonComponent> = {
  title: 'Map/PolygonComponent',
  component: PolygonComponent,
  argTypes: {
    draggable: {
      control: 'boolean'
    },
    editable: {
      control: 'boolean'
    },
    options: {
      control: 'object'
    },
    path: {
      control: 'object'
    },
    paths: {
      control: 'object'
    }
  }
};

export default meta;

type Story = StoryObj<typeof PolygonComponent>;

export const Default: Story = {
  render: (args) => ({
    components: { MapComponent, PolygonComponent },
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
        <PolygonComponent v-bind=args />
      </MapComponent>
    </div>
  `,
    methods: {}
  }),
  args: {
    paths: [
      [
        { lat: 25.774, lng: -80.19 },
        { lat: 18.466, lng: -66.118 },
        { lat: 32.321, lng: -64.757 }
      ],
      [
        { lat: 28.745, lng: -70.579 },
        { lat: 29.57, lng: -67.514 },
        { lat: 27.339, lng: -66.668 }
      ]
    ],
    editable: true
  }
};
