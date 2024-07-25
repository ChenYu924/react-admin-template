import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Layout, FloatButton } from "antd";
import { ShrinkOutlined } from "@ant-design/icons";
import classNames from "classnames";
import request from "@/utils/request";
import SiderMenu from "@/layouts/parts/sider/SiderMenu";
import PrimaryHeader from "@/layouts/parts/header/PrimaryHeader";
import TabsBar from "@/layouts/parts/tabs/TabsBar";

// 上下文对象
export const PrimaryLayoutContext = createContext(null);

function PrimaryLayout() {
  const { Header, Sider, Content } = Layout;
  const dispatch = useDispatch();
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

  useEffect(() => {
    // 根据获取到的token再去接口中获取用户信息
    request.get("/user").then((res) => {
      const userData = res.data.data;
      dispatch({ type: "user-slice/setUser", payload: userData });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    <PrimaryLayoutContext.Provider
      value={{
        collapsed,
        setCollapsed,
        openedKeys,
        setOpenedKeys,
        menuAccordionOpen,
        setMenuAccordionOpen,
        tabsBarShow,
        setTabsBarShow,
        zenModeOpen,
        setZenModeOpen,
        onResetSettingOptions: handleResetSettingOptions,
      }}
    >
      <Layout className="primary-layout">
        <Sider
          width={judgeSiderWidth()}
          className={getSiderClassNames()}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <SiderMenu />
        </Sider>
        <Layout className="main">
          <Header className={getHeaderClassNames()}>
            <PrimaryHeader />
          </Header>
          {tabsBarShow && <TabsBar />}
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
    </PrimaryLayoutContext.Provider>
  );
}

export default PrimaryLayout;
