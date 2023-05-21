import React from "react";
import { Link } from "react-router-dom";
import { publicLinks } from "../constants/links";

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="land-text">
        <h1>Welcome to The Engine Bubble</h1>
        <p>
          A social group for engineering enthusiasts. All types of engineers.
        </p>
        <Link className="land-link" to={publicLinks.Login}>
          Login
        </Link>
        <Link className="land-link" to={publicLinks.Register}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default Landing;
