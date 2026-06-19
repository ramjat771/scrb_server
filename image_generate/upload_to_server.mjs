import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/config.mjs";

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_API_SECRATE,
});

export const uploadBufferToCloudinary = (
  buffer,
  fileName = "social-post"
) => {
  return new Promise(
    (resolve, reject) => {
      const stream =
        cloudinary.uploader.upload_stream(
          {
            folder: "social-posts",
            public_id: `${fileName}_${Date.now()}`,
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }

            resolve(result);
          }
        );

      stream.end(buffer);
    }
  );
};