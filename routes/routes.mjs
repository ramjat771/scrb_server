import { Router } from "express";
import payment from "./payment.routes.mjs"
import socialMediaPost from "./socialMediaPost.routes.mjs";
const router = Router();
router.use("/payment", payment)
router.use("/smp", socialMediaPost)


export default router;
