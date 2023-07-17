
import { useRecipesContext } from "../hooks/useRecipeContext";
import { formatDistanceToNow } from 'date-fns';

const RecipeDetails = ({ recipe }) => {
    const{dispatch} = useRecipesContext()
    const handleClick = async() =>{
        const response = await fetch("/api/recipes/" + recipe._id, {method: "DELETE"})
        const json = await response.json()
        if(response.ok){
            dispatch({type:"DELETE_RECIPE", payload: json})
        }
    }
    
    return (
      <div className="recipe-details">
        <h4>{recipe.title}</h4>
        <p>
          <strong>Ingredients: </strong>
          <ul>
          {recipe.ingredients.length > 0 ? (
            recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
                  ))
              ) : (
                <li>No ingredients listed.</li>
              )}
          </ul>
        </p>
        <p>{formatDistanceToNow(new Date(recipe.createdAt), {addSuffix: true})}</p>
        <span className = "material-symbols-outlined"onClick={handleClick}>Delete</span>
        
      </div>
    );
  };
  
  export default RecipeDetails;