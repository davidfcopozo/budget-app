import React, { useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <>
      <h2 className="text-center w-100 mb-2">Dashboard</h2>
      <Card>
        <Card.Body>Profile</Card.Body>
        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}
        <strong>Weoclme</strong>{" "}
        {(currentUser && currentUser.displayName) ||
          (currentUser && currentUser.email)}
        <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
          Update Profile
        </Link>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
};
