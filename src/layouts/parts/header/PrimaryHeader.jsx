import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Avatar, Badge, Dropdown, Popover } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UpOutlined,
  UserOutlined,
  BellOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "animate.css";
import Cookies from "js-cookie";
import { personalTab } from "@/utils/tools";
import usePrimaryLayoutContext from "@/hooks/usePrimaryLayoutContext";
import HeaderBreadcrumb from "@/layouts/parts/header/HeaderBreadcrumb";
import SettingPopover from "@/components/settingPopover/SettingPopover";
import RouteSearch from "@/components/routeSearch/RouteSearch";

function PrimaryHeader() {
  const dropdownItems = [
    {
      key: "profile",
      label: <span onClick={handleNavProfile}>个人中心</span>,
    },
    {
      key: "logout",
      label: <span onClick={handleNavLogin}>退出登录</span>,
      danger: true,
    },
  ];
  const { collapsed, setCollapsed } = usePrimaryLayoutContext();
  const stateUserInfo = useSelector((state) => state.user.info);
  const stateTab = useSelector((state) => state.tab);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [currentBreadcrumb, setCurrentBreadcrumb] = useState([]);

  useEffect(() => {
    if (stateTab.tabList.length) {
      stateTab.tabList.forEach((item) => {
        if (item.key === stateTab.activeKey) {
          setCurrentBreadcrumb(item.path);
        }
      });
    }
  }, [stateTab]);

  function handleBell() {
    dispatch({
      type: "tab-slice/setTab",
      payload: personalTab("mine-message", "消息中心"),
    });
  }
  function handleNavProfile() {
    dispatch({
      type: "tab-slice/setTab",
      payload: personalTab("mine-center", "个人中心"),
    });
  }
  function handleNavLogin() {
    Cookies.remove("token");
    dispatch({ type: "user-slice/setClear" });
    dispatch({ type: "tab-slice/setClear" });
    navigate("/login");
  }

  return (
    <div className="wrapper">
      <div className="left">
        {/* 菜单伸缩控制按钮 */}
        <Button
          style={{ marginRight: "16px" }}
          className="collapsed-button"
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
        {/* 展示用面包屑 */}
        <HeaderBreadcrumb currentBreadcrumb={currentBreadcrumb} />
      </div>
      <div className="right">
        {/* 路由搜索 */}
        <RouteSearch />
        {/* 消息中心 */}
        <Badge size="small" count={8}>
          <BellOutlined className="header-icon" onClick={handleBell} />
        </Badge>
        {/* 设置 */}
        <Popover
          content={<SettingPopover setPopoverOpen={setPopoverOpen} />}
          title="设置"
          trigger="click"
          open={popoverOpen}
          onOpenChange={() => setPopoverOpen(false)}
        >
          <SettingOutlined
            className="header-icon"
            onClick={() => setPopoverOpen(!popoverOpen)}
          />
        </Popover>
        {/* 个人信息 */}
        <Dropdown menu={{ items: dropdownItems }}>
          <div className="avatar-wrapper">
            <span className="user-name">{stateUserInfo.nickname}</span>
            <UpOutlined className="arrow" />
            <Avatar size={40} icon={<UserOutlined />} className="avatar" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

export default PrimaryHeader;
