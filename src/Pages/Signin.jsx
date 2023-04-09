import React from "react";
import Header from "../Components/Header/Header";
import { useNavigate, Link } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <>
      <Header />
      <h1>Sign In</h1>
      <form>
        <label>full name</label>
        <input placeholder="Enter Full name" type="text" />
        <label>password</label>
        <input placeholder="Enter Full name" type="text" />
        <p>Login with Google</p>
        <button onClick={handleClick}>Log in</button>
        <Link to="/signup">
          <button>Don't have an account? Signup</button>
        </Link>
      </form>
    </>
  );
};

export default Signin;
