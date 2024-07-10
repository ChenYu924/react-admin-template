import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./login.module.scss";

function LoginFormPassword() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  function handleLogin() {
    form.validateFields().then((values) => {
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
