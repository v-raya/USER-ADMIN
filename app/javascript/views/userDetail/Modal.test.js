import React from 'react'
import { shallow } from 'enzyme'
import ModalComponent from './Modal'

describe('ChangeLog', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<ModalComponent />)
  })

  it('renders the Components ', () => {
    expect(wrapper.find('Button').exists()).toBe(true)
    expect(wrapper.find('Modal').exists()).toBe(true)
    expect(wrapper.find('ModalHeader').exists()).toBe(true)
    expect(wrapper.find('ModalBody').exists()).toBe(true)
  })

  it('', () => {
    wrapper.setState({ ModalOpen: false })
    const instance = wrapper.instance()
    instance.toggle({
      ModalOpen: true,
    })
    expect(instance.state.ModalOpen).toEqual(true)
  })
})
