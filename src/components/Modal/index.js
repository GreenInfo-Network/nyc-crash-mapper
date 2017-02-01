import React, { Component, PropTypes } from 'react';
import ReactModal from 'react-modal';

import ModalContent from './ModalContent';
import About from './About';
import DownloadData from './DownloadData';
import ShareURL from './ShareURL';
import ShareFB from './ShareFB';
import ShareTwitter from './ShareTwitter';

class ModalWrapper extends Component {

  handleModalType() {
    const { modalType, closeModal } = this.props;
    const modalTypes = {
      about: (<About />),
      'download-data': (<DownloadData />),
      'share-url': (<ShareURL />),
      'share-fb': (<ShareFB />),
      'share-tw': (<ShareTwitter />),
    };

    return ModalContent(modalTypes[modalType], closeModal);
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
