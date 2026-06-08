const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://greenroot-frontend-self.vercel.app",
    "https://greenroot-frontend-f4xde5olz-srushtipatil12131815-bots-projects.vercel.app",
    "https://greenroot-frontend-rok5rv7vz-srushtipatil12131815-bots-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./routes/auth");
const diseaseRoutes = require("./routes/disease");
const chatRoutes = require("./routes/chat");
const weatherRoutes = require("./routes/weather");
const mandiRoutes = require("./routes/mandi");
const schemeRoutes = require("./routes/schemes");
const dashboardRoutes = require("./routes/dashboard");

app.use("/api/auth", authRoutes);
app.use("/api/disease", diseaseRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/mandi", mandiRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "🌿 GreenRoot Backend Running!" });
});

// MongoDB Connect
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected!");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
  }); 