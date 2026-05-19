// routes/payment.routes.mjs
import { Router } from "express";
import * as controller from "../controller/payment.controller.mjs";
const router = Router();
router.post("/", controller.paymentController);
router.get("/:id/balance", controller.getBalanceController);
router.get("/:id/history", controller.getHistoryController);
export default router;