import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemesContext";
import { ProfileIcon } from "../components/icons/Icons";

export const UpdateProfile = () => {
  const nameRef = useRef();
  const imageRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, emailUpdate, passwordUpdate, profileUpdate } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const containerDark = useTheme();
  const dummyUser = "fjxMskcdIxWnT5XRO6upKJOFOPS2";

  let avatar = {
    color: containerDark ? "white" : "#000",
  };

  function handleFileInputChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  }
  function handleImageRemoval() {
    setFile();
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (currentUser.uid === dummyUser) {
      return setError(
        "Sorry, this is a dummy account, please create your own one to be able to customize it."
      );
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    const promises = [];

    setLoading(true);
    setError("");

    if (
      !imageRef.current.value &&
      nameRef.current.value !== currentUser.displayName
    ) {
      promises.push(profileUpdate(nameRef.current.value));
    } else if (
      !nameRef.current.value &&
      imageRef.current.value.name !== currentUser.photoURL
    ) {
      promises.push(profileUpdate(file));
    } else {
      promises.push(profileUpdate(nameRef.current.value, file));
    }

    if (emailRef.current.value !== currentUser.email) {
      promises.push(emailUpdate(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(passwordUpdate(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update the account");
      })
      .finally(setLoading(false));
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
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
                style={{ height: 130, width: 130 }}
              />
            ) : currentUser?.photoURL ? (
              <Image
                src={currentUser.photoURL}
                roundedCircle={true}
                fluid={true}
                style={{ height: 130, width: 130 }}
              />
            ) : (
              <ProfileIcon color={avatar.color} w="130" h="130" />
            )}
            <label
              className={`mt-2 text-${
                currentUser.uid === dummyUser ? "muted" : "primary"
              }`}
              style={{
                cursor: `${
                  currentUser.uid === dummyUser ? "default" : "pointer"
                }`,
              }}
              htmlFor="file"
            >
              Change picture
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
              ref={imageRef}
              disabled={currentUser.uid === dummyUser ? true : false}
            />
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Display name"
                ref={nameRef}
                defaultValue={currentUser?.displayName}
                disabled={currentUser.uid === dummyUser ? true : false}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@email.com"
                ref={emailRef}
                defaultValue={currentUser?.email}
                disabled={currentUser.uid === dummyUser ? true : false}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
                disabled={currentUser.uid === dummyUser ? true : false}
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
                disabled={currentUser.uid === dummyUser ? true : false}
              />
            </Form.Group>
            <Button
              type="submit"
              className="w-25 mt-2 mx-auto d-block align-self-center"
              disabled={loading}
            >
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 mb-4">
        <Link to="/" className="text-danger">
          Cancel
        </Link>
      </div>
    </>
  );
};
