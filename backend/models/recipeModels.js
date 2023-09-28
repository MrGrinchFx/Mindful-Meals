const mongoose = require('mongoose');

const Schema = mongoose.Schema;




const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    ingredients:[{
       type:String,
       required: false
    }],
    user_id:{
        type:String,
        required:true
    },
    selectedImage:{
        type:String,
        required: false
    },
    calories:{
        type: Number,
        required:false
    },
    protein:{
        type: Number,
        required: false
    },
    carbs:{
        type: Number,
        required:false
    },
    fats:{
        type:Number,
        required: false
    }
    
},{timestamps: true});

module.exports = mongoose.model('Recipe', recipeSchema)
