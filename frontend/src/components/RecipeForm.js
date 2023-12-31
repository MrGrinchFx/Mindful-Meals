
import { useState, useRef } from 'react';
import { useRecipesContext } from '../hooks/useRecipeContext';
import { useAuthContext } from '../hooks/useAuthContext';

const RecipeForm = () => {
  const { user } = useAuthContext();
  const { dispatch } = useRecipesContext();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [error, setError] = useState('');
  const [ingredientErrors, setIngredientErrors] = useState(new Array(ingredients.length).fill(false)); // Initialize with false for each ingredient
  const [selectedImage, setSelectedImage] = useState('')
  const fileInputRef = useRef(null)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the image input value
    }
    // Check for empty ingredients and set error status
    const newIngredientErrors = ingredients.map((ingredient) => !ingredient.trim());
    
    setIngredientErrors(newIngredientErrors);
     // Check if any ingredient has an error
    if(newIngredientErrors.includes(true) && !title.trim()){
      setError('Please fill in all required fields')
      return;
    }
    if (newIngredientErrors.includes(true)) {
    setError('Please fill in all ingredients.');
    return;
   }
  // Check if the title is empty and set an error
    if (!title.trim()) {
    setError('Please fill in the title.');
    return;
  }

  let cals = 0;
  let protein = 0;
  let carbs = 0;
  let fats = 0;
  const nutritionQuery = ingredients.join(', ');
  const headers = {
    'X-Api-Key': 'C0fNeI9pZ3jdD0kNSkBOkw==xRjlHBWZxBoFfiM8'
  };
  fetch('https://api.calorieninjas.com/v1/nutrition?query=' + nutritionQuery, {
    method: 'GET',
    headers: headers
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed with status: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      data.items.forEach((ingredient) => {
        cals += ingredient['calories'];
        protein += ingredient['protein_g'];
        carbs += ingredient['carbohydrates_total_g'];
        fats += ingredient['fat_total_g'];
      });
    })
    .then(() => {
      const recipe = { title, ingredients, selectedImage, cals, protein, carbs, fats };
      return fetch('/api/recipes', {
        method: 'POST',
        body: JSON.stringify(recipe),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });
    })
    .then(async response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(data.error);
        });
      }
      return response.json();
    })
    .then(json => {
      setTitle('');
      setIngredients(['']);
      setSelectedImage('');
      setError(null);
      setIngredientErrors(new Array(1).fill(false)); // Reset ingredient errors for a single ingredient
      dispatch({ type: 'CREATE_RECIPE', payload: json });
    })
    .catch(error => {
      setError(error.message);
    });
  }
      
   
   

    
  const handleImage = (event) =>{
   
      try {
        const uploadedImage = event.target.files[0];
        if (uploadedImage) {
          // Use FileReader to read the image as a data URL
          const reader = new FileReader();
          reader.onload = (e) => {
            setSelectedImage(e.target.result); // Set selectedImage with the data URL
            console.log(e.target.result)
          };
          reader.readAsDataURL(uploadedImage); // Start reading the file
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
  
  }
  const addIngredients = () => {
    setIngredients([...ingredients, '']);
    setIngredientErrors([...ingredientErrors, false]); // Initialize error status for the new input
  };

  const deleteIngredient = (index) => {
    const newIngredients = [...ingredients];
    if(ingredients.length > 1){
        newIngredients.splice(ingredients.length - 1, 1); 
    }
    setIngredients(newIngredients);

    const newIngredientErrors = [...ingredientErrors];
    newIngredientErrors.splice(ingredients.length - 1 , 1);
    setIngredientErrors(newIngredientErrors);
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Recipe</h3>
      <label>Recipe Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={error && !title.trim() ? 'error' : ''}
      />

      <label>Ingredients List</label>
      <div className="ingredient-details">
        {ingredients.map((ingredient, index) => (
          
            <input
              type="text"
              onChange={(e) => {
                const newIngredients = [...ingredients];
                newIngredients[index] = e.target.value;
                setIngredients(newIngredients);
              }}
              value={ingredient}
              className={error && ingredientErrors[index] ? 'error' : ''}
            />
        ))}
      </div>
      <div className='photo-submission'>
        <label>Add a Photo</label>
        <input type="file" accept='.jpg, .png, jpeg' onChange={handleImage} ref={fileInputRef}/>
        {selectedImage && (
        
          <img src = {selectedImage} alt ="Recipe" ></img>
       
        )}
      </div>
      <div className='controlling-buttons'>
        <button>Add Recipe</button>
        <span>
          <button type="button" onClick={addIngredients}>
            Add Ingredients
          </button>
        </span>
        <span>
          <button className="material-symbols-outlined" type="button" onClick={deleteIngredient}>
            Delete
          </button>
        </span>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default RecipeForm;