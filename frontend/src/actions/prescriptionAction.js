import Axios from '../../node_modules/axios/index';
import {
  PRESCRIPTION_CREATE_FAIL,
  PRESCRIPTION_CREATE_REQUEST,
  PRESCRIPTION_CREATE_SUCCESS,
  PRESCRIPTION_LIST_FAIL,
  PRESCRIPTION_LIST_REQUEST,
  PRESCRIPTION_LIST_SUCCESS,
  PRESCRIPTION_ORDER_DELIVER_FAIL,
  PRESCRIPTION_ORDER_DELIVER_REQUEST,
  PRESCRIPTION_ORDER_DELIVER_SUCCESS,
  PRESCRIPTION_ORDER_DISPATCH_FAIL,
  PRESCRIPTION_ORDER_DISPATCH_REQUEST,
  PRESCRIPTION_ORDER_DISPATCH_SUCCESS,
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

export const listPrescriptions = () => async (dispatch) => {
  dispatch({
    type: PRESCRIPTION_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get('/api/prescriptions/prescriptions');
    dispatch({ type: PRESCRIPTION_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRESCRIPTION_LIST_FAIL, payload: error.message });
  }
};

export const deliverPrescriptionOrder =
  (orderId, price) => async (dispatch, getState) => {
    dispatch({ type: PRESCRIPTION_ORDER_DELIVER_REQUEST, payload: orderId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.put(
        `/api/prescriptions/prescriptions/${orderId}/${price}/deliver`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: PRESCRIPTION_ORDER_DELIVER_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRESCRIPTION_ORDER_DELIVER_FAIL, payload: message });
    }
  };

export const dispatchPrescriptionOrder =
  (orderId) => async (dispatch, getState) => {
    dispatch({ type: PRESCRIPTION_ORDER_DISPATCH_REQUEST, payload: orderId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.put(
        `/api/prescriptions/prescriptions/${orderId}/dispatch`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: PRESCRIPTION_ORDER_DISPATCH_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRESCRIPTION_ORDER_DISPATCH_FAIL, payload: message });
    }
  };
