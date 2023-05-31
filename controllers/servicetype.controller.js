const db = require('../models');

const ServiceType = db.ServiceType

const getAllServiceTypes = async (req, res) => {
  const serviceTypes = await ServiceType.findAll();
  if (serviceTypes) {
    if (serviceTypes.length <= 0) res.status(200).send("No service types found");
    else {
      res.status(200).send(serviceTypes);
    }
  }
}

module.exports = { getAllServiceTypes }