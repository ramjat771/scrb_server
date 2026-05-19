// controller/socialMediaPost.controller.mjs

import * as service from "../services/socialMediaPost.service.mjs";

import {
  successResponse,
  errorResponse,
} from "../utils/api_response.mjs";

// ➕ Create
export const createSocialMediaPostController =
  async (req, res, next) => {
    try {
      const result =
        await service.createSocialMediaPost(
          req.body
        );

      if (result.error) {
        return errorResponse(
          res,
          result.message,
          400
        );
      }

      return successResponse(
        res,
        result.data,
        "Social media post created successfully"
      );
    } catch (error) {
      next(error);
    }
  };

// 📄 Get All
export const getAllSocialMediaPostController =
  async (req, res, next) => {
    try {
      const data =
        await service.getAllSocialMediaPosts();

      return successResponse(
        res,
        data,
        "All social media posts fetched"
      );
    } catch (error) {
      next(error);
    }
  };

// 🔍 Get Single
export const getSocialMediaPostByIdController =
  async (req, res, next) => {
    try {
      const data =
        await service.getSocialMediaPostById(
          req.params.id
        );

      if (!data) {
        return errorResponse(
          res,
          "Social media post not found",
          404
        );
      }

      return successResponse(
        res,
        data,
        "Social media post fetched"
      );
    } catch (error) {
      next(error);
    }
  };

// ✏️ Update
export const updateSocialMediaPostController =
  async (req, res, next) => {
    try {
      const result =
        await service.updateSocialMediaPost(
          req.params.id,
          req.body
        );

      if (result.error) {
        return errorResponse(
          res,
          result.message,
          400
        );
      }

      return successResponse(
        res,
        result.data,
        "Social media post updated successfully"
      );
    } catch (error) {
      next(error);
    }
  };

// ❌ Delete
export const deleteSocialMediaPostController =
  async (req, res, next) => {
    try {
      const data =
        await service.deleteSocialMediaPost(
          req.params.id
        );

      if (!data) {
        return errorResponse(
          res,
          "Social media post not found",
          404
        );
      }

      return successResponse(
        res,
        data,
        "Social media post deleted successfully"
      );
    } catch (error) {
      next(error);
    }
  };