const express = require('express');
const { getAllServiceTypes } = require('../../controllers/servicetype.controller.js');
const router = express.Router();

router.get('/', getAllServiceTypes)


module.exports = router;