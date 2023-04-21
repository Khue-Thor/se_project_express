require('dotenv').config();

const express = require("express");

const cors = require("cors");

const app = express();

const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

const { errors } = require("celebrate");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const { ErrorHandler } = require("./middlewares/error-hanlder");

// DataBase Connection
mongoose.connect("mongodb://localhost:27017/wtwr_db");

const routes = require("./routes/index");

app.use(express.json());
app.use(cors());
app.use("*", cors());

app.use(requestLogger);
app.use("/", routes);

app.use(errorLogger);

app.use(errors());
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Connection is listen to ${PORT}`);
});
