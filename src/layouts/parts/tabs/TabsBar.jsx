import { Tabs, Modal } from "antd";
import { useEffect, useState } from "react";
import { ClearOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

function TabsBar({ initialItems }) {
  const [activeKey, setActiveKey] = useState();
  const [items, setItems] = useState();
  const location = useLocation();

  useEffect(() => {
    if (initialItems.length) {
      setActiveKey(initialItems[0].key);
      setItems(initialItems);
    }
  }, []);
  useEffect(() => {
    if (initialItems.length) {
      console.log(location.pathname.slice(1));
      setActiveKey(location.pathname.slice(1));
      setItems(initialItems);
    }
  }, [initialItems]);

  function removeItem(targetKey) {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  }
  function onChange(newActiveKey) {
    setActiveKey(newActiveKey);
  }
  function onEdit(key, action) {
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
  function handleModalOk() {
    setItems([items[0]]);
    setActiveKey(items[0].key);
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
        <ClearOutlined className="clear" onClick={handleClearIcon} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    initialItems: state.tab,
  };
};

export default connect(mapStateToProps)(TabsBar);
