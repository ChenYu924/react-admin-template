import Mock from "mockjs";
import { token, userData } from "./mockData";

// 登录获取token
Mock.mock("/api/login", "post", (req) => {
  const { username, password } = JSON.parse(req.body);
  if (username === "admin" && password === "123456") {
    return {
      code: 200,
      data: token,
    };
  }
  return {
    code: 401,
    message: "用户名或密码错误",
  };
});

/* 检查请求头中token后再返回对应数据 */
// 根据token获取用户信息
Mock.mock("/api/user", "get", () => {
  return {
    code: 200,
    data: userData,
  };
});
