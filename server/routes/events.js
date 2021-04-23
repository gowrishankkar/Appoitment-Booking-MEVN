const express = require("express");

const JsonCircular = require("circular-json");
const moment = require("moment-timezone");
let router = express.Router();
const Event = require("../models/events");

// Create Event
router.post("/", async (req, res) => {
  let formattedDate = moment.tz(req.body.Date, "America/Los_Angeles").format();
  const event = new Event({
    Date: formattedDate,
    Timezone: req.body.Timezone,
    Name: req.body.Name,
    Email: req.body.Email,
  });

  try {
    const newEvent = await Event.find({ Date: formattedDate }).exec(function (
      err,
      docs
    ) {
      if (docs != undefined && docs.length) {
        res.status(422).json({ message: "This slot is already booked" });
      } else {
        res.status(201).json({ message: "Event Booked Successfully" });
        event.save();
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Get all events
router.get("/", async (req, res) => {
  try {
    const event = await Event.find();
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Get events in range
router.get("/range/", async (req, res) => {
  try {
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;

    //1. check that date is not empty
    if (startDate === "" || endDate === "") {
      return res.status(400).json({
        status: "failure",
        message: "Please ensure you pick two dates",
      });
    }
    
    endDate = moment(endDate).set("hour", 20).toISOString();

    const event = await Event.find({
      Date: {
        $gte: startDate,
        $lt: endDate,
      },
    }).sort({ date_paid: "asc" });

    res.json(JSON.parse(JsonCircular.stringify(event)));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
