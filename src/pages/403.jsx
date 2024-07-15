import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function Page403() {
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="403"
      subTitle="对不起，您没有访问该页面的权限。"
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          返回首页
        </Button>
      }
    />
  );
}

export default Page403;
