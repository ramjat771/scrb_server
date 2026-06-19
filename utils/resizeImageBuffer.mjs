import sharp from "sharp";

export const resizeImageBuffer =
  async (buffer) => {

    return await sharp(buffer)

      .resize(1080, 1350, {
        fit: "cover",
      })

      .jpeg({
        quality: 90,
      })

      .toBuffer();
  };