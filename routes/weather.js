const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const { city, lat, lon } = req.query;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    let currentUrl, forecastUrl;

    if (lat && lon) {
      currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else {
      currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    }

    const [currentRes, forecastRes] = await Promise.all([
      axios.get(currentUrl),
      axios.get(forecastUrl),
    ]);

    const current = {
      city: currentRes.data.name,
      country: currentRes.data.sys.country,
      temp: currentRes.data.main.temp,
      feels_like: currentRes.data.main.feels_like,
      humidity: currentRes.data.main.humidity,
      wind: currentRes.data.wind.speed,
      description: currentRes.data.weather[0].description,
      main: currentRes.data.weather[0].main,
    };

    // Get one forecast per day
    const dailyMap = {};
    forecastRes.data.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!dailyMap[date]) {
        dailyMap[date] = {
          date,
          main: item.weather[0].main,
          description: item.weather[0].description,
          max: item.main.temp_max,
          min: item.main.temp_min,
          rain: item.rain ? item.rain["3h"] : 0,
        };
      } else {
        if (item.main.temp_max > dailyMap[date].max)
          dailyMap[date].max = item.main.temp_max;
        if (item.main.temp_min < dailyMap[date].min)
          dailyMap[date].min = item.main.temp_min;
      }
    });

    const forecast = Object.values(dailyMap).slice(0, 7);

    res.json({ current, forecast });
  } catch (err) {
    res.status(500).json({ message: "Weather error", error: err.message });
  }
});

module.exports = router; 