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
    }
    
},{timestamps: true});

module.exports = mongoose.model('Recipe', recipeSchema)
