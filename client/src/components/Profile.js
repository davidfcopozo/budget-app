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
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h2 className="text-center w-100 mb-2">Profile</h2>
      <Card className="d-flex flex-column align-items-center w-75 h-100">
        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}
        <strong>Weoclme</strong>{" "}
        {(currentUser && currentUser.displayName) ||
          (currentUser && currentUser.email)}
        <Link
          to="/update-profile"
          className="btn btn-primary mt-3 d-flex flex-row"
        >
          Update Profile
        </Link>
        <div className="w-100 text-center mt-2">
          <Button variant="danger" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </Card>
    </div>
  );
};
