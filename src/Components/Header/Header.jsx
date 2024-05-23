import React,{useContext} from "react";
import { LuMapPin } from "react-icons/lu";
import { IoMdSearch } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import classes from "./Header.module.css";
import flag from "../../assets/usa.png";
import LOwerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
// import { reducer } from "../../Utility/reducer";
// import {link} from 'react-router-dom';



function Header() {
  
  // const [{basket},dispatch]=useContext(DataContext)
  return (
    <>
    <section className={classes.fixed}>
      <section className={classes.header_container}>
        <div className={classes.logo_container}>
          <a href="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt=""
            />
          </a>
        </div>
        <div className={classes.delivery}>
          <span>
            <LuMapPin className={classes.map} />
          </span>
          <div
            className=""
            style={{ display: "flex", flexDirection: "column" }}
          >
            <p>Deliver to</p>
            <p>Ethiopia</p>
          </div>
        </div>
        <div className={classes.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" name="" id="" placeholder="search" />
          <IoMdSearch className={classes.searchicon} />
        </div>
        {/* right side */}
        <div className={classes.country}>
          {/* <div> */}
        
          <img src={flag} alt="" className={classes.us} />
          
          <section className={classes.lan}>
            <option value="">EN</option>
            <IoMdArrowDropdown className={classes.op} />
          </section>

        </div>


        {/* three components */}
        <a href="/auth">
          <div className={classes.sign}>
            <p className={classes.hello}>Hello, sign in</p>
            <p className={classes.acc}>Account & lists</p>
           
          {/* <IoMdArrowDropdown/> */}
          </div>
        </a>
        {/* order */}

        <div className={classes.return}>
          <a href="/orders">
        <p>returns</p>
          <p>& Orders</p>
          </a>
        </div>
         
        
        <div className={classes.cart}>
          <a href="cart">
            
        <FiShoppingCart size={35}/>
        <span>8</span>
          </a>
        </div>
       
        
        {/* </div> */}
      </section>
      <LOwerHeader/>
      </section>
    </>
  );
}

export default Header;
