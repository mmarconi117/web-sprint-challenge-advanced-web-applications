import axios from 'axios'



const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  const instance = axios.create({
    baseURL: 'http://localhost:9000/api',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // Log headers for debugging
  console.log('Headers:', instance.defaults.headers);

  return instance;
};

export default axiosWithAuth
