// path: frontend/src/context/AuthContext.jsx
import React, { createContext } from "react";

export const authDataContext = createContext();

function AuthContext({ children }) {
  const serverUrl = process.env.REACT_APP_API_URL;  // Dynamically reads from .env

  return (
    <authDataContext.Provider value={{ serverUrl }}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
