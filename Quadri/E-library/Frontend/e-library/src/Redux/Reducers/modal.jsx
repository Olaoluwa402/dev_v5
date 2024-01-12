import { CLOSE_MODAL, OPEN_MODAL } from "../Constants/modal";

export const modalReducer = (state = { isModalOpen: false }, Action) => {
  switch (Action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
      };

    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };

    default:
      return state;
  }
};
