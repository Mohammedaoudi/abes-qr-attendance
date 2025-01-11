import axios from 'axios';

const fetchApi = axios.create({
  baseURL: "http://localhost:3001/api1/v1/",
});

fetchApi.interceptors.request.use(
  config => {
    const token = localStorage.getItem('TOKEN');
 // Replace with your actual token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export { fetchApi };
