const express = require("express");

const mongoose = require('mongoose');
const app = express();

const {PORT = 3001} = process.env;


// DataBase Connection
mongoose.connect("mongodb://localhost:27017/wtwr_db");