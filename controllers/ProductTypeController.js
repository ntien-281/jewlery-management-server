const db = require('../models');

const ProductTypes = db.ProductType

// Main work

// Lấy toàn bộ loại sp
const getAllProductTypes = async (req, res) => {
  const productTypes = await ProductTypes.findAll();

  if (productTypes) {
    if (productTypes.length <= 0) res.status(200).send("No product types found");
    else {
      res.status(200).send(productTypes);
    }
  }
  else {
    res.status(500).send("Something went wrong");
  }
}

// Tạo loại sp mới
const createNewProductType = async (req, res) => {
  const { name, unit, interest } = req.body;
  const newType = await ProductTypes.create({
    name,
    unit,
    interest
  });
  if (newType) {
    console.log("new product type created");
    res.status(200).send(newType);
  }
  else {
    res.status(500).send("Something went wrong")
  }
}

module.exports = { getAllProductTypes, createNewProductType }