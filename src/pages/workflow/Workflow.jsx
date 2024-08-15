import { useNavigate } from "react-router-dom";
import { Button } from "antd";

function Workflow() {
  const navigate = useNavigate();

  function handleWfBasic() {
    navigate("/wf/wf-basic");
  }

  return (
    <>
      <Button type="primary" onClick={handleWfBasic}>
        基础工作流
      </Button>
    </>
  );
}

export default Workflow;
