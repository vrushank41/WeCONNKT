import './stylesheets/App.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import Login from "./pages/Login"

function App() {
  return (
    <div className="App">   

    <BrowserRouter>
    <Routes>
        <Route path='/login' element={<Login/>}/>       
    </Routes>
    </BrowserRouter>

     
    </div>
  )
}

export default App
