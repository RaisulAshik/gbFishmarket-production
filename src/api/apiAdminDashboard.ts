import { API_URL } from "../utils/config";
import axios from "axios";

interface IPostLogoData {
  data: FormData;
}
interface IPutLogoData {
  data: FormData;
  id: number;
}

//Logo section

export const getLogo = () => {
  return axios.get(`${API_URL}/admin/home/logo`);
};

export const addLogo = (data: FormData, token: string) => {
  return axios.post(`${API_URL}/admin/home/logo`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    },
  });
};

export const updateLogo = (data: FormData, id: number, token: string) => {
  return axios.put(`${API_URL}/admin/home/logo/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    },
  });
};

//Banner Section or Slider Section

export const getBanner = () => {
  return axios.get(`${API_URL}/admin/home/slider-image`);
};

export const addBanner = (data: FormData) => {
  return axios.post(`${API_URL}/admin/home/slider-image`, data, {
    // return axios.post('http://localhost:5000/api/admin/home/slider-image', data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getBannerById = (sliderId: number) => {
  return axios.get(`${API_URL}/admin/home/slider-image/${sliderId}`);
};

export const updateBanner = (data: FormData, sliderId: number) => {
  return axios.put(`${API_URL}/admin/home/slider-image/${sliderId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
// delete bannder not done;

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
