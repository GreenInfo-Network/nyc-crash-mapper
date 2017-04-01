// @flow

import {
  MODAL_OPENED,
  MODAL_CLOSED,
} from '../constants/action_types';

export type OpenModalAction = { type: typeof MODAL_OPENED, modalType: string };
export type CloseModalAction = { type: typeof MODAL_CLOSED, modalType: string };

export const openModal = (modalType: string): OpenModalAction => ({
  type: MODAL_OPENED,
  modalType,
});

export const closeModal = (): CloseModalAction => ({
  type: MODAL_CLOSED,
  modalType: '',
});
