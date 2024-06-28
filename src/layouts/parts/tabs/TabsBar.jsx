import { Tabs, Modal } from "antd";
import { useState } from "react";
import { ClearOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

function TabsBar() {
  const initialItems = [
    {
      key: "1",
      label: "我的工作台",
      closable: false,
    },
    {
      key: "2",
      label: "基本用法",
    },
    {
      key: "3",
      label: "测试测试隐藏1",
    },
    {
      key: "4",
      label: "测试测试隐藏2",
    },
    {
      key: "5",
      label: "测试测试隐藏3",
    },
    {
      key: "6",
      label: "测试测试隐藏4",
    },
    {
      key: "7",
      label: "测试测试隐藏5",
    },
    {
      key: "8",
      label: "测试测试隐藏6",
    },
    {
      key: "9",
      label: "测试测试隐藏7",
    },
    {
      key: "10",
      label: "测试测试隐藏8",
    },
    {
      key: "11",
      label: "测试测试隐藏9",
    },
    {
      key: "12",
      label: "测试测试隐藏10",
    },
  ];
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);

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

export default TabsBar;
