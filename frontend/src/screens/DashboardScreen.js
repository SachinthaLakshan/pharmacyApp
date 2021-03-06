import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { summaryOrder } from '../actions/orderActions';
import LoadingBox from '../components/LodingBox';
import MessageBox from '../components/MessageBox';
import {
  deliverPrescriptionOrder,
  listPrescriptions,
} from '../actions/prescriptionAction';
import Modal from 'react-awesome-modal';
import { PRESCRIPTION_ORDER_DELIVER_RESET } from '../constants/prescriptionConstants';
import EmailSender from '../components/EmailSender';

export default function DashboardScreen() {
  const orderSummary = useSelector((state) => state.orderSummary);
  const { loading, summary, error } = orderSummary;
  const [modalVisible, setModalVisible] = useState(false);
  const [placeOrderModalVisible, setPlaceOrderModalVisible] = useState(false);
  const [modalHeader, setModalHeader] = useState('not came');
  const [modalImage, setModalImage] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderSummaryText, setOrderSummaryText] = useState('');
  const [tempObj, setTempObj] = useState({});

  const prescriptionlist = useSelector((state) => state.prescriptionlist);
  const prescriptionDeliver = useSelector((state) => state.prescriptionDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = prescriptionDeliver;
  const {
    loading: loadingPrescriptions,
    error: errorPrescriptions,
    prescriptions,
  } = prescriptionlist;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(summaryOrder());
  }, [dispatch]);

  useEffect(() => {
    if (!loadingDeliver) {
      dispatch(listPrescriptions());
    }
    dispatch({ type: PRESCRIPTION_ORDER_DELIVER_RESET });
  }, [dispatch, loadingDeliver]);

  const placeOrderHandler = (obj) => {
    if (window.confirm(`Are you sure to dispatch ${obj.name} 's order?`)) {
      dispatch(deliverPrescriptionOrder(obj._id, totalPrice));
    }
    setPlaceOrderModalVisible(true);
    setTempObj(obj);
  };
  const sendEmailHandler = () => {
    var templateParams = {
      email: tempObj.email,
      name: tempObj.name,
      totalPrice: tempObj.totalPrice,
      description: orderSummaryText,
      deliveryType: tempObj.isPickup ? 'Pick up' : 'Delivery',
    };

    EmailSender.sendEmail('template_gf1socq', templateParams);
    setPlaceOrderModalVisible(false);
  };

  const imageClickHandler = (name, image) => {
    setModalVisible(true);
    setModalHeader(name);
    setModalImage(image);
  };

  const closeModal = () => {
    setModalVisible(false);
    setPlaceOrderModalVisible(false);
  };
  return (
    <div>
      <div className="row">
        <h1>Dashboard</h1>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error || errorPrescriptions ? (
        <MessageBox variant="danger">
          {error}
          {errorPrescriptions}
        </MessageBox>
      ) : (
        <>
          <ul className="row summary">
            <li>
              <div className="summary-title color1">
                <span>
                  <i className="fa fa-users" /> Users
                </span>
              </div>
              <div className="summary-body">{summary.users[0].numUsers}</div>
            </li>
            <li>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-shopping-cart" /> Orders
                </span>
              </div>
              <div className="summary-body">
                {summary.orders[0] ? summary.orders[0].numOrders : 0}
              </div>
            </li>
            <li>
              <div className="summary-title color3">
                <span>
                  <i className="fa fa-money" /> Sales
                </span>
              </div>
              <div className="summary-body">
                Rs.
                {summary.orders[0]
                  ? summary.orders[0].totalSales.toFixed(2)
                  : 0}
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div className="summary-title color1">
                <span>
                  <i className="fa fa-pencil-square-o" /> Uploaded Prescriptions
                </span>
              </div>
              {successDeliver ? (
                <MessageBox variant="success">
                  Order Dispatched Successfully
                </MessageBox>
              ) : (
                <MessageBox variant="danger">{errorDeliver}</MessageBox>
              )}
              {loadingPrescriptions ? (
                <LoadingBox />
              ) : (
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADDRESS</th>
                        <th>DELIVERY TYPE</th>
                        <th>IMAGE</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prescriptions.map((prescriptions) => {
                        if (prescriptions.isDelivered === false) {
                          return (
                            <tr key={prescriptions._id}>
                              <td>{prescriptions.name}</td>
                              <td>{prescriptions.email}</td>
                              <td>{prescriptions.address}</td>
                              <td>
                                {prescriptions.isdeliver === true &&
                                prescriptions.isPickup === true
                                  ? 'BOTH'
                                  : prescriptions.isdeliver
                                  ? 'DELIVERY'
                                  : 'PICKUP'}
                              </td>

                              <td>
                                <img
                                  className="prescriptions-image"
                                  src={prescriptions.image}
                                  alt="click here to large"
                                  onClick={() =>
                                    imageClickHandler(
                                      prescriptions.name,
                                      prescriptions.image
                                    )
                                  }
                                ></img>
                              </td>
                              <td className="table-input-btn">
                                <input
                                  type="number"
                                  placeholder="Enter Total Price"
                                  onChange={(e) =>
                                    setTotalPrice(e.target.value)
                                  }
                                  required
                                ></input>
                                <button
                                  type="button"
                                  className="primary"
                                  onClick={() =>
                                    placeOrderHandler(prescriptions)
                                  }
                                >
                                  Place Order
                                </button>
                              </td>
                            </tr>
                          );
                        }
                        return null;
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </li>
          </ul>
          <div>
            <div>
              <h2>Sales</h2>
              {summary.dailyOrders.length === 0 ? (
                <MessageBox>No Sale</MessageBox>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="AreaChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Date', 'Sales'],
                    ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                  ]}
                ></Chart>
              )}
            </div>
          </div>
          <div>
            <h2>Categories</h2>
            {summary.productCategories.length === 0 ? (
              <MessageBox>No Category</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Category', 'Products'],
                  ...summary.productCategories.map((x) => [x._id, x.count]),
                ]}
              />
            )}
          </div>
        </>
      )}
      <Modal
        visible={modalVisible}
        width="800"
        height="700"
        effect="fadeInUp"
        onClickAway={closeModal}
      >
        <div className="card-body">
          <div className="row">
            <h1>Name : {modalHeader}</h1>
            <button className="close-modal" onClick={closeModal}>
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <img className="large-modal" src={modalImage} alt=""></img>
        </div>
      </Modal>
      <Modal
        visible={placeOrderModalVisible}
        width="800"
        height="550"
        effect="fadeInUp"
        onClickAway={closeModal}
      >
        <div className="card-body">
          <div className="form">
            <div>
              <label htmlFor="address">Order summary</label>
              <textarea
                id="address"
                rows="10"
                type="text"
                placeholder="Enter Your Delivery Address"
                value={orderSummaryText}
                onChange={(e) => setOrderSummaryText(e.target.value)}
              ></textarea>
            </div>
            <button
              type="button"
              className="primary"
              onClick={sendEmailHandler}
            >
              Send Email
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
