import React, { useState, useContext } from "react";
import classes from "./SignUp.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { ClipLoader } from "react-spinners";
import { Type } from "../../Utility/Actiontype";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
   });

  const [{ user }, dispatch] = useContext(DataContext);
  console.log(user);
  const navigate = useNavigate()
  const navStateData = useLocation();
  console.log(navStateData)

  const authHandler = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name === "signin") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });

          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect ||"/")
        })
        .catch((err) => {
          console.log(err.message);
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect ||"/");
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo-500x313.png"
          alt="Amazon Logo"
          className={classes.logo}
        />
      </Link>
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData.state?.msg && (
          <small
            style={{
              padding:"5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",

            }}
            >
            {navStateData.state?.msg}
          </small>
        )

        }
        {/* {error && <p className={classes.error}>{error}</p>} */}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signin}
          >
            {loading.signIn ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              "sign in"
            )}
          </button>
        </form>
        <p>
          By creating an account, you agree to Amazon's Conditions of Use and
          Privacy Notice.
        </p>
        <button
          type="button"
          onClick={authHandler}
          name="signup"
          className={classes.registerbtn}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15}></ClipLoader>
          ) : (
            " Create your Amazon account"
          )}
          Create your Amazon account
        </button>

        {error && (
          <small style={{ padding: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
