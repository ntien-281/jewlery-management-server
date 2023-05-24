const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("This gets all service invoices, modify in routes/service_form/service_form.js");
});

module.exports = router;