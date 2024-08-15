import { useNavigate } from "react-router-dom";
import { Button, Card, Space } from "antd";

function WfBasic() {
  const navigate = useNavigate();

  function cardExtraJSX() {
    return (
      <Space>
        <Button onClick={() => navigate(-1)}>返回</Button>
      </Space>
    );
  }

  return (
    <Card className="h-full" title="个人信息" extra={cardExtraJSX()}>
      待定
    </Card>
  );
}

export default WfBasic;
