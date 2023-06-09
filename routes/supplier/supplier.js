const express = require('express');
const router = express.Router();
const controller = require("../../controllers/supplier.controller")

router.get('/', controller.getAllSuppliers);
router.post('/create', controller.createSupplier)
router.put('/update/:id', controller.updateSupplier)
module.exports = router;