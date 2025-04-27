// src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    label: '버튼',
  },
}

export const WithAction: Story = {
  args: {
    label: '클릭해보세요',
    onClick: () => alert('버튼이 클릭되었습니다!'),
  },
}
