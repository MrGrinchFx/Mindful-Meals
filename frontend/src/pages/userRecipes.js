import { useEffect} from "react"
import RecipeDetails from "../components/recipeDetails";
import RecipeForm from '../components/RecipeForm';
import { useRecipesContext } from "../hooks/useRecipeContext";
import {useAuthContext} from '../hooks/useAuthContext'

const UserRecipes = () => {
    const {recipes, dispatch} = useRecipesContext()
    const {user} = useAuthContext()
    useEffect(() =>{
        
        
        const fetchMyRecipes = async () =>{
            const response = await fetch('/api/recipes/myRecipes', {
                method: 'GET',
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok){
                dispatch({type:'SET_RECIPES', payload: json})
            }
        }
        
        if(user){
            fetchMyRecipes()
        }
      
    }, [user, dispatch])

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
export default UserRecipes