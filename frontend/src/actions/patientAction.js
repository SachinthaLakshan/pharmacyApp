import Axios from '../../node_modules/axios/index';
import {
  PATIENT_CREATE_FAIL,
  PATIENT_CREATE_REQUEST,
  PATIENT_CREATE_SUCCESS,
} from '../constants/patientConstants';

export const createPatient = (Patient) => async (dispatch, getState) => {
  dispatch({ type: PATIENT_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post('/api/patients', Patient, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: PATIENT_CREATE_SUCCESS,
      payload: data.patient,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PATIENT_CREATE_FAIL, payload: message });
  }
};
