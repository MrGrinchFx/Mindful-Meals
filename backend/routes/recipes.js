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

router.get('/', getAllRecipes)

//GET a single recipe
router.get('/userRecipes', getAllRecipes)
router.get('/:id', getRecipe)
router.get('/userRecipes', getAllUserRecipes)
//POST a new recipe
router.post("/", createRecipe)
//delete a recipe
router.delete("/:id", deleteRecipe)
//update a recipe
router.patch("/:id", updateRecipe)
module.exports = router;