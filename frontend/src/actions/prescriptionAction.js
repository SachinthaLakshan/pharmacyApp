import Axios from '../../node_modules/axios/index';
import {
  PRESCRIPTION_CREATE_FAIL,
  PRESCRIPTION_CREATE_REQUEST,
  PRESCRIPTION_CREATE_SUCCESS,
} from '../constants/prescriptionConstants';

export const createPrescription =
  (Prescription) => async (dispatch, getState) => {
    dispatch({ type: PRESCRIPTION_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post('/api/prescriptions', Prescription, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({
        type: PRESCRIPTION_CREATE_SUCCESS,
        payload: data.prescription,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRESCRIPTION_CREATE_FAIL, payload: message });
    }
  };
