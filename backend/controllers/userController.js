
const UserModel = require("../models/userModel")
const jwt = require('jsonwebtoken')

const createToken = (id) =>{
    return jwt.sign({_id: id}, 'PWOEIRWPOEITPOGIWPEOIGWPEOIGPWEOIa', {expiresIn: "3d"} )
}
const loginUser = async(req,res) =>{
   const {username, password} = req.body
    try{
        const user = await UserModel.login(username, password)
        
        const token = createToken(user._id)
        res.status(200).json({username, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const signUpUser = async(req,res) =>{
   const {username, password} = req.body
  
    try{
      
       const user = await UserModel.signUp(username, password)
       const token = createToken(user._id)
       res.status(200).json({username, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginUser, signUpUser}