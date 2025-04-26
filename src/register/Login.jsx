import React from "react";
import { Button, Form } from "react-bootstrap";

const Login = () => {
  return (
    <div className="">
      <h1>Login</h1>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            className="input"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            className="input"
          />
        </Form.Group>
        <Button className="button">Login</Button>
      </Form>
    </div>
  );
};

export default Login;
