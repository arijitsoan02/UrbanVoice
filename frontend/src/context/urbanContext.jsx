import React, { createContext, useState, useEffect } from "react";

export const UrbanContext = createContext();

const UrbanContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Ensure this is in your .env
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userData, setUserData] = useState(null);

  // Sync token to localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    setUserData(null);
    // Add logic to navigate to login if needed in components
  };

  const value = {
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    logout
  };

  return (
    <UrbanContext.Provider value={value}>
      {props.children}
    </UrbanContext.Provider>
  );
};

export default UrbanContextProvider;