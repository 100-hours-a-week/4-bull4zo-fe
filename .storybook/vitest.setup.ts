import { setProjectAnnotations } from '@storybook/react'
import '@testing-library/jest-dom'
import { beforeAll } from 'vitest'
import * as projectAnnotations from './preview'

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const project = setProjectAnnotations([projectAnnotations])

beforeAll(project.beforeAll)
