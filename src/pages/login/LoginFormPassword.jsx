import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./login.module.scss";
// 引入模拟数据
import { userToken, userData } from "@/mock/mockData";

function LoginFormPassword() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    form.setFieldsValue({
      username: "admin",
      password: "123456",
    });
  }, []);

  function handleLogin() {
    form.validateFields().then((value) => {
      // 模拟：将value对象带入接口中获取token
      dispatch({ type: "user-slice/setToken", payload: userToken.token });
      // 模拟：根据获取到的token再去接口中获取用户信息
      dispatch({ type: "user-slice/setUser", payload: userData });
      // 跳转至首页
      navigate("/");
    });
  }

  return (
    <div className={styles.formPasswordWrapper}>
      <Form name="loginFormPassword" form={form} onFinish={handleLogin}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "请输入用户名",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className={styles["site-form-item-icon"]} />}
            placeholder="用户名"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className={styles["site-form-item-icon"]} />}
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginFormPassword;
