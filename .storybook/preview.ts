import { type Preview } from '@storybook/react'
import { initialize, mswDecorator, mswLoader } from 'msw-storybook-addon'
import { handlers } from '../src/mocks/handlers'
import '../src/styles/globals.css'

initialize()

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers,
    },
  },
  decorators: [mswDecorator],
  loaders: [mswLoader],
}

export default preview
