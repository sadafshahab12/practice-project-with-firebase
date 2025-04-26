import React, { useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Signup = () => {
  const navigate = useNavigate();
  const formObj = {
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(formObj);
  const [loading, setLoading] = useState(false);
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

    setLoading(true);

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

      //saving additional user info
      await setDoc(doc(db, "users", user.uid), {
        user_id: user.uid,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
        createdAt: new Date(),
      });
      console.log(`User registgered and saved!`);
      toast.success("Account Created Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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

        <Form onSubmit={handleSignUp}>
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
          <button type="submit" className="button" disabled={loading}>
            {loading ? "Signing up...." : "Sign Up"}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
