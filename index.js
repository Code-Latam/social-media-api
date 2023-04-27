const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
//const cors = require("cors");

dotenv.config();
mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URL, (error) => {
  if (error) console.log(error);
  console.log("Connected to MongoDB");
  console.log(mongoose.connection.readyState);
});

//app.use(cors);
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
//app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/tags", require("./routes/tags"));
app.use("/api/locations", require("./routes/locations"));

app.listen(8800, () => {
  console.log("Backend server is running!");
});
