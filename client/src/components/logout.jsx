import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";
import "../stylesheets/logout.scss"
// import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    // const id = await JSON.parse(
    //   localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    // )._id;
    const id = ""
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <div className="logout-btn" onClick={handleClick}>
      <BiPowerOff />
    </div>
  );
}

