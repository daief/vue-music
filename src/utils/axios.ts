import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: config.API_SERVER,
  withCredentials: true,
});

export {
  instance,
};
