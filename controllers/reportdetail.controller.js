const db = require("../models");
const ReportDetail = db.ReportDetail

/*

*/
const createReportDetails = async ( reportId, buy, sell, preStock ) => {
  let success;
  const result = await Promise.all(
    preStock.forEach(async (productId, stock) => {
      try {
        let totalImport, totalExport, beginStock, endStock;
        totalImport = buy.get(productId) ? buy.get(productId) : 1;
        totalExport = sell.get(productId) ? sell.get(productId) : 1;
        beginStock = stock
        endStock = beginStock + totalImport - totalExport
        const reportDetails = await ReportDetail.create({reportId, totalImport, totalExport, beginStock, endStock})
        console.log(reportDetails)
        if(!reportDetails){
          success = false
        }
      } catch (error) {
        console.log("Something went wrong when created Report details", error);
        success = false;
      }
    })
  )
    .then((detail) => {
      console.log("Report details created");
      success = true;
    })
    .catch((error) => {
      console.log(error);
      success = false
    })
  return success;
}

module.exports = { createReportDetails }