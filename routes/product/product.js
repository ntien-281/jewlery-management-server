const express = require('express');
const { getAllProducts } = require('../../controllers/ProductController');
const productRouter = express.Router();


productRouter.get("/", getAllProducts)

module.exports = productRouter;