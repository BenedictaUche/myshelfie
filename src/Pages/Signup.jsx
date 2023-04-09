import React from "react";
import Header from "../Components/Header/Header";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <>
      <Header />
      <h1>Sign up</h1>
      <button onClick={handleClick}> Sign up</button>
    </>
  );
};

export default Signup;
