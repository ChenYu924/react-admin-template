import { createContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { Layout } from "antd";
import styles from "./WorkflowLayout.module.scss";
import UserArea from "@/components/userArea/UserArea";
import WorkflowMenu from "@/components/workflow/menu/WorkflowMenu";

// 上下文对象
export const WorkflowLayoutContext = createContext(null);
const { Header, Sider, Content } = Layout;

function WorkflowLayout() {
  // 仓库中的侧边栏菜单项(登录 -> 存入用户数据到user切片 - 从user切片获取菜单项数据)
  const stateMenuTree = useSelector((state) => state.user.menuTree);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 是否展示侧边栏
  const [showMenu, setShowMenu] = useState(true);

  function handleLogoClick() {
    dispatch({ type: "tab-slice/setActiveKey", payload: stateMenuTree[0].key });
    navigate(`/${stateMenuTree[0].key}`);
  }

  return (
    <WorkflowLayoutContext.Provider value={{ showMenu, setShowMenu }}>
      <Layout className={styles["workflow-layout"]}>
        <Header className={styles.header}>
          <div className={styles["logo-wrapper"]}>
            <div className={styles.logo} onClick={handleLogoClick} />
          </div>
          <UserArea showAll={false} />
        </Header>
        <Layout className={styles.main}>
          {showMenu && (
            <Sider className={styles.sider} theme="light" width={288}>
              <WorkflowMenu />
            </Sider>
          )}
          <Content className={styles.content}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </WorkflowLayoutContext.Provider>
  );
}

export default WorkflowLayout;
