// services/facebookImagePost.service.mjs

import dotenv from "dotenv";
import axios from "axios";
import { getFacebookPageAccessToken } from "./facebookPage.token.mjs";

dotenv.config();

const PAGE_ID =
  process.env.PAGE_ID;



// 🚀 Facebook Image Post
export const postFacebookImage =
  async ({
    caption,
    imageUrl,
  }) => {
    const PAGE_ACCESS_TOKEN = await getFacebookPageAccessToken();
    try {
      const response =
        await axios.post(
          `https://graph.facebook.com/v23.0/${PAGE_ID}/photos`,
          null,
          {
            params: {
              caption,
              url: imageUrl,
              access_token:
                PAGE_ACCESS_TOKEN,
            },
          }
        );

      console.log(
        "✅ Facebook Image Posted:",
        response.data
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.log(
        "❌ Facebook Image Error:",
        error.response?.data ||
          error.message
      );

      return {
        success: false,
        error:
          error.response?.data ||
          error.message,
      };
    }
  };