const mongoose = require('mongoose');
const SiteData = require('./models/SiteData');

// Connect to MongoDB using your environment variable
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));
  
import { Router } from "express";
import { INITIAL_SITE_SETTINGS, INITIAL_ALBUMS } from "./data.js";
export const apiRouter = Router();
apiRouter.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "JB Szende Photography API",
    location: "Odorheiu Secuiesc, Harghita, Romania",
    version: "1.0.0",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
});
apiRouter.get("/settings", (_req, res) => {
  res.json({
    success: true,
    data: INITIAL_SITE_SETTINGS
  });
});
apiRouter.get("/albums", (_req, res) => {
  res.json({
    success: true,
    count: INITIAL_ALBUMS.length,
    data: INITIAL_ALBUMS
  });
});
apiRouter.post("/contact", (req, res) => {
  const { name, email, phone, sessionType, preferredDate, message } = req.body || {};
  if (!name || !email) {
    res.status(400).json({
      success: false,
      error: "Name and email are required fields."
    });
    return;
  }
  console.log("[API Contact Received]", { name, email, phone, sessionType, preferredDate, message });
  res.json({
    success: true,
    message: "Thank you! Your inquiry has been logged successfully at JB Szende Photography.",
    details: {
      name,
      sessionType: sessionType || "General Inquiry",
      receivedAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  });
});
apiRouter.post("/feedback", (req, res) => {
  const { clientName, comment, rating, sessionType } = req.body || {};
  if (!clientName || !comment) {
    res.status(400).json({
      success: false,
      error: "Client name and comment are required."
    });
    return;
  }
  res.json({
    success: true,
    message: "Review submitted successfully!",
    feedback: {
      id: `fb-${Date.now()}`,
      clientName,
      comment,
      rating: rating || 5,
      sessionType: sessionType || "Portrait Session",
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      approved: true
    }
  });
});
