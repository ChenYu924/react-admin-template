import { Menu } from "antd";
import { DesktopOutlined, AppstoreOutlined } from "@ant-design/icons";

function SiderMenu() {
  const menuItems = [
    {
      key: "workBench",
      label: "我的工作台",
      icon: <DesktopOutlined />,
    },
    {
      key: "workBench1",
      label: "我的工作台 1",
      icon: <AppstoreOutlined />,
    },
  ];

  return (
    <>
      <div className="logo-wrapper">
        <div className="logo" />
      </div>
      <Menu
        defaultSelectedKeys={["workBench"]}
        items={menuItems}
        theme="dark"
      />
    </>
  );
}

export default SiderMenu;
