const express = require('express');
const router = express.Router();
const parameterController = require('../../controllers/parameter.controller')
//const checkUserPermission = require("../../middleware/authorization").checkUserPermission

app.get("/parameter", parameterController.getParameter)
app.post("/parameter", parameterController.createParameter)
app.put("/parameter/:id", parameterController.updateParameter)
//app.get("/parameter", parameterController.getParameter)
//app.post("/parameter", checkUserPermission('change'), parameterController.createParameter)
//app.put("/parameter/:id", checkUserPermission('change'), parameterController.updateParameter)