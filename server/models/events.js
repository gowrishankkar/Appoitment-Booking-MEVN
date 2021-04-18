const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  Date: {
    type: String,
    required: true
  },
  Timezone: {
    type: String,
    required: true
  },
});

module.exports = Event = mongoose.model("Event", eventSchema);
