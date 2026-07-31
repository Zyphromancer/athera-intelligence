const crypto = require("crypto");

// Outrank's exact webhook auth header isn't independently verified here —
// check Outrank's own webhook docs for the header name/scheme they send and
// adjust `extractToken` if it differs. This accepts the two most common
// conventions so it works out of the box either way:
//   Authorization: Bearer <token>
//   X-Outrank-Access-Token: <token>
function extractToken(req) {
  const authHeader = req.get("authorization") || "";
  const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i);
  if (bearerMatch) return bearerMatch[1].trim();

  const customHeader = req.get("x-outrank-access-token") || req.get("x-outrank-token");
  if (customHeader) return customHeader.trim();

  return null;
}

function requireOutrankToken(req, res, next) {
  const expected = process.env.OUTRANK_ACCESS_TOKEN;
  if (!expected) {
    console.error("[auth] OUTRANK_ACCESS_TOKEN is not set — refusing all webhook requests.");
    return res.status(500).json({ error: "Server misconfigured: OUTRANK_ACCESS_TOKEN not set" });
  }

  const provided = extractToken(req);
  if (!provided || !tokensMatch(provided, expected)) {
    return res.status(401).json({ error: "Invalid or missing access token" });
  }

  next();
}

function tokensMatch(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

module.exports = { requireOutrankToken, extractToken };
