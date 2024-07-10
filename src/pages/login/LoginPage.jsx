import { useEffect, useState } from "react";
import { Button, Divider, Tabs } from "antd";
import styles from "./login.module.scss";
import classNames from "classnames";
import LoginLayout from "@/layouts/LoginLayout";
import LoginFormPassword from "./LoginFormPassword";

function LoginPage() {
  const labelItems = [
    {
      key: "label1",
      label: "展示图片1",
    },
    {
      key: "label2",
      label: "展示图片2",
    },
    {
      key: "label3",
      label: "展示图片3",
    },
    {
      key: "label4",
      label: "展示图片4",
    },
    {
      key: "label5",
      label: "展示图片5",
    },
  ];
  const loginMode = [
    {
      key: "1",
      label: "账号登录",
      children: <LoginFormPassword />,
    },
    {
      key: "2",
      label: "登陆方式2",
      disabled: true,
    },
    {
      key: "3",
      label: "登陆方式3",
      disabled: true,
    },
  ];
  const [currentLabelKey, setCurrentLabelKey] = useState("label1");

  useEffect(() => {
    // 图片轮播
    const timer = setInterval(() => {
      let index = labelItems.findIndex((item) => item.key === currentLabelKey);
      if (index < labelItems.length - 1) {
        setCurrentLabelKey(labelItems[index + 1].key);
      } else {
        setCurrentLabelKey(labelItems[0].key);
      }
    }, 8000);
    return () => clearInterval(timer);
  }, [currentLabelKey]);

  function loginContentJSX() {
    return (
      <div className={styles.loginBoxWrapper}>
        {/* 图片展示区域 */}
        <div className={styles.show}>
          <div className={styles.labelItemsWrapper}>
            {labelItems.map((item) => (
              <div
                key={item.key}
                className={classNames(styles.labelItem, {
                  [styles.labelItemActive]: item.key === currentLabelKey,
                })}
                onClick={() => setCurrentLabelKey(item.key)}
              >
                {item.label}
              </div>
            ))}
          </div>
          <div key={currentLabelKey} className={styles.showPic} />
        </div>
        {/* 登录区域 */}
        <div className={styles.login}>
          <div className={styles.title}></div>
          <div className={styles.subTitle}></div>
          <Tabs
            items={loginMode}
            centered
            indicator={{ size: 80 }}
            tabBarGutter={50}
          />
          <Button type="link">用户注册</Button>
          <Divider type="vertical" />
          <Button type="link">忘记密码</Button>
        </div>
      </div>
    );
  }

  return <LoginLayout loginContentJSX={loginContentJSX()} />;
}

export default LoginPage;
