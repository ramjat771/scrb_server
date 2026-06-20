import { getQuestion } from "../image_generate/math.mjs";
import { generateImageBuffer } from "../image_generate/generate/img_gen.mjs";
import { uploadBufferToCloudinary } from "../image_generate/upload_to_server.mjs";
import { postInstagramImage } from "../instagram/instagramPost.service.mjs";
import { generateCaption } from "../image_generate/caption.mjs";
import { getIndianDateTime } from "../utils/get_indiatime.mjs";

let nextPostTime = 0;
let nextPostTimeString = "";

function generateNextSchedule() {
  const minMinutes = 10;
  const maxMinutes = 50;

  const randomMinutes =
    Math.floor(
      Math.random() *
        (maxMinutes - minMinutes + 1)
    ) + minMinutes;

  nextPostTime =
    Date.now() +
    randomMinutes * 60 * 1000;

  nextPostTimeString =
    new Date(nextPostTime).toLocaleString(
      "en-IN",
      {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );

  console.log(
    `⏰ Next post scheduled at ${nextPostTimeString} IST`
  );

  return randomMinutes;
}

async function createPost() {
  try {
    console.log("📤 Starting post...");

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

    // Schedule next post BEFORE posting
    const randomMinutes =
      generateNextSchedule();

    const caption = `
${getIndianDateTime()}

${generateCaption()}

⏭ Next Challenge:
${nextPostTimeString} IST
(~${randomMinutes} min)
`;

    const result =
      await postInstagramImage({
        caption,
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

  const delay =
    nextPostTime - Date.now();

  setTimeout(
    createPost,
    Math.max(delay, 1000)
  );
}

function startCountdownLogger() {
  setInterval(() => {
    if (!nextPostTime) return;

    const remaining =
      nextPostTime - Date.now();

    if (remaining <= 0) return;

    const minutes = Math.floor(
      remaining / 60000
    );

    const seconds = Math.floor(
      (remaining % 60000) / 1000
    );

    console.log(
      `⏳ Remaining: ${minutes}m ${seconds}s | Next: ${nextPostTimeString}`
    );
  }, 10000); // every 30 sec
}

export function startBackgroundTask() {
  console.log(
    "🚀 Auto posting started"
  );

  startCountdownLogger();
  createPost();
}