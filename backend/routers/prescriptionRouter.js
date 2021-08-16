import express from 'express';
import Prescription from '../models/prescriptionModal.js';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js';

const prescriptionRouter = express.Router();

prescriptionRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const prescription = new Prescription({
      name: req.body.name,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      isdeliver: req.body.isdeliver,
      isPickup: req.body.isPickup,
      message: req.body.message,
      totalPrice: 0,
      image: req.body.image,
    });
    const createdPrescription = await prescription.save();
    res.send({
      message: 'prescription Created',
      prescription: createdPrescription,
    });
  })
);

export default prescriptionRouter;
