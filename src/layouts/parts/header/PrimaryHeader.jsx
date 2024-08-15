import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Badge, Popover } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "animate.css";
import { getKeysListByKey } from "@/utils/menuCalc";
import { personalTab } from "@/utils/tools";
import usePrimaryLayoutContext from "@/hooks/usePrimaryLayoutContext";
import HeaderBreadcrumb from "@/layouts/parts/header/HeaderBreadcrumb";
import RouteSearch from "@/components/routeSearch/RouteSearch";
import SettingPopover from "@/components/settingPopover/SettingPopover";
import UserArea from "@/components/userArea/UserArea";

function PrimaryHeader() {
  const { collapsed, setCollapsed, setOpenedKeys } = usePrimaryLayoutContext();
  const stateMenuTree = useSelector((state) => state.user.menuTree);
  const stateTab = useSelector((state) => state.tab);
  const dispatch = useDispatch();
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

  function handleCollapsed() {
    setCollapsed(!collapsed);
    if (collapsed) {
      setTimeout(() => {
        setOpenedKeys(getKeysListByKey(stateMenuTree, stateTab.activeKey));
      }, 300);
    }
  }
  function handleBell() {
    dispatch({
      type: "tab-slice/setTab",
      payload: personalTab("mine-message", "消息中心"),
    });
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
          onClick={handleCollapsed}
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
        <UserArea />
      </div>
    </div>
  );
}

export default PrimaryHeader;
