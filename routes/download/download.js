const express = require('express');
const router = express.Router();
const XLSX = require("xlsx");

router.post('/', async (req, res) => {
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="SheetJSNode.xlsx"'
  );
  res.setHeader("Content-Type", "application/vnd.ms-excel");
  let data = JSON.stringify(req.body);
  console.log(data);
  // res.status(200).send(data);
  try{
    const worksheet = XLSX.utils.json_to_sheet(JSON.parse([data]));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    var downloadFile = XLSX.write(workbook, {
      type: 'buffer',
      bookType: "xlsx"
    });
    res.status(200).send(downloadFile);
  }
  catch(error){
    console.log(error);
  }
});
module.exports = router;