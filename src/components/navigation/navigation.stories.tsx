import { MemoryRouter } from 'react-router-dom'
import type { Meta, StoryObj } from '@storybook/react'
import { Tab, useNavigationStore } from '@/stores/navigationStore'
import Navigation from './navigation'

const meta: Meta<typeof Navigation> = {
  title: 'Components/Navigation',
  component: Navigation,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Navigation>

const setSelectedTab = (tab: Tab) => {
  useNavigationStore.setState({ tab })
}
export const HomeSelected: Story = {
  render: () => {
    setSelectedTab('home')
    return <Navigation />
  },
}

export const MakeSelected: Story = {
  render: () => {
    setSelectedTab('make')
    return <Navigation />
  },
}

export const ResearchSelected: Story = {
  render: () => {
    setSelectedTab('research')
    return <Navigation />
  },
}

export const MySelected: Story = {
  render: () => {
    setSelectedTab('my')
    return <Navigation />
  },
}
