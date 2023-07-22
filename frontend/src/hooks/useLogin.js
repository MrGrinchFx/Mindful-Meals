import{useState} from'react'
import { useAuthContext } from './useAuthContext'


export const useLogin = () =>{

const [error, setError] = useState(null)
const [isLoading, setIsLoading] = useState(null)
const {dispatch} = useAuthContext() 
const login = async (username, password) =>{
    setError(null)
    setIsLoading(true)

    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    })

    const json = await response.json()
    if(!response.ok){
        setIsLoading(false)
        setError(json.error)
    }
    if(response.ok){
    localStorage.setItem('user', JSON.stringify(json))
    setIsLoading(false)
    dispatch({type: 'LOGIN', payload:json})
    }
}
return {isLoading, error, login}
}
