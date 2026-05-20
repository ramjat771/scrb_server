import dotenv from "dotenv";
import { TwitterApi } from "twitter-api-v2";
import axios from "axios";

dotenv.config();

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

export const postTweetWithImage =
  async ({
    text,
    image,
  }) => {
    try {

      let mediaId = null;

      // 🌄 Remote Image URL
      if (
        image &&
        image.startsWith("http")
      ) {

        const response =
          await axios.get(image, {
            responseType:
              "arraybuffer",
          });

        mediaId =
          await client.v1.uploadMedia(
            Buffer.from(
              response.data
            ),
            {
              mimeType:
                "image/jpeg",
            }
          );
      }

      // 🚀 Tweet
      const tweet =
        await client.v2.tweet({
          text,
          media: mediaId
            ? {
                media_ids: [
                  mediaId,
                ],
              }
            : undefined,
        });

      console.log(
        "✅ Tweet Posted:",
        tweet
      );

      return {
        success: true,
        data: tweet,
      };

    } catch (error) {

      console.log(
        "❌ Twitter Error:",
        error
      );

      return {
        success: false,
        error,
      };
    }
  };