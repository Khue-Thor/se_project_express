const express = require('express');
const cors = require("cors");
const app = express();

const mongoose = require('mongoose');

const { PORT = 3001 } = process.env;

// DataBase Connection
mongoose.connect('mongodb://localhost:27017/wtwr_db');

const routes = require('./routes/index');

app.use(express.json());
app.use(cors())
app.use((req, res, next) => {
  req.user = {
    _id: '642b17b2e491567c21d7c327',
  };
  next();
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Connection is listen to ${PORT}`);
});
