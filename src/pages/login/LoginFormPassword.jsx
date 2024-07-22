import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./login.module.scss";
import axios from "axios";

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
    form
      .validateFields()
      .then((value) => {
        // 根据账户和密码获取token
        axios.post("/api/login", value).then((res) => {
          if (res.data.code === 200) {
            const userToken = res.data.data;
            dispatch({ type: "user-slice/setToken", payload: userToken });
            // 跳转至首页
            navigate("/");
          } else if (res.data.code === 401) {
            message.error("用户名或密码错误");
          } else {
            message.error("登录失败");
          }
        });
      })
      .catch((err) => {
        message.error("请检查网络连接", err);
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
