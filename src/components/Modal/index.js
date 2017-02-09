import React, { Component, PropTypes } from 'react';
import momentPropTypes from 'react-moment-proptypes';
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
    const { modalType, closeModal, filterType, filterArea, startDate, endDate } = this.props;
    const modalTypes = {
      about: About,
      copyright: Copyright,
      disclaimer: Disclaimer,
      'download-data': DownloadData,
      'share-fb': ShareFB,
      'share-tw': ShareTwitter,
      'share-url': ShareURL,
    };
    const hocConfig = { modalType, closeModal };
    const HOC = ModalContent(modalTypes[modalType], hocConfig);

    return (
      <HOC {...{ filterType, filterArea, startDate, endDate }} />
    );
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
  filterType: PropTypes.shape({}).isRequired,
  filterArea: PropTypes.shape({}).isRequired,
  startDate: momentPropTypes.momentObj.isRequired,
  endDate: momentPropTypes.momentObj.isRequired,
};

export default ModalWrapper;
