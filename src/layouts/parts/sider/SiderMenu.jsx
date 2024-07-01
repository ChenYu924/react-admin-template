import { Menu } from "antd";
import {
  DesktopOutlined,
  TableOutlined,
  CloseOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function SiderMenu() {
  const menuItems = [
    {
      key: "workbench",
      label: "我的工作台",
      icon: <DesktopOutlined />,
    },
    {
      key: "form",
      label: "Form 表单",
      icon: <FormOutlined />,
      children: [
        {
          key: "form-basic",
          label: "表单基本用法",
        },
        {
          key: "form-call",
          label: "表单方法调用",
        },
        {
          key: "form-layout",
          label: "表单布局",
        },
        {
          key: "form-layout-mixin",
          label: "表单混合布局",
        },
        {
          key: "form-required-mask",
          label: "表单必选样式",
        },
      ],
    },
    {
      key: "table",
      label: "Table 表格",
      icon: <TableOutlined />,
      children: [
        {
          key: "table-basic",
          label: "表格基本用法",
        },
        {
          key: "table-row-select",
          label: "表格选择",
        },
        {
          key: "table-custom-select",
          label: "表格自定义选择项",
        },
      ],
    },
    {
      key: "closed",
      label: "暂未开放",
      icon: <CloseOutlined />,
    },
  ];
  const [selectedMenuItem, setSelectedMenuItem] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    menuItemChange(menuItems[0].key);
    const tab = {
      key: menuItems[0].key,
      label: menuItems[0].label,
      closable: false,
    };
    dispatch({ type: "tab-slice/setTab", payload: tab });
  }, []);

  function menuItemChange(key) {
    setSelectedMenuItem(key);
    navigate(`/${key}`);
  }
  function handleLogoClick() {
    menuItemChange(menuItems[0].key);
  }
  function handleMenuItemClick({ key, domEvent }) {
    const tab = {
      key,
      label: domEvent.target.innerText,
      closable: true,
    };
    dispatch({ type: "tab-slice/setTab", payload: tab });
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
