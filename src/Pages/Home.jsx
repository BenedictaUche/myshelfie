import React from "react";
import { Container, Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../Components/Header/Header";
import { UserAuth } from "../context/AuthContext";

function Home() {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Header />
        <div className="d-flex mb-4 justify-content-end">
          <p style={{ marginRight: "3%" }}>Welcome, {user?.displayName}</p>
          {user?.displayName ? (
            <button onClick={handleSignOut}>Log out</button>
          ) : (
            <Link to="/signin">
              <button>Login</button>
            </Link>
          )}
        </div>
        <button
          style={{
            backgroundColor: "#6E5773",
            border: "none",
            padding: "10px",
            color: "#fff",
            float: "right",
          }}
        >
          ADD ARTICLE URL
        </button>
        <hr />
      </Container>
    </>
  );
}

export default Home;
