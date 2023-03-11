import React from "react";
import { Container, Spinner } from "react-bootstrap";

const LoadingScreen = () => {
  return (
    <Container className="w-100 h-100  d-flex align-items-center justify-content-center">
      <Spinner animation="border" variant="primary" />
    </Container>
  );
};

export default LoadingScreen;
