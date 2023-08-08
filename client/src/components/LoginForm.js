import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import "../assets/loginForm.css"; // Your original CSS file

import pokemonBackground from "../assets/images/pokemonbackground.webp"; // Replace with actual path

const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser, { loading }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      try {
        const { data } = await loginUser({ variables: { ...userFormData } });
        const { token } = data.login;

        Auth.login(token);
      } catch (err) {
        console.error(err);
        setShowAlert(true);
      }

      setUserFormData({
        email: "",
        password: "",
      });
      setValidated(false);
    }
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${pokemonBackground})` }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} className="pokemon-form">
            <h2 className="mb-4 pokemon-label">Pokémon Trainer Login</h2>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
              <Alert
                dismissible
                onClose={() => setShowAlert(false)}
                show={showAlert}
                variant="danger"
                className="pokemon-alert"
              >
                Something went wrong with your login credentials!
              </Alert>
              <Form.Group className="mb-3">
                <Form.Label className="pokemon-label">Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your email"
                  name="email"
                  onChange={handleInputChange}
                  value={userFormData.email}
                  required
                  className="pokemon-input"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="pokemon-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Your password"
                  name="password"
                  onChange={handleInputChange}
                  value={userFormData.password}
                  required
                  className="pokemon-input"
                />

              </Form.Group>
              <Button
                type="submit"
                variant="warning"
                disabled={loading || !(userFormData.email && userFormData.password)}
                className="pokemon-button"
              >
                {loading ? "Logging in..." : "Log In"}
              </Button>

            </Form>
            <p className="mt-3">
              Don't have an account?{" "}
              <Link to="/signup" className="pokemon-signup-link">
                Sign Up
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;