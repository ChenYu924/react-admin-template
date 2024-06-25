import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

function PrimaryHeader(props) {
  const { collapsed, setCollapsed } = props;

  return (
    <Button
      className="collapsed-button"
      type="text"
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={() => setCollapsed(!collapsed)}
    />
  );
}

export default PrimaryHeader;
