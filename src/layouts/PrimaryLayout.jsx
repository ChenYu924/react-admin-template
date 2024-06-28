import { Layout, FloatButton } from "antd";
import { Outlet } from "react-router-dom";
import SiderMenu from "@/layouts/parts/sider/SiderMenu";
import PrimaryHeader from "@/layouts/parts/header/PrimaryHeader";
import TabsBar from "@/layouts/parts/tabs/TabsBar";
import { useState } from "react";
import classNames from "classnames";
import { ShrinkOutlined } from "@ant-design/icons";

function PrimaryLayout() {
  const { Header, Sider, Content } = Layout;
  // 侧边菜单栏是否收起
  const [collapsed, setCollapsed] = useState(false);
  // 页签条是否展示
  const [tabsBarShow, setTabsBarShow] = useState(true);
  // 是否开启禅模式
  const [zenModeOpen, setZenModeOpen] = useState(false);

  function getContentClassNames() {
    return classNames("content", {
      "left-top-radius": !tabsBarShow,
      "content-without-tabs-mt": !tabsBarShow,
      "content-without-tabs-height": !tabsBarShow,
      "content-with-tabs-height": tabsBarShow,
    });
  }
  // 重置设置选项
  function resetSettingOptions() {
    setTabsBarShow(true);
    setZenModeOpen(false);
  }

  return (
    <Layout className="primary-layout">
      {!zenModeOpen && (
        <Sider
          width={288}
          className="sider"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <SiderMenu />
        </Sider>
      )}
      <Layout className="main">
        {!zenModeOpen && (
          <Header className="header bottom-shadow">
            <PrimaryHeader
              collapsed={collapsed}
              tabsBarShow={tabsBarShow}
              zenModeOpen={zenModeOpen}
              setCollapsed={setCollapsed}
              setTabsBarShow={setTabsBarShow}
              setZenModeOpen={setZenModeOpen}
            />
          </Header>
        )}
        {tabsBarShow && <TabsBar />}
        <Content className={getContentClassNames()}>
          <Outlet />
          <FloatButton.BackTop className="back-top-position" />
          {zenModeOpen && (
            <FloatButton
              className="back-top-position"
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
