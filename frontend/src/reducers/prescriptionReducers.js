import {
  PRESCRIPTION_CREATE_FAIL,
  PRESCRIPTION_CREATE_REQUEST,
  PRESCRIPTION_CREATE_RESET,
  PRESCRIPTION_CREATE_SUCCESS,
} from '../constants/prescriptionConstants';

export const prescriptionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRESCRIPTION_CREATE_REQUEST:
      return { loading: true };
    case PRESCRIPTION_CREATE_SUCCESS:
      return { loading: false, success: true, prescription: action.payload };
    case PRESCRIPTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRESCRIPTION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
