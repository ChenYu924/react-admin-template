import { useNavigate } from "react-router-dom";
import { Button, Space } from "antd";

function BadResult() {
  const navigate = useNavigate();

  return (
    <Space>
      <Button type="primary" onClick={() => navigate("/403")}>
        403界面预览
      </Button>
      <Button danger onClick={() => navigate("/404")}>
        404界面预览
      </Button>
      <Button type="dashed" onClick={() => navigate("/500")}>
        500界面预览
      </Button>
    </Space>
  );
}

export default BadResult;
