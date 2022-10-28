import React, { useState, useEffect } from "react";
import Robot from "../assets/robot.gif";
import '../stylesheets/welcome.scss'

export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const getData=async ()=>{
        setUserName(await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)).username);
    }
}, []);
  
return (
    <div className="container">
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
);
}
