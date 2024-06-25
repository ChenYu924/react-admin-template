import { Layout, FloatButton } from "antd";
import { Outlet } from "react-router-dom";
import SiderMenu from "@/layouts/parts/sider/SiderMenu";
import PrimaryHeader from "@/layouts/parts/header/PrimaryHeader";
import { useState } from "react";

function PrimaryLayout() {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);

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
        <Header className="header">
          <PrimaryHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        </Header>
        <Content className="content">
          <Outlet />
          <FloatButton.BackTop className="back-top-position" />
        </Content>
      </Layout>
    </Layout>
  );
}

export default PrimaryLayout;
