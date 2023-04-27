const mongoose = require("mongoose");

const ThreadSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      max: 100,
      unique: true,
    },
  }
);

module.exports = mongoose.model("Thread", ThreadSchema);