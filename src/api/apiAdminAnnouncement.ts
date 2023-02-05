import { API_URL } from "../utils/config";
import axios from "axios";



export const getAnnouncements = () => {
  return axios.get(`${API_URL}/admin/announcement`);
};

export const addAnnouncements = (data: FormData, token: string) => {
  return axios.post(`${API_URL}/admin/announcement`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    },
  });
};

export const getAnnouncementsById = (id: number) => {
  return axios.get(`${API_URL}/admin/announcement/${id}`);
};

export const updateAnnouncementsById = (
  id: number,
  data: FormData,
  token: string
) => {
  return axios.put(`${API_URL}/admin/announcement/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAnnouncementsById = (id: number, token: string) => {
  return axios.delete(`${API_URL}/admin/announcement/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};


//category related functions

export const getAnnouncementCategories = () => {
  return axios.get(`${API_URL}/admin/category-announcements`);
};

export const createAnnouncementCategory = (data: FormData, token: string) => {
  return axios.post(`${API_URL}/admin/category-announcements`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const getAnnouncementCategoryById = (id: number) => {
  return axios.get(`${API_URL}/admin/category-announcements/${id}`);
};

export const updateAnnouncementCategory = (
  data: FormData,
  id: number,
  token: string
) => {
  return axios.put(`${API_URL}/admin/category-announcements/${id}`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

