import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ data: null });
  const [error, setError] = useState("");

  const setAuthData = (user) => {
    setAuth({ data: user });
  };
  const fetchUserDate = async () => {
    setError("");
    try {
      const { data } = await axios.get("/user");

      setAuth({
        data: {
          id: data.user._id,
          username: data.user.username,
          email: data.user.email,
        },
      });
    } catch (error) {
      setError(
        "You are not authorized or your session is expired, please login again"
      );
    }
  };

  useEffect(() => {
    fetchUserDate();
  }, []);

  return (
    <authContext.Provider value={{ auth, error, setAuthData, fetchUserDate }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
