import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
const Navbar = () => {
const {logout} = useLogout()
const handleClick = () =>{
  logout()
}
const {user} = useAuthContext()
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Mindful Meals</h1>
        </Link>
        <nav>
          {user && (
            <div className="logout">
              <Link to = '/userRecipes'><span>{user.username}</span></Link>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar