const express = require("express");
const moment = require("moment");
const JsonCircular = require('circular-json');
let router = express.Router();
const Event = require("../models/events");

// Create Event
router.post("/", async (req, res) => {
  console.log(moment.utc(req.body.Date).format(), " req.body", req.body.Date);
  // let UTCDate = moment.utc(req.body.Date).format()
  const event = new Event({
    Date: req.body.Date,
    Timezone: req.body.Timezone,
    Name: req.body.Name,
    Email: req.body.Email,
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const event = await Event.find();
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/range/", async (req, res) => {

  try {
    let  startDate   =  req.query.startDate;
    let  endDate  = req.query.endDate;
    //1. check that date is not empty
    if (startDate === "" || endDate === "") {
      return res.status(400).json({
        status: "failure",
        message: "Please ensure you pick two dates",
      });
    }
    // if(startDate === endDate){
        endDate = moment(endDate).set('hour', 20).toISOString();
        // console.log('same', endDate)
    // }

    console.log(' startDate, endDate ', typeof startDate, endDate )
    const event = await Event.find({ 
        Date: {
              $gte:  startDate,
              $lt:  endDate 
               }
         }).sort({ date_paid: 'asc'})  

    res.json( JSON.parse(JsonCircular.stringify(event)) );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
