const db = require('../models');

const BuyForm = db.BuyForm;

const createBuyForm = async (req, res) => {
  const { date, total } = req.body;
  let result;
  try {
    result = await BuyForm.create({ date, total });
  } catch(err) {
    console.log(err);
    res.status(500).send("Something went wrong")
  }
  if (result) {
    console.log("Buy form created successfully");
    res.status(200).send(result);
  }
}

const getAllBuyForm = async (req, res) => {
  let forms = await BuyForm.findAll({
    include: [
      {
        model: db.BuyFormDetail,
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
      },
      {
        model: db.Supplier,
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

module.exports = { createBuyForm, getAllBuyForm }