const express = require("express");
const { listArticles, getArticleBySlug } = require("../lib/db");

const router = express.Router();

function toSummary(article) {
  const { contentHtml, ...summary } = article;
  return summary;
}

router.get("/", (req, res) => {
  res.json({ articles: listArticles().map(toSummary) });
});

router.get("/:slug", (req, res) => {
  const article = getArticleBySlug(req.params.slug);
  if (!article) {
    return res.status(404).json({ error: "Article not found" });
  }
  res.json({ article });
});

module.exports = router;
