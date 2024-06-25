import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// 引入全局样式表
import "./global.scss";
// 引入antd组件的全局化配置
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);
