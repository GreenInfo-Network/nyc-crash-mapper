import React, { Component, PropTypes } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import ReactModal from 'react-modal';

import ModalContent from './ModalContent';
import About from './About';
import Help from './Help';
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
    const { modalType, closeModal, } = this.props;
    const { startDate, endDate } = this.props;
    const { filterType, filterArea, filterVehicle } = this.props;
    const modalTypes = {
      about: About,
      help: Help,
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
      <HOC {...{ filterType, filterArea, filterVehicle, startDate, endDate }} />
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
  filterVehicle: PropTypes.shape({
    vehicle: PropTypes.shape({
      car: PropTypes.bool.isRequired,
      truck: PropTypes.bool.isRequired,
      motorcycle: PropTypes.bool.isRequired,
      bicycle: PropTypes.bool.isRequired,
      suv: PropTypes.bool.isRequired,
      busvan: PropTypes.bool.isRequired,
      scooter: PropTypes.bool.isRequired,
      other: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  startDate: momentPropTypes.momentObj.isRequired,
  endDate: momentPropTypes.momentObj.isRequired,
};

export default ModalWrapper;
