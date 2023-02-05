import { API_URL } from "../utils/config";
import axios from "axios";
import type { ICompany } from "../components/admin/nestedComponents/Company/data";

export const getAllCompanyInfo = () => {
  return axios.get(`${API_URL}/admin/mycompany`);
};

export const getCompanyInfoById = (id: number) => {
  return axios.get(`${API_URL}/admin/mycompany/${id}`);
};

export const addCompanyInfo = (Company: FormData, token: string) => {
  return axios.post(`${API_URL}/admin/mycompany`, Company, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    },
  });
};

export const updateCompanyInfo = (
  mycompany: FormData | ICompany,
  id: number,
  token: string
) => {
  return axios.put(`${API_URL}/admin/mycompany/${id}`, mycompany, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCompanyInfo = (id: number) => {
  return axios.delete(`${API_URL}/admin/products/${id}`);
};
