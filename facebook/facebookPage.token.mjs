// services/facebookPage.service.mjs

import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const PAGE_ID =
  process.env.PAGE_ID;

const USER_ACCESS_TOKEN =
  process.env.USER_ACCESS_TOKEN;

// 🚀 Get Single Page Data
export const getFacebookPageAccessToken =
  async () => {
    try {
      const response =
        await axios.get(
          `https://graph.facebook.com/v25.0/${PAGE_ID}`,
          {
            params: {
              fields:
                "id,name,access_token,instagram_business_account",
              access_token:
                USER_ACCESS_TOKEN,
            },
          }
        );

      return response.data.access_token;
    } catch (error) {
      console.log(
        "❌ Facebook Error:",
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