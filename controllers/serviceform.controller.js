const db = require('../models');
const { createServiceDetails } = require('./serviceformdetail.controller');

const ServiceForm = db.ServiceForm;

const createServiceForm = async (req, res) => {
    const {customer, phone, total, paid, remain, cart} = req.body;
    let serviceId;
    let result;
    let cartToDetails;
    console.log(req.body);
    try{
        result = await ServiceForm.create({customer, phone, total, paid, remain});
        if(result){
            serviceId = result.id;
            console.log("Service form initialized");
            cartToDetails = cart.map(item => {
                return {
                    ...item,
                    ServiceFormId: serviceId
                }
            })
        }
        const success = await createServiceDetails(cartToDetails);
        if (!success) {
            console.log(success);
            res.status(400).send("Something went wrong");
            await result.destroy();
            return;
        }
        res.status(200).send(result);
    }catch(err){
        console.log(err);
        if (result) {
            await result.destroy();
        }
        res.status(500).send("Something went wrong");
    }
    

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