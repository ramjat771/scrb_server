import {getQuestion} from "../image_generate/math.mjs"
import {generateImageBuffer} from "../image_generate/generate/img_gen.mjs"
import {uploadBufferToCloudinary} from "../image_generate/upload_to_server.mjs"
import {postInstagramImage} from "../instagram/instagramPost.service.mjs"
import {generateCaption} from "../image_generate/caption.mjs"
export function startBackgroundTask() {
  const runTask = async () => {
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

      try {
        await postInstagramImage({
          caption: generateCaption(),
          imageUrl:
            uploadResult.secure_url,
        });

        console.log(
          "✅ Instagram Posted"
        );
      } catch (error) {
        console.log(
          "Instagram post error:",
          error
        );
      }
    } catch (error) {
      console.log(
        "❌ Background task error:",
        error
      );
    }

    // Random 30–90 minutes
    const nextMinutes =
      30 +
      Math.floor(
        Math.random() * 61
      );

    console.log(
      `⏰ Next post in ${nextMinutes} minutes`
    );

    setTimeout(
      runTask,
      nextMinutes *
        60 *
        1000
    );
  };

  // First run immediately
  runTask();
}