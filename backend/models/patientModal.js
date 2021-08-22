import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    timeSlot: { type: String, required: true },
    totalPrice: { type: Number, required: false },
    zoomLink: { type: String },
    prescriptionImage: { type: String },
    isPaid: { type: Boolean },
    paidAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
