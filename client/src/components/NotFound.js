import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-page-wr">
      <h1>404 - Not Found!</h1>
      <Link to="/">
        <button className="btn">Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
