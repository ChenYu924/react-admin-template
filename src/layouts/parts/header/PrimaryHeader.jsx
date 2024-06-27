import { Button, Avatar, Badge, Dropdown, Popover, Switch } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UpOutlined,
  UserOutlined,
  BellOutlined,
  SettingOutlined,
} from "@ant-design/icons";

function PrimaryHeader(props) {
  const { collapsed, setCollapsed, tabsBarShow, setTabsBarShow } = props;
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
  const settingItemStyle = {
    display: "flex",
    alignItems: "center",
  };
  const settingItemLabelStyle = {
    width: "48px",
  };
  const popoverContent = (
    <div style={settingItemStyle}>
      <div style={settingItemLabelStyle}>页签：</div>
      <Switch
        checked={tabsBarShow}
        onChange={() => setTabsBarShow(!tabsBarShow)}
      />
    </div>
  );

  function handleNavProfile() {
    console.log("nav to profile");
  }
  function handleNavLogin() {
    console.log("nav to login");
  }
  function handleSetting() {}

  return (
    <div className="wrapper">
      <div className="left">
        <Button
          className="collapsed-button"
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
      <div className="right">
        {/* 消息中心 */}
        <Badge size="small" count={8}>
          <BellOutlined className="header-icon" />
        </Badge>
        {/* 设置 */}
        <Popover content={popoverContent} title="设置" trigger="click">
          <SettingOutlined className="header-icon" onClick={handleSetting} />
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
