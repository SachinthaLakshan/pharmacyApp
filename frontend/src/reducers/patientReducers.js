import {
  PATIENT_CREATE_FAIL,
  PATIENT_CREATE_REQUEST,
  PATIENT_CREATE_RESET,
  PATIENT_CREATE_SUCCESS,
} from '../constants/patientConstants';

export const patientCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_CREATE_REQUEST:
      return { loading: true };
    case PATIENT_CREATE_SUCCESS:
      return { loading: false, success: true, patient: action.payload };
    case PATIENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PATIENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
