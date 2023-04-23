require("dotenv").config();

const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

const app = express();

const { PORT = 3001 } = process.env;

const { errors } = require("celebrate");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const { ErrorHandler } = require("./middlewares/error-hanlder");

// DataBase Connection
mongoose.connect("mongodb://localhost:27017/wtwr_db");

const routes = require("./routes/index");

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(requestLogger);
app.use("/", routes);

app.use(errorLogger);

app.use(errors());
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Connection is listen to ${PORT}`);
});
