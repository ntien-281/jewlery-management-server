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

// Tìm với id
const getWithId = async (req, res) => {
  const toFindId = req.params.id;
  try {
    const result = await ProductTypes.findByPk(toFindId);
    if (result) {
      console.log(`Product type with id ${toFindId} found.`);
      res.status(200).send(result);
    }
    else {
      res.status(200).send("Product type couldn't be found");
    }
  } catch (error) {
    res.status(500).send("Something went wrong")
  }
}

module.exports = { getAllProductTypes, createNewProductType, getWithId }