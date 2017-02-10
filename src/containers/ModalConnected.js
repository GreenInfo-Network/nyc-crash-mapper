import { connect } from 'react-redux';

import { closeModal } from '../actions/';
import Modal from '../components/Modal/';

const mapStateToProps = ({ modal, filterType, filterArea, filterDate }) => {
  const { showModal, modalType } = modal;
  const { startDate, endDate } = filterDate;
  return {
    showModal,
    modalType,
    filterArea,
    filterType,
    startDate,
    endDate,
  };
};

export default connect(mapStateToProps, {
  closeModal,
})(Modal);
