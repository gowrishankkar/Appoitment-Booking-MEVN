const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  Date: {
    type: Date,
    required: true
  },
});

module.exports = lot = mongoose.model("slot", eventSchema);
