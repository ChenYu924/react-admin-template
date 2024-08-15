import { Button, Steps } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import styles from "./WorkflowMenu.module.scss";

function WorkflowMenu() {
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
        current={1}
        items={[
          {
            title: "个人信息",
          },
          {
            title: "个人经历",
          },
          {
            title: "未来展望",
          },
          {
            title: "完成",
          },
        ]}
      />
    </>
  );
}

export default WorkflowMenu;
