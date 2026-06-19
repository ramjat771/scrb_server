export function drawWrappedText(
  ctx,
  text,
  centerX,
  startY,
  maxWidth,
  lineHeight
) {
  const words = String(text).split(" ");

  let line = "";
  const lines = [];

  for (const word of words) {
    const testLine =
      line + word + " ";

    if (
      ctx.measureText(testLine)
        .width > maxWidth &&
      line.length
    ) {
      lines.push(line.trim());
      line = word + " ";
    } else {
      line = testLine;
    }
  }

  lines.push(line.trim());

  lines.forEach(
    (currentLine, index) => {
      ctx.fillText(
        currentLine,
        centerX,
        startY +
          index * lineHeight
      );
    }
  );
}