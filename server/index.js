const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const postsRouter = require("./routers/postsRouter");
const userRouter = require("./routers/userRouter");
const morgan = require("morgan"); // use to show api hit
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

dotenv.config({ path: "./config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

//middlewares
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(express.json({ limit: "20mb" }));
app.use(morgan("common"));
app.use(cookieParser());

// routers
app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "hi" });
});

const PORT = process.env.PORT || 4000;
dbConnect();
app.listen(PORT, () => {
  console.log("Server Started on PORT ", PORT);
});
