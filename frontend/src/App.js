
import{BrowserRouter, Routes, Route} from 'react-router-dom'
//imported components
import Home from "./pages/home"
import Navbar from "./components/navbar"

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar></Navbar>
      <div className="pages">
        <Routes>
          <Route 
            path ='/'
            element = {<Home/>}>
           
          </Route>
        </Routes>
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;