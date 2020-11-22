import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

import { useHistory } from "react-router-dom";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Container,
  Spinner,
  FormGroup,
} from "reactstrap";

const required = (value) => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className='alert alert-danger' role='alert'>
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className='alert alert-danger' role='alert'>
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const toggle = () => {
    setModal(!modal);
  };

  const toggleService = () => {
    setModalContent("This is a term of service.");
    setModal(!modal);
  };

  const togglePolicy = () => {
    setModalContent("This is a privacy policy.");
    setModal(!modal);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    if (!confirmPassword) {
      setMessage("");
    }
    setConfirmPassword(confirmPassword);
  };

  const passwordsMatched = () => {
    return password == confirmPassword;
  };
  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0 && passwordsMatched()) {
      let url = "/" + email + "/verify";
      console.log(email, url);
      AuthService.register(email, password, confirmPassword).then(
        (response) => {
          console.log(response);
          setMessage(response.message);
          setSuccessful(true);
          setLoading(false);
          history.push(url);
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
          setSuccessful(false);
          setLoading(false);
        }
      );
    } else {
      if (!passwordsMatched()) {
        setMessage("Password does not matched");
      }
      setSuccessful(false);
      setLoading(false);
    }
  };
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>{modalContent}</ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Container>
        <h4>Register</h4>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <FormGroup>
                <Input
                  type='text'
                  className='form-control'
                  name='email'
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                  placeholder='Email'
                />
              </FormGroup>

              <FormGroup>
                <Input
                  type='password'
                  className='form-control'
                  name='password'
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                  placeholder='Password'
                />
              </FormGroup>

              <FormGroup>
                <Input
                  type='password'
                  className='form-control'
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                  validations={[required, vpassword]}
                  placeholder='Confirm Password'
                />
              </FormGroup>
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
              <div className='form-group'>
                <p>
                  By signing up, you accept our
                  <Button color='link' onClick={toggleService}>
                    Terms of Service
                  </Button>
                  and
                  <Button color='link' onClick={togglePolicy}>
                    Privacy Policy
                  </Button>
                </p>
                <Button outline color='primary' block disabled={loading}>
                  {loading && <Spinner size='sm'></Spinner>}{" "}
                  <span>Sign Up</span>
                </Button>
              </div>
            </div>
          )}

          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </Container>
    </div>
  );
};

export default Register;
