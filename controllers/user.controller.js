const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = db.User;

const signup = async (req, res) => {
    try{
        const { username, password } = req.body;
        if(!username || !password)
            return res.status(400).send("Missing username or password.");
        const information = {
            username,
            password: await bcrypt.hash(password, 10),
        };
        const user = await User.create(information);
        if(!user){
            return res.status(409).send("Sign up failed. Please try again.");
        }
        let token = jwt.sign({ id: user.id }, process.env.secretKey, {
            expiresIn: process.env.expiresIn,
        });
     
        res.cookie("jwt", token, { maxAge: process.env.cookieAge, httpOnly: true });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);
        return res.status(201).send(user);
    }
    catch(error){
        console.log(error);
    }
}

const login = async (req, res) => {
    try{
        const { username, password } = req.body;
        if(!username || !password)
            return res.status(400).send("Missing username or password");
        const user = await User.findOne({
            where:{
                username: username
            }
        })
        if(!user){
            return res.status(401).send("Wrong username or password");
        }
        const isValid = await bcrypt.compare(password, user.password); 
        if(!isValid){
            return res.status(401).send("Wrong username or password");
        }
        let token = jwt.sign({ id: user.id }, process.env.secretKey, {
            expiresIn: process.env.expiresIn,
        });
        res.cookie("jwt", token, { maxAge: process.env.cookieAge, httpOnly: true });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);
        return res.status(201).send(user);
    }
    catch(error){
        console.log(error);
    }
}
module.exports = { signup, login };