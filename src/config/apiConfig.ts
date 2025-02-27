import axios from "axios";
const token = localStorage.getItem("token");
export const configAPI = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
