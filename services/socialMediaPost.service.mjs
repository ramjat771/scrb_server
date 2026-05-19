// services/socialMediaPost.service.mjs

import * as repo from "../repositories/socialMediaPost.repo.mjs";

// ➕ Create
export const createSocialMediaPost = async (
  payload
) => {
  if (!payload) {
    return {
      error: true,
      message: "Request body missing",
    };
  }

  const {
    id,
    text,
    image,
    url,
    scheduleTimeAndDate,
    description,
  } = payload;

  if (!id) {
    return {
      error: true,
      message: "ID is required",
    };
  }

  if (!scheduleTimeAndDate) {
    return {
      error: true,
      message: "scheduleTimeAndDate is required",
    };
  }

  const alreadyExist =
    await repo.getByIdRepo(id);

  if (alreadyExist) {
    return {
      error: true,
      message: "ID already exists",
    };
  }

  const data = await repo.createRepo({
    id,
    text,
    image,
    url,
    description,
    scheduleTimeAndDate,
  });

  return {
    success: true,
    data,
  };
};

// 📄 Get All
export const getAllSocialMediaPosts =
  async () => {
    return await repo.getAllRepo();
  };

// 🔍 Get Single
export const getSocialMediaPostById =
  async (id) => {
    return await repo.getByIdRepo(id);
  };

// ✏️ Update
export const updateSocialMediaPost =
  async (id, payload) => {
    const alreadyExist =
      await repo.getByIdRepo(id);

    if (!alreadyExist) {
      return {
        error: true,
        message:
          "Social media post not found",
      };
    }

    const updated = await repo.updateRepo(
      id,
      payload
    );

    return {
      success: true,
      data: updated,
    };
  };

// ❌ Delete
export const deleteSocialMediaPost =
  async (id) => {
    return await repo.deleteRepo(id);
  };