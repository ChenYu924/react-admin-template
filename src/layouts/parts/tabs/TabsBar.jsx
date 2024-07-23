import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, Modal } from "antd";
import { ClearOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import usePrimaryLayoutContext from "@/hooks/usePrimaryLayoutContext";

function TabsBar() {
  const { setOpenedKeys } = usePrimaryLayoutContext();
  const tabData = useSelector((state) => state.tab);
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState();
  const [items, setItems] = useState();

  useEffect(() => {
    if (tabData.tabList.length) {
      setActiveKey(tabData.activeKey);
      setItems(tabData.tabList);
    }
  }, [tabData]);

  function handleModalOk() {
    dispatch({ type: "tab-slice/setRemoveAll" });
    setOpenedKeys([]);
  }
  function removeItem(targetKey) {
    dispatch({ type: "tab-slice/setRemoveTab", payload: targetKey });
  }
  function onChange(newActiveKey) {
    setActiveKey(newActiveKey);
    dispatch({ type: "tab-slice/setActiveKey", payload: newActiveKey });
  }
  function onEdit(key) {
    removeItem(key);
  }
  function handleClearIcon() {
    Modal.confirm({
      style: { top: 132 },
      title: "清除页签",
      icon: <ExclamationCircleOutlined />,
      content: "确定要清除所有页签吗？",
      maskClosable: true,
      onOk: handleModalOk,
    });
  }

  return (
    <div className="tabs-bar">
      <div className="left">
        <Tabs
          type="editable-card"
          hideAdd
          size="small"
          tabBarGutter={4}
          items={items}
          activeKey={activeKey}
          onChange={onChange}
          onEdit={onEdit}
        />
      </div>
      <div className="right">
        {tabData.tabList.length > 1 && (
          <ClearOutlined className="clear" onClick={handleClearIcon} />
        )}
      </div>
    </div>
  );
}

export default TabsBar;
