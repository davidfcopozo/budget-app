import React from "react";
import { Container } from "react-bootstrap";
import AuthProvider from "../contexts/AuthContext";
import { Signup } from "./Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./Profile";
import { Login } from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { ForgotPassword } from "./ForgotPassword";
import { UpdateProfile } from "./UpdateProfile";

const Routing = () => {
  return (
    <Container>
      <div className="w-100" style={{ maxHeight: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/update-profile"
                element={
                  <ProtectedRoute>
                    <UpdateProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
};

export default Routing;
