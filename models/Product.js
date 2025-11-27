const mongoose = require("mongoose");

const Productschema = new mongoose.Schema({
  ProductName: {
    type: String,
    required: true,
    unique: true,
  },
  Price: {
    type: String,
    required: true,
  },
  category: {
    type: [
      {
        type: String,
        enum: ["veg", "non-veg"],
      },
    ],
  },
  image: {
    type: String,
  },
  Bestseller: {
    type: Boolean,
  },
  description: {
    type: String,
  },
  firm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Firm",
  },
});

const Product = mongoose.model("Product", Productschema);
module.exports = Product;
