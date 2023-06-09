const db = require("../models");

const SellFormDetail = db.SellFormDetail;

// Reference cart:
// cart = [
//   {
//     ProductId,
//     ProductTypeId,
//     quantity,
//     subtotal,
//     SellFormId,
//   }
// ]

const createSellDetails = async (cart) => {
  const result = await Promise.all(
    cart.map(async (item) => {
      await SellFormDetail.create({
        ...item,
      });
    })
  ).then(details => {
    console.log("Details created");
    res.status(200).send(details);
  }).catch(err => {
    console.log("Something went wrong", err);
    res.status(400).send("Something went wrong", err);
  });
};

module.exports = { createSellDetails }