import PostSchedule from "../models/post_schedule.model.mjs";

import { getQuestion } from "../image_generate/math.mjs";
import { generateImageBuffer } from "../image_generate/generate/img_gen.mjs";
import { uploadBufferToCloudinary } from "../image_generate/upload_to_server.mjs";
import { postInstagramImage } from "../instagram/instagramPost.service.mjs";
import { generateCaption } from "../image_generate/caption.mjs";
import { getIndianDateTime } from "../utils/get_indiatime.mjs";
import { waitTimeout } from "../utils/wait_timeout.mjs";

let isProcessing = false;

function randomMinutes() {
  return (
    Math.floor(
      Math.random() * 41
    ) + 10
  );
}

async function scheduleNextPost() {
  const minutes =
    randomMinutes();

  const scheduledAt =
    new Date(
      Date.now() +
      minutes *
      60 *
      1000
    );
 // immediate


  await PostSchedule.create({
    scheduledAt,
  });

  console.log(
    `⏰ Next Post Scheduled: ${scheduledAt}`
  );
}

async function acquirePost() {
  return PostSchedule.findOneAndUpdate(
    {
      status: "PENDING",
      scheduledAt: {
        $lte: new Date(),
      },
    },
    {
      status: "PROCESSING",
    },
    {
      sort: {
        scheduledAt: 1,
      },
      returnDocument: "after",
    }
  );
}

async function processPost(
  schedule
) {
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

  const upload =
    await waitTimeout(
      uploadBufferToCloudinary(
        imageBuffer,
        "social-post"
      ),
      20000,
      "Cloudinary timeout"
    );

  const caption = `
${getIndianDateTime()}

${generateCaption()}
`;

  const result =
    await waitTimeout(
      postInstagramImage({
        caption,
        imageUrl:
          upload.secure_url,
      }),
      20000,
      "Instagram timeout"
    );

  if (!result.success) {
    throw new Error(
      result.error ||
      "Instagram failed"
    );
  }

  await PostSchedule.findByIdAndUpdate(
    schedule._id,
    {
      status: "SUCCESS",
      completedAt:
        new Date(),
    }
  );

  console.log(
    "✅ Instagram Posted"
  );

  await scheduleNextPost();
}

async function worker() {
  if (isProcessing) return;

  isProcessing = true;

  try {
    const schedule =
      await acquirePost();

  
if (!schedule) return;

console.log(
  "📤 Processing Post:",
  schedule._id
);

try {
  await processPost(
    schedule
  );
} catch (error) {
  console.error(
    error.message
  );

  await PostSchedule.findByIdAndUpdate(
    schedule._id,
    {
      status: "PENDING",
      lastError:
        error.message,
      $inc: {
        retryCount: 1,
      },
    }
  );
}


  } finally {
    isProcessing = false;
  }
}

export async function startBackgroundTask() {
  const pending =
    await PostSchedule.countDocuments(
      {
        status: "PENDING",
      }
    );

  if (!pending) {
    await scheduleNextPost();
  }

  setInterval(
    worker,
    30000
  );

  worker();

  console.log(
    "🚀 Background Worker Started"
  );
}
