// @flow

import {
  MODAL_OPENED,
  MODAL_CLOSED,
} from '../constants/action_types';

import {
  OpenModalAction,
  CloseModalAction,
} from '../actions';

// "union" our two actions so they can be aliased
type Action = OpenModalAction | CloseModalAction;

export type ModalState = {
  +modalType: string,
  +showModal: boolean,
};

const initialState = {
  modalType: '',
  showModal: false,
};

export default (
  state: ModalState = initialState,
  action: Action
): ModalState => {
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
