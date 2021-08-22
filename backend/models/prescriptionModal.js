import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    isdeliver: { type: Boolean, required: true },
    isPickup: { type: Boolean, required: true },
    message: { type: String, required: true },
    totalPrice: { type: Number, required: false },
    image: { type: String, required: true },
    isDelivered: { type: Boolean, default: false },
    isDispatched: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Prescription = mongoose.model('Prescription', prescriptionSchema);
export default Prescription;
