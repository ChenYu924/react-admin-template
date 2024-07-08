import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "antd";
import menuIcon from "@/config/menuIcon";

function SiderMenu(props) {
  const { openedKeys, menuAccordionOpen, setOpenedKeys } = props;
  // 侧边栏菜单项
  const [menuItems, setMenuItems] = useState([]);
  // 所有菜单项的层级
  const [levelKeys, setLevelKeys] = useState({});
  const stateActiveKey = useSelector((state) => state.tab.activeKey);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuWrapperRef = useRef(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState();

  useEffect(() => {
    fetchMenuItem();
  }, []);
  useEffect(() => {
    menuItemChange(stateActiveKey);
  }, [stateActiveKey]);
  useEffect(() => {
    if (menuAccordionOpen) {
      setOpenedKeys([]);
    }
  }, [menuAccordionOpen]);

  // 通过接口获取菜单项的函数
  function fetchMenuItem() {
    /* !!!这里是模拟,实际使用时请替换成真实接口并将这段代码写入then中!!! */
    // 获取到的菜单项数据结构
    const result = [
      {
        key: "workbench",
        label: "我的工作台",
        menuIco: "home",
      },
      {
        key: "float-button-position",
        label: "FloatButton 悬浮按钮",
        menuIco: "backTop",
      },
      {
        key: "divider-show",
        label: "Divider 分割线",
        menuIco: "dash",
      },
      {
        key: "grid",
        label: "Grid 栅格",
        menuIco: "alignLeft",
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
        menuIco: "layout",
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
        menuIco: "form",
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
        menuIco: "table",
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
        menuIco: "closed",
      },
    ];
    setMenuItems(renderMenuItems(result));
    // 默认选中第一个菜单项
    menuItemChange(result[0].key);
    // 向tab切片添加第一个tab
    const tab = {
      key: result[0].key,
      label: result[0].label,
      closable: false,
      path: [result[0].label],
    };
    dispatch({
      type: "tab-slice/setTab",
      payload: tab,
    });
    // 向menu切片添加所有菜单项
    dispatch({ type: "menu-slice/setMenu", payload: result });
    // 设置菜单项层级
    setLevelKeys(getLevelKeys(result));
  }
  function renderMenuItems(result) {
    const list = [];
    result.forEach((item) => {
      const { key, label, menuIco, children } = item;
      const MenuIcon = menuIcon[menuIco];
      const menuItem = {
        key,
        label,
        icon: menuIco && MenuIcon && <MenuIcon />,
        children,
      };
      list.push(menuItem);
    });
    return list;
  }
  function getLevelKeys(items1) {
    const key = {};
    const func = (items2, level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  }
  function menuItemChange(key) {
    setSelectedMenuItem(key);
    navigate(`/${key}`);
  }
  function getBreadcrumbLabelList(keyPath) {
    const labelList = [];
    const func = (items, key) => {
      items.forEach((item) => {
        if (item.key === key) {
          labelList.push(item.label);
        }
        if (item.children) {
          func(item.children, key);
        }
      });
    };
    keyPath.forEach((key) => {
      func(menuItems, key);
    });
    return labelList;
  }
  function handleLogoClick() {
    menuItemChange(menuItems[0].key);
    dispatch({ type: "tab-slice/setActiveKey", payload: menuItems[0].key });
    menuWrapperRef.current.scrollTop = 0;
  }
  function handleMenuItemClick({ key, keyPath, domEvent }) {
    const path = getBreadcrumbLabelList(keyPath.reverse());
    if (domEvent.target.innerText) {
      const tab = {
        key,
        label: domEvent.target.innerText,
        closable: true,
        path,
      };
      dispatch({ type: "tab-slice/setTab", payload: tab });
    } else {
      menuItems.forEach((item) => {
        if (item.key === key) {
          const tab = {
            key,
            label: item.label,
            closable: true,
            path,
          };
          dispatch({ type: "tab-slice/setTab", payload: tab });
        }
      });
    }
    menuItemChange(key);
  }
  function subMenuChange(openKeys) {
    if (menuAccordionOpen) {
      const currentOpenKey = openKeys.find(
        (key) => openedKeys.indexOf(key) === -1,
      );
      // open
      if (currentOpenKey !== undefined) {
        const repeatIndex = openKeys
          .filter((key) => key !== currentOpenKey)
          .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
        setOpenedKeys(
          openKeys
            // remove repeat key
            .filter((_, index) => index !== repeatIndex)
            // remove current level all child
            .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
        );
      } else {
        // close
        setOpenedKeys(openKeys);
      }
    } else {
      setOpenedKeys(openKeys);
    }
  }

  return (
    <div className="menu-wrapper" ref={menuWrapperRef}>
      <div className="logo-wrapper">
        <div className="logo" onClick={handleLogoClick} />
      </div>
      <Menu
        items={menuItems}
        selectedKeys={[selectedMenuItem]}
        mode="inline"
        theme="dark"
        onClick={handleMenuItemClick}
        openKeys={openedKeys}
        onOpenChange={subMenuChange}
      />
    </div>
  );
}

export default SiderMenu;
