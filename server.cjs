var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// backend/server.js
var import_express2 = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_vite = require("vite");
var import_mongoose = __toESM(require("mongoose"), 1);

// MongoDB Connection
if (process.env.MONGODB_URI) {
  import_mongoose.default
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("[MongoDB] Connected successfully!"))
    .catch((err) => console.error("[MongoDB Connection Error]", err));
}

// MongoDB Schemas & Models
const albumSchema = new import_mongoose.default.Schema({
  id: String,
  title: String,
  category: String,
  coverImage: String,
  description: String,
  photoCount: Number
});
const AlbumModel = import_mongoose.default.models.Album || import_mongoose.default.model("Album", albumSchema);

// backend/routes.js
var import_express = require("express");

// backend/data.js (Default Seed Data)
var INITIAL_SITE_SETTINGS = {
  photographerName: "JB Szende",
  tagline: "Capturing Timeless Moments Through Light and Emotion",
  heroBio: "Professional photographer based in Odorheiu Secuiesc, Harghita, Romania, specializing in fine art portraits, warm family stories, and romantic wedding celebrations.",
  bioText: "Hello! I am JB Szende, a passionate visual artist with over 8 years of dedicated photography experience across Transylvania and beyond.",
  experienceYears: 8,
  phone: "+40 700 123 456",
  email: "szende.photography@example.com",
  location: "Odorheiu Secuiesc, Harghita, Romania",
  instagramUrl: "https://instagram.com",
  facebookUrl: "https://facebook.com",
  copyrightText: "\xA9 2026 SwenTech. All rights reserved."
};

var INITIAL_ALBUMS = [
  {
    id: "album-portraits-2026",
    title: "Fine Art & Studio Portraits",
    category: "Portraits",
    coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200",
    description: "Intimate studio and natural light portraits celebrating personal elegance and character.",
    photoCount: 12
  },
  {
    id: "album-weddings-harghita",
    title: "Romantic Weddings & Couples",
    category: "Weddings",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    description: "Candid emotional stories from wedding days and engagement sessions.",
    photoCount: 18
  },
  {
    id: "album-family-nature",
    title: "Family & Newborn Warmth",
    category: "Family",
    coverImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1200",
    description: "Heartfelt family portraits surrounded by the scenic landscapes of Harghita.",
    photoCount: 15
  }
];

// API Router Configuration
var apiRouter = (0, import_express.Router)();

apiRouter.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "JB Szende Photography API",
    location: "Odorheiu Secuiesc, Harghita, Romania",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

apiRouter.get("/settings", (_req, res) => {
  res.json({
    success: true,
    data: INITIAL_SITE_SETTINGS
  });
});

// GET /api/albums - Fetches albums dynamically from MongoDB
apiRouter.get("/albums", async (_req, res) => {
  try {
    let albums = await AlbumModel.find({});
    
    // Seed initial data if database collection is empty
    if (!albums || albums.length === 0) {
      albums = await AlbumModel.insertMany(INITIAL_ALBUMS);
    }

    res.json({
      success: true,
      count: albums.length,
      data: albums
    });
  } catch (err) {
    console.error("[API Albums Error]", err);
    res.status(500).json({ success: false, error: "Database query failed." });
  }
});

// POST /api/albums/update - Updates album cover image URL in MongoDB
apiRouter.post("/albums/update", async (req, res) => {
  const { albumId, newCoverImage } = req.body || {};

  if (!albumId || !newCoverImage) {
    res.status(400).json({
      success: false,
      error: "Both albumId and newCoverImage fields are required."
    });
    return;
  }

  try {
    const updatedAlbum = await AlbumModel.findOneAndUpdate(
      { id: albumId },
      { coverImage: newCoverImage },
      { new: true }
    );

    if (!updatedAlbum) {
      res.status(404).json({ success: false, error: "Album not found." });
      return;
    }

    res.json({
      success: true,
      message: "Image successfully updated in MongoDB!",
      data: updatedAlbum
    });
  } catch (err) {
    console.error("[API Update Album Error]", err);
    res.status(500).json({ success: false, error: "Server error while saving image." });
  }
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
      receivedAt: new Date().toISOString()
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
      date: new Date().toISOString().split("T")[0],
      approved: true
    }
  });
});

// Express Server and Middleware Configuration
var import_meta = {};
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);

const app = (0, import_express2.default)();
const PORT = process.env.PORT || 3000;

app.use(import_express2.default.json());
app.use(import_express2.default.urlencoded({ extended: true }));
app.use(import_express2.default.static(import_path.default.join(process.cwd(), "public")));
app.use("/api", apiRouter);

if (process.env.NODE_ENV !== "production") {
  (async () => {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  })();
} else {
  const distPath = import_path.default.join(process.cwd(), "dist");

  app.use(import_express2.default.static(distPath, {
    etag: false,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
      } else {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    }
  }));

  app.get("*", (_req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.sendFile(import_path.default.join(distPath, "index.html"));
  });
}

// Only start Express listener if NOT running inside Vercel serverless environment
if (process.env.VERCEL !== "1") {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] JB Szende Photography server running on port ${PORT}`);
  });
}

// Export Express app for Vercel Serverless Function
module.exports = app;
//# sourceMappingURL=server.cjs.map