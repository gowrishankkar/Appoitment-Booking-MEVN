const express = require("express");
const datesBetween = require("dates-between");
const moment = require("moment");
let timeSlotter = require("time-slotter");

const router = express.Router();

router.get("/", async (req, res) => {
  let slotter = timeSlotter("10:00", "17:00", 30);
  let timeSlots = [];
  slotter.map((time) => {
    
    timeSlots.push(time[0])
  });
  console.log("time", timeSlots);
  const freeSlots = {};

  try {
    for (const date of datesBetween(
      new Date("2021-04-19"),
      new Date("2021-04-28")
    )) {
        let allSlots = []
        timeSlots.map((slot, i)=>{
            // console.log( i,slot.split(':'));
            let splitSlot = slot.split(':')
            allSlots.push(moment(date.setHours(splitSlot[0], splitSlot[1], 0)))

        })
      freeSlots[moment(date).format("YYYY-MM-DD")] = {slots : allSlots};
    }
    console.log(freeSlots)
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
