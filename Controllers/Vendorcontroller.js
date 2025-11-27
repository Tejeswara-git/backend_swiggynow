const Vendor = require("../models/Vendor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretkey = process.env.whatismyname;

const registervendor = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingvendor = await Vendor.findOne({ email });
    if (existingvendor) {
      return res.status(400).json({ error: "Vendor already exists" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const vendor = new Vendor({ username, email, password: hashedpassword });
    await vendor.save();
    res.status(201).json({ message: "Vendor registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const vendorlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(401).json({ error: "Invalid email" });
    }
    const checkpassword = await bcrypt.compare(password, vendor.password);
    if (!checkpassword) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ VendorId: vendor._id }, secretkey, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Vendor logged in successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getallvendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("firm");
    if (vendors.length === 0) {
      return res.status(404).json({ message: "No vendors found" });
    }
    res.status(200).json({ vendors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getsinglevendor = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const vendor = await Vendor.findById(vendorId).populate("firm");
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.status(200).json({ vendor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  registervendor,
  vendorlogin,
  getallvendors,
  getsinglevendor,
};
