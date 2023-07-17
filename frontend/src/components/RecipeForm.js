
import {useState} from 'react'
import { useRecipesContext } from '../hooks/useRecipeContext'

const RecipeForm = ()=>{
    const{dispatch} = useRecipesContext() // extracts the dispatch function from the context
    const [title, setTitle] = useState('') // set all the model props to null initially
    const [ingredients, setIngredients] = useState([''])
    // const [image, setImages] = useState('')
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const handleSubmit = async(e) =>{
        e.preventDefault() //makes sure the server doesn't refresh the page

        const recipe = {title, ingredients}
        const response = await fetch('/api/recipes', {
            method: 'POST',
            body:JSON.stringify(recipe),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        else if(response.ok){
            setTitle('')
            setIngredients([]);
            // setImages('')
            setEmptyFields([])
            setError(null)
           dispatch({type: "CREATE_RECIPE", payload: json})
        }
    }

    const addIngredients = () =>{
        setIngredients([...ingredients, '']);
    }

    const deleteIngredient = (index) =>{
        const newIngredients = [...ingredients]
        newIngredients.splice(index, 1)
        setIngredients(newIngredients)
    }

    return (
        <form  className="create" onSubmit={handleSubmit}>
            <h3>
                Add a New Recipe
            </h3>
            <label>Recipe Title:</label>
            <input type="text" onChange = {(e) =>setTitle(e.target.value)}
            value = {title} className={emptyFields.includes('title') ? "error" : ""}
            />


<label>Ingredients List</label>
    <div className="ingredient-details">
    {ingredients.map((ingredient, index) => (
      <input
        type="text"
        key={index}
        onChange={(e) => {
          const newIngredients = [...ingredients];
          newIngredients[index] = e.target.value;
          setIngredients(newIngredients);
        }}
        value={ingredient}
      />
    ))}
            <button>Add Recipe</button>
            <span><button type="button" onClick={addIngredients}>Add Ingredients</button></span>
            <span><button className = "material-symbols-outlined" type="button" onClick={deleteIngredient}>Delete</button></span>
            </div>
            {error &&
            <div className="error">
                {error}    
            </div>}
        </form>
    )
}

export default RecipeForm