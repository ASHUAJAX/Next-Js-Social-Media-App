import axios from "axios";
import { API_BASE_URL_LIVE, API_BASE_URL_LOCAL } from "./constant";

export const apiCallGetFunc = async (window_URL: string, url: string) => {
  let envURL: any = "";
  let final_window_URL = window_URL.split("3000/")[0] + "3000";

  if (final_window_URL === "http://localhost:3000") {
    envURL = API_BASE_URL_LOCAL;
  } else {
    envURL = API_BASE_URL_LIVE;
  }

  const apiResp = await axios.get(`${envURL + url}`);
  
  return apiResp;
};

export const apiCallPostFunc = async (
  window_URL: string,
  url: string,
  data: object
) => {
  let envURL: any = "";
  let final_window_URL = window_URL.split("3000/")[0] + "3000";

  if (final_window_URL === "http://localhost:3000") {
    envURL = API_BASE_URL_LOCAL;
  } else {
    envURL = API_BASE_URL_LIVE;
  }

  const headers = {
    "Content-Type": "application/json",
  };
  const apiResp = await axios.post(`${envURL + url}`, data, { headers });

  return apiResp;
};
