// controller/payment.controller.mjs
import * as service from "../services/payment.service.mjs";
import { successResponse, errorResponse } from "../utils/api_response.mjs";
//💰Add/Subtract/Update
export const paymentController = async (req, res, next) => {
  try {
    const result = await service.handlePayment(req.body);
    if (result.error) {
      return errorResponse(res, result.message, 400, null);
    }
    return successResponse(res, result.wallet, "Payment updated");
  } catch (err) {
    next(err);
  }
};
// 💵 Get Balance
export const getBalanceController = async (req, res, next) => {
  try {
    const data = await service.getBalance(req.params.id);
    if (!data) return errorResponse(res, "Wallet not found", 404);
    return successResponse(res, data, "Balance fetched");
  } catch (err) {
    next(err);
  }
};
// 📜 Get History
export const getHistoryController = async (req, res, next) => {
  try {
    const data = await service.getHistory(req.params.id);
    if (!data) return errorResponse(res, "Wallet not found", 404);
    return successResponse(res, data, "History fetched");
  } catch (err) {
    next(err);
  }
};