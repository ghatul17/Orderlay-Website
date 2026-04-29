import axios, { AxiosInstance } from 'axios';

// Use the NEXT_PUBLIC_ prefixed environment variable
const baseURL = process.env.NEXT_PUBLIC_ENVIRONMENT == 'DEVELOPMENT'
  ? 'https://dev.api.orderlay.app/'
  : 'https://api.orderlay.app/';

// Create Axios instance
const Axios: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

console.log(process.env.NEXT_PUBLIC_ENVIRONMENT )

// export default Axios;




export default Axios;
