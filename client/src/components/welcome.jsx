import React, { useState, useEffect } from "react";
import Robot from "../assets/robot.gif";
import '../stylesheets/welcome.scss'

export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const getData = async () => {
      const user = await JSON.parse(localStorage.getItem(import.meta.env.REACT_APP_LOCALHOST_KEY))
      if (user) {
        setUserName(user.username);
      }
    }
    getData()
  }, []);

  return (
    <div className="container-welcome">
      <img className="img-welcome" src={Robot} alt="" />
      <h1 className="h1-welcome">
        Welcome, <span className="span-welcome">{userName ? userName : "Anonymous"}!</span>
      </h1>
      <h3 className="h3-welcome">Please select a chat to Start messaging.</h3>
    </div>
  );
}
