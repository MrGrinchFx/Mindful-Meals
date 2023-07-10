import { recipesContext } from "../context/recipeContext";
import { useContext } from "react";

export const useRecipesContext = () =>{
    const context = useContext(recipesContext)
    if(!context){
        throw Error('useRecipesContext must be use inside an RecipesContextProvider')
    }
    return context
}