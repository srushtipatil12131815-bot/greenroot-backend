const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

const mockDiseases = [
  {
    disease: "Early Blight",
    severity: "Medium",
    description: "Early blight is a common fungal disease caused by Alternaria solani affecting tomato and potato plants.",
    treatment: "Remove infected leaves immediately. Apply copper-based fungicide every 7-10 days.",
    pesticide: "Mancozeb 75% WP @ 2g/litre of water",
    prevention: "Avoid overhead irrigation. Maintain proper plant spacing. Rotate crops every season."
  },
  {
    disease: "Powdery Mildew",
    severity: "Low",
    description: "Powdery mildew is a fungal disease that appears as white powdery spots on leaves and stems.",
    treatment: "Spray neem oil solution. Remove heavily infected plant parts.",
    pesticide: "Sulfur 80% WP @ 2g/litre of water",
    prevention: "Ensure good air circulation. Avoid excessive nitrogen fertilization."
  },
  {
    disease: "Leaf Rust",
    severity: "High",
    description: "Leaf rust is caused by fungal pathogens and appears as orange-brown pustules on leaf surfaces.",
    treatment: "Apply systemic fungicide immediately. Remove and destroy infected leaves.",
    pesticide: "Propiconazole 25% EC @ 1ml/litre of water",
    prevention: "Use rust-resistant varieties. Apply preventive fungicide spray."
  },
  {
    disease: "Healthy Crop",
    severity: "Low",
    description: "The crop appears healthy with no visible signs of disease or pest damage.",
    treatment: "No treatment required. Continue regular care.",
    pesticide: "No pesticide needed",
    prevention: "Maintain regular watering, proper fertilization and crop rotation."
  }
];

router.post("/detect", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    // Return random mock disease for demo
    const result = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Detection error", error: err.message });
  }
});

module.exports = router; 