import PostSchedule from "../models/post_schedule.model.mjs";
import { getQuestion } from "../image_generate/math.mjs";
import { generateImageBuffer } from "../image_generate/generate/img_gen.mjs";
import { uploadBufferToCloudinary } from "../image_generate/upload_to_server.mjs";
import { postInstagramImage } from "../instagram/instagramPost.service.mjs";
import { generateCaption } from "../image_generate/caption.mjs";
import { getIndianDateTime } from "../utils/get_indiatime.mjs";
import { waitTimeout } from "../utils/wait_timeout.mjs";

let isProcessing = false;

const MAX_RETRY_COUNT = 5;
const WORKER_INTERVAL = 30000;

function randomMinutes() {
  return Math.floor(Math.random() * 41) + 10;
}

async function scheduleNextPost() {
  const minutes = randomMinutes();

  const scheduledAt = new Date(
    Date.now() + minutes * 60 * 1000
  );

  await PostSchedule.create({
    scheduledAt,
  });

  console.log(
    `⏰ Next Post Scheduled: ${scheduledAt.toISOString()}`
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

async function processPost(schedule) {
  console.log(
    `[${schedule._id}] STEP-1 Generate Question`
  );

  const {
    question,
    optionA,
    optionB,
    optionC,
    optionD,
  } = getQuestion();

  console.log(
    `[${schedule._id}] STEP-2 Generate Image`
  );

  const imageBuffer =
    generateImageBuffer(
      question,
      optionA,
      optionB,
      optionC,
      optionD
    );

  console.log(
    `[${schedule._id}] STEP-3 Image Generated (${imageBuffer.length} bytes)`
  );

  console.log(
    `[${schedule._id}] STEP-4 Upload Start`
  );

  const upload = await waitTimeout(
    uploadBufferToCloudinary(
      imageBuffer,
      "social-post"
    ),
    30000,
    "Cloudinary timeout"
  );

  console.log(
    `[${schedule._id}] STEP-5 Upload Success`
  );

  const caption = `
${getIndianDateTime()}

${generateCaption()}
`;

  console.log(
    `[${schedule._id}] STEP-6 Instagram Start`
  );

  const result = await waitTimeout(
    postInstagramImage({
      caption,
      imageUrl:
        upload.secure_url,
    }),
    60000,
    "Instagram timeout"
  );

  console.log(
    `[${schedule._id}] STEP-7 Instagram Response`
  );

  if (!result.success) {
    throw new Error(
      result.error ||
      "Instagram publish failed"
    );
  }

  await PostSchedule.findByIdAndUpdate(
    schedule._id,
    {
      status: "SUCCESS",
      completedAt: new Date(),
      lastError: null,
    }
  );

  console.log(
    `[${schedule._id}] ✅ Post Success`
  );

  await scheduleNextPost();
}

async function handleFailure(
  schedule,
  error
) {
  const latest =
    await PostSchedule.findById(
      schedule._id
    );

  const retryCount =
    (latest?.retryCount || 0) + 1;

  console.error(
    `[${schedule._id}] ❌ Error:`,
    error.message
  );

  if (
    retryCount >=
    MAX_RETRY_COUNT
  ) {
    await PostSchedule.findByIdAndUpdate(
      schedule._id,
      {
        status: "FAILED",
        retryCount,
        lastError:
          error.message,
      }
    );

    console.log(
      `[${schedule._id}] 💀 Marked FAILED`
    );

    return;
  }

  await PostSchedule.findByIdAndUpdate(
    schedule._id,
    {
      status: "PENDING",
      retryCount,
      lastError:
        error.message,
    }
  );

  console.log(
    `[${schedule._id}] 🔄 Retry ${retryCount}/${MAX_RETRY_COUNT}`
  );
}

async function worker() {
  if (isProcessing) {
    console.log(
      "⚠ Worker already running"
    );
    return;
  }

  isProcessing = true;

  try {
    const schedule =
      await acquirePost();

    if (!schedule) {
      return;
    }

    console.log(
      `📤 Processing Post: ${schedule._id}`
    );

    try {
      await waitTimeout(
        processPost(schedule),
        120000,
        "Entire process timeout"
      );
    } catch (error) {
      await handleFailure(
        schedule,
        error
      );
    }
  } catch (error) {
    console.error(
      "Worker Error:",
      error
    );
  } finally {
    isProcessing = false;
  }
}

async function resetStuckJobs() {
  const result =
    await PostSchedule.updateMany(
      {
        status: "PROCESSING",
      },
      {
        status: "PENDING",
      }
    );

  if (
    result.modifiedCount > 0
  ) {
    console.log(
      `🧹 Recovered ${result.modifiedCount} stuck jobs`
    );
  }
}

export async function startBackgroundTask() {
  await resetStuckJobs();

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
    WORKER_INTERVAL
  );

  worker();

  console.log(
    "🚀 Background Worker Started"
  );
}