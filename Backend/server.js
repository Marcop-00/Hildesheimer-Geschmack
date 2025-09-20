const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const path = require("path");
const PORT = 3000;

// CORS configuration - this should come before other middleware
app.use(
  cors({
    origin: "http://localhost:4200", // Your Angular app's URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

// Static assets
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
