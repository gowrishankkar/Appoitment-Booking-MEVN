const express = require("express");
const datesBetween = require("dates-between");
const moment = require("moment-timezone");
let timeSlotter = require("time-slotter");
const Event = require("../models/events");

const router = express.Router();


router.get("/", async (req, res) => {
  let  date   =  req.query.date;
  let  timezone   =  req.query.timezone;
  console.log("timezone", date, timezone)
  let slotter = timeSlotter("10:00", "17:00", 30);
  let timeSlots = [];
  slotter.map((time) => {
    
    timeSlots.push(time[0])
  });
  // console.log( moment('2021-04-30T06:30:00.000Z').format('HH mm'), "time", moment.tz('2021-04-30T06:30:00.000Z', timezone).format('HH mm'));
  const freeSlots = {};
  var ndate = new Date(date);
  let slotStartDate = new Date(ndate.getFullYear(), ndate.getMonth(), 1)
  let slotEndDate = new Date(ndate.getFullYear(), ndate.getMonth() + 1, 0)
  // console.log(date,'slotStartDate', slotStartDate , 'slotEndDate', slotEndDate);
  try {
    for (const date of datesBetween(
      slotStartDate,
      slotEndDate
    )) {
        let allSlots = []
        timeSlots.map((slot, i)=>{
            // console.log( i,slot.split(':'));
            let splitSlot = slot.split(':')
            let slotT = moment(date.setHours(splitSlot[0], splitSlot[1], 0))
            allSlots.push( moment.tz(slotT, timezone).format('DD-MM-YYYY hh:mm A'))
            console.log( moment(slotT).format('hh:mm A'), "time", moment.tz(slotT, timezone).format('DD-MM-YYYY hh:mm A'));
  

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

//    const firstDate = new Date("December 30, 2020");
// const secondDate = new Date("January 4, 2021");
// const daysWithOutWeekEnd = [];
// for (var currentDate = new Date(firstDate); currentDate <= secondDate; currentDate.setDate(currentDate.getDate() + 1)) {
//   // console.log(currentDate);
//   if (currentDate.getDay() != 0 && currentDate.getDay() != 6) {
//     daysWithOutWeekEnd.push(new Date(currentDate));
//   }
// }
// console.log(daysWithOutWeekEnd, daysWithOutWeekEnd.length);
