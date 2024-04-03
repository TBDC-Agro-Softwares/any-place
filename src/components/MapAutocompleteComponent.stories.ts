import type { Meta, StoryObj } from '@storybook/vue3';

import MapComponent from './MapComponent.vue';
import MapAutocompleteComponent from './MapAutocompleteComponent.vue';

const meta: Meta<typeof MapAutocompleteComponent> = {
  title: 'Map/MapAutocompleteComponent',
  component: MapAutocompleteComponent,
  argTypes: {
    selectFirstOnEnter: {
      control: 'boolean'
    },
    childRefName: {
      control: 'text'
    },
    options: {
      control: 'text'
    },
    fields: {
      control: 'object'
    }
  }
};

export default meta;

type Story = StoryObj<typeof MapAutocompleteComponent>;

export const Default: Story = {
  render: (args) => ({
    components: { MapComponent, MapAutocompleteComponent },
    setup() {
      return { args };
    },
    template: `
    <div style="width: 100%; height: 600px">
      <MapAutocompleteComponent />
    </div>
    `,
    methods: {}
  })
};
