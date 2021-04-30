const express = require("express");
const momentTZ = require("moment-timezone");
const moment = require("moment");
const Event = require("../models/events");
const config = require("config");

let timeSlotter = require("time-slotter");

const router = express.Router();

// Get config data
const startTime = config.get("startTime");
const endTime = config.get("endTime");
const slotDuration = config.get("slotDuration");
const FixedTimezone = config.get("fixedTimezone");

// Get free slots
router.get("/", async (req, res) => {
  let date = req.query.date;
  let timezone = req.query.timezone;
  let slotter = timeSlotter(startTime, endTime, slotDuration);
  let timeSlots = [];
  let freeSlots = [];

  slotter.map((time) => {
    timeSlots.push(time[0]);
  });

  let ndate = new Date(date);
  let slotStartDate = new Date(ndate.getFullYear(), ndate.getMonth(), 1);
  let slotEndDate = new Date(ndate.getFullYear(), ndate.getMonth() + 1, 0);

  const daysWithOutWeekEnd = [];

  // Store only weekday dates on daysWithOutWeekEnd variable
  for (
    let currentDate = new Date(slotStartDate);
    currentDate <= slotEndDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    if (currentDate.getDay() != 0 && currentDate.getDay() != 6) {
      daysWithOutWeekEnd.push(new Date(currentDate));
    }
  }

  try {
    let startDate = moment.utc(date);
    let endDate = date;
    endDate = moment.utc(endDate).set("hour", 20);
    // const allEvent = await Event.find();
    const allEvent = await Event.find({
      Date: {
        $gte: startDate,
        $lt: endDate,
      },
    }).sort({ date_paid: "asc" });
    console.log(moment(startDate).format("YYYY-MM-DD HH:mm:ss"), "allEvent", moment(endDate).format("YYYY-MM-DD HH:mm:ss"));
    let bookedSlots = [];

    // Gets all events and push date into array
    allEvent.map((bookedEvent) => {
      console.log('bookedEvent.Date', moment(bookedEvent.Date).format("YYYY-MM-DD HH:mm:ss"))
      let changedBookEvent = moment(bookedEvent.Date).format("YYYY-MM-DD HH:mm:ss");
      console.log(changedBookEvent);
      bookedSlots.push(changedBookEvent);
    });

    // Loop through dates that have no weekends
    for (const date of daysWithOutWeekEnd) {

        await timeSlots.map(async (slot, i) => {
          let splitSlot = slot.split(":");

          let changedate2 = moment.utc(date)
          let converteddate = changedate2.tz(FixedTimezone);
          changedate2.set({hour:splitSlot[0],minute:splitSlot[1],second:0})

          let slotT = moment(converteddate).valueOf()
          // let slotT2 = momentTZ.tz(changeSlot, FixedTimezone).valueOf();

          // let slotT2 = moment(date.setHours(splitSlot[0], splitSlot[1], 0));

          // let changeSlot = slotT2
          //   .tz( FixedTimezone).valueOf()
            

          // console.log( bookedSlots,"slotT", moment(changedate2).format("YYYY-MM-DD HH:mm:ss"));

          if (bookedSlots.includes(moment(changedate2).format("YYYY-MM-DD HH:mm:ss"))) {
            console.log(
              "dadte exists!",
              moment(slotT).format("YYYY-MM-DD HH:mm:ss")
            );
          } else {
            var june = moment(slotT);
            let userSlot = june.tz(timezone).valueOf();
            // Check if the slot is already present
            if (
              freeSlots.hasOwnProperty(moment(userSlot).format("YYYY-MM-DD")) &&
              userSlot
            ) {
              await freeSlots[moment(userSlot).format("YYYY-MM-DD")].push(
                userSlot
              );
            } else {
              freeSlots[moment(userSlot).format("YYYY-MM-DD")] = [];
              await freeSlots[moment(userSlot).format("YYYY-MM-DD")].push(
                userSlot
              );
            }
          }
        });
      
    }
    // console.log("asd", freeSlots);
    mainResponse = {
      freeSlots: freeSlots[date] ? freeSlots[date] : [],
      daysWithOutWeekEnd: daysWithOutWeekEnd,
    };
    // res.send(mainResponse);
    res.send(freeSlots[date] ? freeSlots[date] : []);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
