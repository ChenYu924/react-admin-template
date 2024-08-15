import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { Layout } from "antd";
import styles from "./WorkflowLayout.module.scss";
import UserArea from "@/components/userArea/UserArea";

function WorkflowLayout({ children }) {
  const { Header, Sider, Content } = Layout;
  // 仓库中的侧边栏菜单项(登录 -> 存入用户数据到user切片 - 从user切片获取菜单项数据)
  const stateMenuTree = useSelector((state) => state.user.menuTree);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogoClick() {
    dispatch({ type: "tab-slice/setActiveKey", payload: stateMenuTree[0].key });
    navigate(`/${stateMenuTree[0].key}`);
  }

  return (
    <Layout className={styles["workflow-layout"]}>
      <Header className={styles.header}>
        <div className={styles["logo-wrapper"]}>
          <div className={styles.logo} onClick={handleLogoClick} />
        </div>
        <UserArea showAll={false} />
      </Header>
      <Layout className={styles.main}>
        <Sider className={styles.sider} theme="light" width={288}>
          Sider
        </Sider>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default WorkflowLayout;
