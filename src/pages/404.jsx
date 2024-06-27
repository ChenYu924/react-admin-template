import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function Page404() {
  const navigate = useNavigate();

  function handleBackHome() {
    navigate("/workbench");
  }

  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，您访问的页面不存在。"
      extra={
        <Button type="primary" onClick={handleBackHome}>
          返回首页
        </Button>
      }
    />
  );
}

export default Page404;
