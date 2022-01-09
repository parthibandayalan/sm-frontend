import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create();
instance.defaults.withCredentials = true;

export function authenticationUser(values) {
  let payload = values;
  console.log("Authentication Call");
  return instance.request({
    method: "POST",
    data: payload,
    url: `${API_URL}/auth/login`,
  });
}

export function refreshToken() {
  return instance.request({
    method: "POST",
    url: `${API_URL}/auth/refresh`,
  });
}

export function cancelToken() {
  return instance.request({
    method: "POST",
    url: `${API_URL}/auth/cancel`,
  });
}
