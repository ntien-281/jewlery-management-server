const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("This gets all buy invoices, modify in routes/buy/buy.js");
});

module.exports = router;