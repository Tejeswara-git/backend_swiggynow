const express = require("express");
const Vendorcontroller = require("../Controllers/Vendorcontroller");

const router = express.Router();

router.post("/addvendor", Vendorcontroller.registervendor);
router.post("/vendorlogin", Vendorcontroller.vendorlogin);
router.get("/getallvendors", Vendorcontroller.getallvendors);
router.get("/getsinglevendor/:id", Vendorcontroller.getsinglevendor);

module.exports = router;
