import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LodingBox';
import MessageBox from '../components/MessageBox';

import { createPatient } from '../actions/patientAction';
import { PATIENT_CREATE_RESET } from '../constants/patientConstants';

export default function DoctorScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const patientCreate = useSelector((state) => state.patientCreate);
  const dispatch = useDispatch();
  const { loading, error, patient } = patientCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createPatient({
        name,
        email,
        address,
        contactNumber,
        timeSlot,
        totalPrice: 1000,
      })
    );
  };

  useEffect(() => {
    dispatch({ type: PATIENT_CREATE_RESET });
  }, [dispatch]);
  return (
    <div>
      <div className="card">
        <div>
          <div className="form">
            <div className="col-3">
              <div
                className="pre-header-doctor"
                onClick={() => props.history.push(`/prescription`)}
              >
                <h1>Get 10% discount with Upoloading Prescription</h1>
                <button className="doctor">
                  Upoload Prescription{' '}
                  <i class="fa fa-upload " aria-hidden="true"></i>
                </button>
              </div>
              <h1>
                <i className="fa fa-user-md" aria-hidden="true"></i> Contact Dr.
                Asanga Dunuwille
              </h1>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            {patient && (
              <MessageBox variant="success">
                {' '}
                Prescription Successfully Uploaded
              </MessageBox>
            )}
          </div>
          <form className="form" onSubmit={submitHandler}>
            <>
              <div>
                <label htmlFor="name">Patient Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter name"
                  alue={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="price">Contact Number</label>
                <input
                  id="contactnumber"
                  type="text"
                  placeholder="Contact Number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  rows="4"
                  type="text"
                  placeholder="Enter Your Delivery Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label htmlFor="price">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="price">Choose Time slot</label>
                <select
                  id="dropdown"
                  placeholder="Select a time"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                >
                  <option value="0">Select a time</option>
                  <option value="1">6:30 PM - 7:00 PM</option>
                  <option value="2">7:00 PM - 7:30 PM</option>
                  <option value="3">8:00 PM - 8:30 PM</option>
                  <option value="4">9:00 PM - 9:30 PM</option>
                </select>
              </div>
              <div>
                <MessageBox>
                  Doctor channeling fee per patient Rs. 1000 /=
                </MessageBox>
              </div>
              <div>
                <label></label>
                <button className="primary" type="submit">
                  Proceed
                </button>
              </div>
            </>
          </form>
        </div>
      </div>
    </div>
  );
}
