// services/twitter.service.mjs

import dotenv from "dotenv";
import { TwitterApi } from "twitter-api-v2";

dotenv.config();

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

// 🚀 Export Function
export const postTweet = async ({
  text,
}) => {
  try {
    const tweet = await client.v2.tweet(
      text
    );

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