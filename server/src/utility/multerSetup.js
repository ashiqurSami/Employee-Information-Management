// Multer setup for image uploading
const fs = require("fs");
const multer = require("multer");
const path = require("path");

exports.multerSetup = () => {
  const uploadDir = path.join(__dirname, "../uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create the 'uploads' directory if it doesn't exist
  }

  // Multer setup for image uploading
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir); // Use the dynamically created 'uploads' directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname); // Timestamp to make filenames unique
    },
  });
  const upload = multer({ storage });
  return upload;
};

// Ensure 'uploads' directory exists
