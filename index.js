const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const ContactRoute = require("./routes/ContactRoute");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is connected..!".bgMagenta.bold);

    const port = process.env.PORT || 4500;
    const hostname = "192.168.43.184"; // Your custom IP address

    app.listen(port, hostname, () => {
      console.log(
        `Your Express app is running on http://${hostname}:${port}`.bgCyan.bold
      );
    });
  } catch (err) {
    console.log("Error inside db connection:", err);
    process.exit(1);
  }
};

connectDb();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const upload = multer({ storage: storage });

app.use(upload.any());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((error, req, res, next) => {
  const message = `This is the Unexpected field --> ${error.field}`;
  return res.status(500).send(message);
});

// Mount routes
app.use("/", ContactRoute);

module.exports = app;
