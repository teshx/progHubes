import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import cors from "cors";
import sharp from "sharp";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer for file upload
const storage = multer.memoryStorage(); // Store file in memory before uploading
const upload = multer({ storage });

// Image Upload Endpoint
app.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Resize and convert to WebP format
    /**
     * Processes an image buffer using the Sharp library.
     * The image is resized to a width of 500 pixels and converted to the WebP format.
     *
     * @param {Buffer} file.buffer - The buffer of the image file to be processed.
     * @returns {Promise<Buffer>} - A promise that resolves to the processed image buffer.
     */
    const processedImage = await sharp(file.buffer)
      .resize(500) // Resize to 500px width (optional)
      .toFormat("webp")
      .toBuffer();

    // Upload to Cloudinary
    cloudinary.uploader
      .upload_stream({ folder: "uplodes" }, (error, result) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.json({ imageUrl: result.secure_url });
      })
      .end(processedImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/test-env", (req, res) => {
  res.json({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET ? "Exists" : "Missing",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
