import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";
import "../stylesheets/logout.scss"
import { LOGOUT_ROUTE } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(import.meta.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${LOGOUT_ROUTE}/${id}`);
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

