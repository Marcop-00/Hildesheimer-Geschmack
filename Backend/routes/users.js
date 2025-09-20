const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authenticateToken = require("../middleware/authMiddleware");

const {
  getUserById,
  getUsers,
  getFavouriteRestaurants,
  createUser,
  loginUser,
  uploadProfileImage,
  updateUserById,
  submitFeedback,
  getFeedbacks
} = require("../controllers/usersController");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../assets/users"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

router.get("/", authenticateToken, getUsers);

// Get a user by ID
router.get("/:id", authenticateToken, getUserById);

// Get a user's favorite restaurants
router.get("/:id/favorite-restaurants", authenticateToken, getFavouriteRestaurants);

// User registration
router.post("/", createUser);

// User login
router.post("/login", loginUser);

// uploadProfileImage function
router.post("/:id/upload", upload.single("image"), uploadProfileImage);

// Update user by ID
router.put("/:id", updateUserById);

router.get("/feedbacks/fetch", authenticateToken, getFeedbacks);

router.post("/feedbacks", submitFeedback);

module.exports = router;
