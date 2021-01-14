import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../store/AuthContext";
import axios from "axios";

const Navbar = () => {
  const { setAuthData, auth } = useContext(authContext);
  const [, setError] = useState("");
  const logoutHandler = async () => {
    try {
      await axios.get("/auth/logout");
      setAuthData(null);
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  //
  return (
    <nav>
      <div className="nav-wrapper">
        <span className="logo">Login Paradise</span>
        {auth.data ? (
          <div className="nav-links">
            <Link to="/login" onClick={logoutHandler}>
              Log out
            </Link>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
