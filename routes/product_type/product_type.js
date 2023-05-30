const express = require('express');
const { getAllProductTypes, createNewProductType, getWithId } = require('../../controllers/ProductTypeController');
const router = express.Router();


router.get("/", getAllProductTypes);
router.post("/new-type", createNewProductType);
router.get("/:id", getWithId)

module.exports = router;