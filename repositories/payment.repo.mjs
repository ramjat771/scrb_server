// repositories/payment.repo.mjs
import Payment from "../models/payment.model.mjs";

// Get wallet
export const getByIdRepo = async (id) => {
  return await Payment.findOne({ id });
};
// Create wallet
export const createRepo = async (data) => {
  const payment = new Payment(data);
  return await payment.save();
};

// Update wallet
export const updateRepo = async (id, updateData) => {
  return await Payment.findOneAndUpdate(
    { id },
    updateData,
    { new: true }
  );
};