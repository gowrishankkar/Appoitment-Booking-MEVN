const express = require("express");
const datesBetween = require("dates-between");
const moment = require("moment-timezone");
let timeSlotter = require("time-slotter");
const Event = require("../models/events");

const router = express.Router();


router.get("/", async (req, res) => {
  let  date   =  req.query.date;
  let  timezone   =  req.query.timezone;
  let slotter = timeSlotter("10:00", "17:00", 30);
  let timeSlots = [];
  slotter.map((time) => {
    
    timeSlots.push(time[0])
  });
  const freeSlots = {};
  var ndate = new Date(date);
  let slotStartDate = new Date(ndate.getFullYear(), ndate.getMonth(), 1)
  let slotEndDate = new Date(ndate.getFullYear(), ndate.getMonth() + 1, 0)

  const daysWithOutWeekEnd = [];
  for (let currentDate = new Date(slotStartDate); currentDate <= slotEndDate; currentDate.setDate(currentDate.getDate() + 1)) {
    if (currentDate.getDay() != 0 && currentDate.getDay() != 6) {
      daysWithOutWeekEnd.push(new Date(currentDate));
    }
  }
  
  try {
    for (const date of daysWithOutWeekEnd) {
        let allSlots = []
        timeSlots.map((slot, i)=>{
            // console.log( i,slot.split(':'));
            let splitSlot = slot.split(':')
            let slotT = moment(date.setHours(splitSlot[0], splitSlot[1], 0))
            allSlots.push( moment.tz(slotT, timezone).utc().format('YYYY/MM/DD hh:mm A'))
            // console.log( moment(slotT).format('hh:mm A'), "time", moment.tz(slotT, timezone).format('DD-MM-YYYY hh:mm A'));
  

        })
        // console.log(allSlots)
      freeSlots[moment(date).format("YYYY-MM-DD")] = {slots : allSlots};
    }
    // console.log(freeSlots)
    res.send(freeSlots);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;


