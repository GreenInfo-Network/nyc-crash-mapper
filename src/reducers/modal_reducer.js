import {
  MODAL_OPEN,
  MODAL_CLOSE,
} from '../constants/action_types';

export default (state = {}, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        ...state,
        modalType: action.modalType,
        showModal: true,
      };

    case MODAL_CLOSE:
      return {
        ...state,
        modalType: '',
        showModal: false,
      };

    default:
      return state;
  }
};
