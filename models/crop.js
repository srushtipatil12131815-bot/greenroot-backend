const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  crop: { type: String, required: true },
  season: { type: String, required: true },
  area: { type: Number },
  expense: { type: Number },
  expectedYield: { type: Number },
  sowDate: { type: Date },
  status: { type: String, default: "Growing" },
}, { timestamps: true });

module.exports = mongoose.model("Crop", cropSchema); 