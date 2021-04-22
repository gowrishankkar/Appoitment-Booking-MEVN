// Importing required modules
const cors = require("cors");
const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const events = require("./routes/events");
const slots = require("./routes/slots");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    infor: {
      title: "Event Booking Application API ",
      version: "1.0.0",
      description: "",
      contact: {
        name: "Gowri Shankar",
        url: "https://www.linkedin.com/in/gowrishankarprashanth/",
        email: "gowrishankarprashanth@gmail.com",
      },
      server: ["http://localhost:9001/"],
    },
  },
  apis: ["server.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Body Parser Middleware

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// DB Config
const db = config.get("mongoURI");

// Configure middlewares
app.use(cors());

//Routes
/**
 * @swagger
 * /events:
 *  get:
 *    description: Use to request all events
 *    responses:
 *      '200':
 *        description: A successful response
 */

app.use("/events", events);
app.use("/slots", slots);




mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected..."))
  .catch((err) => console.log("MongoError:", err));

// Configuring port
const port = process.env.PORT || 9001;

// Listening to port
app.listen(port);
console.log(`Listening On http://localhost:${port}/`);

module.exports = app;
