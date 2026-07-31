const express = require("express");
const cors = require("cors");
const webhookRouter = require("./routes/webhook");
const articlesRouter = require("./routes/articles");

function createApp() {
  const app = express();

  // Comma-separated list, e.g. "https://athera-intelligence.com,https://www.athera-intelligence.com".
  // Leave ALLOWED_ORIGINS unset to allow any origin (fine for a public read API).
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin: allowedOrigins.length > 0 ? allowedOrigins : true,
    })
  );
  app.use(express.json({ limit: "2mb" }));

  app.get("/health", (req, res) => res.json({ ok: true }));

  app.use("/webhook", webhookRouter);
  app.use("/api/articles", articlesRouter);

  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error("[app] Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
}

module.exports = { createApp };
