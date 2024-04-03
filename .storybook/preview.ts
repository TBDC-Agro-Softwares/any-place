import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import { useArgs } from '@storybook/client-api';
import MapPlugin from '../src/index';

// import '../src/scss/_main.scss';

setup((app) => {
  app.use(MapPlugin, { load: { key: 'AIzaSyCUr5brTnleA9OXD-75EJyn8fh-LrQKhAk', libraries: 'places', loading: 'async' } });
});

export const decorators = [
  (story, context) => {
    const [_, updateArgs] = useArgs();
    return story({ ...context, updateArgs });
  },
  () => ({ template: '<story />' })
];

const preview: Preview = {
  decorators,
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export default preview;
