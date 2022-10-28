import './stylesheets/App.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

import Login from "./pages/Login"
import Register from './pages/Register';
import ChatContainer from './components/chatContainer';
import Contacts from './components/contacts';
import Logout from './components/logout';
import SetAvatar from './components/setAvatar';
import ChatInput from './components/chatinput';
import Welcome from './components/welcome';


function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/chat' element={<ChatContainer />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/setAvatar' element={<SetAvatar />} />
          <Route path='/chat-input' element={<ChatInput/>} />
          <Route path='/welcome' element={<Welcome/>} />
        </Routes>
      </Router>


    </div>
  )
}

export default App