import { API_URL } from "../utils/config";
import axios from "axios";

type IConatctFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export const postContactForm = (data: IConatctFormValues) => {
  return axios.post(`${API_URL}/admin/contact-us`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const allContactData = (token: string) => {
  return axios.get(`${API_URL}/admin/contact-us`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
