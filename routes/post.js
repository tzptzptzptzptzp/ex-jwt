const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { publicPosts, privatePosts } = require("../db/Post");

router.get("/public", (req, res) => {
  res.json(publicPosts);
});

module.exports = router;
