
import { useRecipesContext } from "../hooks/useRecipeContext";
import { formatDistanceToNow } from 'date-fns';
import { useAuthContext } from "../hooks/useAuthContext";
const RecipeDetails = ({ recipe }) => {
  const{dispatch} = useRecipesContext()
  const{user} = useAuthContext()
   

    const handleClick = async() =>{
      if (!user){
        return
      }
        const response = await fetch("/api/recipes/" + recipe._id, {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type:"DELETE_RECIPE", payload: json})
        }
    }
    
    return (
      <div className="recipe-details">
        <div className="content">
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
          <p>{formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}</p>
          <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </div>
        {recipe.selectedImage && (<img src={recipe.selectedImage} alt ='Recipe Visual' />)}
        <div className="nutrition-stats">
          <ul>
            <li>Total Calories:   {recipe.cals} Cals</li>
            <li>Total Carbohydrates:   {recipe.carbs}g</li>
            <li>Total Protein:   {recipe.protein}g</li>
            <li>Total Fats:    {recipe.fats}g</li>
          </ul>
        </div>
      </div>

    );
  };
  
  export default RecipeDetails;