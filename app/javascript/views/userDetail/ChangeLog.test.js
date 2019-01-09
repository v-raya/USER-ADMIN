import React from 'react'
import { shallow } from 'enzyme'
import ChangeLog from './ChangeLog'

describe('ChangeLog', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<ChangeLog />)
  })

  it('renders the Components ', () => {
    expect(wrapper.find('Rolodex').exists()).toBe(true)
    expect(wrapper.find('Card').exists()).toBe(true)
    expect(wrapper.find('CardHeader').exists()).toBe(true)
    expect(wrapper.find('CardTitle').exists()).toBe(true)
    expect(wrapper.find('CardBody').exists()).toBe(true)
  })
})
