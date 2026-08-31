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

// backend/routes.js
var import_express = require("express");

// backend/data.js
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

// backend/routes.js
var apiRouter = (0, import_express.Router)();
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

// backend/server.js
var import_meta = {};
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);
async function startServer() {
  const app = (0, import_express2.default)();
  const PORT = process.env.PORT || 3000;

  app.use(import_express2.default.json());
  app.use(import_express2.default.urlencoded({ extended: true }));
  app.use(import_express2.default.static(import_path.default.join(process.cwd(), "public")));
  app.use("/api", apiRouter);

  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");

    // Serve production dist static assets with strict HTML cache controls
    app.use(import_express2.default.static(distPath, {
      maxAge: "1y",
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", "0");
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] JB Szende Photography server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("[Server Error]", err);
  process.exit(1);
});
//# sourceMappingURL=server.cjs.map