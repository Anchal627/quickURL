const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI);
const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  clicks: { type: Number, default: 0 },
});
const Url = mongoose.model("Url", urlSchema);
app.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = shortid.generate();

  const newUrl = new Url({ originalUrl, shortUrl });
  await newUrl.save();

  res.json({ shortUrl });
});

app.get("/:shortUrl", async (req, res) => {
  const url = await Url.findOne({ shortUrl: req.params.shortUrl });

  if (url) {
    url.clicks++;
    await url.save();
    res.redirect(url.originalUrl);
  } else {
    res.status(404).json({ message: "URL not found" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
