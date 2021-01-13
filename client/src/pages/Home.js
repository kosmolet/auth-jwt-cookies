import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { authContext } from "../store/AuthContext";

const Home = () => {
  const { error, auth } = useContext(authContext);

  return (
    <>
      <Navbar />

      {error ? (
        <div className="home-page-wr">
          <span className="error-message">{error}</span>
        </div>
      ) : (
        <div className="home-page-wr">
          <h1 className="home-page-hello">
            {" "}
            {`Hello, ${auth.data.username}`}{" "}
          </h1>

          <div>
            <h2>Your data </h2>
            <p>{`Id: ${auth.data.id}`}</p>
            <p>{`Username: ${auth.data.username}`}</p>
            <p>{`Email: ${auth.data.email}`}</p>
          </div>
          <button type="button" className="btn">
            Start
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
