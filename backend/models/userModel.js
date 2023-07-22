const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const validator = require('validator')
const Schema = mongoose.Schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        }
    }
)

userSchema.statics.signUp = async function(username, password){
    
    //validation logic:
    if(!username || !password){
        throw Error("There is no username or password")
    }
    if (!validator.isEmail(username)){
        throw Error("Username is not a valid Email Address")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough")
    }
    //continue the hashing
    const exists = await this.findOne({username})
    if(exists){
        throw Error("This Username already exists")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({username, password: hash})
    return user
}

userSchema.statics.login = async function(username, password){
    if(!username || !password){
        throw Error("There is no username or password")
    }
    const user = await this.findOne({username})
    if(!user){
        throw Error("username doesn't exist")
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match){
        throw Error("Incorrect Password")
    }
    return user
}

module.exports = mongoose.model('UserModel', userSchema)


