import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "antd";
import classNames from "classnames";
import menuIcon from "@/config/menuIcon";
import usePrimaryLayoutContext from "@/hooks/usePrimaryLayoutContext";
import {
  getLevelKeys,
  getKeysListByKey,
  getBreadcrumbLabelList,
  findLabelByKey,
} from "@/utils/menuCalc";

function SiderMenu() {
  const { collapsed, openedKeys, menuDark, menuAccordionOpen, setOpenedKeys } =
    usePrimaryLayoutContext();
  // 仓库中的侧边栏菜单项(登录 -> 存入用户数据到user切片 - 从user切片获取菜单项数据)
  const stateMenuTree = useSelector((state) => state.user.menuTree);
  const stateTabList = useSelector((state) => state.tab.tabList);
  const stateActiveKey = useSelector((state) => state.tab.activeKey);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const menuWrapperRef = useRef(null);
  const [menuItems, setMenuItems] = useState([]);
  // 所有菜单项的层级
  const [levelKeys, setLevelKeys] = useState({});
  const [selectedMenuItem, setSelectedMenuItem] = useState();

  useEffect(() => {
    if (stateMenuTree.length) {
      initMenu(stateMenuTree);
    }
  }, [stateMenuTree]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (stateActiveKey) {
      if (menuItems.length && !collapsed) {
        if (menuAccordionOpen) {
          setOpenedKeys(getKeysListByKey(menuItems, stateActiveKey));
        } else {
          const allPath = [
            ...openedKeys,
            ...getKeysListByKey(menuItems, stateActiveKey),
          ];
          // 清除allPath数组中的重复项
          const newOpenedKeys = Array.from(new Set(allPath));
          setOpenedKeys(newOpenedKeys);
        }
      }
      menuItemChange(stateActiveKey);
    }
  }, [stateActiveKey]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (location.pathname) {
      urlKeyChange();
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (menuAccordionOpen) {
      setOpenedKeys([]);
    }
  }, [menuAccordionOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // 初始化菜单
  function initMenu(stateMenuTree) {
    setMenuItems(renderMenuItems(stateMenuTree));
    // 设置菜单项层级
    setLevelKeys(getLevelKeys(stateMenuTree));
    if (stateActiveKey && stateTabList.length) {
      menuItemChange(stateActiveKey);
    } else {
      // 默认选中第一个菜单项
      menuItemChange(stateMenuTree[0].key);
      if (!stateTabList.length) {
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
      }
    }
    urlKeyChange();
  }
  function urlKeyChange() {
    // 浏览器地址栏输入路由地址的情况
    const urlKey = location.pathname.slice(1);
    if (urlKey) {
      // 查找stateTabList中是否有当前url的key
      const exists = stateTabList.find((tab) => tab.key === urlKey);
      if (exists) {
        setOpenedKeys(getKeysListByKey(menuItems, urlKey));
        if (urlKey === stateActiveKey) return;
        dispatch({ type: "tab-slice/setActiveKey", payload: urlKey });
      } else {
        setOpenedKeys(getKeysListByKey(menuItems, urlKey));
        const tab = {
          key: urlKey,
          label: findLabelByKey(stateMenuTree, urlKey),
          closable: true,
          path: getBreadcrumbLabelList(
            stateMenuTree,
            getKeysListByKey(stateMenuTree, urlKey),
          ),
        };
        dispatch({ type: "tab-slice/setTab", payload: tab });
      }
    }
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
  function menuItemChange(key) {
    setSelectedMenuItem(key);
    navigate(`/${key}`);
  }
  function handleLogoClick() {
    dispatch({ type: "tab-slice/setActiveKey", payload: menuItems[0].key });
    menuWrapperRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  function handleMenuItemClick({ key, keyPath, domEvent }) {
    const path = getBreadcrumbLabelList(menuItems, keyPath.reverse());
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
      <div
        className={classNames("logo-wrapper", {
          "logo-wrapper-dark": menuDark,
        })}
      >
        <div className="logo" onClick={handleLogoClick} />
      </div>
      <Menu
        items={menuItems}
        selectedKeys={[selectedMenuItem]}
        mode="inline"
        theme={menuDark ? "dark" : "light"}
        onClick={handleMenuItemClick}
        openKeys={openedKeys}
        onOpenChange={subMenuChange}
      />
    </div>
  );
}

export default SiderMenu;
