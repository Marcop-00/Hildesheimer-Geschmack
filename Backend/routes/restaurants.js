const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getRestaurants,
  createRestaurant,
  getRestaurantByOwnerId,
  getRestaurantById,
  updateRestaurant,
  uploadRestaurantImage,
  uploadRestaurantMenu,
  getCommentsByRestaurantId,
  createCommentbyRestaurantId,
  getRatingByRestaurantId,
  getAverageRatingByRestaurantId,
  createRatingByRestaurantId,
  updateRatingByRestaurantId,
  addRestaurantToFavorites,
  removeFavoriteRestaurant,
  deleteRestaurantByOwnerId
} = require("../controllers/restaurantsController");

const { uploadProfileImage } = require("../controllers/usersController");

// List all restaurants
router.get("/", getRestaurants);

// Get a restaurant by ID
router.get("/:id", getRestaurantById);

// Create a new restaurant
router.post("/createrestaurant/:id", createRestaurant);

//get restaurant by owner id
router.get('/owner/:id', getRestaurantByOwnerId);

// Update a restaurant by ID
router.put("/:id", updateRestaurant);
// Upload a restaurant image
const storage = multer.diskStorage({
  destination: "assets/restaurants/images", // Directly set the path
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  file.mimetype.startsWith("image/")
    ? cb(null, true)
    : cb(new Error("Only image files are allowed"), false);
};

const upload = multer({ storage, fileFilter });

router.post("/:id/upload", upload.single("image"), uploadRestaurantImage);

const storagePdf = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../assets/restaurants/menus"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  }
});

const filePdfFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const uploadPdf = multer({
  storage: storagePdf,
  fileFilter: filePdfFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post("/:id/uploadmenu", uploadPdf.single('menu'), uploadRestaurantMenu);

// Get comments by restaurant id
router.get("/:id/comments", getCommentsByRestaurantId);

// Create a comment by restaurant id
router.post("/:id/comments", createCommentbyRestaurantId);
// Get rating by restaurant id and user id
router.get("/:id/rating/:userId", getRatingByRestaurantId);

router.get("/:id/rating", getAverageRatingByRestaurantId);
// Create rating by restaurant id and user id
router.post("/:id/rating/:userId", createRatingByRestaurantId);
// Update rating by restaurant id and user id
router.put("/:id/rating/:userId", updateRatingByRestaurantId);

router.post("/:id/favorite", addRestaurantToFavorites);

router.delete("/:id/favorite/:userId", removeFavoriteRestaurant);

router.delete("/delete-restaurant/:id", deleteRestaurantByOwnerId);

module.exports = router;
