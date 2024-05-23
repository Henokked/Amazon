import React from 'react'
import { IoIosMenu } from "react-icons/io";
import classes from "../Header/Header.module.css"

function LOwerHeader() {
  return (
    <div className={classes.lowercontainer}>
        <ul>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "20px" }}>            
            <IoIosMenu />
                <p>All</p>
            
            </div>
            
            <li>Today's deals</li>
            <li>Customer service</li>
            <li>Registry</li>
            <li>Gift cards</li>
            <li>sell</li>
        </ul>

    </div>
  )
}

export default LOwerHeader