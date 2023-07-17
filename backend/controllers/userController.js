
const User = require("../models/userModel")

const loginUser = async(req,res) =>{
    res.json({mssg: "login the user"})
}

const signUpUser = async(req,res) =>{
    res.json({mssg: "signup the user"})
}

module.exports = {loginUser, signUpUser}