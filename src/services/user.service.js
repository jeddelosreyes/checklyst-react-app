/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://checklyst.ca/api/contractors";

const getInfoByID = (id) => {
  return axios.get(API_URL + "/byid/" + id, { headers: authHeader() });
};


const addDetails = (payload) => {
    
};