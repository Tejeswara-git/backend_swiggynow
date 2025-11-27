const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Vendor = require("../models/Vendor");
const secretkey = process.env.whatismyname;

const verifytoken = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decodedtoken = jwt.verify(token, secretkey);
    const vendor = await Vendor.findById(decodedtoken.VendorId);
    if (!vendor) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.VendorId = vendor._id;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = verifytoken;
