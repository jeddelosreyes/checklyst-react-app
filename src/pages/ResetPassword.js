import React, { useState } from "react";

import {
  Button,
  Form,
  FormGroup,
  Input,
  Jumbotron,
} from "reactstrap";

import { useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isResetRequest, setResetRequest] = useState(false);
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const actionMapping = {
    token: setToken,
    email: setEmail,
    password: setPassword,
    confirmPassword: setConfirmPassword,
  };

  const history = useHistory();

  const onValueChange = (e) => {
    actionMapping[e.target.name](e.target.value);
  };

  const onResetRequest = () => {
    setMessage("");
    if (email) {
      AuthService.forgotPassword(email).then(
        () => {
            setResetRequest(false);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
        }
      );
    } else {
      setMessage("Please enter the email address you have registered.");
    }
  };

  const onResetPassword = () => {
    setMessage("");
    if (token && password && confirmPassword) {
        if(password == confirmPassword){
            AuthService.resetPassword(token, password, confirmPassword).then(
                () => {
                    history.push("/");
                    window.location.reload();
                },
                (error) => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();
                  setMessage(resMessage);
                }
              );
        } else {
            setMessage("The passwords you have entered does not match.");
        }
    } else {
      setMessage("Please fill-out all the details");
    }
  };

  return (
    <div>
      <Jumbotron hidden={!isResetRequest}>
        <p>
          Enter your email address and we’ll send a token to reset your password
        </p>
        <Form>
          <FormGroup>
            <Input
              type='text'
              className='form-control'
              name='email'
              value={email}
              onChange={onValueChange}
              placeholder='Email'
            />
          </FormGroup>
          {message && (
            <div className='form-group'>
              <div className='alert alert-danger' role='alert'>
                {message}
              </div>
            </div>
          )}
          <Button block onClick={onResetRequest}>
            Submit
          </Button>
        </Form>
      </Jumbotron>
      <Jumbotron hidden={isResetRequest}>
        <p>
          Enter the token your received and your new password
        </p>
        <Form>
          <FormGroup>
            <Input
              type='text'
              className='form-control'
              name='token'
              value={token}
              onChange={onValueChange}
              placeholder='Token'
            />
          </FormGroup>

          <FormGroup>
            <Input
              type='password'
              className='form-control'
              name='password'
              value={password}
              onChange={onValueChange}
              placeholder='Password'
            />
          </FormGroup>

          <FormGroup>
            <Input
              type='password'
              className='form-control'
              name='confirmPassword'
              value={confirmPassword}
              onChange={onValueChange}
              placeholder='Confirm Password'
            />
          </FormGroup>
          {message && (
            <div className='form-group'>
              <div className='alert alert-danger' role='alert'>
                {message}
              </div>
            </div>
          )}
          <Button block onClick={onResetPassword}>
            Submit
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
};

export default ResetPassword;
