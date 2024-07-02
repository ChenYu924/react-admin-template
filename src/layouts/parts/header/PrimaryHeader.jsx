import { Button, Avatar, Badge, Dropdown, Popover, Breadcrumb } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UpOutlined,
  UserOutlined,
  BellOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import SettingPopover from "@/components/settingPopover/SettingPopover";
import { useState } from "react";

function PrimaryHeader(props) {
  const {
    collapsed,
    menuAccordionOpen,
    tabsBarShow,
    zenModeOpen,
    setCollapsed,
    setMenuAccordionOpen,
    setTabsBarShow,
    setZenModeOpen,
    onResetSettingOptions,
  } = props;
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
  const [popoverOpen, setPopoverOpen] = useState(false);

  function handleNavProfile() {
    console.log("nav to profile");
  }
  function handleNavLogin() {
    console.log("nav to login");
  }

  return (
    <div className="wrapper">
      <div className="left">
        <Button
          className="collapsed-button"
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
        <Breadcrumb
          style={{ marginLeft: "14px" }}
          itemRender={(route, params, routes, paths) => {
            console.log(route, params, routes, paths);
          }}
        />
      </div>
      <div className="right">
        {/* 消息中心 */}
        <Badge size="small" count={8}>
          <BellOutlined className="header-icon" />
        </Badge>
        {/* 设置 */}
        <Popover
          content={
            <SettingPopover
              collapsed={collapsed}
              menuAccordionOpen={menuAccordionOpen}
              tabsBarShow={tabsBarShow}
              zenModeOpen={zenModeOpen}
              setMenuAccordionOpen={setMenuAccordionOpen}
              setTabsBarShow={setTabsBarShow}
              setZenModeOpen={setZenModeOpen}
              setPopoverOpen={setPopoverOpen}
              onResetSettingOptions={onResetSettingOptions}
            />
          }
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
            <span className="user-name">管理员</span>
            <UpOutlined className="arrow" />
            <Avatar size={40} icon={<UserOutlined />} className="avatar" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

export default PrimaryHeader;
