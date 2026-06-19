import { createCanvas } from "canvas";

export function generateImageBuffer(
  question,
  optionA,
  optionB,
  optionC,
  optionD
) {
  const width = 1080;
  const height = 1080;

  const canvas = createCanvas(
    width,
    height
  );

  const ctx =
    canvas.getContext("2d");

  // =========================
  // Background
  // =========================

  const bg =
    ctx.createLinearGradient(
      0,
      0,
      width,
      height
    );

  bg.addColorStop(0, "#0F172A");
  bg.addColorStop(0.5, "#312E81");
  bg.addColorStop(1, "#581C87");

  ctx.fillStyle = bg;
  ctx.fillRect(
    0,
    0,
    width,
    height
  );

  // Golden Glow

  const glow =
    ctx.createRadialGradient(
      width / 2,
      250,
      50,
      width / 2,
      250,
      500
    );

  glow.addColorStop(
    0,
    "rgba(255,215,0,0.2)"
  );

  glow.addColorStop(
    1,
    "rgba(255,215,0,0)"
  );

  ctx.fillStyle = glow;
  ctx.fillRect(
    0,
    0,
    width,
    height
  );

  // =========================
  // Borders
  // =========================

  ctx.strokeStyle =
    "#FFD700";
  ctx.lineWidth = 10;

  roundRect(
    ctx,
    30,
    30,
    width - 60,
    height - 60,
    40
  );

  ctx.stroke();

  ctx.strokeStyle =
    "rgba(255,255,255,0.3)";
  ctx.lineWidth = 2;

  roundRect(
    ctx,
    50,
    50,
    width - 100,
    height - 100,
    30
  );

  ctx.stroke();

  // =========================
  // Header
  // =========================

  ctx.textAlign = "center";

  ctx.fillStyle =
    "#FFD700";

  ctx.font =
    "bold 50px Arial";

  ctx.fillText(
    "🧠 TODAY'S CHALLENGE",
    width / 2,
    120
  );

  // =========================
  // Question Card
  // =========================

  ctx.fillStyle =
    "rgba(255,255,255,0.08)";

  roundRect(
    ctx,
    70,
    180,
    width - 140,
    260,
    30
  );

  ctx.fill();

  ctx.strokeStyle =
    "rgba(255,255,255,0.2)";

  ctx.lineWidth = 2;

  ctx.stroke();

  // =========================
  // Question
  // =========================

  ctx.fillStyle =
    "#FFFFFF";

  ctx.font =
    "bold 82px Arial";

  ctx.textAlign =
    "center";

  ctx.shadowColor =
    "rgba(0,0,0,0.7)";

  ctx.shadowBlur = 25;

  drawWrappedText(
    ctx,
    question,
    width / 2,
    300,
    850,
    95
  );

  ctx.shadowBlur = 0;

  // =========================
  // Options
  // =========================

  const options = [
    `A) ${optionA}`,
    `B) ${optionB}`,
    `C) ${optionC}`,
    `D) ${optionD}`,
  ];

  const optionWidth = 400;
  const optionHeight = 120;
  const startY = 520;

  options.forEach(
    (option, index) => {
      const row =
        Math.floor(index / 2);

      const col = index % 2;

      const x =
        80 + col * 470;

      const y =
        startY +
        row * 180;

      ctx.fillStyle =
        "rgba(255,255,255,0.10)";

      roundRect(
        ctx,
        x,
        y,
        optionWidth,
        optionHeight,
        25
      );

      ctx.fill();

      ctx.strokeStyle =
        "rgba(255,255,255,0.25)";

      ctx.lineWidth = 2;

      ctx.stroke();

      ctx.fillStyle =
        "#FFFFFF";

      ctx.font =
        "bold 42px Arial";

      ctx.textAlign =
        "center";

      ctx.fillText(
        option,
        x +
          optionWidth / 2,
        y + 75
      );
    }
  );

  // =========================
  // Footer
  // =========================

  ctx.fillStyle =
    "#FFD700";

  ctx.font =
    "bold 42px Arial";

  ctx.fillText(
    "🔥 Can You Solve It?",
    width / 2,
    970
  );

  ctx.fillStyle =
    "rgba(255,255,255,0.85)";

  ctx.font =
    "28px Arial";

  ctx.fillText(
    "Comment Your Answer Below 👇",
    width / 2,
    1020
  );

  return canvas.toBuffer(
    "image/png"
  );
}

// =========================
// Wrapped Text
// =========================

function drawWrappedText(
  ctx,
  text,
  centerX,
  startY,
  maxWidth,
  lineHeight
) {
  const words =
    text.split(" ");

  let line = "";

  const lines = [];

  for (const word of words) {
    const testLine =
      line + word + " ";

    const width =
      ctx.measureText(
        testLine
      ).width;

    if (
      width > maxWidth &&
      line.length > 0
    ) {
      lines.push(
        line.trim()
      );

      line =
        word + " ";
    } else {
      line = testLine;
    }
  }

  lines.push(
    line.trim()
  );

  lines.forEach(
    (currentLine, index) => {
      ctx.fillText(
        currentLine,
        centerX,
        startY +
          index *
            lineHeight
      );
    }
  );
}

// =========================
// Rounded Rectangle
// =========================

function roundRect(
  ctx,
  x,
  y,
  width,
  height,
  radius
) {
  ctx.beginPath();

  ctx.moveTo(
    x + radius,
    y
  );

  ctx.lineTo(
    x + width - radius,
    y
  );

  ctx.quadraticCurveTo(
    x + width,
    y,
    x + width,
    y + radius
  );

  ctx.lineTo(
    x + width,
    y + height - radius
  );

  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height
  );

  ctx.lineTo(
    x + radius,
    y + height
  );

  ctx.quadraticCurveTo(
    x,
    y + height,
    x,
    y + height - radius
  );

  ctx.lineTo(
    x,
    y + radius
  );

  ctx.quadraticCurveTo(
    x,
    y,
    x + radius,
    y
  );

  ctx.closePath();
}