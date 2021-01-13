import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { authContext } from "../store/AuthContext";

const Navbar = () => {
  const history = useHistory();
  const { setAuthData, auth } = useContext(authContext);
  const logoutHandler = () => {
    setAuthData(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    history.push("/login");
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <span className="logo">Login Paradise</span>
        {auth.data ? (
          <div className="nav-links">
            <Link to="/" onClick={logoutHandler}>
              Log out
            </Link>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
