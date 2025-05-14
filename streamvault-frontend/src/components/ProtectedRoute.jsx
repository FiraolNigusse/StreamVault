import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>;
  }
  console.log("Auth user:", user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
