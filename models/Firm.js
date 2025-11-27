const mongoose = require("mongoose");

const Firmschema = new mongoose.Schema({
  FirmName: {
    type: String,
    required: true,
    unique: true,
  },
  area: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: [
      {
        type: String,
        enum: ["veg", "non-veg"],
      },
    ],
  },
  region: {
    type: [
      {
        type: String,
        enum: ["north-indian", "south-indian", "bakery", "chinese"],
      },
    ],
  },
  offer: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
  products: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
});

const Firm = mongoose.model("Firm", Firmschema);
module.exports = Firm;
