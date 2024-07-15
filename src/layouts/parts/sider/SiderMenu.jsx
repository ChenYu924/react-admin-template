import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "antd";
import menuIcon from "@/config/menuIcon";

function SiderMenu(props) {
  const { collapsed, openedKeys, menuAccordionOpen, setOpenedKeys } = props;
  // 仓库中的侧边栏菜单项(登录 -> 存入用户数据到user切片 - 从user切片获取菜单项数据)
  const stateMenuTree = useSelector((state) => state.user.menuTree);
  const stateActiveKey = useSelector((state) => state.tab.activeKey);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuWrapperRef = useRef(null);
  const [menuItems, setMenuItems] = useState([]);
  // 所有菜单项的层级
  const [levelKeys, setLevelKeys] = useState({});
  const [selectedMenuItem, setSelectedMenuItem] = useState();

  useEffect(() => {
    if (stateMenuTree.length) {
      initMenu(stateMenuTree);
    }
  }, [stateMenuTree]);
  useEffect(() => {
    if (menuItems.length && !collapsed) {
      if (menuAccordionOpen) {
        setOpenedKeys(getAncestorsList(menuItems, stateActiveKey));
      } else {
        const allPath = [
          ...openedKeys,
          ...getAncestorsList(menuItems, stateActiveKey),
        ];
        // 清除allPath数组中的重复项
        const newOpenedKeys = Array.from(new Set(allPath));
        setOpenedKeys(newOpenedKeys);
      }
    }
    menuItemChange(stateActiveKey);
  }, [stateActiveKey]);
  useEffect(() => {
    if (menuAccordionOpen) {
      setOpenedKeys([]);
    }
  }, [menuAccordionOpen]);

  // 初始化菜单
  function initMenu(stateMenuTree) {
    setMenuItems(renderMenuItems(stateMenuTree));
    // 默认选中第一个菜单项
    menuItemChange(stateMenuTree[0].key);
    // 向tab切片添加第一个tab
    const tab = {
      key: stateMenuTree[0].key,
      label: stateMenuTree[0].label,
      closable: false,
      path: [stateMenuTree[0].label],
    };
    dispatch({
      type: "tab-slice/setTab",
      payload: tab,
    });
    // 设置菜单项层级
    setLevelKeys(getLevelKeys(stateMenuTree));
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
  function getAncestorsList(items, key) {
    const keyPath = [];
    // 根据菜单项key计算其所有的祖先元素,如key为dropdown-basic,需要输出['nav', 'dropdown']
    function findAncestors(items, key) {
      for (const item of items) {
        if (item.key === key) {
          return true;
        }
        if (item.children && findAncestors(item.children, key)) {
          keyPath.unshift(item.key);
          return true;
        }
      }
      return false;
    }
    findAncestors(items, key);
    return keyPath;
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
