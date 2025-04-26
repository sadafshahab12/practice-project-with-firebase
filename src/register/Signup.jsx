import React, { useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
const Signup = () => {
  const formObj = {
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(formObj);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.role ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return (
        <Toast>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
      );
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const createUser = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = createUser.user;

      await setDoc(doc(db))
    } catch (error) {}
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-center h-screen px-20">
      <div className="space-y-3">
        <h1 className="text-5xl">Organize Your Work Smarter</h1>
        <p>
          Create your free account and start managing your tasks seamlessly
          across To Do, In Progress, and Done.
        </p>
      </div>
      <div>
        <h1>Sign Up</h1>

        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              className="input"
              name="firstName"
              value={formData.firstName}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              className="input"
              name="lastName"
              value={formData.lastName}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>User Role: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Role"
              className="input"
              name="role"
              value={formData.role}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
            <Form.Label className="text-sm">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Confirm Password"
              className="input"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Button className="button">Sign Up</Button>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
