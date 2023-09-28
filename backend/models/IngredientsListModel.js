const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IngredientsSchema = new Schema({
    name:{
        type:String,
        required:false
    },
    calories:{
        type: Number,
        required: false
    },
    protein:{
        type: Number,
        required: false
    },
    carbs:{
        type: Number,
        required: false
    },
    fats:{
        type: Number,
        required: false
    }
});

module.exports = mongoose.model("Ingredient", IngredientsSchema)