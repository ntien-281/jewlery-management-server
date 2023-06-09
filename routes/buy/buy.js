const express = require('express');
const router = express.Router();
const buyController = require('../../controllers/buyform.controller')

router.get('/', buyController.getAllBuyForm);
router.get('/create', buyController.createBuyForm);

module.exports = router;