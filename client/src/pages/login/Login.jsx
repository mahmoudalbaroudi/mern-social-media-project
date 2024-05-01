import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch, error } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Albaroudi-social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Albaroudisocial
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              required
              minLength="6"
              ref={password}
            />
            {error && <span className="loginErrorMessage">{error}</span>}
            <button className="loginButton" disabled={isFetching} type="submit">
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Log in"
              )}
            </button>

            <Link to="/register">
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
