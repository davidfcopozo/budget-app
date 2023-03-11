import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PopupSignInMethods from "./PopupSignInMethods";

export const Login = () => {
  const { REACT_APP_DUMMY_EMAIL, REACT_APP_DUMMY_PASSWORD } = process.env;
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/wrong-password") {
        setError("Wrong password");
      } else if (error.code === "auth/user-not-found") {
        setError("User not found");
      } else if (error.code) {
        setError("Something went wrong, please try again");
      }
    }
    setLoading(false);
  }

  return (
    <>
      <Card
        style={{ width: "60vw" }}
        className="d-flex justify-items-center mx-auto"
      >
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@email.com"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Container className="d-flex flex-column align-items-center w-100">
              <Button type="submit" className=" w-50  mt-2" disabled={loading}>
                Sign In
              </Button>
            </Container>
          </Form>
          <Container className="d-flex flex-column align-items-center w-100 mt-4">
            <p>Want to take a peep? Try the:</p>
            <Button
              type="submit"
              variant="success"
              className="d-block justify-self-center w-50 mx-auto"
              onClick={() => {
                login(REACT_APP_DUMMY_EMAIL, REACT_APP_DUMMY_PASSWORD);
                navigate("/");
              }}
              disabled={loading}
            >
              Dummy account
            </Button>
          </Container>
          <div className="w-100 text-center mt-2">
            Or sign in with:
            <PopupSignInMethods />
          </div>

          <div className="w-100 text-center mt-2">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        Don't have an account yet? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
};
