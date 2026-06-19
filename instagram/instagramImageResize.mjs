// utils/instagramImageResize.mjs
import sharp from "sharp";
import axios from "axios";
import path from "path";
import fs from "fs";

export const resizeInstagramImage =
  async (imageUrl) => {
    // uploads folder create
    if (
      !fs.existsSync("uploads")
    ) {
      fs.mkdirSync("uploads");
    }

    // image download
    const response =
      await axios({
        url: imageUrl,
        responseType: "arraybuffer",
      });

    const buffer = Buffer.from(
      response.data,
      "binary"
    );

    const fileName = `ig_${Date.now()}.jpg`;

    const outputPath = path.join(
      "uploads",
      fileName
    );

    // resize
    await sharp(buffer)
      .resize(1080, 1350, {
        fit: "cover",
      })
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    return fileName;
  };