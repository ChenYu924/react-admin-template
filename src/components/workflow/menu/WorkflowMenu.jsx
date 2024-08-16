import { useSelector } from "react-redux";
import { Button, Steps } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import styles from "./WorkflowMenu.module.scss";

function WorkflowMenu() {
  const stateStepsList = useSelector((state) => state.workflow.stepsList);
  const stateCurrentStep = useSelector((state) => state.workflow.currentStep);

  return (
    <>
      <div className={styles.header}>
        <span className={styles.title}>填报流程</span>
        <Button type="link" icon={<DoubleRightOutlined />} iconPosition="end">
          历史记录
        </Button>
      </div>
      <Steps
        className={styles.steps}
        direction="vertical"
        size="small"
        current={stateCurrentStep}
        items={stateStepsList}
      />
    </>
  );
}

export default WorkflowMenu;
