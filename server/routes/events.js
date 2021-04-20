const express = require('express')
let router = express.Router()
const Event = require("../models/events");

// Create Event
router.post("/", async (req, res) => {
    console.log(' req.body',  req.body)
    const event = new Event({
        Date: req.body.Date,
        Timezone: req.body.Timezone,
        Name: req.body.Name,
        Email: req.body.Email
    })

    try {
        const newEvent = await event.save()
        res.status(201).json(newEvent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

    
});

router.get("/", async (req, res) => {
    try {
        const event = await Event.find()
        res.json(event)
      } catch (error) {
        res.status(400).json({ message: error.message })
    }
    
      

});



module.exports = router;
