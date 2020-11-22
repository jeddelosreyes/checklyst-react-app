import React, { useState } from "react";

import {
  Button,
  Form,
  FormGroup,
  Input,
  Container,
  Jumbotron,
} from "reactstrap";
import { useHistory } from "react-router-dom";


import AuthService from "../services/auth.service";

const VerifyAccount = () => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const history = useHistory();

  const onTokenChange = (e) => {
    const token = e.target.value;
    setToken(token);
  };

  const extractEmails = (text) => {
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  };

  const onSubmit = () => {
    if (token) {
      let path = window.location.href;
      let email = extractEmails(path)[0];
      console.log(email)
      AuthService.verify(email, token).then(
        (response) => {
          setMessage(response.message);
          setSuccessful(true);
          history.push("/");
          window.location.reload();
        },
        (error) => {
            console.log(error);
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    } else {
      setMessage("Please enter the token that was emailed to you.");
      setSuccessful(false);
    }
  };

  return (
    <Jumbotron>
      <Container>
        <Form>
          <FormGroup row>
            <Input
              type='text'
              name='token'
              id='token'
              value={token}
              onChange={onTokenChange}
              placeholder='Enter token your here'
            />
            <Button color='primary' onClick={onSubmit}>
              Submit
            </Button>{" "}
          </FormGroup>
        </Form>
        {message && (
          <div className='form-group'>
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role='alert'
            >
              {message}
            </div>
          </div>
        )}
      </Container>
    </Jumbotron>
  );
};

export default VerifyAccount;
