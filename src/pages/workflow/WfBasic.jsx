import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./Wf.module.scss";
import { wfBasicWorkflowData } from "@/mock/workflow/wfBasic";
import PrimaryCardTemplate from "@/components/workflow/cardTempate/PrimaryCardTemplate";

function WfBasic() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "workflow-slice/setData",
      payload: wfBasicWorkflowData,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PrimaryCardTemplate title="个人信息">
      <div className={styles["wf-basic"]}>表单区</div>
    </PrimaryCardTemplate>
  );
}

export default WfBasic;
