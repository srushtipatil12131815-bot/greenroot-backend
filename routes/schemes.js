const express = require("express");
const router = express.Router();

const allSchemes = [
  {
    name: "PM-KISAN",
    category: "direct",
    description: "Direct income support of ₹6,000 per year to farmer families in three installments.",
    benefit: "₹6,000/year",
    deadline: "Always Open",
    applyLink: "https://pmkisan.gov.in",
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana",
    category: "insurance",
    description: "Crop insurance scheme providing financial support to farmers suffering crop loss due to natural calamities.",
    benefit: "Up to full crop value",
    deadline: "Before sowing season",
    applyLink: "https://pmfby.gov.in",
  },
  {
    name: "Kisan Credit Card",
    category: "loan",
    description: "Provides farmers with affordable credit for agricultural needs at low interest rates.",
    benefit: "Loan up to ₹3 lakh @ 4%",
    deadline: "Always Open",
    applyLink: "https://www.nabard.org",
  },
  {
    name: "Soil Health Card Scheme",
    category: "subsidy",
    description: "Free soil testing and personalized fertilizer recommendations for better crop yield.",
    benefit: "Free soil testing",
    deadline: "Always Open",
    applyLink: "https://soilhealth.dac.gov.in",
  },
  {
    name: "PM Krishi Sinchai Yojana",
    category: "subsidy",
    description: "Provides irrigation facilities to every farm to ensure water availability.",
    benefit: "Subsidy on irrigation equipment",
    deadline: "Always Open",
    applyLink: "https://pmksy.gov.in",
  },
  {
    name: "National Agriculture Market (eNAM)",
    category: "direct",
    description: "Online trading platform for agricultural commodities to get better prices.",
    benefit: "Better market prices",
    deadline: "Always Open",
    applyLink: "https://enam.gov.in",
  },
  {
    name: "Paramparagat Krishi Vikas Yojana",
    category: "subsidy",
    description: "Promotes organic farming with financial assistance of ₹50,000 per hectare.",
    benefit: "₹50,000/hectare",
    deadline: "Check state portal",
    applyLink: "https://pgsindia-ncof.gov.in",
  },
  {
    name: "Rashtriya Krishi Vikas Yojana",
    category: "subsidy",
    description: "Financial assistance for agricultural development projects and infrastructure.",
    benefit: "Up to ₹25 lakh",
    deadline: "Check state portal",
    applyLink: "https://rkvy.nic.in",
  },
];

router.post("/", async (req, res) => {
  try {
    const { state, land, crop, income } = req.body;

    let eligibleSchemes = [...allSchemes];

    // Filter based on income
    if (income === "Above ₹5 lakh") {
      eligibleSchemes = eligibleSchemes.filter(
        (s) => s.category !== "direct"
      );
    }

    // Filter based on land size
    if (land === "More than 10 acres") {
      eligibleSchemes = eligibleSchemes.filter(
        (s) => s.name !== "PM-KISAN"
      );
    }

    res.json({ schemes: eligibleSchemes });
  } catch (err) {
    res.status(500).json({ message: "Schemes error", error: err.message });
  }
});

module.exports = router; 