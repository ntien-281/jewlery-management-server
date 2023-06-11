const db = require('../models');
const { createServiceDetails } = require('./serviceformdetail.controller');

const ServiceForm = db.ServiceForm;

const createServiceForm = async (req, res) => {
    const {customer, phone, date, total, paid, remain, status, cart} = req.body;
    let serviceId;
    let result;
    try{
        result = await ServiceForm.Create({customer, phone, date, total, paid, remain, status});
    }catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
    if(result){
        serviceId = result.id;
        console.log("Service form initialized");
        res.status(200).send(result);
        cart = cart.forEach(item => {
            return {
                ...item,
                ServiceFormId: serviceId
            }
        })

    }
    createServiceDetails(cart);
}

const getAllServiceForm = async (req, res) => {
    let forms = await ServiceForm.findAll({
        include: [
        {
            model: db.ServiceFormDetail,
            include: [
                {
                    model: db.ServiceType,
                }
            ]
        }
        ]
    });
    if(!forms)
        return res.status(500).send("Something went wrong");
    if(forms.length <= 0)
        res.status(200).send("No services found");
    else
        res.status(200).send(forms);
}

module.exports = { createServiceForm, getAllServiceForm }