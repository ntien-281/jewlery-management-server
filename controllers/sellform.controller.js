const db = require('../models');

const SellForm = db.SellForm;

const createSellForm = async (req, res) => {
  const { customer, total } = req.body;
  let result;
  try {
    result = await SellForm.create({ customer, total });
  } catch(err) {
    console.log(err);
    res.status(500).send("Something went wrong")
  }
  if (result) {
    console.log("Sell form created successfully");
    res.status(200).send(result);
  }
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