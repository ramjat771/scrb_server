function drawWrappedText(
  ctx,
  text,
  centerX,
  startY,
  maxWidth,
  lineHeight
) {
  const words = text.split(" ");

  let line = "";
  const lines = [];

  for (const word of words) {
    const testLine =
      line + word + " ";

    const metrics =
      ctx.measureText(testLine);

    if (
      metrics.width >
        maxWidth &&
      line.length > 0
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
          index *
            lineHeight
      );
    }
  );
}