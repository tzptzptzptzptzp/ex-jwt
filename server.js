const express = require("express");
const app = express();

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

const PORT = 2222;

app.use(express.json());

app.use("/auth", authRouter);
app.use("/post", postRouter);

app.listen(PORT, () => {
  console.log(`Server Running http://localhost:${PORT}`);
});
