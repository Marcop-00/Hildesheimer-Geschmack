const prisma = require('../prismaClient');
const bcrypt = require('bcryptjs'); // Use bcryptjs instead of bcrypt
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.uploadProfileImage = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = `http://localhost:3000/assets/users/${req.file.filename}`;

    // Update user record in the database
    await prisma.user.update({
      where: { id: userId },
      data: { image: imageUrl },
    });

    res.status(200).json({ message: "Image uploaded successfully", imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "An error occurred during upload." });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user." });
  }
};

exports.getFavouriteRestaurants = async (req, res) => {
  const userId = parseInt(req.params.id);

  // Validate user ID
  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    // Fetch the user's favorite restaurants
    const userWithFavorites = await prisma.user.findUnique({
      where: { id: userId },
      include: { favorites: true }, // Include favorite restaurants
    });

    // Handle case where user does not exist
    if (!userWithFavorites) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the favorite restaurants
    return res.status(200).json(userWithFavorites.favorites);
  } catch (error) {
    console.error("Error fetching favorite restaurants:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Ensure at least one field is provided
    if (!name && !email && !password) {
      return res.status(400).json({ error: "No valid fields to update." });
    }

    let updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    res.json(updatedUser); // <-- No wrapping inside `updatedUser`
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Validate input data
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required." });
    }

    // 🔹 Check if the email already exists **before inserting**
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "CUSTOMER", // Default role is CUSTOMER if not provided
        image: '../../../assets/default_profile_image.jpg', // Provide a default image URL or handle it dynamically
      },
    });

    // Return the created user (excluding the password)
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "An error occurred while creating the user." });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An error occurred during login." });
  }
};

exports.getUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await prisma.user.findMany();

    // Return the users
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await prisma.feedback.findMany();
    if (feedbacks.length === 0) {
      return res.status(404).json({ message: "No feedbacks found" });
    }
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.submitFeedback = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const feedback = await prisma.feedback.create({
      data: {
        message,
      },
    });

    res.status(201).json(feedback);
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
