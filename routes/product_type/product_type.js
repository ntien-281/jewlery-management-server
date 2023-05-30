const express = require('express');
const { getAllProductTypes, createNewProductType } = require('../../controllers/ProductTypeController');
const router = express.Router();


router.get("/", getAllProductTypes);
router.post("/new-type", createNewProductType)

module.exports = router;