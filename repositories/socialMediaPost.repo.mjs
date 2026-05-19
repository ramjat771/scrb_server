// repositories/socialMediaPost.repo.mjs

import SocialMediaPost from "../models/socialMediaPost.model.mjs";

// ➕ Create
export const createRepo = async (payload) => {
  return await SocialMediaPost.create(payload);
};

// 📄 Get All
export const getAllRepo = async () => {
  return await SocialMediaPost.find().sort({
    createdAt: -1,
  });
};

// 🔍 Get By ID
export const getByIdRepo = async (id) => {
  return await SocialMediaPost.findOne({ id });
};

// ✏️ Update
export const updateRepo = async (id, payload) => {
  return await SocialMediaPost.findOneAndUpdate(
    { id },
    payload,
    {
      returnDocument: "after",
    }
  );
};

// ❌ Delete
export const deleteRepo = async (id) => {
  return await SocialMediaPost.findOneAndDelete({
    id,
  });
};

// ⏰ Get Pending Posts
export const getPendingPostsRepo = async (
  startDate,
  endDate
) => {
  return await SocialMediaPost.find({
    isProcessed: false,

    scheduleTimeAndDate: {
      $gte: startDate,
      $lte: endDate,
    },
  });
};

// ✅ Mark Processed
export const markProcessedRepo = async (id) => {
  return await SocialMediaPost.findOneAndUpdate(
    { id },
    {
      isProcessed: true,
    },
    {
      returnDocument: "after",
    }
  );
};