const express = require('express');
const { getAllProducts, createProduct, getWithId, updateProduct } = require('../../controllers/ProductController');
const productRouter = express.Router();


productRouter.get("/", getAllProducts);
productRouter.get("/:id", getWithId);
productRouter.post("/new", createProduct);
productRouter.put("/update/:id", updateProduct);

module.exports = productRouter;