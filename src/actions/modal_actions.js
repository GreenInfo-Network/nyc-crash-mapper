import {
  MODAL_OPENED,
  MODAL_CLOSED,
} from '../constants/action_types';

export const openModal = modalType => ({
  type: MODAL_OPENED,
  modalType,
});

export const closeModal = () => ({
  type: MODAL_CLOSED
});
