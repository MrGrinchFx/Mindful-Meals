const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IngredientsSchema = new Schema({
    name:{
        type:String,
        required:false
    },
});

module.exports = mongoose.model("Ingredient", IngredientsSchema)