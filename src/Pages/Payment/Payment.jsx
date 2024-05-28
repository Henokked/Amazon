import React, { useContext, useState } from "react";
import LayOut from "../../Components/Layout/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/product/ProductCard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/currentformat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/Actiontype";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  console.log(user);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState();
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate =useNavigate();


  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlepayment = async (e) => {
    console.log("e", e);
    e.preventDefault();

    try {
      setProcessing(true)
      //backend || functions contact to client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      console.log(response.data.clientSecret);
      const clientSecret = response.data?.clientSecret;
      console.log("secret", clientSecret);
      //client side confirmation
      const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log(paymentIntent);

      
    //order firestore save, clear basket
      await db
      .collection("users")
      .doc(user.uid)
      .collection("orders")
      .doc(paymentIntent.id)
      .set({
        basket:basket,
        amount:paymentIntent.amount,
        created:paymentIntent.created,
      });

      //empty basket
      dispatch({type:Type.EMPTY_BASKET});

      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new order" } });
    } catch (error) {
      console.log("err", error);
      setProcessing(false)
    }

  };

  return (
    <LayOut>
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div></div>
            <div>Addis Ababa ,Ethiopia</div>
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
        </div>
        <div>
          {basket?.map((item) => (
            <ProductCard product={item} flex={true} />
          ))}
        </div>

        <hr />
        <div className={classes.flex}>
          <h3>Payment Method</h3>
        </div>
        <div className={classes.payment_card_container}>
          <div className={classes.payment_details}>
            <form onSubmit={handlepayment}>
              {cardError && <small style={{ color: "red" }}>{cardError}</small>}
              <CardElement onChange={handleChange} />
           
            <div className={classes.payment_price}>
              <div>
                <span style={{ display: "flex", gap: "10px" }}>
                  <p>Total Order | </p>
                  <CurrencyFormat amount={total} />
                </span>
              </div>
              <button type="submit">
                {
                  processing?(
                    <div className={classes.loading}>
                      <ClipLoader color="gray" size={12}/>
                      <p>please wait...</p>
                    </div>

                  ):"pay now"
                }
                
                </button>

            </div>
              </form>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
