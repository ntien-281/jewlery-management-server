const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("This gets all sell invoices, modify in routes/sell/sell.js");
});

module.exports = router;