import axios from "axios";
import { message, notification } from "antd";
import useToken from "@/hooks/useToken";

// 拦截器-获取响应后(axios全局配置)
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case !error.response.status:
          notification.error({
            message: "网络异常",
            description: "请检查网络连接情况",
          });
          break;
        case 401:
          message.error("未授权，请重新登录");
          break;
        case 403:
          message.error("拒绝访问");
          break;
        case 404:
          message.error("请求错误,未找到该资源");
          break;
        case 500:
          message.error("服务端错误");
          break;
        default:
          message.error("请求错误");
          break;
      }
    }
    return Promise.reject(error);
  },
);

// 创建axios实例(基础配置)
const service = axios.create({
  // 实际开发中baseURL应通过process.env进行配置
  // baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 600000,
});

// 拦截器-请求前(请求头中带入token)
service.interceptors.request.use(
  (config) => {
    let headers = {};
    const token = useToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    config.headers = { ...config.headers, ...headers };
    return config;
  },
  (error) => {
    console.error("请求前错误:", error);
    message.error("请求受阻");
    return Promise.reject(error);
  },
);

function get(url, params, config) {
  return service.get(url, { params, ...config });
}

function post(url, params, config) {
  return service.post(url, params, config);
}

export default { get, post };
