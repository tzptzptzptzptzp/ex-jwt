const express = require("express");
const app = express();

const authRouter = require("./routes/auth");

const PORT = 2222;

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server Running http://localhost:${PORT}`);
});
