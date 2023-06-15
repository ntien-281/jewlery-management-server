const express = require('express');
const { getAllServiceTypes, updateServiceType, addServiceType, getServiceTypeById } = require('../../controllers/servicetype.controller.js');
const router = express.Router();
//const checkUserPermission = require("../../middleware/authorization").checkUserPermission

router.get('/', getAllServiceTypes);
router.put('/:id', updateServiceType);
router.post("/new", addServiceType);
router.get('/:id', getServiceTypeById);
//router.get('/', checkUserPermission('read'), getAllServiceTypes);
//router.put('/:id', checkUserPermission('update'), updateServiceType);
//router.post("/new", checkUserPermission('create'), addServiceType);
//router.get('/:id', checkUserPermission('read'), getServiceTypeById);
module.exports = router;