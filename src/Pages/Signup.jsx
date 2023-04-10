import React, { useState } from "react";
import Header from "../Components/Header/Header";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    const { fullName, email, password, confirmPassword } = formData;
    const fullNameError = fullName.trim() === "" ? "Full name is required" : "";
    const emailError = email.trim() === "" ? "Email is required" : "";
    const passwordError = password.trim() === "" ? "Password is required" : "";
    const confirmPasswordError =
      confirmPassword.trim() === ""
        ? "Confirm password is required"
        : password !== confirmPassword
        ? "Passwords do not match"
        : "";
    setErrors({
      fullName: fullNameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });
    valid =
      fullNameError === "" &&
      emailError === "" &&
      passwordError === "" &&
      confirmPasswordError === "";
    return valid;
  };

  return (
    <div
      style={{ backgroundColor: "#F2F2F2", width: "100%", height: "100dvh" }}
    >
      <Container>
        <Header />
        <h1
          className="text-center"
          style={{
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "40px",
            lineHeight: "63px",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Sign In
        </h1>
        <Form onSubmit={handleSubmit} className="d-flex flex-column mt-2">
          <Form.Group class="mb-3">
            <Form.Label className="text-uppercase">Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              isInvalid={errors.fullName !== ""}
              style={{
                boxShadow: "5px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "10px",
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group class="mb-3">
            <Form.Label className="text-uppercase">Email Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="example@gmail.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={errors.email !== ""}
              style={{
                boxShadow: "5px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "10px",
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group class="mb-4">
            <Form.Label className="text-uppercase">Create Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={errors.password !== ""}
              style={{
                boxShadow: "5px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "10px",
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group class="mb-4">
            <Form.Label className="text-uppercase">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={errors.confirmPassword !== ""}
              style={{
                boxShadow: "5px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "10px",
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            className="text-capitalise loginbtn"
            style={{
              background: "#EA9085",
              border: "none",
              boxShadow: "5px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "4px",
              fontSize: "20px",
            }}
          >
            Create Account
          </Button>
          <Link to="/signin" className="mt-2">
            Already have an account? Login
          </Link>
          <hr />
          <p className="text-center">Or sign up with</p>
          <Button variant="primary" className="w-100 mb-2">
            Google
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Signup;
