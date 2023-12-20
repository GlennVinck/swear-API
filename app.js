const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/api/v1/index");
const orderRouter = require("./routes/api/v1/orders");
const usersRouter = require("./routes/api/v1/users");

require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_DB);

const app = express();

app.use(express.json({ limit: "5mb" }));

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/users", usersRouter);

module.exports = app;
