import React, { useContext } from "react";
import { LuMapPin } from "react-icons/lu";
import { IoMdSearch } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import classes from "./Header.module.css";
import flag from "../../assets/usa.png";
import LOwerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import { Link } from "react-router-dom";
import {auth} from "../../Utility/firebase"
// import { reducer } from "../../Utility/reducer";
// import {link} from 'react-router-dom';

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <>
      <section className={classes.fixed}>
        <section className={classes.header_container}>
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt=""
              />
            </Link>
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
          <Link to={!user && "/auth"}>
            <div>
              {user ? (
                <>
                  <p>Hello {user?.email?.split("@")[0]}</p>
                  <span onClick={()=>auth.signOut()}>Sign Out</span>
                </>
              ) : (
                <>
                <p className={classes.hello}>Hello, sign in</p>
                <span className={classes.acc}>Account & Lists </span>
                </>
              )}
              
            </div>

                        <div className={classes.sign}>
              {/* <p className={classes.hello}>Hello, sign in</p> */}
              {/* <p className={classes.acc}>Account & lists</p> */}

              {/* <IoMdArrowDropdown/> */}
            </div>
          </Link>
          {/* order */}

          <div className={classes.return}>
            <Link to="/orders">
              <p className={classes.hello}>returns</p>
              <p className={classes.acc}>& Orders</p>
            </Link>
          </div>

          <div className={classes.cart}>
            <Link to="cart">
              <FiShoppingCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>

          {/* </div> */}
        </section>
        <LOwerHeader />
      </section>
    </>
  );
}

export default Header;
