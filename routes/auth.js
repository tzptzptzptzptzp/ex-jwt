const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const { USER } = require("../db/User");

router.get("/", (req, res) => {
  res.send("Auth Route");
});

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
  }
);

module.exports = router;
