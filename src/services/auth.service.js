/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const API_URL = "https://checklyst.ca/api/accounts";

const register = (email, password, confirmPassword) => {
  return axios.post(API_URL + "/register", {
    title: "Mr",
    firstName: "John",
    lastName: "Doe",
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    acceptTerms: true,
    role: "CONTRACTOR",
  });
};

const verify = (email, token) => {
  return axios.post(API_URL + "/verify-email", {
    Email: email,
    Token: token,
  });
};

const forgotPassword = (email) => {
  return axios.post(API_URL + "/forgot-password", {
    email: email,
  });
};

const resetPassword = (token, password, confirmPassword) => {
  return axios.post(API_URL + "/reset-password", {
    token: token,
    password: password,
    confirmPassword: confirmPassword,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/authenticate", {
      email: email,
      password: password,
    })
    .then((response) => {
      if (response.data.jwtToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const resendVerification = (email) => {
  return axios
  .post(API_URL + "/resend-verification", {
    Email: email
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  verify,
  forgotPassword,
  resetPassword,
  login,
  logout,
  getCurrentUser,
  resendVerification
};
