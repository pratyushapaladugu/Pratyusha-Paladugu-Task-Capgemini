import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from '../Card.vue'

describe('Card', () => {
  it('renders properly', () => {
    const item = {
      name: 'Sample Item',
      description: 'Sample Description'
    }
    
    const wrapper = mount(Card, {
      props: { item }
    })

    // Assert that the component renders the item details
    expect(wrapper.text()).toContain('Sample Item')
    expect(wrapper.text()).toContain('Sample Description')
  })
})
