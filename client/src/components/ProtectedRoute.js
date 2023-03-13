import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  if (currentUser === null) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
