const express = require('express');
const productRouter = express.Router();


productRouter.get("/", (req, res) => {
  res.send("This return all products, modify in routes/product/product.js");
})

module.exports = productRouter;