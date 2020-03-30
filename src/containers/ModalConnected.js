import { connect } from 'react-redux';

import { closeModal } from '../actions/';
import Modal from '../components/Modal/';

const mapStateToProps = ({ modal, filterType, filterArea, filterVehicle, filterDate }) => {
  const { showModal, modalType } = modal;
  const { startDate, endDate } = filterDate;
  return {
    showModal,
    modalType,
    filterArea,
    filterType,
    filterVehicle,
    startDate,
    endDate,
  };
};

export default connect(mapStateToProps, {
  closeModal,
})(Modal);
