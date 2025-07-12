import multer from "multer";
import path from "path";
import os from "os";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use os.tmpdir() for temporary storage
    cb(null, os.tmpdir());
  },
  filename: function (req, file, cb) {
    // Create unique filename to avoid conflicts
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Add file filter for images only
const fileFilter = (req, file, cb) => {
  // Check if file is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

export const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});