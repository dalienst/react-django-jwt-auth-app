import axios from "axios";

// const BASE_URL = "https://user-bend-production.up.railway.app/api/"
const BASE_URL = "https://user-app-hvr7.onrender.com/api/"
// const BASE_URL = "http://127.0.0.1:8000/api/"


export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const api = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})