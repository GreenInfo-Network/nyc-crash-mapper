import { connect } from 'react-redux';
import { closeModal } from '../actions/';
import { dateStringFormatModel } from '../constants/api';
import Modal from '../components/Modal/';

const mapStateToProps = ({ modal, filterType, filterArea, dateRange }) => {
  const { showModal, modalType } = modal;
  const { startDate, endDate } = dateRange;
  return {
    showModal,
    modalType,
    filterArea,
    filterType,
    startDate: startDate.format(dateStringFormatModel),
    endDate: endDate.format(dateStringFormatModel),
  };
};

export default connect(mapStateToProps, {
  closeModal,
})(Modal);
