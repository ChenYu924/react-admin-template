import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

function Page500() {
  const navigate = useNavigate();

  return (
    <Result
      status="500"
      title="500"
      subTitle="对不起，服务器出错了。"
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          返回
        </Button>
      }
    />
  );
}

export default Page500;
