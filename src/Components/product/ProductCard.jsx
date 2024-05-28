import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../currentformat/CurrencyFormat";
import classes from "./product.module.css";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/Actiontype";
import { DataContext } from "../DataProvider/DataProvider";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { image, title, id, rating, price, description } = product;

  const [state, dispatch] = useContext(DataContext);

  
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };

  return (
    <div
      className={`${classes.card_container} ${
        flex  ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "500px" }}>{description}</div>}
      </div>
      <div className={classes.rating}>
        {<Rating value={rating} precision={0.1} />}
        <small>{rating.count}</small>
      </div>
      <div className={classes.pri}>
        <CurrencyFormat amount={price} />
      </div>
      {
        renderAdd && 
        <button className={classes.button} onClick={addToCart}>
        add to cart
      </button>
      }
      
    </div>
  );
}

export default ProductCard;
