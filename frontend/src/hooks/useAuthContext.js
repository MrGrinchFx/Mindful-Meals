import { AuthContext } from "../context/authContext";
import { useContext } from "react";

export const useAuthContext = () =>{
    const context = useContext(AuthContext)
    if(!context){
        throw Error("Context must be used within the scope of the AuthContextProvider")
    }
    
    return context
}

