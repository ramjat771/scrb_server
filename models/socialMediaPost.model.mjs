// models/socialMediaPost.model.mjs

import mongoose from "mongoose";

const socialMediaPostSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    text: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    url: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    scheduleTimeAndDate: {
      type: Date,
      required: true,
      index: true,
    },

    isProcessed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "SocialMediaPost",
  socialMediaPostSchema
);