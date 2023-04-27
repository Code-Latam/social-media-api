const router = require("express").Router();
const Tags = require("../models/Tags");
const ThreadModel = require("../models/Thread");

//get all tags
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    const query = {};
    if (search && search !== "null") {
      query["desc"] = {
        $regex: ".*" + search + ".*",
        $options: "i",
      };
    }
    const tags = await Tags.find(query);
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all threads
router.get("/threads", async (req, res) => {
  try {
    const { search } = req.query;
    const query = {};
    if (search && search !== "null") {
      query["desc"] = {
        $regex: ".*" + search + ".*",
        $options: "i",
      };
    }
    const threads = await ThreadModel.find(query);
    res.status(200).json(threads);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
