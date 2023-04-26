import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemesContext";
import PopupSignInMethods from "../components/PopupSignInMethods";
import { ProfileIcon } from "../components/icons/Icons";

export const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const containerDark = useTheme();

  let avatar = {
    color: containerDark ? "#000000" : "#ffffff",
  };

  function handleFileInputChange(e) {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile);
  }
  function handleImageRemoval() {
    setFile();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value,
        file
      );
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters");
      } else if (error.code) {
        setError("Something went wrong, please try again");
      }
    }
    setLoading(false);
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}
          <div className="w-100 d-flex flex-column align-items-center mb-4">
            {file ? (
              <Image
                src={URL.createObjectURL(file)}
                roundedCircle={true}
                fluid={true}
                style={{ height: 100, width: 100 }}
              />
            ) : (
              <ProfileIcon color={avatar.color} w="100" h="100" />
            )}
            <label
              className="mt-2 text-primary"
              style={{ cursor: "pointer" }}
              htmlFor="file"
            >
              Upload picture
            </label>
            {file && (
              <p
                onClick={handleImageRemoval}
                className="text-danger"
                style={{ fontSize: 14, cursor: "pointer" }}
              >
                Remove picture
              </p>
            )}
            <input
              id="file"
              type="file"
              style={{ visibility: "hidden" }}
              onChange={handleFileInputChange}
              accept="image/*"
            />
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Display name"
                ref={nameRef}
              />
            </Form.Group>
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
            <Form.Group id="password-confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button type="submit" className="w-100 mt-2" disabled={loading}>
              Sign Up
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            Or sign in with:
            <PopupSignInMethods />
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};
