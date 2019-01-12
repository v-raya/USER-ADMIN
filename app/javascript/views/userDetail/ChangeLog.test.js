import React from 'react'
import { shallow, mount } from 'enzyme'
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

  it('renders the header and 7 fake changelog rows', () => {
    expect(
      wrapper
        .find('CardBody')
        .dive()
        .find('DataGrid')
        .dive()
        .find('ReactTable')
        .dive()
        .find('TableComponent')
        .dive()
        .find('TrComponent').length
    ).toEqual(8)
  })

  it.only('renders the date field correctly', () => {
    const mounted = mount(<ChangeLog />)
    const trs = mounted.find('TrComponent')
    expect(
      trs
        .at(1)
        .children()
        .first()
        .children()
        .first()
        .text()
    ).toEqual('January 3, 2019 02:22 PM')
  })
})
