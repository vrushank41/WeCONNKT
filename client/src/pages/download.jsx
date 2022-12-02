import React from 'react'
import logo from "../assets/logo.jpeg"

const Download = () => {
  return (
    <div>
      {/* <a href="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" download>download</a> */}
      <a href={logo} download="test1.jpg" title='test1' target="_blank">
        <img src={logo} alt="W3Schools" width="104" height="142" />
      </a>
    </div>
  )
}

export default Download