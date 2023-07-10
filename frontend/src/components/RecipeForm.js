
import {useState} from 'react'
import { useRecipesContext } from '../hooks/useRecipeContext'

const RecipeForm = ()=>{
    const{dispatch} = useRecipesContext()
    const [title, setTitle] = useState('')
    const [ingredients, setIngredients] = useState('')
    // const [image, setImages] = useState('')
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const handleSubmit = async(e) =>{
        e.preventDefault()

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
            setIngredients('')
            // setImages('')
            setEmptyFields([])
            setError(null)
           dispatch({type: "CREATE_RECIPE", payload: json})
        }
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
            <input type="text" onChange = {(e) =>setIngredients(e.target.value)}
            value = {ingredients} className={emptyFields.includes('ingredients') ? "error" : ""}/>

            <button>Add Recipe</button>
           
            {error &&
            <div className="error">
                {error}    
            </div>}
        </form>
    )
}

export default RecipeForm