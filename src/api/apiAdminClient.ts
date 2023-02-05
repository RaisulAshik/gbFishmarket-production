import { API_URL } from "../utils/config";
import axios from "axios";

export const createClient = (data: FormData, token: string) => {
  return axios.post(`${API_URL}/admin/client`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const getAllClients = () => {
  return axios.get(`${API_URL}/admin/client`);
};

export const getClientById = (id: number) => {
  return axios.get(`${API_URL}/admin/client/${id}`);
};

export const updateClientById = (id: number, data: FormData, token: string) => {
  return axios.put(`${API_URL}/admin/client/${id}`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const deleteClientById = (id: number, token: string) => {
  return axios.delete(`${API_URL}/admin/client/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const getClientproducts = (id: number) => {
  return axios.get(`${API_URL}/admin/client/${id}/products`);
};

export const updateClientProducts = (
  id: number,
  productsId: number,
  action: string,
  token: string
) => {
  return axios.post(
    `${API_URL}/admin/client/${id}/product`,
    { action, productsId },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};
