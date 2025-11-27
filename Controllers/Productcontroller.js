const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");
const Firm = require("../models/Firm");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addproduct = async (req, res) => {
  try {
    const { ProductName, Price, category, Bestseller, description } = req.body;
    const image = req.file ? req.file.path : undefined;
    if (!image) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const firmid = req.params.id;
    const firm = await Firm.findById(firmid);
    if (!firm) {
      return res.status(404).json({ message: "Firm not found" });
    }

    const product = new Product({
      ProductName,
      Price,
      category,
      image,
      Bestseller,
      description,
      firm: firm._id,
    });
    const savedproduct = await product.save();
    firm.products.push(savedproduct);
    await firm.save();

    res
      .status(201)
      .json({ message: "Product added successfully", savedproduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const getproductbyfirm = async (req, res) => {
//   try {
//     const firmId = req.params.id;
//     const firm = await Firm.findById(firmId);
//     if (!firm) {
//       return res.status(404).json({ message: "Firm not found" });
//     }
//     const restaurantname = firm.FirmName;
//     const products = await Product.find({ firm: firmId });
//     res.status(200).json({ restaurantname, products });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };.

const getproductbyfirm = async (req, res) => {
  try {
    const firmid = req.params.id;
    const firm = await Firm.findById(firmid);
    if (!firm) {
      return res.status(404).json({ message: "Firm not found" });
    }
    const firmname = firm.FirmName;
    const products = await Product.find({ firm: firmid }).populate("firm");
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json({ firmname, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteproduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const productdelete = await Product.findByIdAndDelete(productId);
    if (!productdelete) {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addproduct: [upload.single("image"), addproduct],
  getproductbyfirm,
  deleteproduct,
};
