import './stylesheets/App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Register from './pages/Register';
import SetAvatar from './components/setAvatar';
import Chat from './pages/Chat';
import Download from './pages/download';

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Chat />} />
          <Route path='/setAvatar' element={<SetAvatar />} />
          <Route path='/download' element={<Download />} />
          
        </Routes>
      </Router>


    </div>
  )
}

export default App