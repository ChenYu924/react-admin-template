import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout, FloatButton } from "antd";
import { ShrinkOutlined } from "@ant-design/icons";
import classNames from "classnames";
import SiderMenu from "@/layouts/parts/sider/SiderMenu";
import PrimaryHeader from "@/layouts/parts/header/PrimaryHeader";
import TabsBar from "@/layouts/parts/tabs/TabsBar";

function PrimaryLayout() {
  const { Header, Sider, Content } = Layout;
  // 侧边菜单栏是否收起
  const [collapsed, setCollapsed] = useState(false);
  // 当前展开的sub菜单项
  const [openedKeys, setOpenedKeys] = useState([]);
  // 是否开启菜单手风琴模式
  const [menuAccordionOpen, setMenuAccordionOpen] = useState(true);
  // 页签条是否展示
  const [tabsBarShow, setTabsBarShow] = useState(true);
  // 是否开启禅模式
  const [zenModeOpen, setZenModeOpen] = useState(false);

  function judgeSiderWidth() {
    return zenModeOpen ? 0 : 288;
  }
  function getSiderClassNames() {
    return classNames("sider", {
      "sider-hidden": zenModeOpen,
    });
  }
  function getHeaderClassNames() {
    return classNames("header", "bottom-shadow", {
      "header-hidden": zenModeOpen,
    });
  }
  function getContentClassNames() {
    return classNames("content", {
      "left-top-radius": !tabsBarShow,
      "content-without-tabs-mt": !tabsBarShow,
      "content-without-tabs-height": !tabsBarShow,
      "content-with-tabs-height": tabsBarShow,
    });
  }
  // 重置设置选项
  function handleResetSettingOptions() {
    setMenuAccordionOpen(true);
    setTabsBarShow(true);
    setZenModeOpen(false);
  }

  return (
    <Layout className="primary-layout">
      <Sider
        width={judgeSiderWidth()}
        className={getSiderClassNames()}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <SiderMenu
          openedKeys={openedKeys}
          menuAccordionOpen={menuAccordionOpen}
          setOpenedKeys={setOpenedKeys}
        />
      </Sider>
      <Layout className="main">
        <Header className={getHeaderClassNames()}>
          <PrimaryHeader
            collapsed={collapsed}
            menuAccordionOpen={menuAccordionOpen}
            tabsBarShow={tabsBarShow}
            zenModeOpen={zenModeOpen}
            setCollapsed={setCollapsed}
            setMenuAccordionOpen={setMenuAccordionOpen}
            setTabsBarShow={setTabsBarShow}
            setZenModeOpen={setZenModeOpen}
            onResetSettingOptions={handleResetSettingOptions}
          />
        </Header>
        {tabsBarShow && <TabsBar setOpenedKeys={setOpenedKeys} />}
        <Content className={getContentClassNames()}>
          <Outlet />
          <FloatButton.BackTop className="back-top-position" />
          {zenModeOpen && (
            <FloatButton
              className="quit-zen"
              type="primary"
              icon={<ShrinkOutlined />}
              tooltip="退出禅模式"
              onClick={() => setZenModeOpen(false)}
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default PrimaryLayout;
