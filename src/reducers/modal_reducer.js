import {
  MODAL_OPENED,
  MODAL_CLOSED,
} from '../constants/action_types';

export default (state = {}, action) => {
  switch (action.type) {
    case MODAL_OPENED:
      return {
        ...state,
        modalType: action.modalType,
        showModal: true,
      };

    case MODAL_CLOSED:
      return {
        ...state,
        modalType: '',
        showModal: false,
      };

    default:
      return state;
  }
};
