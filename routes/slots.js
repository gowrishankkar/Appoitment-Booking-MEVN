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
  let freeSlots = {};

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
    const allEvent = await Event.find();
    let bookedSlots = [];

    // Gets all events and push date into array
    allEvent.map((bookedEvent) => {
      let changedBookEvent = moment(bookedEvent.Date).format(
        "YYYY-MM-DD hh:mm A"
      );
      bookedSlots.push(changedBookEvent);
    });

    // Loop through dates that have no weekends
    for (const date of daysWithOutWeekEnd) {
      let allSlots = [];
      await timeSlots.map(async (slot, i) => {
        let splitSlot = slot.split(":");
        let slotT = moment(date.setHours(splitSlot[0], splitSlot[1], 0));

        let changeSlot = momentTZ
          .tz(slotT, FixedTimezone)
          .format("YYYY-MM-DD hh:mm A");
        if (bookedSlots.includes(changeSlot)) {
          console.log("dadte exists!", changeSlot);
        } else {
          let userSlot = momentTZ
            .tz(slotT, timezone)
            .format("YYYY-MM-DD hh:mm A");

          // Check if the slot is already present
          if (
            freeSlots.hasOwnProperty(moment(userSlot).format("YYYY-MM-DD")) &&
            userSlot
          ) {
            await freeSlots[moment(userSlot).format("YYYY-MM-DD")].slots.push(
              userSlot
            );
          } else {
            freeSlots[moment(userSlot).format("YYYY-MM-DD")] = { slots: [] };
          }
        }
      });
    }
    res.send(freeSlots);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
