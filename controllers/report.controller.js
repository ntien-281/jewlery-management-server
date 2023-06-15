const db = require("../models");
const { createReportDetails } = require("./reportdetail.controller");
const Report = db.Report
const createReport = async (req, res) => {
    const {month, year} = req.body;
    let result;
    try {
      result = await Report.create( {month, year} )
      if(result){
          //Find previous report 
          let prevMonth, prevYear;
          if(prevMonth > 1){
            prevMonth = month - 1;
            prevYear = year;
          }
          else{
            prevMonth = 12;
            prevYear = year - 1;
          }
          let products = await db.Product.findAll({
            include: [
              {
                model: db.ProductType
              }
            ]
          });
          const preStock = new Map();
          for(var product of products){
            preStock.set(product.id, [product.ProductTypeId, 0]);
          }
          let prevReport = await Report.findOne({ 
            where: { month: prevMonth, year: prevYear}
          });
          if(prevReport){
            const prevDetails = await ReportDetail.findAll({
              where: { id: prevReport.id },
            });
            for(var detail of prevDetails){
              preStock.set(detail.ProductId, [detail.ProductTypeId, detail.endStock]);
            }
          }
          let buyForms = await db.BuyForm.findAll({
            include: [
              {
                model: db.BuyFormDetail,
                include: [
                  {
                    model: db.Product,
                  },
                  {
                    model: db.ProductType,
                  },
                ],
              }
            ],
            attributes: ['Product.id', [fn('SUM', col(BuyFormDetail.quantity), 'Buy')], 'ProductType.id'],
            where: {
              [Op.and]: [
                where(fn('MONTH', col(date)), month),
                where(fn('YEAR', col(date)), year)
              ]
            },
            group: ['Product.id', 'ProductType.id'],
            raw: true,
          });
          const buy = new Map();
          for(item in buyForms){
            buy.set(item.Product.ProductId, item.Buy);
          }
          let sellForms = await db.SellForm.findAll({
            include: [
              {
                model: db.SellFormDetail,
                include: [
                  {
                    model: db.Product,
                  },
                  {
                    model: db.ProductType,
                  },
                ],
              },
            ],
            where: {
              [Op.and]: [
                where(fn('MONTH', col(date)), month),
                where(fn('YEAR', col(date)), year)
              ]
            },
            attributes: ['Product.id', [fn('SUM', col(SellFormDetail.quantity), 'Sell')], 'ProductType.id'],
            group: ['Product.id', 'ProductType.id'],
            raw: true,
          });
          const sell = new Map();
          for(item in sellForms){
            sell.set(item.Product.ProductId, item.Sell);
          }
          const success = await createReportDetails(result.id, buy, sell, preStock);
          if(!success){
            res.status(400).send("Something went wrong");
            await result.destroy();
            return;
          }
          res.status(200).send(result);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong when created Report");
    }
}

const getAllReport = async (req, res) => {
  let reports = await Report.findAll({
    include: [
      {
        model: db.ReportDetail,
        include: [
          {
            model: db.Product,
          },
          {
            model: db.ProductType,
          },
        ],
      },
    ],
  });
  if (reports) {
    if (reports.length <= 0) res.status(200).send("No reports found");
    else {
      res.status(200).send(reports);
    }
  } else {
    res.status(500).send("Something went wrong when finding report");
  }
}
module.exports = { createReport, getAllReport }