import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import styles from "./Wf.module.scss";
import { wfBasicWorkflowData } from "@/mock/workflow/wfBasic";
import PrimaryCardTemplate from "@/components/workflow/cardTempate/PrimaryCardTemplate";

function WfBasic() {
  const stateWorkflow = useSelector((state) => state.workflow);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cardTitle, setCardTitle] = useState("加载中...");

  useEffect(() => {
    dispatch({
      type: "workflow-slice/setData",
      payload: wfBasicWorkflowData,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (stateWorkflow.stepsList.length) {
      setCardTitle(stateWorkflow.stepsList[stateWorkflow.currentStep].title);
    }
  }, [stateWorkflow]);

  // 实际有内容时需拆分为多个组件
  function mockStepContentJSX() {
    if (stateWorkflow.currentStep !== stateWorkflow.stepsList.length - 1) {
      return <div style={{ height: "2000px" }}>表单：{cardTitle}</div>;
    } else {
      return (
        <Result
          status="success"
          title="表单提交成功!"
          extra={[
            <Button type="primary" onClick={() => navigate(-1)}>
              退出
            </Button>,
            <Button onClick={handleAgain}>重新填写</Button>,
          ]}
        />
      );
    }
  }
  function handleAgain() {
    dispatch({ type: "workflow-slice/setCurrentStep", payload: 0 });
  }

  return (
    <PrimaryCardTemplate title={cardTitle}>
      <div className={styles["wf-basic"]}>{mockStepContentJSX()}</div>
    </PrimaryCardTemplate>
  );
}

export default WfBasic;
