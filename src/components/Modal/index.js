import React, { Component, PropTypes } from 'react';
import ReactModal from 'react-modal';

import ModalContent from './ModalContent';
import About from './About';
import DownloadData from './DownloadData';
import ShareURL from './ShareURL';
import ShareFB from './ShareFB';
import ShareTwitter from './ShareTwitter';

class ModalWrapper extends Component {
  constructor() {
    super();
    this.handleModalType = this.handleModalType.bind(this);
  }

  handleModalType() {
    const { modalType, closeModal } = this.props;
    const modalTypes = {
      about: About,
      'download-data': DownloadData,
      'share-url': ShareURL,
      'share-fb': ShareFB,
      'share-tw': ShareTwitter,
    };
    const HOC = ModalContent(modalTypes[modalType], closeModal);

    return (<HOC />);
  }

  render() {
    const { showModal, modalType } = this.props;
    const contentLabel = `${modalType} modal`;

    return (
      <ReactModal
        isOpen={showModal}
        contentLabel={contentLabel}
      >
        { this.handleModalType() }
      </ReactModal>
    );
  }
}

ModalWrapper.defaultProps = {
  modalType: '',
};

ModalWrapper.propTypes = {
  closeModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
};

export default ModalWrapper;
