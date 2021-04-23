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

// Swagger

/**
 * @swagger
 * definitions:
 *  Event:
 *   type: object
 *   properties:
 *    Name:
 *     type: string
 *     description: name of the user
 *     example: 'javscript'
 *    Email:
 *     type: string
 *     description: email of the user
 *     example: 'javascript@whizpath.com'
 *    Timezone:
 *     type: string
 *     description: timezone of user
 *     example: 'America/Los_Angeles'
 *    Date:
 *     type: date
 *     description: timezone of user
 *     example: '2021-04-01T21:30:00+05:30'
 */

//Routes
/**
 * @swagger
 * /events:
 *  get:
 *    summary: Get events in range
 *    description: Request all events
 *    responses:
 *      '200':
 *        description: A successful response
 */

/**
 * @swagger
 * /events/range?startDate=2021-04-13&endDate=2021-04-30:
 *  get:
 *   summary: Get events in range
 *   description: get events in range
 *   parameters:
 *    - in: query
 *      name: startDate
 *      schema:
 *       type: string
 *      required: true
 *      description: Start Date
 *      example: 2021-04-13
  *    - in: query
 *      name: endDate
 *      schema:
 *       type: string
 *      required: true
 *      description: End Date
 *      example: 2021-04-30
 *   responses:
 *    200:
 *     description: success
 */

/**
 * @swagger
 * /events:
 *  post:
 *   summary: Create new event
 *   description: Create new event appointment 

 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Event'
 *   responses:
 *    200:
 *     description: Event Created Successfully
 *    500:
 *     description: error
 *    422:
 *     description:Slot already booked
 */


app.use("/events", events);


/**
 * @swagger
 * /slots?date=2021-04-01&timezone=Pacific/Rarotonga:
 *  get:
 *   summary: Get free slots on the selected month
 *   description: Get free slots on a given month and timezone
 *   parameters:
 *    - in: query
 *      name: date
 *      schema:
 *       type: string
 *      required: true
 *      description: Selected Date
 *      example: 2021-04-13
  *    - in: query
 *      name: timezone
 *      schema:
 *       type: string
 *      required: true
 *      description: Selected Timezone
 *      example: Pacific/Rarotonga
 *   responses:
 *    200:
 *     description: success
 */


app.use("/slots", slots);

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
  .then(() => console.log("mongodb connected..."))
  .catch((err) => console.log("MongoError:", err));

// Configuring port
const port = process.env.PORT || 9001;

// Listening to port
app.listen(port);
console.log(`Listening On http://localhost:${port}/`);

module.exports = app;
