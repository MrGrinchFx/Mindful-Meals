const express = require("express");
const {
    createRecipe,
    getAllRecipes,
    getRecipe,
    deleteRecipe,
    updateRecipe
} = require("../controllers/recipeController")
const router = express.Router()

router.get('/', getAllRecipes)

//GET a single recipe
router.get('/:id', getRecipe)
//POST a new recipe
router.post("/", createRecipe)
//delete a recipe
router.delete("/:id", deleteRecipe)
//update a recipe
router.patch("/:id", updateRecipe)
module.exports = router;