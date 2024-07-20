import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MainLayout from '../MainLayout.vue'

describe('MainLayout', () => {
  it('renders properly', () => {
    const wrapper = mount(MainLayout)
    expect(wrapper.exists()).toBe(true)
  })
})
