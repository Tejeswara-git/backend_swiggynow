const Firm = require("../models/Firm");
const Vendor = require("../models/Vendor");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addfirm = async (req, res) => {
  try {
    const { FirmName, area, category, region, offer } = req.body;

    console.log("Request file:", req.file); // Debug log
    console.log("Request body:", req.body); // Debug log

    if (!req.file && req.body.image) {
      return res.status(400).json({
        message: "Please send image as a FILE using FormData, not as a string",
      });
    }

    const image = req.file ? req.file.path : undefined;

    if (!image) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const vendor = await Vendor.findById(req.VendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    const firm = new Firm({
      FirmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: req.VendorId,
    });

    const savedfirm = await firm.save();

    vendor.firm.push(savedfirm);
    await vendor.save();

    res
      .status(201)
      .json({ message: "Firm added successfully", firmId: savedfirm._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deletefirm = async (req, res) => {
  try {
    const firmId = req.params.id;
    const frimdelete = await Firm.findByIdAndDelete(firmId);
    if (!frimdelete) {
      return res.status(404).json({ message: "Firm not found" });
    }
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addfirm: [upload.single("image"), addfirm],
  deletefirm,
};
