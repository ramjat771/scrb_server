// routes/socialMediaPost.routes.mjs

import { Router } from "express";

import * as controller from "../controller/socialMediaPost.controller.mjs";

const router = Router();

// ➕ Create
router.post(
  "/",
  controller.createSocialMediaPostController
);

// 📄 Get All
router.get(
  "/",
  controller.getAllSocialMediaPostController
);

// 🔍 Get Single
router.get(
  "/:id",
  controller.getSocialMediaPostByIdController
);

// ✏️ Update
router.patch(
  "/:id",
  controller.updateSocialMediaPostController
);

// ❌ Delete
router.delete(
  "/:id",
  controller.deleteSocialMediaPostController
);

export default router;