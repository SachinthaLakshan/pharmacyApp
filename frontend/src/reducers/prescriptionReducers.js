import {
  PRESCRIPTION_CREATE_FAIL,
  PRESCRIPTION_CREATE_REQUEST,
  PRESCRIPTION_CREATE_RESET,
  PRESCRIPTION_CREATE_SUCCESS,
  PRESCRIPTION_LIST_FAIL,
  PRESCRIPTION_LIST_REQUEST,
  PRESCRIPTION_LIST_SUCCESS,
  PRESCRIPTION_ORDER_DELIVER_FAIL,
  PRESCRIPTION_ORDER_DELIVER_REQUEST,
  PRESCRIPTION_ORDER_DELIVER_RESET,
  PRESCRIPTION_ORDER_DELIVER_SUCCESS,
  PRESCRIPTION_ORDER_DISPATCH_FAIL,
  PRESCRIPTION_ORDER_DISPATCH_REQUEST,
  PRESCRIPTION_ORDER_DISPATCH_RESET,
  PRESCRIPTION_ORDER_DISPATCH_SUCCESS,
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

export const prescriptionListReducer = (
  state = { loading: true, prescriptions: [] },
  action
) => {
  switch (action.type) {
    case PRESCRIPTION_LIST_REQUEST:
      return { loading: true };
    case PRESCRIPTION_LIST_SUCCESS:
      return { loading: false, prescriptions: action.payload };
    case PRESCRIPTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const prescriptionOrderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case PRESCRIPTION_ORDER_DELIVER_REQUEST:
      return { loading: true };
    case PRESCRIPTION_ORDER_DELIVER_SUCCESS:
      return { loading: false, success: true };
    case PRESCRIPTION_ORDER_DELIVER_FAIL:
      return { loading: false, error: action.payload };
    case PRESCRIPTION_ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const prescriptionOrderDispatchReducer = (state = {}, action) => {
  switch (action.type) {
    case PRESCRIPTION_ORDER_DISPATCH_REQUEST:
      return { loading: true };
    case PRESCRIPTION_ORDER_DISPATCH_SUCCESS:
      return { loading: false, success: true };
    case PRESCRIPTION_ORDER_DISPATCH_FAIL:
      return { loading: false, error: action.payload };
    case PRESCRIPTION_ORDER_DISPATCH_RESET:
      return {};
    default:
      return state;
  }
};
