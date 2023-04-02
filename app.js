const express = require("express");
const app = express();

const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

// DataBase Connection
mongoose.connect("mongodb://localhost:27017/wtwr_db");

const routes = require('./routes')
app.use(express.json())
app.use(routes);


app.listen(PORT, () => {
  console.log(`Connection is listen to ${PORT}`);
});
