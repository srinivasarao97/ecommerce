import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8090',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;
// const instance = axios.create({
//   baseURL: 'http://localhost:8090',
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem('token')}`,
//   },
//   withCredentials: true,
// });

// export default instance;
