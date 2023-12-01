const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { USER } = require("../db/User");

router.get("/", (req, res) => {
  res.send("Auth Route");
});

// ユーザー新規作成API
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = USER.find((user) => user.email === email);
    if (user) {
      return res.status(400).json([
        {
          message: "User already exists",
        },
      ]);
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    USER.push({
      email,
      password: hashedPassword,
    });

    const token = await jwt.sign(
      {
        email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    return res.json({
      token: token,
    });
  }
);

// ユーザー一覧取得API
router.get("/users", (req, res) => {
  return res.send(USER);
});

module.exports = router;
