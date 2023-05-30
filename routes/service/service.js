const express = require('express');
const { getAllServiceTypes } = require('../../controllers/ServiceTypeController');
const router = express.Router();

router.get('/', getAllServiceTypes)


module.exports = router;