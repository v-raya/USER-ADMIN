import React from 'react'
import { shallow } from 'enzyme'
import CWSPermissions from './CWSPermissions'

describe('CWSPermissions', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<CWSPermissions />)
  })

  it('renders the Components ', () => {
    expect(wrapper.find('Rolodex').exists()).toBe(true)
    expect(wrapper.find('Card').exists()).toBe(true)
    expect(wrapper.find('CardHeader').exists()).toBe(true)
    expect(wrapper.find('CardTitle').exists()).toBe(true)
  })
})
