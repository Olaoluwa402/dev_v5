import { CLOSE_MODAL, OPEN_MODAL } from "../Constants/modal";

export const openModalAction = () => (dispatch) => {
  dispatch({ type: OPEN_MODAL });
};

export const closeModalAction = () => (dispatch) => {
  dispatch({ type: CLOSE_MODAL });
};
