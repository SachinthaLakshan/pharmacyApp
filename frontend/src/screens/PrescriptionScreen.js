import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { createPrescription } from '../actions/prescriptionAction';
import LoadingBox from '../components/LodingBox';
import MessageBox from '../components/MessageBox';
import { PRESCRIPTION_CREATE_RESET } from '../constants/prescriptionConstants';

export default function PrescriptionScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [isdeliver, setIsdeliver] = useState(false);
  const [isPickup, setIsPickup] = useState(false);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const prescriptionCreate = useSelector((state) => state.prescriptionCreate);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const { loading, error, prescription } = prescriptionCreate;
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createPrescription({
        name,
        email,
        address,
        contactNumber,
        isdeliver,
        isPickup,
        message,
        image,
      })
    );
    if (prescription) {
      setUploadSuccess(true);
    }
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  useEffect(() => {
    if (uploadSuccess === true) {
      dispatch({ type: PRESCRIPTION_CREATE_RESET });
    }
  }, [uploadSuccess, dispatch]);
  return (
    <div>
      <img className="large" src="/images/upre.png" alt="uploadimage"></img>

      <div className="card">
        <div>
          <form className="form" onSubmit={submitHandler}>
            <div className="pre-header">
              <h1>
                Upload Your Prescription{'     '}
                <i class="fa fa-upload " aria-hidden="true"></i>
              </h1>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            {uploadSuccess && (
              <MessageBox variant="success">
                {' '}
                Prescription Successfully Uploaded
              </MessageBox>
            )}
            {loadingUpload && <LoadingBox></LoadingBox>}
            {errorUpload && (
              <MessageBox variant="danger">{errorUpload}</MessageBox>
            )}
            <>
              <div>
                <label htmlFor="name">Name</label>
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
                <div className="row start">
                  <label htmlFor="isdeliver">Need to deliver : </label>
                  <input
                    id="isdeliver"
                    type="checkbox"
                    onChange={(e) => setIsdeliver(e.target.checked)}
                    checked={isdeliver}
                  ></input>
                </div>
              </div>
              <div>
                <div className="row start">
                  <label htmlFor="isPickup">I will pickup : </label>
                  <input
                    id="isPickup"
                    type="checkbox"
                    onChange={(e) => setIsPickup(e.target.checked)}
                    checked={isPickup}
                  ></input>
                </div>
              </div>
              <div>
                <label htmlFor="imageFile">Image File</label>
                <input
                  type="file"
                  id="imageFile"
                  label="Choose Image"
                  onChange={uploadFileHandler}
                ></input>
              </div>
              <div>
                <label htmlFor="Comment">Comment or Message</label>
                <textarea
                  id="Comment"
                  rows="3"
                  type="text"
                  placeholder="Enter Comment or Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label></label>
                <button className="primary" type="submit">
                  Upload
                </button>
              </div>
            </>
          </form>
        </div>
      </div>
    </div>
  );
}
