const Slot = require('../models/slots');
const express = require('express')
let router = express.Router()


router.get("/", async (req, res) => {
  try {
      const event = await Event.find()
      res.send('succss')
    } catch (error) {
      res.status(400).json({ message: error.message })
  }
});



module.exports = {
  free_slots, 

}