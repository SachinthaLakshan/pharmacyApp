import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../components/LodingBox';
import MessageBox from '../components/MessageBox';
import Modal from 'react-awesome-modal';
import {
  dispatchPrescriptionOrder,
  listPrescriptions,
} from '../actions/prescriptionAction';
import { PRESCRIPTION_ORDER_DISPATCH_RESET } from '../constants/prescriptionConstants';
import EmailSender from '../components/EmailSender';

export default function PrescriptionListScreen() {
  const prescriptionDispatch = useSelector(
    (state) => state.prescriptionDispatch
  );
  const { loading: loadingDispatch, error: errorDispatch } =
    prescriptionDispatch;
  const prescriptionlist = useSelector((state) => state.prescriptionlist);
  const { loading, error, prescriptions } = prescriptionlist;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalHeader, setModalHeader] = useState('not came');
  const [modalImage, setModalImage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loadingDispatch) {
      dispatch(listPrescriptions());
    }
    dispatch({ type: PRESCRIPTION_ORDER_DISPATCH_RESET });
  }, [dispatch, loadingDispatch]);

  const orderDispatchHandlear = (obj) => {
    if (window.confirm(`Are you sure to dispatch ${obj.name} 's order?`)) {
      dispatch(dispatchPrescriptionOrder(obj._id));
    }
  };
  const sendReminderHandlear = (obj) => {
    var templateParams = {
      email: obj.email,
      name: obj.name,
    };

    EmailSender.sendEmail('template_v456crk', templateParams);
  };
  const imageClickHandler = (name, image) => {
    setModalVisible(true);
    setModalHeader(name);
    setModalImage(image);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <div>
      <h1>Dispatched Prescription orders</h1>
      {loading || loadingDispatch ? (
        <LoadingBox></LoadingBox>
      ) : error || errorDispatch ? (
        <MessageBox variant="danger">{error || errorDispatch}</MessageBox>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADDRESS</th>
                <th>DELIVERY TYPE</th>
                <th>ORDER STATUS</th>
                <th>IMAGE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescriptions) => {
                if (prescriptions.isDelivered === true) {
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
                      <td
                        className={
                          prescriptions.isDispatched
                            ? 'alert-success'
                            : 'alert-danger'
                        }
                      >
                        {prescriptions.isDispatched ? (
                          <>
                            Delivered
                            <br />
                            {prescriptions.deliveredAt.substring(0, 10)}
                          </>
                        ) : (
                          'NOT Delivered'
                        )}
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
                        {!prescriptions.isDispatched ? (
                          <button
                            type="button"
                            className="primary"
                            onClick={() => orderDispatchHandlear(prescriptions)}
                          >
                            Dispatch
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="primary"
                            onClick={() => sendReminderHandlear(prescriptions)}
                          >
                            Send Reminder{' '}
                            <i class="fa fa-bell-o" aria-hidden="true"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
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
        </div>
      )}
    </div>
  );
}
