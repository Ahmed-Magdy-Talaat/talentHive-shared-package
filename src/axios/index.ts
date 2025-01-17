import axios from 'axios';
import retryRequest from './retryMecahnism';

const axiosInstance = axios.create({
  timeout: 5000,
});
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => retryRequest(axiosInstance, err, 3)
);
export default axiosInstance;
