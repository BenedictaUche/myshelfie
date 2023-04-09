import React, { useState } from "react";
import Header from "../Components/Header/Header";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    password: "",
  });

  const handleClick = () => {
    navigate("/home");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      handleClick();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const { fullName, password } = formData;
    const fullNameError = fullName.trim() === "" ? "Full name is required" : "";
    const passwordError = password.trim() === "" ? "Password is required" : "";
    setErrors({
      fullName: fullNameError,
      password: passwordError,
    });
    valid = fullNameError === "" && passwordError === "";
    return valid;
  };

  return (
    <div style={{ backgroundColor: "#E9E2D0" }}>
      <Container>
        <Header />
        <h1 className="text-center">Sign In</h1>
        <Form onSubmit={handleSubmit} className="d-flex flex-column">
          <Form.Group class="mb-3">
            <Form.Label className="text-uppercase">Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              isInvalid={errors.fullName !== ""}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group class="mb-3">
            <Form.Label className="text-uppercase">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={errors.password !== ""}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" className="text-capitalize">
            Log In
          </Button>
          <Link to="/signup" className="mt-2">
            Don't have an account? Sign up
          </Link>
          <hr />
          <p className="text-center">Or log in with</p>
          <Button variant="secondary" className="w-100 mb-2">
            Google
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Signin;
