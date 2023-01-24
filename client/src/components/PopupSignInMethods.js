import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const PopupSignInMethods = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { githupSingIn, googleSingIn } = useAuth();
  const navigate = useNavigate();

  async function handleGithupSubmit() {
    try {
      setError("");
      setLoading(true);
      await githupSingIn();
      navigate("/");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  async function handleGoogleSubmit() {
    try {
      setError("");
      setLoading(true);
      await googleSingIn();
      navigate("/");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }
  return (
    <Container className="d-flex gap-3 justify-content-center w-100">
      <Button
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "#1B1D22",
          border: "none",
        }}
        type="submit"
        className=" mt-2 rounded-circle "
        onClick={handleGithupSubmit}
        disabled={loading}
      >
        <i className="bi bi-github"></i>
      </Button>
      <Button
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "#DE4032",
          border: "none",
        }}
        type="submit"
        className=" mt-2 rounded-circle"
        onClick={handleGoogleSubmit}
        disabled={loading}
      >
        <i className="bi bi-google"></i>
      </Button>
    </Container>
  );
};

export default PopupSignInMethods;
