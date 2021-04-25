const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  Date: {
    type: Date,
    required: true
  },
  Timezone: {
    type: String,
    required: true
  },
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
});

module.exports = Event = mongoose.model("Event", eventSchema);
