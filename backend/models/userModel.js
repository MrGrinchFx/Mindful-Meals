const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema(
    {
        Username: {
            type: String,
            required: true,
            unique: true
        },
        Password: {
            type: String,
            required: true,
        }
    }
)

module.exports = mongoose.model('UserModel', userSchema)


