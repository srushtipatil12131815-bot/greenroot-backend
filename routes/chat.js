const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

router.post("/", async (req, res) => {
  const groq = new Groq({ apiKey: "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" });
  try {
    const { message, language } = req.body;
    const systemPrompt = `You are GreenRoot, an expert AI farming assistant for Indian farmers. 
    You help with crop diseases, farming techniques, government schemes, weather advice, and market prices.
    ${language === "hi" ? "Always respond in Hindi." : ""}
    ${language === "mr" ? "Always respond in Marathi." : ""}
    ${language === "en" ? "Respond in simple English." : ""}
    Keep answers concise, practical, and farmer-friendly.`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      max_tokens: 1024,
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("❌ Chat Error:", err.message);
    res.status(500).json({ message: "Chat error", error: err.message });
  }
});

module.exports = router; 