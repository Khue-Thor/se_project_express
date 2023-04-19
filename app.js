const express = require("express");

const cors = require("cors");

const app = express();

const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

const ErrorHandler = require('./utils/errors')

// DataBase Connection
mongoose.connect("mongodb://localhost:27017/wtwr_db");

const routes = require("./routes/index");

app.use(express.json());
app.use(cors());

app.use("/", routes);


app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Connection is listen to ${PORT}`);
});