import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import "../assets/loginForm.css";

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
    <Container fluid className="h-100 d-flex justify-content-center align-items-center">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Alert
              dismissible
              onClose={() => setShowAlert(false)}
              show={showAlert}
              variant="danger"
            >
              Something went wrong with your login credentials!
            </Alert>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your email"
                name="email"
                onChange={handleInputChange}
                value={userFormData.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                Email is required!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Your password"
                name="password"
                onChange={handleInputChange}
                value={userFormData.password}
                required
              />
              <Form.Control.Feedback type="invalid">
                Password is required!
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              type="submit"
              variant="success"
              disabled={loading || !(userFormData.email && userFormData.password)}
            >
              {loading ? "Logging in..." : "Submit"}
            </Button>
            <Button
              as={Link}
              to="/signup"
              variant="outline-primary"
              className="ml-2"
            >
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
