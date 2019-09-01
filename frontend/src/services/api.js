import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333"
  // baseURL: "http://f142494e.ngrok.io"
});

export default api;
