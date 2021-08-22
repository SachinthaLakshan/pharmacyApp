import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js';
import Patient from '../models/patientModal.js';

const patientRouter = express.Router();

patientRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const patient = new Patient({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      contactNumber: req.body.contactNumber,
      timeSlot: req.body.timeSlot,
      totalPrice: req.body.totalPrice,
      zoomLink: 'zoom link',
      prescriptionImage: req.body.prescriptionImage,
      isPaid: false,
    });
    const createdPatient = await patient.save();
    res.send({
      message: 'patient Created',
      patient: createdPatient,
    });
  })
);

export default patientRouter;
