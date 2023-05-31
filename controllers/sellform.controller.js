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

const getAllSellForm = async (req, res) => {
  let forms = await SellForm.findAll();
  if (forms) {
    if (forms.length <= 0) res.status(200).send("No product found");
    else {
      res.status(200).send(forms);
    }
  }
  else {
    res.status(500).send("Something went wrong")
  }
}

module.exports = { createSellForm, getAllSellForm }