const express = require('express');
const router = express.Router();
const reportController = require('../../controllers/report.controller')

router.get('/', reportController.getAllReport)
router.post('/create', reportController.createReport);

module.exports = router;