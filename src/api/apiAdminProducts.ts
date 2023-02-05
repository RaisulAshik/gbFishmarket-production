import { API_URL } from "../utils/config";
import axios from "axios";
import { IProduct } from "../components/admin/nestedComponents/Products/AllProducts";
import { FormValues } from "../components/admin/nestedComponents/Products/AddProduct";
export const getAllProducts = () => {
  return axios.get(`${API_URL}/admin/products`);
};

export const getProduct = (id: number) => {
  return axios.get(`${API_URL}/admin/products/${id}`);
};

export const addProduct = (product: FormData, token: string) => {
  console.log(product);
  return axios.post(`${API_URL}/admin/products`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = (
  product: FormData | IProduct,
  id: number,
  token: string
) => {
  return axios.put(`${API_URL}/admin/products/${id}`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = (id: number, token: string) => {
  return axios.delete(`${API_URL}/admin/products/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

//category related functions

export const getProductCategories = () => {
  return axios.get(`${API_URL}/admin/category-products`);
};

export const createProductCategory = (data: FormData, token: string) => {
  return axios.post(`${API_URL}/admin/category-products`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const getProductsCategoryById = (id: number) => {
  return axios.get(`${API_URL}/admin/category-products/${id}`);
};

export const updateProductCategory = (
  data: FormData,
  id: number,
  token: string
) => {
  return axios.put(`${API_URL}/admin/category-products/${id}`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
