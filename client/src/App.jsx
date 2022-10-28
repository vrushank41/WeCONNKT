import './stylesheets/App.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import Login from "./pages/Login"

function App() {
  return (
    <div className="App">   

    <Router>
    <Routes>
        <Route path='/login' element={<Login/>}/>       
    </Routes>
    </Router>

     
    </div>
  )
}

export default App
