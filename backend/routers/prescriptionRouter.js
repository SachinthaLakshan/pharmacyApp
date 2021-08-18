import express from 'express';
import Prescription from '../models/prescriptionModal.js';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../utils.js';

const prescriptionRouter = express.Router();

prescriptionRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const prescription = new Prescription({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
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

prescriptionRouter.get(
  '/prescriptions',
  expressAsyncHandler(async (req, res) => {
    const prescriptions = await Prescription.find().populate(
      'prescription._id'
    );
    res.send(prescriptions);
  })
);

prescriptionRouter.put(
  '/prescriptions/:id/:price/deliver',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const prescription = await Prescription.findById(req.params.id);
    if (prescription) {
      prescription.totalPrice = req.params.price;
      prescription.isDelivered = true;
      prescription.deliveredAt = Date.now();

      const updatedPrescription = await prescription.save();
      res.send({
        message: 'Order Delivered',
        prescription: updatedPrescription,
      });
    } else {
      res.status(404).send({ message: 'prescription Not Found' });
    }
  })
);

export default prescriptionRouter;
