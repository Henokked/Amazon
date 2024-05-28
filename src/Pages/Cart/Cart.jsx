import React, { useContext } from "react";
import LayOut from "../../Components/Layout/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/product/ProductCard";
import CurrencyFormat from "../../Components/currentformat/CurrencyFormat";
import { Link } from "react-router-dom";
import classes from "./Cart.module.css"
import {Type} from "../../Utility/Actiontype"
import { FaArrowCircleDown } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  console.log("basket", basket);
  const total = basket.reduce((amount,item)=>{
    return item.price * item.amount + amount
  },0)

const increment =(item)=>{
  dispatch({
    type :Type.ADD_TO_BASKET,
    item
  })
}
const decrement = (id)=>{
  dispatch({
    type: Type.REMOVE_FROM_BASKET,
    id
  })
}

console.log(basket)

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length == 0 ? (
            <p>Opps ! No item in your cart</p>
          ) : (
            basket?.map((item, i) => {
              return <section className={classes.cart_product}>
                
                <ProductCard
                  key={i}
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
                <div className={classes.btn_container}>
                  <button className={classes.btn} onClick={()=>increment(item)}><FaArrowAltCircleUp /></button>
                  <span>{item.amount}</span>                
                  <button  className={classes.btn}onClick={()=>decrement(item.id)}><FaArrowCircleDown/></button>
                </div>
                
              </section>
            })
          )}
        </div>
        {basket?.length !==0&&(
          <div className={classes.subtotal}>
          <div>
            <p>Subtotal({basket?.length} items)</p>
            <CurrencyFormat amount={total}/>
          </div>
          <span>
            <input type="checkbox"/>
            <small>This order conatains a gift</small>
          </span>
          <Link to="/payment">Continue to checkout</Link>
          </div>

        )}
        
      </section>
    </LayOut>
  );
}

export default Cart;
