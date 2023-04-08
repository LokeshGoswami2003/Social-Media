const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const postsRouter = require("./routers/postsRouter");

const morgan = require("morgan");

dotenv.config({ path: "./config.env" });

const app = express();

//middlewares
app.use(express.json());
app.use(morgan("common"));

app.use("/auth", authRouter);
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
    res.status(200).send();
});

const PORT = process.env.PORT || 4001;
dbConnect();
app.listen(PORT, () => {
    console.log("Server Started on PORT ", PORT);
});
