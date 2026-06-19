// services/instagramImagePost.service.mjs
import dotenv from "dotenv";
import axios from "axios";
import { getFacebookPageAccessToken } from "../facebook/facebookPage.token.mjs";
dotenv.config();
const IG_USER_ID = process.env.IG_USER_ID;
// 🚀 Instagram Image Post
export const postInstagramImage = async ({
  caption,
  imageUrl,
}) => {
  const PAGE_ACCESS_TOKEN =
    await getFacebookPageAccessToken();
  try {
    // =========================
    // STEP 1: Create Media Container
    // =========================
    const mediaResponse =
      await axios.post(
        `https://graph.facebook.com/v23.0/${IG_USER_ID}/media`,
        null,
        {
          params: {
            image_url: imageUrl,
            caption,
            access_token:
              PAGE_ACCESS_TOKEN,
          },
        }
      );

    console.log(
      "✅ Media Container Created:",
      mediaResponse.data
    );

    const creationId =
      mediaResponse.data.id;
await new Promise((resolve) =>
  setTimeout(resolve, 10000)
);
    // =========================
    // STEP 2: Publish Media
    // =========================
    const publishResponse =
      await axios.post(
        `https://graph.facebook.com/v23.0/${IG_USER_ID}/media_publish`,
        null,
        {
          params: {
            creation_id:
              creationId,
            access_token:
              PAGE_ACCESS_TOKEN,
          },
        }
      );

    console.log(
      "✅ Instagram Post Published:",
      publishResponse.data
    );

    return {
      success: true,
      data: publishResponse.data,
    };
  } catch (error) {
    console.log(
      "❌ Instagram Post Error:",
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