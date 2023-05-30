const db = require('../models')

const Product = db.Product

const getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  console.log(products);
  if (products) {
    if (products.length <= 0) res.status(200).send("No product found");
    else {
      res.status(200).send(products);
    }
  }
}

module.exports = { getAllProducts }