// src/config/config.mjs
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../../.env") });
export const config = {
  port: process.env.PORT || 3000,
  MONGO_URL:process.env.MONGO_URL,
  CLOUD_NAME:process.env.CLOUD_NAME,
  CLOUD_API_KEY:process.env.CLOUD_API_KEY,
  CLOUD_API_SECRATE:process.env.CLOUD_API_SECRATE
};

