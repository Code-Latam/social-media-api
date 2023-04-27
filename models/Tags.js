const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      max: 100,
      unique: true,
    },
  }
);

module.exports = mongoose.model("Tag", TagSchema);
