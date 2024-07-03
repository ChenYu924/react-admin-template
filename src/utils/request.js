import axios from "axios";

// 拦截器-请求完成后
axios.interceptors.response.use(
  (res) => {
    if (res.config.responseType === "blob") {
      return res;
    }
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 拦截器-请求前
// *************

// 自定义封装请求
