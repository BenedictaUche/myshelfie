import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to the Article Storage Library</h1>
      <Link to="/signin">
        <button>Login</button>
      </Link>
    </div>
  );
}

export default Home;
