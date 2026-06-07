const express = require("express");
const router = express.Router();
const Crop = require("../models/Crop");
const authMiddleware = require("../middleware/auth");

// Get all crops for logged in user
router.get("/crops", authMiddleware, async (req, res) => {
  try {
    const crops = await Crop.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: "Error fetching crops", error: err.message });
  }
});

// Add new crop
router.post("/crops", authMiddleware, async (req, res) => {
  try {
    const { crop, season, area, expense, expectedYield, sowDate } = req.body;
    const newCrop = new Crop({
      user: req.user.id,
      crop, season, area, expense, expectedYield, sowDate,
    });
    await newCrop.save();
    res.status(201).json(newCrop);
  } catch (err) {
    res.status(500).json({ message: "Error adding crop", error: err.message });
  }
});

// Delete crop
router.delete("/crops/:id", authMiddleware, async (req, res) => {
  try {
    await Crop.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Crop deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting crop", error: err.message });
  }
});

// Get reminders (mock for now)
router.get("/reminders", authMiddleware, async (req, res) => {
  try {
    const reminders = [
      { text: "Apply fertilizer to wheat crop", date: "Tomorrow" },
      { text: "Irrigation scheduled for tomatoes", date: "In 2 days" },
      { text: "Harvest onion crop - market prices are high!", date: "This week" },
    ];
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reminders", error: err.message });
  }
});

module.exports = router; 