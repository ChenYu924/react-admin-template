import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Dropdown } from "antd";
import { UpOutlined, UserOutlined } from "@ant-design/icons";
import { personalTab } from "@/utils/tools";
import styles from "./UserArea.module.scss";
import Cookies from "js-cookie";

// 头部用户区域
function UserArea({ showAll = true }) {
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
  const stateUserInfo = useSelector((state) => state.user.info);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNavProfile() {
    dispatch({
      type: "tab-slice/setTab",
      payload: personalTab("mine-center", "个人中心"),
    });
  }
  function handleNavLogin() {
    Cookies.remove("token");
    dispatch({ type: "user-slice/setClear" });
    navigate("/login");
  }

  return (
    <Dropdown
      menu={{
        items: showAll
          ? dropdownItems
          : [dropdownItems[dropdownItems.length - 1]],
      }}
    >
      <div className={styles["avatar-wrapper"]}>
        <span className={styles["user-name"]}>{stateUserInfo.nickname}</span>
        <UpOutlined className={styles.arrow} />
        <Avatar size={40} icon={<UserOutlined />} className={styles.avatar} />
      </div>
    </Dropdown>
  );
}

export default UserArea;
