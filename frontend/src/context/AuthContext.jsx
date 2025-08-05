// path: frontend/src/context/AuthContext.jsx
import React, { createContext, useState } from "react";

export const authDataContext = createContext();

function AuthContext({ children }) {
  const serverUrl = "https://worknet-backend-n4mm.onrender.com";

  return (
    <authDataContext.Provider value={{ serverUrl }}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
