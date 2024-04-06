import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrected named import

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  console.log("meeee",localStorage.getItem('role'));
  console.log(role);

  let isAuthenticated = false;
  if (token && role) {
    try {
      const decodedToken = jwtDecode(token);
      const currentDate = new Date();

      if (decodedToken.exp * 1000 >= currentDate.getTime()) {
        console.log("Valid token");
        isAuthenticated = allowedRoles.includes(role);

      } else {
        console.log("Token expired.");
        localStorage.removeItem('token'); // Clear the expired token
        localStorage.removeItem('role');
        localStorage.setItem('isAuthenticated', 'false');

      }
    } catch (error) {
      console.error("Token decoding failed", error);
      localStorage.removeItem('token'); // Clear the invalid token
      localStorage.removeItem('role');
      localStorage.setItem('isAuthenticated', 'false');

    }
  }
  
  console.log("Is Authenticated:", isAuthenticated);
  console.log("Valid token");

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
