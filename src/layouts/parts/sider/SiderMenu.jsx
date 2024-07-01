import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "antd";
import {
  HomeOutlined,
  TableOutlined,
  CloseOutlined,
  FormOutlined,
  VerticalAlignTopOutlined,
  AlignLeftOutlined,
  DashOutlined,
  LayoutOutlined,
} from "@ant-design/icons";

function SiderMenu() {
  // 侧边栏菜单项
  const menuItems = [
    {
      key: "workbench",
      label: "我的工作台",
      icon: <HomeOutlined />,
    },
    {
      key: "float-button-position",
      label: "FloatButton 悬浮按钮",
      icon: <VerticalAlignTopOutlined />,
    },
    {
      key: "divider-show",
      label: "Divider 分割线",
      icon: <DashOutlined />,
    },
    {
      key: "grid",
      label: "Grid 栅格",
      icon: <AlignLeftOutlined />,
      children: [
        {
          key: "grid-basic",
          label: "基础栅格",
        },
        {
          key: "grid-gutter",
          label: "区块间隔",
        },
        {
          key: "grid-offset",
          label: "左右偏移",
        },
        {
          key: "grid-align",
          label: "栅格对齐",
        },
      ],
    },
    {
      key: "nav",
      label: "布局相关",
      icon: <LayoutOutlined />,
      children: [
        {
          key: "anchor-show",
          label: "Anchor 锚点",
        },
        {
          key: "dropdown",
          label: "下拉菜单",
          children: [
            {
              key: "dropdown-basic",
              label: "下拉菜单基本",
            },
          ],
        },
      ],
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
  const stateActiveKey = useSelector((state) => state.tab.activeKey);
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
  useEffect(() => {
    menuItemChange(stateActiveKey);
  }, [stateActiveKey]);

  function menuItemChange(key) {
    setSelectedMenuItem(key);
    navigate(`/${key}`);
  }
  function handleLogoClick() {
    menuItemChange(menuItems[0].key);
    dispatch({ type: "tab-slice/setActiveKey", payload: menuItems[0].key });
  }
  function handleMenuItemClick({ key, domEvent }) {
    console.log("domEvent", domEvent.target.innerText);
    if (domEvent.target.innerText) {
      const tab = {
        key,
        label: domEvent.target.innerText,
        closable: true,
      };
      dispatch({ type: "tab-slice/setTab", payload: tab });
    } else {
      menuItems.forEach((item) => {
        if (item.key === key) {
          const tab = {
            key,
            label: item.label,
            closable: true,
          };
          dispatch({ type: "tab-slice/setTab", payload: tab });
        }
      });
    }
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
