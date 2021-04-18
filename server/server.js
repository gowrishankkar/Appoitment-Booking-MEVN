// Importing required modules
const cors = require('cors');
const config = require("config");
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


// parse env variables
// require('dotenv').config();
const app = express();

// Body Parser Middleware
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


// DB Config
const db = config.get("mongoURI");





// Configure middlewares
app.use(cors());
app.use(express.json());

// app.set('view engine', 'html');

// Static folder
// app.use(express.static(__dirname + '/views/'));

// Defining route middleware
app.use('/api', require('./routes/api'));


mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected..."))
  .catch(err => console.log("MongoError:",err));


// Configuring port
const port = process.env.PORT || 9001;


// Listening to port
app.listen(port);
console.log(`Listening On http://localhost:${port}/api`);

module.exports = app;
