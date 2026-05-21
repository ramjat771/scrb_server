// routes/socialMediaPost.routes.mjs

import { Router } from "express";

import * as controller from "../controller/socialMediaPost.controller.mjs";
import {
  upload
} from "../middlewares/multer.mjs"

import {
  filesToBody,
} from "../middlewares/file-to-body.middleware.mjs";

const router = Router();

// ➕ Create
router.post(
  "/",

    // ✅ Upload Image
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),

  // ✅ Convert File URL To Body
  filesToBody,

  controller.createSocialMediaPostController,
  
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