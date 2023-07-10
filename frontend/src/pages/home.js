import { useEffect} from "react"
import RecipeDetails from "../components/recipeDetails";
import RecipeForm from '../components/RecipeForm';
import { useRecipesContext } from "../hooks/useRecipeContext";

const Home = () => {
    const {recipes, dispatch} = useRecipesContext()
    useEffect(() =>{
        const fetchRecipes = async () =>{
            const response = await fetch("/api/recipes")
            const json = await response.json()

            if(response.ok){
               dispatch({type: "SET_RECIPES", payload: json})
            }
           
        }

        fetchRecipes()
    }, [dispatch])

    return (
        <div className="home">
            <div className="recipes">
                {recipes && recipes.map((recipe) => (
                    <RecipeDetails key = {recipe._id} recipe = {recipe}/>
                ))}
            </div>
            <RecipeForm/>
        </div>
    )
}

export default Home