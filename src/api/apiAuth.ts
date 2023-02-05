import { API_URL } from "../utils/config";
import axios from "axios";

interface AuthData {
  email: string;
  password: string;
}

interface IcreateUser {
  data: AuthData;
  token: string;
}

interface Ilogin {
  data: AuthData;
  token: string;
}

export const createUser = ({ token, data }: IcreateUser) => {
  return axios.post(`${API_URL}/users/register`, data, {
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${token}`,
    },
  });
};

export const auth = (data: AuthData) => {
  return axios.post(`${API_URL}/users/login`, data);
  // return axios.post('http://localhost:5000/api/users/login', data);
};
