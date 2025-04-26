import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log(`Login success: ${userCred.user}`);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Check credentials!");
    }
  };
  return (
    <div className="grid grid-cols-2 items-center">
      <div className="space-y-3">
        <h1 className="text-5xl">Welcome Back! Let’s Get Things Done</h1>
        <p>Login to access your tasks and keep your workflow on track.</p>
      </div>
      <div>
        <h1>Login</h1>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              className="input"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              className="input"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
            />
          </Form.Group>
          <button type="submit" className="button">
            Login
          </button>
          <p>
            Create an Account?<a href="/signup">Sign Up </a>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
