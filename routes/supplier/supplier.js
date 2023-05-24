const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("This returns list of supplliers, modify at router/supplier/supplier.js");
});


module.exports = router;