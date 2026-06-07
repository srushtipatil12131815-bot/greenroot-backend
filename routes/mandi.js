const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const { crop, state } = req.query;

    // Mock mandi data (Real API: data.gov.in)
    const mandiData = [
      {
        mandi: `${state} Main Mandi`,
        district: `${state} Central`,
        price: Math.floor(Math.random() * 3000) + 1500,
        min: Math.floor(Math.random() * 1500) + 1000,
        max: Math.floor(Math.random() * 4000) + 2000,
        modal: Math.floor(Math.random() * 3000) + 1500,
        trend: ["up", "down", "stable"][Math.floor(Math.random() * 3)],
        change: `₹${Math.floor(Math.random() * 200)}`,
      },
      {
        mandi: `${crop} Trade Center`,
        district: `${state} East`,
        price: Math.floor(Math.random() * 3000) + 1500,
        min: Math.floor(Math.random() * 1500) + 1000,
        max: Math.floor(Math.random() * 4000) + 2000,
        modal: Math.floor(Math.random() * 3000) + 1500,
        trend: ["up", "down", "stable"][Math.floor(Math.random() * 3)],
        change: `₹${Math.floor(Math.random() * 200)}`,
      },
      {
        mandi: `APMC ${state}`,
        district: `${state} West`,
        price: Math.floor(Math.random() * 3000) + 1500,
        min: Math.floor(Math.random() * 1500) + 1000,
        max: Math.floor(Math.random() * 4000) + 2000,
        modal: Math.floor(Math.random() * 3000) + 1500,
        trend: ["up", "down", "stable"][Math.floor(Math.random() * 3)],
        change: `₹${Math.floor(Math.random() * 200)}`,
      },
    ];

    res.json({ prices: mandiData });
  } catch (err) {
    res.status(500).json({ message: "Mandi error", error: err.message });
  }
});

module.exports = router; 