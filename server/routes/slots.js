const express = require("express");
const datesBetween = require("dates-between");
const momentTZ = require("moment-timezone");
const moment = require("moment");
let timeSlotter = require("time-slotter");
const Event = require("../models/events");

const router = express.Router();

router.get("/", async (req, res) => {
  let date = req.query.date;
  let timezone = req.query.timezone;
  let slotter = timeSlotter("10:00", "17:00", 30);
  let timeSlots = [];
  slotter.map((time) => {
    timeSlots.push(time[0]);
  });
  let freeSlots = {};
  var ndate = new Date(date);
  let slotStartDate = new Date(ndate.getFullYear(), ndate.getMonth(), 1);
  let slotEndDate = new Date(ndate.getFullYear(), ndate.getMonth() + 1, 0);

  const daysWithOutWeekEnd = [];
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

    // console.log('all events' , allEvent)
    let bookedSlots = [];
    allEvent.map((bookedEvent) => {
      let changedBookEvent = moment(bookedEvent.Date).format(
        "YYYY-MM-DD hh:mm A"
      );
      // console.log('changedBookEvent', changedBookEvent, typeof changedBookEvent)
      bookedSlots.push(changedBookEvent);
    });
    console.log("all bookedSlots", bookedSlots);

    for (const date of daysWithOutWeekEnd) {
      let allSlots = [];
      await timeSlots.map( async (slot, i) => {
        // console.log( i,slot.split(':'));
        let splitSlot = slot.split(":");
        let slotT = moment(date.setHours(splitSlot[0], splitSlot[1], 0));

        let changeSlot = momentTZ
          .tz(slotT, "America/Los_Angeles")
          .format("YYYY-MM-DD hh:mm A");
        // let dateAlone =
        // console.log("slotT" ,  changeSlot)
        if (bookedSlots.includes(changeSlot)) {
          console.log("Value exists!", changeSlot);
        } else {
          let userSlot = momentTZ
            .tz(slotT, timezone)
            .format("YYYY-MM-DD hh:mm A");
          // allSlots.push( userSlot)
          console.log("userSlot", userSlot);
          if (
            freeSlots.hasOwnProperty(moment(userSlot).format("YYYY-MM-DD")) &&
            userSlot
          ) {
            // console.log(freeSlots[moment(userSlot).format("YYYY-MM-DD")].slot);
            await freeSlots[moment(userSlot).format("YYYY-MM-DD")].slots.push(
              userSlot
            );
          } else {
            freeSlots[moment(userSlot).format("YYYY-MM-DD")] = { slots: [] };
          }
        }

        // freeSlots[moment(date).format("YYYY-MM-DD")] = {slots : allSlots};
        // if (bookedSlots.indexOf(changeSlot) > -1) {
        //   console.log("Value exists!" , changeSlot)
        //   //In the array!
        // }

        // console.log( slotT, "slotT", );
      });
      // console.log(allSlots)
      // freeSlots[moment(date).format("YYYY-MM-DD")] = {slots : allSlots};

      // for (let date in freeSlots){
      //   // console.log('freeSlot',  freeSlots[date].slots)
      //   freeSlots[date].slots.map((slot)=>{
      //     console.log('slot', slot)
      //   })
      // }
    }
    // console.log(freeSlots)
    res.send(freeSlots);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
