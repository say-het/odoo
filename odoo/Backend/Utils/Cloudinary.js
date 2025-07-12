import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import streamifier from "streamifier";

// Debug environment variables
console.log("=== CLOUDINARY ENV DEBUG ===");
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET);
console.log("CLOUDINARY_API_SECRET length:", process.env.CLOUDINARY_API_SECRET?.length);

// Configure cloudinary with explicit values
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Verify configuration was set
console.log("=== CLOUDINARY CONFIG VERIFICATION ===");
const config = cloudinary.config();
console.log("Configured cloud_name:", config.cloud_name);
console.log("Configured api_key:", config.api_key);
console.log("Configured api_secret:", config.api_secret ? "Set" : "Not set");

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("No file path provided");
      return null;
    }

    // Check if file exists
    if (!fs.existsSync(localFilePath)) {
      console.log("File does not exist at path:", localFilePath);
      return null;
    }

    console.log("Uploading file to Cloudinary:", localFilePath);
    
    // Explicitly pass configuration to ensure it's used
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "profile_pictures",
      use_filename: true,
      unique_filename: true,
      access_mode: "public",
      // Explicitly pass config if needed
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log("Cloudinary upload successful:", response.secure_url);
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    
    // Clean up local file if upload fails
    if (localFilePath && fs.existsSync(localFilePath)) {
      try {
        fs.unlinkSync(localFilePath);
      } catch (unlinkError) {
        console.error("Error deleting local file:", unlinkError);
      }
    }
    
    return null;
  }
};

const uploadBufferToCloudinary = (buffer, clientName) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw", // Because it's a PDF
        folder: "bills", // Optional: group in folder
        public_id: `${clientName.replace(/\s+/g, "_")}.pdf`, // Sanitize name
        use_filename: true,
        unique_filename: false,
        access_mode: "public",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export { uploadOnCloudinary, uploadBufferToCloudinary };