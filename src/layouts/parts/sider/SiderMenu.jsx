import { Menu } from "antd";
import { DesktopOutlined, TableOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function SiderMenu() {
  const menuItems = [
    {
      key: "workbench",
      label: "我的工作台",
      icon: <DesktopOutlined />,
    },
    {
      key: "table",
      label: "Table 表格",
      icon: <TableOutlined />,
      children: [
        {
          key: "table-basic",
          label: "基本用法",
        },
        {
          key: "table2",
          label: "暂未开放",
        },
      ],
    },
  ];
  const [selectedMenuItem, setSelectedMenuItem] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    menuItemChange(menuItems[0].key);
  }, []);

  function menuItemChange(key) {
    setSelectedMenuItem(key);
    navigate(`/${key}`);
  }
  function handleLogoClick() {
    menuItemChange(menuItems[0].key);
  }
  function handleMenuItemClick({ key }) {
    menuItemChange(key);
  }

  return (
    <>
      <div className="logo-wrapper">
        <div className="logo" onClick={handleLogoClick} />
      </div>
      <Menu
        items={menuItems}
        selectedKeys={[selectedMenuItem]}
        mode="inline"
        theme="dark"
        onClick={handleMenuItemClick}
      />
    </>
  );
}

export default SiderMenu;
