const router = require("express").Router();
const checkJWT = require("../middleware/checkJWT");

const { publicPosts, privatePosts } = require("../db/Post");

router.get("/public", (req, res) => {
  res.json(publicPosts);
});

router.get("/private", checkJWT, (req, res) => {
  res.json(privatePosts);
});

module.exports = router;
