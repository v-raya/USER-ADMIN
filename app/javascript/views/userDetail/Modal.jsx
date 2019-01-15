import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody, ModalHeader } from '@cwds/reactstrap'
import { Button } from 'react-wood-duck'

export default class ModalComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ModalOpen: false,
    }
  }
  toggle = () => {
    this.setState({
      ModalOpen: true,
    })
  }
  render() {
    return (
      <div>
        <Button btnClassName="default pull-right" btnName="View" onClick={this.toggle} />
        <Modal className="warning-modal" isOpen={this.state.ModalOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.props.modalTitle}</ModalHeader>
          <ModalBody className="warning-modal-body">{this.props.modalBody}</ModalBody>
        </Modal>
      </div>
    )
  }
}

ModalComponent.propTypes = {
  modalBody: PropTypes.node,
  data: PropTypes.object,
  modalTitle: PropTypes.string,
}
