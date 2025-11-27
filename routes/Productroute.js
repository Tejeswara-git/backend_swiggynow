const express = require("express");
const Productcontroller = require("../Controllers/Productcontroller");
const router = express.Router();

router.post("/addproduct/:id", Productcontroller.addproduct);
router.get("/getproduct/:id", Productcontroller.getproductbyfirm);

router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, `../uploads/${imageName}`));
});

router.delete("/deleteproduct/:id", Productcontroller.deleteproduct);

module.exports = router;
