import React, { Component, PropTypes } from 'react';
import ReactModal from 'react-modal';

import ModalContent from './ModalContent';
import About from './About';
import DownloadData from './DownloadData';
import ShareURL from './ShareURL';
import ShareFB from './ShareFB';
import ShareTwitter from './ShareTwitter';
import Disclaimer from './Disclaimer';
import Copyright from './Copyright';

class ModalWrapper extends Component {
  constructor() {
    super();
    this.handleModalType = this.handleModalType.bind(this);
  }

  handleModalType() {
    const { modalType } = this.props;
    const modalTypes = {
      about: About,
      'download-data': DownloadData,
      'share-url': ShareURL,
      'share-fb': ShareFB,
      'share-tw': ShareTwitter,
      disclaimer: Disclaimer,
      copyright: Copyright,
    };
    const HOC = ModalContent(modalTypes[modalType]);

    return (<HOC />);
  }

  render() {
    const { closeModal, showModal, modalType } = this.props;
    const contentLabel = `${modalType} modal`;

    return (
      <ReactModal
        isOpen={showModal}
        onRequestClose={() => closeModal()}
        contentLabel={contentLabel}
        className="Modal"
        overlayClassName="Overlay"
      >
        <button className="btn-modal-close" onClick={() => closeModal()} />
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
