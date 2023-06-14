const db = require('../models')

const Paramater = db.Paramater;

const createParamater = async (req, res) => {
    const {name, value} = req.body;
    if(!name || !value)
        res.status(500).send("Please provide name and value");
    
    let result;
    result = await Paramater.findOne({
        where : {
            name: name
        }
    })
    if(result){
    return res.status(409).send("Paramater is already exists");
    }
    result = await Paramater.create({ name, value});
    if(!result)
        return res.status(500).send("Something went wrong");
    res.status(200).send("New paramater created");
}

const getParamater = async (req, res) => {
    let result;
    try {
        result = await Paramater.findByPk(0);
        console.log(result);
        if (result) {
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateParamater = async (req, res) => {
    const id = req.params.id;
    const newValue = req.body.value;
    let result;
    try {
        result = await Paramater.findByPk(id);
        if (result) {
            console.log("parameter befor", result)
            
            result.value = newValue;
            await result.save();
            console.log("parameter save", result)
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {createParamater, getParamater, updateParamater}