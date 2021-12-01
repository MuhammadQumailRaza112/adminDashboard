import axios from "axios";
import { basURL } from "../contants";

const getUrl = (endpoint) => `${basURL}${endpoint}`;
const getConfigs = (config) => ({
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user"))}`,
  },
  ...config,
});

const request = async (method, endpoint, params = {}, payload = {}) => {
  let request;
  if (method === "post") {
    request = axios.post(
      getUrl(endpoint),
      { ...payload },
      getConfigs({ params })
    );
  } else if (method === "get") {
    request = axios.get(getUrl(endpoint), getConfigs({ params }));
  } else {
    request = axios.delete(getUrl(endpoint), getConfigs({ params }));
  }

  const { data } = await request;

  return data;
};

export const get = (endpoint, params = {}) => request("get", endpoint, params);

export const post = (endpoint, data = {}, params = {}) =>
  request("post", endpoint, params, data);

export const del = (endpoint, data = {}, params = {}) =>
  request("delete", endpoint, params, data);
