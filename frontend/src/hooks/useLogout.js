import { useAuthContext } from "./useAuthContext"
import { useRecipesContext } from "./useRecipeContext"

export const useLogout = () =>{
    const {dispatch} = useAuthContext()
    const{dispatch : recipeDispatch} = useRecipesContext()
    const logout = () =>{
        //remove user token from local storage
        localStorage.removeItem('user')
        //dispatch the logout action
        dispatch({type: 'LOGOUT'})
        recipeDispatch({type : 'SET_WORKOUTS', payload: null})

    }
    return {logout}
}