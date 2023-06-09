const db = require('../models');
const { createSellDetails } = require('./sellformdetail.controller');

const SellForm = db.SellForm;


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
const createSellForm = async (req, res) => {
  const { customer, cart, total } = req.body;
  let sellId;
  let result;
  try {
    result = await SellForm.create({ customer, total });
  } catch(err) {
    console.log(err);
    res.status(500).send("Something went wrong")
  }
  if (result) {
    sellId = result.id;
    console.log("Sell form initialized successfully", sellId);
    res.status(200).send(result);
    cart = cart.forEach(item => {
      return {
        ...item,
        SellFormId: sellId
      }
    });
  }
  createSellDetails(cart);
}


// INFO: "include"s to get details, related product types.
const getAllSellForm = async (req, res) => {
  let forms = await SellForm.findAll({
    include: [
      {
        model: db.SellFormDetail,
        include: [
          {
            model: db.Product,
            include: [
              {
                model: db.ProductType,
              }
            ]
          }
        ]
      }
    ]
  });
  if (forms) {
    if (forms.length <= 0) res.status(200).send("No sales found");
    else {
      res.status(200).send(forms);
    }
  }
  else {
    res.status(500).send("Something went wrong")
  }
}

module.exports = { createSellForm, getAllSellForm }