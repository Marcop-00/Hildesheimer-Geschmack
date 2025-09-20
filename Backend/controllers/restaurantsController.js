const prisma = require("../prismaClient");

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        ratings: {
          select: { value: true }, // Fetch all ratings for each restaurant
        },
      },
    });

    // Compute the average rating dynamically
    const restaurantsWithAvgRating = restaurants.map((restaurant) => {
      const ratingValues = restaurant.ratings.map((r) => r.value);
      const avgRating =
        ratingValues.length > 0
          ? ratingValues.reduce((sum, value) => sum + value, 0) / ratingValues.length
          : 0; // Default to 0 if no ratings

      return {
        ...restaurant,
        avgRating, // Add avgRating dynamically
      };
    });

    res.json(restaurantsWithAvgRating);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
  try {
    // Extract restaurant details from request body
    const {
      name,
      description,
      address,
      workingHour,
      website,
      phone,
      cuisineType,
      glutenFree,
      lactoseFree,
      soyFree,
    } = req.body;

    // Extract `ownerId` from request parameters
    const idOwner = parseInt(req.params.id);

    if (!idOwner) {
      return res.status(400).json({ error: "Owner ID is required." });
    }

    // Create restaurant in the database
    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        description,
        address,
        workingHour,
        website,
        phone,
        cuisineType,
        glutenFree,
        lactoseFree,
        soyFree,
        owner: {
          connect: {
            id: idOwner,
          },
        },
      },
    });

    res.status(201).json(restaurant);
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the restaurant." });
  }
};

exports.getRestaurantByOwnerId = async (req, res) => {
  try {
    const ownerId = Number(req.params.id); // Convert to number

    if (isNaN(ownerId)) {
      return res.status(400).json({ error: "Invalid ownerId provided." });
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: { ownerId }, // Ensure it's a number
    });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};



exports.getRestaurantById = async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.id);

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: restaurantId,
      },
    });

    await prisma.restaurant.update({
      where: { id: restaurantId },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
    
    if (!restaurant) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user." });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      address,
      workingHour,
      website,
      phone,
      cuisineType,
      glutenFree,
      lactoseFree,
      soyFree,
    } = req.body;

    const restaurant = await prisma.restaurant.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        description,
        address,
        workingHour,
        website,
        phone,
        cuisineType,
        glutenFree,
        lactoseFree,
        soyFree,
      },
    });

    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the restaurant." });
  }
};

exports.uploadRestaurantImage = async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.id);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imageUrl = `http://localhost:3000/assets/restaurants/images/${req.file.filename}`;

    // Update user record in the database
    await prisma.restaurant.update({
      where: { id: restaurantId },
      data: { image: imageUrl },
    });

    res.status(200).json({ message: "Image uploaded successfully", imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "An error occurred during upload." });
  }
};

exports.uploadRestaurantMenu = async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.id);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const menuUrl = `http://localhost:3000/assets/restaurants/menus/${req.file.filename}`;

    // Update user record in the database
    await prisma.restaurant.update({
      where: { id: restaurantId },
      data: { menu: menuUrl },
    });

    res.status(200).json({ message: "Image uploaded successfully", menuUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "An error occurred during upload." });
  }
};

exports.getCommentsByRestaurantId = async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.id);

    const comments = await prisma.comment.findMany({
      where: { restaurantId },
      include: {
        user: {
          select: {
            name: true, // Fetch only the user's name
            image: true, // Optional: Include the user image
          },
        },
      },
    });

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

exports.createCommentbyRestaurantId = async (req, res) => {
  try {
    const restaurantId = Number(req.params.id); // Ensure it's a valid number
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res
        .status(400)
        .json({ error: "User ID and content are required." });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        user: {
          connect: { id: userId },
        },
        restaurant: {
          connect: { id: restaurantId },
        },
        
      },
      include: { user: true }, // Include user details in the response
    });
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: restaurantId },
      data: {
        commentCount: {
          increment: 1, // Increment the comment count by 1
        },
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getRatingByRestaurantId = async (req, res) => {
  try {
    const restId = parseInt(req.params.id);
    const usId = parseInt(req.params.userId);

    const rating = await prisma.rating.findUnique({
      where: {
        restaurantId_userId: { restaurantId: restId, userId: usId },
      },
    });

    res.json(rating || null); // ✅ Returns `null` if no rating found
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch rating" });
  }
};

exports.getAverageRatingByRestaurantId = async (req, res)=>{
  try {
    const restId = parseInt(req.params.id);

    const ratings = await prisma.rating.findMany({
      where: { restaurantId: restId },
    });

    const total = ratings.reduce((acc, rating) => acc + rating.value, 0);
    const average = total / ratings.length;

    res.send(average.toFixed(0));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch rating" });
  }
};

exports.createRatingByRestaurantId = async (req, res) => {
  try {
    const restId = parseInt(req.params.id);
    const usId = parseInt(req.params.userId);
    const { value } = req.body;

    const newRating = await prisma.rating.create({
      data: {
        value,
        user: {
          connect: { id: usId },
        },
        restaurant: {
          connect: { id: restId },
        },
      },
    });

    res.status(201).json(newRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create rating" });
  }
};

exports.updateRatingByRestaurantId = async (req, res) => {
  try {
    const restId = parseInt(req.params.id);
    const usId = parseInt(req.params.userId);
    const { value } = req.body;

    const newRating = await prisma.rating.update({
      where: {
        restaurantId_userId: { restaurantId: restId, userId: usId },
      },
      data: {
        value,
      },
    });

    res.status(201).json(newRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create rating" });
  }
};

exports.addRestaurantToFavorites = async (req, res) => {
  try {
    const userId = Number(req.body.userId);
    const restaurantId = Number(req.params.id);

    if (!userId || !restaurantId) {
      return res.status(400).json({ error: "User ID and Restaurant ID are required." });
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if the restaurant exists
    const restaurant = await prisma.restaurant.findUnique({ where: { id: restaurantId } });
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }

    // Add the restaurant to the user's favorite list
    await prisma.user.update({
      where: { id: userId },
      data: {
        favorites: {
          connect: { id: restaurantId },
        },
      },
    });

    // Increment the favoriteCount in the Restaurant model
    await prisma.restaurant.update({
      where: { id: restaurantId },
      data: {
        favoriteCount: {
          increment: 1,
        },
      },
    });

    res.status(200).json({ message: "Restaurant added to favorites successfully." });
  } catch (error) {
    console.error("Error adding restaurant to favorites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.removeFavoriteRestaurant = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const restaurantId = Number(req.params.id);

    // Update the user's favorites by disconnecting the restaurant
    await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        favorites: {
          disconnect: { id: Number(restaurantId) }
        }
      }
    });
    await prisma.restaurant.update({
      where: { id: restaurantId },
      data: {
        favoriteCount: {
          decrement: 1,
        },
      },
    });

    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteRestaurantByOwnerId = async (req, res) => {
  try {
      const ownerId = parseInt(req.params.id);

      // Check if restaurant exists for the given owner
      const restaurant = await prisma.restaurant.findUnique({
          where: { ownerId },
          include: {
              comments: true,
              ratings: true,
              favoritedBy: true,
          },
      });

      if (!restaurant) {
          return res.status(404).json({ message: "Restaurant not found for this owner" });
      }

      // Delete related data first (if any)
      await prisma.comment.deleteMany({
          where: { restaurantId: restaurant.id }
      });

      await prisma.rating.deleteMany({
          where: { restaurantId: restaurant.id }
      });

      await prisma.restaurant.update({
          where: { id: restaurant.id },
          data: { favoritedBy: { set: [] } } // Remove all favorites associations
      });

      // Now, delete the restaurant
      await prisma.restaurant.delete({
          where: { id: restaurant.id }
      });

      return res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
      console.error("Error deleting restaurant:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
};




