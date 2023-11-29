const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const { USER } = require("../db/User");

router.get("/", (req, res) => {
  res.send("Auth Route");
});

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  (req, res) => {
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
  }
);

module.exports = router;
