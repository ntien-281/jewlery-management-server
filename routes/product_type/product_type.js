const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
  res.send("This return all product types, modify in routes/product_type/product_type.js");
})

module.exports = router;