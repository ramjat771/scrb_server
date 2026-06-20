import { getQuestion } from "../image_generate/math.mjs";
import { generateImageBuffer } from "../image_generate/generate/img_gen.mjs";
import { uploadBufferToCloudinary } from "../image_generate/upload_to_server.mjs";
import { postInstagramImage } from "../instagram/instagramPost.service.mjs";
import { generateCaption } from "../image_generate/caption.mjs";

async function createPost() {
  try {
    const {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
    } = getQuestion();

    const imageBuffer =
      generateImageBuffer(
        question,
        optionA,
        optionB,
        optionC,
        optionD
      );

    const uploadResult =
      await uploadBufferToCloudinary(
        imageBuffer,
        "social-post"
      );

    console.log(
      "✅ Uploaded:",
      uploadResult.secure_url
    );

    const result =
      await postInstagramImage({
        caption: generateCaption(),
        imageUrl:
          uploadResult.secure_url,
      });

    if (result.success) {
      console.log(
        "✅ Instagram Posted"
      );
    } else {
      console.log(
        "❌ Instagram Failed",
        result.error
      );
    }
  } catch (error) {
    console.log(
      "❌ Background task error:",
      error
    );
  }
}

export function startBackgroundTask() {
  // First post immediately
  createPost();

  // Then every 55 minutes
  setInterval(
    createPost,
    55 * 60 * 1000
  );

  console.log(
    "🚀 Auto posting started (every 55 minutes)"
  );
}