// models/payment.model.mjs
import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["add", "subtract", "update"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  balanceAfter: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const paymentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    transactions: [transactionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);