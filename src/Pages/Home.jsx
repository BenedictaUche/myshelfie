import React from "react";
import { Link } from "react-router-dom";
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
    <div>
      <h1>Welcome to the Article Library</h1>
      <p>Welcome, {user?.displayName}</p>
      {user?.displayName ? (
        <button onClick={handleSignOut}>Log out</button>
      ) : (
        <Link to="/signin">
          <button>Login</button>
        </Link>
      )}
    </div>
  );
}

export default Home;
