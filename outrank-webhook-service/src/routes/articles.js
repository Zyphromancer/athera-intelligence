const express = require("express");
const { listArticles, getArticleBySlug } = require("../lib/db");

const router = express.Router();

function toSummary(article) {
  const { contentHtml, ...summary } = article;
  return summary;
}

router.get("/", async (req, res) => {
  try {
    const articles = await listArticles();
    res.json({ articles: articles.map(toSummary) });
  } catch (err) {
    console.error("[articles] Failed to list articles:", err.message);
    res.status(502).json({ error: "Failed to load articles" });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const article = await getArticleBySlug(req.params.slug);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json({ article });
  } catch (err) {
    console.error("[articles] Failed to load article:", err.message);
    res.status(502).json({ error: "Failed to load article" });
  }
});

module.exports = router;
