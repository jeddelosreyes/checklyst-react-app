import React, { useState, useEffect } from "react";

import { Row, Col, Form, FormGroup, Input } from "reactstrap";

import AuthService from "../services/auth.service";

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    setFirstName(currentUser.firstName);
    setLastName(currentUser.lastName);
  });

  return (
    <div>
      <h1 className='display-3'>Welcome!</h1>
      <Form>
        <FormGroup>
          <Input
            type='text'
            className='form-control'
            name='firstName'
            value={firstName}
          />
        </FormGroup>

        <FormGroup>
          <Input
            type='text'
            className='form-control'
            name='lastName'
            value={lastName}
          />
        </FormGroup>
      </Form>
    </div>
  );
};

export default Home;
