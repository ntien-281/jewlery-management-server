const db = require("../models");

const BuyFormDetail = db.BuyFormDetail;
const Product = db.Product;

// Reference cart:
// cart = [
//   {
//     ProductId,
//     ProductTypeId,
//     quantity,
//     subtotal,
//   }
// ]

const createBuyDetails = async (cart) => {
  const result = await Promise.all(
    cart.map(async (item) => {
      const product = await Product.findOne(item.ProductId);
      if (item.quantity > product.stock) {
        try {
          await BuyFormDetail.create({
            ...item,
          });
          await updateStock(item.ProductId, item.quantity);
        } catch (error) {
          console.log("Something went wrong", error);
          res.status(500).send(error);
          return;
        }
      } else {
        res.status(400).send("Stock not enough");
        return;
      }
    })
  ).then(details => {
    console.log("Details created");
  }).catch(err => {
    res.status(400).send("Something went wrong", err);
  });
}

module.exports = { createBuyDetails }