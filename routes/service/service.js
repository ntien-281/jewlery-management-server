const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("This return list of services, modify at routes/service/service.js");
})


module.exports = router;