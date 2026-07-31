// Netlify Functions entry point. Wraps the same Express app used for
// standalone deploys via serverless-http, so there is exactly one
// implementation of the routes.
//
// IMPORTANT: Netlify Functions run on a read-only filesystem, with only
// /tmp writable, and /tmp is not persisted or shared across invocations or
// instances. The JSON-file storage in src/lib/db.js will NOT reliably
// persist articles here — a webhook POST could land on a different
// instance than a later GET. This wrapper is provided because it was asked
// for, but see README.md: for real persistence, either deploy this service
// to a host with a persistent disk (Railway, Render, a VM) or swap
// src/lib/db.js for a real database before relying on this in production.
require("dotenv").config();
const serverless = require("serverless-http");
const { createApp } = require("../../src/app");

const app = createApp();

// netlify.toml redirects every path to this function, so Netlify's event.path
// arrives as "/.netlify/functions/api/<original path>" — basePath strips
// that prefix back off so Express sees the routes it actually defines
// (e.g. "/webhook/outrank", "/api/articles").
exports.handler = serverless(app, { basePath: "/.netlify/functions/api" });
