const Recipe = require("../models/recipeModels")
const mongoose = require('mongoose')
//get all recipes

const getAllRecipes = async(req,res) =>{
    const recipes = await Recipe.find({}).sort({createdAt: -1}) // '{}' usually looks for a property, leaving it blank will ensure all are retrieved
    res.status(200).json(recipes)
}

//get a single recipe

const getRecipe = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Recipe"})
    }
    const recipe = await Recipe.findById(id)
    if(!recipe){
        return response.status(404).json({error: "No such recipe"})
    }
    res.status(200).json(recipe)
}

//create new recipe

const createRecipe = async(req,res)=>{
    const {title, ingredients} = req.body

    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!ingredients){
        emptyFields.push('ingredients')
    }
    // if(!images){
    //     emptyFields.push('images')
    // }
    if(emptyFields.length > 0){
        res.status(400).json({error: 'Please Fill In All Boxes', emptyFields})
    }
    else{
    //add document to db
    try{
        const recipe = await Recipe.create({title, ingredients});
        res.status(200).json(recipe)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
}

//delete a recipe

const deleteRecipe = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Recipe Doesn't exist"})
    }

    const recipe = await Recipe.findByIdAndDelete({_id: id})
    if(!recipe){
        return res.status(400).json({error: "Recipe Doesn't Exist"})
    }
    res.status(200).json(recipe)
}

//update a recipe

const updateRecipe = async (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Recipe Doesn't Exist"})
    }
    const recipe = await Recipe.findOneAndUpdate({_id: id}, {
        ...req.body
    }) 

    if(!recipe){
        return res.status(400).json({error:"Recipe Doesn't Exist"})
    }
    res.status(200).json(recipe)

}

module.exports = {
    createRecipe,
    getRecipe,
    getAllRecipes,
    deleteRecipe,
    updateRecipe
}