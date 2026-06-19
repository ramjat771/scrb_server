// img_gen.mjs

import { createCanvas } from "canvas";
import { THEMES } from "./themes.mjs";
import { BADGES } from "./badges.mjs";
import { CARD_COLORS } from "./card_colors.mjs";
import { drawWrappedText } from "./drawWrappedText.mjs";
import { roundRect } from "./roundRect.mjs";

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
  // RANDOM THEME
  // =========================

  const theme =
    THEMES[
      Math.floor(
        Math.random() *
          THEMES.length
      )
    ];

  const badge =
    BADGES[
      Math.floor(
        Math.random() *
          BADGES.length
      )
    ];

  // =========================
  // BACKGROUND
  // =========================

  const bg =
    ctx.createLinearGradient(
      0,
      0,
      width,
      height
    );

  bg.addColorStop(
    0,
    theme.bg1
  );

  bg.addColorStop(
    0.5,
    theme.bg2
  );

  bg.addColorStop(
    1,
    theme.bg3
  );

  ctx.fillStyle = bg;
  ctx.fillRect(
    0,
    0,
    width,
    height
  );

  // =========================
  // GLOW EFFECT
  // =========================

  const glow =
    ctx.createRadialGradient(
      width / 2,
      220,
      50,
      width / 2,
      220,
      500
    );

  glow.addColorStop(
    0,
    `${theme.accent}55`
  );

  glow.addColorStop(
    1,
    "transparent"
  );

  ctx.fillStyle = glow;

  ctx.fillRect(
    0,
    0,
    width,
    height
  );

  // =========================
  // BORDER
  // =========================

  ctx.strokeStyle =
    theme.accent;

  ctx.lineWidth = 10;

  roundRect(
    ctx,
    25,
    25,
    width - 50,
    height - 50,
    40
  );

  ctx.stroke();

  ctx.strokeStyle =
    "rgba(255,255,255,0.15)";

  ctx.lineWidth = 2;

  roundRect(
    ctx,
    45,
    45,
    width - 90,
    height - 90,
    30
  );

  ctx.stroke();

  // =========================
  // BADGE
  // =========================

  ctx.fillStyle =
    theme.accent;

  roundRect(
    ctx,
    760,
    60,
    250,
    60,
    18
  );

  ctx.fill();

  ctx.fillStyle = "#000";

  ctx.textAlign =
    "center";

  ctx.font =
    "bold 26px Arial";

  ctx.fillText(
    badge,
    885,
    100
  );

  // =========================
  // HEADER
  // =========================

  ctx.fillStyle =
    theme.accent;

  ctx.font =
    "bold 54px Arial";

  ctx.fillText(
    theme.title,
    width / 2,
    150
  );

  // =========================
  // QUESTION BOX
  // =========================

  ctx.fillStyle =
    "rgba(255,255,255,0.08)";

  roundRect(
    ctx,
    60,
    190,
    width - 120,
    250,
    35
  );

  ctx.fill();

  ctx.strokeStyle =
    "rgba(255,255,255,0.15)";

  ctx.lineWidth = 2;

  ctx.stroke();

  // =========================
  // QUESTION
  // =========================

  ctx.fillStyle =
    "#FFFFFF";

  ctx.font =
    "bold 80px Arial";

  ctx.shadowColor =
    "rgba(0,0,0,0.7)";

  ctx.shadowBlur = 30;

  drawWrappedText(
    ctx,
    question,
    width / 2,
    300,
    850,
    90
  );

  ctx.shadowBlur = 0;

  // =========================
  // OPTIONS
  // =========================

  const options = [
    `A) ${optionA}`,
    `B) ${optionB}`,
    `C) ${optionC}`,
    `D) ${optionD}`,
  ];

  const optionWidth = 410;
  const optionHeight = 125;

  options.forEach(
    (option, index) => {
      const row =
        Math.floor(index / 2);

      const col = index % 2;

      const x =
        80 + col * 460;

      const y =
        510 +
        row * 180;

      const colors =
        CARD_COLORS[
          Math.floor(
            Math.random() *
              CARD_COLORS.length
          )
        ];

      const cardBg =
        ctx.createLinearGradient(
          x,
          y,
          x + optionWidth,
          y + optionHeight
        );

      cardBg.addColorStop(
        0,
        colors[0]
      );

      cardBg.addColorStop(
        1,
        colors[1]
      );

      ctx.fillStyle =
        cardBg;

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
        y + 78
      );
    }
  );

  // =========================
  // DECORATIVE CIRCLES
  // =========================

  for (
    let i = 0;
    i < 25;
    i++
  ) {
    ctx.beginPath();

    ctx.fillStyle =
      "rgba(255,255,255,0.06)";

    ctx.arc(
      Math.random() *
        width,
      Math.random() *
        height,
      Math.random() *
        12,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }

  // =========================
  // FOOTER
  // =========================

  ctx.fillStyle =
    theme.accent;

  ctx.font =
    "bold 40px Arial";

  ctx.fillText(
    "🔥 Can You Solve It?",
    width / 2,
    960
  );

  ctx.fillStyle =
    "rgba(255,255,255,0.85)";

  ctx.font =
    "28px Arial";

  ctx.fillText(
    "Comment Your Answer Below 👇",
    width / 2,
    1010
  );

  return canvas.toBuffer(
    "image/png"
  );
}