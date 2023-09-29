const express = require("express");
const {
    createRecipe,
    getAllRecipes,
    getRecipe,
    deleteRecipe,
    updateRecipe,
    getAllUserRecipes
} = require("../controllers/recipeController")
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()
router.use(requireAuth)

router.get('/myRecipes', getAllUserRecipes); // Specific route comes first
router.get('/:id', getRecipe); // Dynamic route comes second
router.get('/', getAllRecipes); // General route comes last
//POST a new recipe
router.post("/", createRecipe)
//delete a recipe
router.delete("/:id", deleteRecipe)
//update a recipe
router.patch("/:id", updateRecipe)
module.exports = router;