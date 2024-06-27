import { Layout, FloatButton } from "antd";
import { Outlet } from "react-router-dom";
import SiderMenu from "@/layouts/parts/sider/SiderMenu";
import PrimaryHeader from "@/layouts/parts/header/PrimaryHeader";
import TabsBar from "@/layouts/parts/tabs/TabsBar";
import { useState } from "react";
import classNames from "classnames";

function PrimaryLayout() {
  const { Header, Sider, Content } = Layout;
  // 侧边菜单栏是否收起
  const [collapsed, setCollapsed] = useState(false);
  // 页签条是否展示
  const [tabsBarShow, setTabsBarShow] = useState(true);

  function getContentClassNames() {
    return classNames("content", {
      "left-top-radius": !tabsBarShow,
      "content-without-tabs-height": !tabsBarShow,
      "content-with-tabs-height": tabsBarShow,
    });
  }

  return (
    <Layout className="primary-layout">
      <Sider
        width={288}
        className="sider"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <SiderMenu />
      </Sider>
      <Layout className="main">
        <Header className="header bottom-shadow">
          <PrimaryHeader
            collapsed={collapsed}
            tabsBarShow={tabsBarShow}
            setCollapsed={setCollapsed}
            setTabsBarShow={setTabsBarShow}
          />
        </Header>
        {tabsBarShow && <TabsBar />}
        <Content className={getContentClassNames()}>
          <Outlet />
          <FloatButton.BackTop className="back-top-position" />
        </Content>
      </Layout>
    </Layout>
  );
}

export default PrimaryLayout;
