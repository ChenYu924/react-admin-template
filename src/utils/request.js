import axios from 'axios';

axios.defaults.baseURL = 'http://172.16.6.104:8080';

// 拦截器-请求完成后
axios.interceptors.response.use(
  (res) => {
    if(res.config.responseType === 'blob') {
      return res;
    }
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);