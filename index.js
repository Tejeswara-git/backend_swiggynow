const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const Vendorroute = require("./routes/Vendorroute");
const Productroute = require("./routes/Productroute");
const Firmroute = require("./routes/Firmroute");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/vendor", Vendorroute);
app.use("/product", Productroute);
app.use("/firm", Firmroute);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
