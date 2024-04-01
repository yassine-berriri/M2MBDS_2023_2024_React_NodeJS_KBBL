import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Adjusted import statement

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  let isValidToken = false; // Changed from result to isValidToken, set initial flag to false
  
  if (token) {
    try {
      let decodedToken = jwtDecode(token);
      console.log("Decoded Token", decodedToken);
      let currentDate = new Date();
      
      // JWT exp is in seconds
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("Token expired.");
      } else {
        console.log("Valid token");
        isValidToken = true; // Token is valid, set the flag to true
      }
    } catch (error) {
      console.error("Token decoding failed", error);
      // you might want to navigate to login if there's an error in decoding
    }
  }

  return isValidToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
