import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";
import { Container, Button, Spinner, FormGroup } from "reactstrap";

import { useHistory } from "react-router-dom";

import SweetAlert from "sweetalert2-react";

const required = (value) => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alertShow, setAlertShow] = useState(false);

  const history = useHistory();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
          setAlertShow(true);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      <SweetAlert
        show={alertShow}
        text={message}
        onConfirm={() => setAlertShow(false)}
      />
      <Container>
        <Form onSubmit={handleLogin} ref={form}>
          <FormGroup block>
            <Input
              type='text'
              className='form-control'
              name='username'
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
              placeholder='Email'
            />
          </FormGroup>
          <FormGroup block>
            <Input
              type='password'
              className='form-control'
              name='password'
              value={password}
              onChange={onChangePassword}
              validations={[required]}
              placeholder='Password'
            />
          </FormGroup>
          {message && (
            <div className='form-group'>
              <div className='alert alert-danger' role='alert'>
                {message}
              </div>
            </div>
          )}
          <FormGroup>
            <Link to={"/reset-password"} pull className="forgot float-right p-3">
              <i>Forgot password?</i>
            </Link>
            <Button color='primary' block disabled={loading}>
              {loading && <Spinner size='sm'></Spinner>} <span>Login</span>
            </Button>
          </FormGroup>
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </Container>
    </div>
  );
};

export default Login;
