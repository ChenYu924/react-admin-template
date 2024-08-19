import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Space } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import classNames from "classnames";
import styles from "@/components/workflow/cardTempate/CardTemplate.module.scss";

function PrimaryCardTemplate(props) {
  const { extra = defaultCardExtraJSX(), title, children } = props;
  const stateStepsList = useSelector((state) => state.workflow.stepsList);
  const stateCurrentStep = useSelector((state) => state.workflow.currentStep);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function defaultCardExtraJSX() {
    return (
      <Space>
        <Button onClick={() => navigate(-1)}>退出</Button>
      </Space>
    );
  }
  function handlePrevious() {
    dispatch({ type: "workflow-slice/setCurrentSub" });
  }
  function handleNext() {
    dispatch({ type: "workflow-slice/setCurrentAdd" });
  }

  return (
    <Card className={styles["card-common"]} title={title} extra={extra}>
      <div className={styles["card-content-common"]}>
        {/* 主体内容 */}
        {children}
      </div>
      {/* 底部悬浮操作框 */}
      <div className={styles["card-footer-common"]}>
        <Space>
          {stateCurrentStep &&
          stateCurrentStep !== stateStepsList.length - 1 ? (
            <Button onClick={handlePrevious}>上一步</Button>
          ) : null}
          <Button
            style={{ width: "74px" }}
            type="primary"
            disabled={stateCurrentStep === stateStepsList.length - 1}
            onClick={handleNext}
          >
            {stateCurrentStep === stateStepsList.length - 1
              ? "已完成"
              : "下一步"}
          </Button>
        </Space>
      </div>
      {/* 引导用箭头(绝对定位) */}
      {stateCurrentStep !== stateStepsList.length - 1 && (
        <ArrowDownOutlined
          className={classNames(
            styles["arrow-down"],
            "animate__animated",
            "animate__infinite",
            "animate__slideOutDown",
          )}
        />
      )}
    </Card>
  );
}

export default PrimaryCardTemplate;
