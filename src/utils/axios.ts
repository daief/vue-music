import axios from 'axios';

const instance = axios.create({
  baseURL: config.API_SERVER,
});

export {
  instance,
};
