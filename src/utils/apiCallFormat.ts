import axios from "axios";
import { API_BASE_URL_LIVE, API_BASE_URL_LOCAL } from "./constant";

export const apiCallGetFunc = async (url: string) => {
  const apiResp = await axios.get(`${url}`);

  return apiResp;
};

export const apiCallPostFunc = async (url: string, data: object) => {
  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
  };
  const apiResp = await axios.post(`${url}`, data, { headers });

  return apiResp;
};

export const apiCallPutFunc = async (url: string, data: object) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const apiResp = await axios.put(`${url}`, data, { headers });

  return apiResp;
};
