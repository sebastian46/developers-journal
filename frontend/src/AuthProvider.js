import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const checkAuthToken = () => {
  const token = localStorage.getItem("token");
  return token && !isTokenExpired(token); // Assuming isTokenExpired is defined as before
};

// Helper function to check if the JWT token has expired
const isTokenExpired = (token) => {
  try {
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    const { exp } = JSON.parse(decodedPayload);
    const currentTime = Date.now() / 1000;
    return currentTime > exp;
  } catch (error) {
    console.error("Error checking token expiry: ", error);
    return true; // If there's an error, assume the token is expired
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthToken());

  useEffect(() => {
    // Set the auth state based on the token check
    setIsAuthenticated(checkAuthToken());
  }, []);

  const login = (token) => {
    if (!isTokenExpired(token)) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    } else {
      console.error("Attempted to login with an expired token.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
