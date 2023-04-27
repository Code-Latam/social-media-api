const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    tags: {
      type: String,
      max: 100,
    },
    thread: {
      type: String,
      max: 100,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    country: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
